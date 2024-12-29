import init, { Graph } from "../lib/pkg";
import { GraphBuffer } from "./graph_buffer";
import { Renderer } from "./renderer/webgpu";
import { GraphData } from "./types";
import { Camera } from "./camera";

export class GraphViewer {
  private graphManager!: Graph;
  private renderer!: Renderer;
  private camera = new Camera();

  constructor(private canvas: HTMLCanvasElement) {}

  async init() {
    await init();
    const buffer = GraphBuffer.toBuffer({ nodes: [], edges: [] });
    this.graphManager = new Graph(buffer);
  }

  async setData(initialData: GraphData) {
    const buffer = GraphBuffer.toBuffer(initialData);
    this.graphManager.set_graph(buffer);

    this.renderer = new Renderer(this.canvas, this.graphManager);
    await this.renderer.init();
    this.renderer.draw();
  }
}
