import { Graph } from "../../lib/pkg";
import vertexShader from "./vertex.wgsl?raw";
import fragmentShader from "./fragment.wgsl?raw";
import typesWgsl from "./types.wgsl?raw";

console.log({ vertexShader });

// Replace #include directives
const processShader = (source: string) => {
  return source.replace(/#include "([^"]+)"/g, (_, path) => {
    if (path === "types.wgsl") return typesWgsl;
    throw new Error(`Unknown include: ${path}`);
  });
};

const getPixelRatio = () =>
  typeof window !== "undefined" ? window.devicePixelRatio : 1;

export class Renderer {
  private device!: GPUDevice;
  private context!: GPUCanvasContext;
  private pipeline!: GPURenderPipeline;
  private vertexBuffer!: GPUBuffer;
  private viewProjBuffer!: GPUBuffer;
  private bindGroup!: GPUBindGroup;
  private quadBuffer!: GPUBuffer;

  constructor(private canvas: HTMLCanvasElement, private graph: Graph) {}

  async init() {
    const adapter = await navigator.gpu.requestAdapter();
    this.device = await adapter!.requestDevice();
    this.context = this.canvas.getContext("webgpu")!;

    const devicePixelRatio = getPixelRatio();
    this.canvas.width = this.canvas.clientWidth * devicePixelRatio;
    this.canvas.height = this.canvas.clientHeight * devicePixelRatio;

    this.canvas.width = window.innerWidth - 20;
    this.canvas.height = window.innerHeight - 20;

    this.context.configure({
      device: this.device,
      format: navigator.gpu.getPreferredCanvasFormat(),
      alphaMode: "premultiplied",
    });

    // Create static quad vertex buffer
    // prettier-ignore
    const quadVertices = new Float32Array([
      -1, -1,  0, 0,  // first triangle: corner at (-1,-1) with UV (0,0)
      1, -1,  1, 0,  // corner at (1,-1) with UV (1,0)
      1,  1,  1, 1,  // corner at (1,1) with UV (1,1)
     -1, -1,  0, 0,  // second triangle: repeats first corner
      1,  1,  1, 1,  // repeats third corner
     -1,  1,  0, 1   // corner at (-1,1) with UV (0,1)
    ]);

    this.quadBuffer = this.device.createBuffer({
      size: quadVertices.byteLength,
      usage: GPUBufferUsage.VERTEX,
      mappedAtCreation: true,
    });
    new Float32Array(this.quadBuffer.getMappedRange()).set(quadVertices);
    this.quadBuffer.unmap();

    const max = 50;
    // Create view projection matrix that maps [-100,100] to [-1,1]
    // prettier-ignore
    const viewProjMatrix = new Float32Array([
      1 / max,       0, 0, 0, // scale x,
      0,       1 / max, 0, 0, // scale y
      0,             0, 1, 0, // skew unused for 2D
      0,             0, 0, 1, // no translation yet
    ]);

    this.viewProjBuffer = this.device.createBuffer({
      size: viewProjMatrix.byteLength,
      usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
      mappedAtCreation: true,
    });
    new Float32Array(this.viewProjBuffer.getMappedRange()).set(viewProjMatrix);
    this.viewProjBuffer.unmap();

    // Create bind group layout
    const bindGroupLayout = this.device.createBindGroupLayout({
      entries: [
        {
          binding: 0,
          visibility: GPUShaderStage.VERTEX,
          buffer: { type: "uniform" },
        },
      ],
    });

    // Create bind group
    this.bindGroup = this.device.createBindGroup({
      layout: bindGroupLayout,
      entries: [
        {
          binding: 0,
          resource: { buffer: this.viewProjBuffer },
        },
      ],
    });

    // Create pipeline layout
    const pipelineLayout = this.device.createPipelineLayout({
      bindGroupLayouts: [bindGroupLayout],
    });

    this.pipeline = this.device.createRenderPipeline({
      layout: pipelineLayout,
      vertex: {
        module: this.device.createShaderModule({
          code: processShader(vertexShader),
        }),
        entryPoint: "main",
        buffers: [
          {
            // Node data from Rust (instanced)
            arrayStride: 28, // 7 floats * 4 bytes
            stepMode: "instance",
            attributes: [
              { shaderLocation: 0, offset: 0, format: "float32" }, // id
              { shaderLocation: 1, offset: 4, format: "float32x2" }, // position
              { shaderLocation: 2, offset: 12, format: "float32" }, // radius
              { shaderLocation: 3, offset: 16, format: "float32x3" }, // color
            ],
          },
          {
            // Quad vertices (per vertex)
            arrayStride: 16, // 4 floats * 4 bytes
            stepMode: "vertex",
            attributes: [
              { shaderLocation: 4, offset: 0, format: "float32x2" }, // position
              { shaderLocation: 5, offset: 8, format: "float32x2" }, // uv
            ],
          },
        ],
      },
      fragment: {
        module: this.device.createShaderModule({
          code: processShader(fragmentShader),
        }),
        entryPoint: "main",
        targets: [
          {
            format: navigator.gpu.getPreferredCanvasFormat(),
            blend: {
              color: {
                srcFactor: "src-alpha",
                dstFactor: "one-minus-src-alpha",
                operation: "add",
              },
              alpha: {
                srcFactor: "one",
                dstFactor: "one-minus-src-alpha",
                operation: "add",
              },
            },
          },
        ],
      },
      primitive: {
        topology: "triangle-list",
        //stripIndexFormat: undefined,
      },
    });
  }

