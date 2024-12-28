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

    const shader = this.device.createShaderModule({
      code: `
@vertex
fn vertexMain(@location(0) pos: vec2<f32>, @location(1) color: vec3<f32>) -> @builtin(position) vec4<f32> {
  // Much larger scale
  return vec4<f32>(pos * 0.2, 0.0, 1.0); // Try 0.2 instead of 0.5
}

@fragment
fn fragmentMain(@builtin(position) pos: vec4<f32>) -> @location(0) vec4<f32> {
  let dist = length(pos.xy);
  // Much larger radius
  //let circle = 1.0 - smoothstep(100.0, 110.0, dist);
  //return vec4<f32>(1.0, 0.0, 0.0, circle);
  return vec4<f32>(
    (pos.x / 1000.0) + 0.5,  // R
    (pos.y / 1000.0) + 0.5,  // G
    0.0,                        // B
    1.0
  );
}
      `,
    });

    this.pipeline = this.device.createRenderPipeline({
      layout: "auto",
      vertex: {
        module: this.device.createShaderModule({
          code: vertexShader,
        }),
        entryPoint: "main",
        buffers: [
          {
            arrayStride: 20,
            attributes: [
              { shaderLocation: 0, offset: 0, format: "float32x2" },
              { shaderLocation: 1, offset: 8, format: "float32x3" },
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
    const vertexData = new Float32Array(nodes.length * 5);

    console.log("Node buffer:", nodes);
    console.log("Node count:", nodes.length / 7);
    // Test data for one visible point
    // const testData = new Float32Array([
    //   0.0,
    //   0.0, // position at center
    //   1.0,
    //   0.0,
    //   0.0, // red color
    // ]);

    // this.vertexBuffer = this.device.createBuffer({
    //   size: testData.byteLength,
    //   usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
    //   mappedAtCreation: true,
    // });
    // new Float32Array(this.vertexBuffer.getMappedRange()).set(testData);
    // this.vertexBuffer.unmap();

    for (let i = 0; i < nodes.length / 7; i++) {
      const baseIn = i * 7;
      const baseOut = i * 5;
      const x = nodes[baseIn + 1] / 15.0;
      const y = nodes[baseIn + 2] / 15.0;
      console.log(`Node ${i}: pos(${x}, ${y})`);
      vertexData[baseOut] = x;
      vertexData[baseOut + 1] = y;
      vertexData[baseOut + 2] = 1.0; // red
      vertexData[baseOut + 3] = 0.0;
      vertexData[baseOut + 4] = 0.0;
    }

    this.vertexBuffer = this.device.createBuffer({
      size: vertexData.byteLength,
      usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
      mappedAtCreation: true,
    });
    new Float32Array(this.vertexBuffer.getMappedRange()).set(vertexData);
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
    renderPass.setVertexBuffer(0, this.vertexBuffer);
    //renderPass.draw(1);
    renderPass.draw(nodes.length / 7);
    renderPass.end();

    this.device.queue.submit([commandEncoder.finish()]);
  }
}
