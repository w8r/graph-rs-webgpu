import { Graph } from "../../lib/pkg/webgpu_graph_renderer";
import vertexShaderSrc from "./vertex.wgsl?raw";
import fragmentShaderSrc from "./fragment.wgsl?raw";
import typesWgslSrc from "./types.wgsl?raw";

// Replace #include directives
const processShader = (source: string) => {
  return source.replace(/#include "([^"]+)"/g, (_, path) => {
    if (path === "types.wgsl") return typesWgslSrc;
    throw new Error(`Unknown include: ${path}`);
  });
};

const getPixelRatio = () =>
  typeof window !== "undefined" ? window.devicePixelRatio : 1;

export class Renderer {
  private device!: GPUDevice;
  private context!: GPUCanvasContext;
  private viewProjBuffer!: GPUBuffer;
  private bindGroup!: GPUBindGroup;
  private quadBuffer!: GPUBuffer;
  private lineBuffer!: GPUBuffer;
  private depthTexture!: GPUTexture;

  private combinedBuffer!: GPUBuffer;
  private combinedBufferSize!: number;

  private nodePipeline!: GPURenderPipeline;
  private edgePipeline!: GPURenderPipeline;

  constructor(private canvas: HTMLCanvasElement, private graph: Graph) {}

  private createLineBuffer() {
    // 4 vertices to create a rectangle
    // prettier-ignore
    const lineVertices = new Float32Array([
      0, -0.5,  // bottom start
      0,  0.5,  // top start
      1, -0.5,  // bottom end
      1,  0.5,  // top end
    ]);

    this.lineBuffer = this.device.createBuffer({
      size: lineVertices.byteLength,
      usage: GPUBufferUsage.VERTEX,
      mappedAtCreation: true,
    });
    new Float32Array(this.lineBuffer.getMappedRange()).set(lineVertices);
    this.lineBuffer.unmap();
  }

  private createDepthTexture() {
    this.depthTexture = this.device.createTexture({
      size: {
        width: this.canvas.width,
        height: this.canvas.height,
      },
      format: "depth24plus",
      usage: GPUTextureUsage.RENDER_ATTACHMENT,
    });
  }

  private createViewProjBuffer(view: Float32Array) {
    this.viewProjBuffer = this.device.createBuffer({
      size: view.byteLength,
      usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
      mappedAtCreation: true,
    });
    new Float32Array(this.viewProjBuffer.getMappedRange()).set(view);
    this.viewProjBuffer.unmap();
  }

  private createQuadBuffer() {
    // Create static quad vertex buffer
    // prettier-ignore
    const quadVertices = new Float32Array([
      -1, -1, 0, 0,  // first triangle: corner at (-1,-1) with UV (0,0)
      1, -1, 1, 0,  // corner at (1,-1) with UV (1,0)
      1, 1, 1, 1,  // corner at (1,1) with UV (1,1)
      -1, -1, 0, 0,  // second triangle: repeats first corner
      1, 1, 1, 1,  // repeats third corner
      -1, 1, 0, 1   // corner at (-1,1) with UV (0,1)
    ]);

    this.quadBuffer = this.device.createBuffer({
      size: quadVertices.byteLength,
      usage: GPUBufferUsage.VERTEX,
      mappedAtCreation: true,
    });
    new Float32Array(this.quadBuffer.getMappedRange()).set(quadVertices);
    this.quadBuffer.unmap();
  }

  async init(view: Float32Array) {
    const adapter = await navigator.gpu.requestAdapter();
    this.device = await adapter!.requestDevice();
    this.context = this.canvas.getContext("webgpu")!;

    const vertexShader = processShader(vertexShaderSrc);
    const fragmentShader = processShader(fragmentShaderSrc);

    const devicePixelRatio = getPixelRatio();

    this.canvas.width = this.canvas.clientWidth * devicePixelRatio;
    this.canvas.height = this.canvas.clientHeight * devicePixelRatio;

    this.context.configure({
      device: this.device,
      format: navigator.gpu.getPreferredCanvasFormat(),
      alphaMode: "premultiplied",
    });

    this.createQuadBuffer();
    this.createLineBuffer();
    this.createViewProjBuffer(view);
    this.createDepthTexture();

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

    const vertexShaderModule = this.device.createShaderModule({
      code: vertexShader,
    });
    const fragmentShaderModule = this.device.createShaderModule({
      code: fragmentShader,
    });

    this.createNodePipeline(
      vertexShaderModule,
      fragmentShaderModule,
      pipelineLayout
    );

    this.createEdgePipeline(
      vertexShaderModule,
      fragmentShaderModule,
      pipelineLayout
    );

    const initialBuffer = this.graph.get_buffer();
    this.combinedBufferSize = initialBuffer.byteLength;
    this.combinedBuffer = this.device.createBuffer({
      size: this.combinedBufferSize,
      usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
    });

    // Initial upload
    this.device.queue.writeBuffer(this.combinedBuffer, 0, initialBuffer);
  }

