import { Camera } from "../camera";
import { EventEmitter } from "eventemitter3";
import { Point } from "../types";

export class Mouse extends EventEmitter<{ update: [] }> {
  private isDragging = false;
  private lastMouseX = 0;
  private lastMouseY = 0;
  private rect!: DOMRect;
  private devicePixelRatio: number = window.devicePixelRatio || 1;

  constructor(private canvas: HTMLCanvasElement, private camera: Camera) {
    super();
    this.setupEventHandlers();
    this.updateRect();

    this.updateCameraDimensions();

    window.addEventListener("resize", this.updateRect);
  }

  updateCameraDimensions() {
    this.camera.width = this.canvas.width / this.devicePixelRatio;
    this.camera.height = this.canvas.height / this.devicePixelRatio;
  }

  private updateRect = () => {
    this.rect = this.canvas.getBoundingClientRect();
    this.updateCameraDimensions();
  };

  private setupEventHandlers() {
    this.canvas.addEventListener("mousedown", this.onMouseDown);
    this.canvas.addEventListener("mousemove", this.onMouseMove);
    this.canvas.addEventListener("mouseup", this.onMouseUp);
    this.canvas.addEventListener("mouseleave", this.onMouseUp);
    this.canvas.addEventListener("wheel", this.onWheel, { passive: false });
  }

  private setXY(event: MouseEvent) {
    const { x, y } = this.getCanvasPosition(event);
    this.lastMouseX = x;
    this.lastMouseY = y;
  }

  private getCanvasPosition(event: MouseEvent | WheelEvent): Point {
    const rect = this.rect;
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
  }

  private onMouseDown = (event: MouseEvent) => {
    this.isDragging = true;
    this.setXY(event);
    this.canvas.style.cursor = "grabbing";
  };

  private onMouseMove = (event: MouseEvent) => {
    if (!this.isDragging) {
      this.setXY(event);
      return;
    }

    const { x, y } = this.getCanvasPosition(event);

    const dx = x - this.lastMouseX;
    const dy = y - this.lastMouseY;

    this.camera.move(dx, -dy);

    this.setXY(event);
    this.emit("update");
  };

  private onMouseUp = () => {
    this.isDragging = false;
    this.canvas.style.cursor = "grab";
  };

  private onWheel = (event: WheelEvent) => {
    event.preventDefault();

    const { x, y } = this.getCanvasPosition(event);

    const zoomFactor = event.deltaY > 0 ? 0.99 : 1.01;

    this.camera.zoomAroundPoint(zoomFactor, x, y);

    this.emit("update");
  };

  destroy() {
    this.canvas.removeEventListener("mousedown", this.onMouseDown);
    this.canvas.removeEventListener("mousemove", this.onMouseMove);
    this.canvas.removeEventListener("mouseup", this.onMouseUp);
    this.canvas.removeEventListener("mouseleave", this.onMouseUp);
    this.canvas.removeEventListener("wheel", this.onWheel);
    window.removeEventListener("resize", this.updateRect);
  }
}