  draw() {
    const nodes = this.graph.get_nodes();
    const nodeCount = this.graph.node_count();

    this.vertexBuffer = this.device.createBuffer({
      size: nodes.byteLength,
      usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
      mappedAtCreation: true,
    });
    new Float32Array(this.vertexBuffer.getMappedRange()).set(nodes);
    this.vertexBuffer.unmap();

    const commandEncoder = this.device.createCommandEncoder();
    const renderPass = commandEncoder.beginRenderPass({
      colorAttachments: [
        {
          view: this.context.getCurrentTexture().createView(),
          clearValue: { r: 0, g: 0, b: 0, a: 1 },
          loadOp: "clear",
          storeOp: "store",
        },
      ],
    });

    renderPass.setPipeline(this.pipeline);
    renderPass.setBindGroup(0, this.bindGroup);
    renderPass.setVertexBuffer(0, this.vertexBuffer);
    renderPass.setVertexBuffer(1, this.quadBuffer);
    renderPass.draw(6, nodeCount);
    renderPass.end();

    this.device.queue.submit([commandEncoder.finish()]);
    // const nodes = this.graph.get_nodes();
    // console.log("Node buffer:", nodes);
    // console.log("Node count:", nodes.length / 7);
    // nodes.forEach((_, i) => {
    //   if (i % 7 === 3) {
    //     // radius position in array
    //     console.log(`Node ${Math.floor(i / 7)} radius:`, nodes[i]);
    //   }
    // });

    // console.log("Node data", nodes);

    // const quadData = new Float32Array(this.quadBuffer.getMappedRange());

    // console.log("Quad data:", quadData);

    // this.vertexBuffer = this.device.createBuffer({
    //   size: nodes.byteLength,
    //   usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
    //   mappedAtCreation: true,
    // });

    // new Float32Array(this.vertexBuffer.getMappedRange()).set(nodes);
    // this.vertexBuffer.unmap();

    // // this.vertexBuffer = this.device.createBuffer({
    // //   size: vertexData.byteLength,
    // //   usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
    // //   mappedAtCreation: true,
    // // });
    // // new Float32Array(this.vertexBuffer.getMappedRange()).set(vertexData);
    // // this.vertexBuffer.unmap();

    // const commandEncoder = this.device.createCommandEncoder();
    // const renderPass = commandEncoder.beginRenderPass({
    //   colorAttachments: [
    //     {
    //       view: this.context.getCurrentTexture().createView(),
    //       clearValue: { r: 0, g: 0, b: 0, a: 1 },
    //       loadOp: "clear",
    //       storeOp: "store",
    //     },
    //   ],
    // });

    // renderPass.setPipeline(this.pipeline);
    // renderPass.setBindGroup(0, this.bindGroup);
    // renderPass.setVertexBuffer(0, this.vertexBuffer);
    // renderPass.setVertexBuffer(1, this.quadBuffer); // quad vertices

    // const nodeCount = this.graph.node_count();

    // console.log("Node count:", nodeCount);
    // renderPass.draw(nodeCount);
    // renderPass.end();

    // this.device.queue.submit([commandEncoder.finish()]);
  }
}
