import init, { Graph } from '../lib/pkg';
import { GraphBuffer } from './graph_buffer';
import { Renderer } from './renderer';
import { GraphData } from './types';
import { Camera } from './camera';
import { Mouse } from './handler/mouse';

export class GraphViewer {
  private graphManager!: Graph;
  private renderer!: Renderer;
  private camera = new Camera();
  private mouse!: Mouse;
  private resizeObserver: ResizeObserver;
  private renderFrame: number = 0;

  constructor(private canvas: HTMLCanvasElement) {
    this.mouse = new Mouse(canvas, this.camera);
    this.mouse.on('update', this.requestRedraw);
    this.camera.zoom = 0.2;

    // Add ResizeObserver
    this.resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        this.updateSize(width, height);
      }
    });
    this.resizeObserver.observe(canvas);
  }

  async init() {
    await init();
    const buffer = GraphBuffer.toBuffer({ nodes: [], edges: [] });
    this.graphManager = new Graph(buffer);
    if (Renderer.isSupported()) {
      this.renderer = new Renderer(this.canvas, this.graphManager);
      await this.renderer.init(
        this.camera.getViewProjMatrix(this.getAspectRatio())
      );
    }
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
    if (this.renderer) {
      this.renderer.resize(width, height);
      this.redraw();
    }
  }

  async setData(initialData: GraphData) {
    const buffer = GraphBuffer.toBuffer(initialData);
    this.graphManager.set_graph(buffer);
    this.requestRedraw();
  }

  private getAspectRatio() {
    return this.canvas.width / this.canvas.height;
  }

  private requestRedraw = () => {
    this.renderFrame = requestAnimationFrame(this.redraw);
  };

  private redraw = () => {
    const viewProj = this.camera.getViewProjMatrix(this.getAspectRatio());
    this.renderer.updateViewProj(viewProj);
    this.renderer.draw();
  };

  public destroy() {
    this.resizeObserver.disconnect();
    this.mouse.destroy();
    cancelAnimationFrame(this.renderFrame);
  }
}
