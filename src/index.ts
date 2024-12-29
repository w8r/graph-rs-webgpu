import init, { Graph } from "../lib/pkg";
import { GraphBuffer } from "./graph_buffer";
import { Renderer } from "./renderer";
import { GraphData } from "./types";
import { Camera } from "./camera";
import { Mouse } from "./handler/mouse";

export class GraphViewer {
  private graphManager!: Graph;
  private renderer!: Renderer;
  private camera = new Camera();
  private mouse!: Mouse;

  constructor(private canvas: HTMLCanvasElement) {
    this.mouse = new Mouse(canvas, this.camera);
    this.mouse.on("update", this.redraw);
    this.camera.zoom = 0.2;
  }

  async init() {
    await init();
    const buffer = GraphBuffer.toBuffer({ nodes: [], edges: [] });
    this.graphManager = new Graph(buffer);
    this.updateSize();
  }

  updateSize(
    width = this.canvas.clientWidth,
    height = this.canvas.clientHeight
  ) {
    this.canvas.width = width;
    this.canvas.height = height;
    this.camera.width = width;
    this.camera.height = height;
    if (this.renderer) this.redraw();
  }

  async setData(initialData: GraphData) {
    const buffer = GraphBuffer.toBuffer(initialData);
    this.graphManager.set_graph(buffer);

    this.renderer = new Renderer(this.canvas, this.graphManager);
    await this.renderer.init(
      this.camera.getViewProjMatrix(this.getAspectRatio())
    );
    this.redraw();
  }

  private getAspectRatio() {
    return this.canvas.width / this.canvas.height;
  }

  private redraw = () => {
    const viewProj = this.camera.getViewProjMatrix(this.getAspectRatio());
    this.renderer.updateViewProj(viewProj);
    this.renderer.draw();
  };
}