  private createNodePipeline(
    vertexShaderModule: GPUShaderModule,
    fragmentShaderModule: GPUShaderModule,
    pipelineLayout: GPUPipelineLayout
  ) {
    this.nodePipeline = this.device.createRenderPipeline({
      layout: pipelineLayout,
      vertex: {
        module: vertexShaderModule,
        entryPoint: "vs_node",
        buffers: [
          {
            // Node data from combined buffer (instanced)
            arrayStride: 28, // 7 floats * 4 bytes
            stepMode: "instance",
            attributes: [
              { shaderLocation: 0, offset: 0, format: "float32" }, // type
              { shaderLocation: 1, offset: 4, format: "float32x2" }, // position
              { shaderLocation: 2, offset: 12, format: "float32" }, // radius
              { shaderLocation: 3, offset: 16, format: "float32x3" }, // color
            ],
          },
          {
            // Quad vertices (same as before)
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
        module: fragmentShaderModule,
        entryPoint: "fs_node",
        targets: [
          {
            format: navigator.gpu.getPreferredCanvasFormat(),
            blend: {
              color: {
                srcFactor: "src-alpha",
                dstFactor: "one-minus-src-alpha",
              },
              alpha: { srcFactor: "one", dstFactor: "one-minus-src-alpha" },
            },
          },
        ],
      },
      primitive: { topology: "triangle-list" },
      depthStencil: {
        format: "depth24plus",
        depthWriteEnabled: true,
        depthCompare: "less",
      },
    });
  }

  private createEdgePipeline(
    vertexShaderModule: GPUShaderModule,
    fragmentShaderModule: GPUShaderModule,
    pipelineLayout: GPUPipelineLayout
  ) {
    this.edgePipeline = this.device.createRenderPipeline({
      layout: pipelineLayout,
      vertex: {
        module: vertexShaderModule,
        entryPoint: "vs_edge",
        buffers: [
          {
            // Edge instance data
            arrayStride: 36,
            stepMode: "instance",
            attributes: [
              { shaderLocation: 0, offset: 0, format: "float32" }, // type
              { shaderLocation: 1, offset: 4, format: "float32x2" }, // source pos
              { shaderLocation: 2, offset: 12, format: "float32x2" }, // target pos
              { shaderLocation: 3, offset: 20, format: "float32" }, // width
              { shaderLocation: 4, offset: 24, format: "float32x3" }, // color
            ],
          },
          {
            // Line vertex data
            arrayStride: 8,
            stepMode: "vertex",
            attributes: [
              { shaderLocation: 5, offset: 0, format: "float32x2" }, // position
            ],
          },
        ],
      },
      fragment: {
        module: fragmentShaderModule,
        entryPoint: "fs_edge",
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
        topology: "triangle-strip",
        stripIndexFormat: undefined,
      },
      depthStencil: {
        format: "depth24plus",
        depthWriteEnabled: true,
        depthCompare: "less",
      },
    });
  }

  updateGraphData() {
    const newData = this.graph.get_buffer();

    // If data size changed, recreate buffer
    if (newData.byteLength > this.combinedBufferSize) {
      this.combinedBuffer.destroy();
      this.combinedBufferSize = newData.byteLength;
      this.combinedBuffer = this.device.createBuffer({
        size: this.combinedBufferSize,
        usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
      });
    }

    // Update data
    this.device.queue.writeBuffer(this.combinedBuffer, 0, newData);
  }

  draw() {
    this.updateGraphData();
    const nodeCount = this.graph.node_count();
    const edgeCount = this.graph.edge_count();
    const edgesOffset = this.graph.get_edges_offset();

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
      depthStencilAttachment: {
        view: this.depthTexture.createView(),
        depthClearValue: 1.0,
        depthLoadOp: "clear",
        depthStoreOp: "store",
      },
    });

    // Draw edges
    renderPass.setPipeline(this.edgePipeline);
    renderPass.setBindGroup(0, this.bindGroup);
    renderPass.setVertexBuffer(0, this.combinedBuffer, edgesOffset * 4);
    renderPass.setVertexBuffer(1, this.lineBuffer);
    renderPass.draw(4, edgeCount); // 4 vertices per line, edgeCount instances

    // Draw nodes
    renderPass.setPipeline(this.nodePipeline);
    renderPass.setBindGroup(0, this.bindGroup);
    renderPass.setVertexBuffer(0, this.combinedBuffer);
    renderPass.setVertexBuffer(1, this.quadBuffer);
    renderPass.draw(6, nodeCount);

    renderPass.end();
    this.device.queue.submit([commandEncoder.finish()]);
  }

  public updateViewProj(matrix: Float32Array) {
    this.device.queue.writeBuffer(this.viewProjBuffer, 0, matrix);
  }
}
