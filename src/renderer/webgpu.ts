import { Graph } from "../../lib/pkg";
import vertexShader from "./vertex.wgsl";
import fragmentShader from "./fragment.wgsl";

console.log({ vertexShader });

const getPixelRatio = () =>
  typeof window !== "undefined" ? window.devicePixelRatio : 1;

export class Renderer {
  private device!: GPUDevice;
  private context!: GPUCanvasContext;
  private pipeline!: GPURenderPipeline;
  private vertexBuffer!: GPUBuffer;
  private viewProjBuffer!: GPUBuffer;
  private bindGroup!: GPUBindGroup;

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

    // Create view projection matrix that maps [-100,100] to [-1,1]
    // prettier-ignore
    const viewProjMatrix = new Float32Array([
      1 / 150,       0, 0, 0, // scale x,
      0,       1 / 150, 0, 0, // scale y
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

    // Create pipeline layout
    const pipelineLayout = this.device.createPipelineLayout({
      bindGroupLayouts: [bindGroupLayout],
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

    this.pipeline = this.device.createRenderPipeline({
      layout: pipelineLayout,
      vertex: {
        module: this.device.createShaderModule({
          code: vertexShader,
        }),
        entryPoint: "main",
        buffers: [
          {
            arrayStride: 28, // 7 floats * 4 bytes
            attributes: [
              {
                // id
                shaderLocation: 0,
                offset: 0,
                format: "float32",
              },
              {
                // position (x,y)
                shaderLocation: 1,
                offset: 4,
                format: "float32x2",
              },
              {
                // radius
                shaderLocation: 2,
                offset: 12,
                format: "float32",
              },
              {
                // color (r,g,b)
                shaderLocation: 3,
                offset: 16,
                format: "float32x3",
              },
            ],
          },
        ],
      },
      fragment: {
        module: this.device.createShaderModule({
          code: fragmentShader,
        }),
        entryPoint: "main",
        targets: [{ format: navigator.gpu.getPreferredCanvasFormat() }],
      },
      primitive: {
        topology: "point-list",
      },
    });
  }

  draw() {
    const nodes = this.graph.get_nodes();
    console.log("Node buffer:", nodes);
    console.log("Node count:", nodes.length / 7);

    console.log("First node data:", {
      id: nodes[0],
      x: nodes[1],
      y: nodes[2],
      radius: nodes[3],
      r: nodes[4],
      g: nodes[5],
      b: nodes[6],
    });

    this.vertexBuffer = this.device.createBuffer({
      size: nodes.byteLength,
      usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
      mappedAtCreation: true,
    });

    new Float32Array(this.vertexBuffer.getMappedRange()).set(nodes);
    this.vertexBuffer.unmap();

    // this.vertexBuffer = this.device.createBuffer({
    //   size: vertexData.byteLength,
    //   usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
    //   mappedAtCreation: true,
    // });
    // new Float32Array(this.vertexBuffer.getMappedRange()).set(vertexData);
    // this.vertexBuffer.unmap();

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
    //renderPass.draw(1);
    renderPass.draw(nodes.length / 7);
    renderPass.end();

    this.device.queue.submit([commandEncoder.finish()]);
  }
}
