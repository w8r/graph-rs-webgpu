import { Camera } from "../camera";
import { EventEmitter } from "eventemitter3";

export class Mouse extends EventEmitter<{ update: [] }> {
  // Mouse state tracking
  private isDragging = false;
  private lastMouseX = 0;
  private lastMouseY = 0;
  private rect!: DOMRect;

  constructor(private canvas: HTMLCanvasElement, private camera: Camera) {
    super();
    this.setupEventHandlers();
    this.updateRect();

    this.updateCameraDimensions();

    // Resize listener to update camera and rect
    window.addEventListener("resize", this.updateRect);
  }

  updateCameraDimensions() {
    this.camera.width = this.canvas.width;
    this.camera.height = this.canvas.height;
  }

  get x() {
    return this.lastMouseX;
  }

  get y() {
    return this.lastMouseY;
  }

  private updateRect = () => {
    this.rect = this.canvas.getBoundingClientRect();

    // Update camera dimensions
    this.camera.width = this.canvas.width;
    this.camera.height = this.canvas.height;
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

  private onMouseDown = (event: MouseEvent) => {
    this.isDragging = true;
    this.setXY(event);
    this.canvas.style.cursor = "grabbing";
  };

  private getCanvasPosition(event: MouseEvent) {
    const rect = this.rect;
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
  }

  private onMouseMove = (event: MouseEvent) => {
    if (!this.isDragging) {
      this.setXY(event);
      return;
    }

    const { x, y } = this.getCanvasPosition(event);

    const dx = x - this.lastMouseX;
    const dy = y - this.lastMouseY;

    // Use camera's move method to update position
    this.camera.move(dx, -dy);

    // Set new last mouse position
    this.setXY(event);

    // Emit update event
    this.emit("update");
  };

  private onMouseUp = () => {
    this.isDragging = false;
    this.canvas.style.cursor = "grab";
  };

  private onWheel = (event: WheelEvent) => {
    event.preventDefault();

    const { x, y } = this.getCanvasPosition(event);

    // Use a more consistent zoom factor
    const zoomFactor = event.deltaY > 0 ? 0.99 : 1.01;

    // Zoom around the specific point
    this.camera.zoomAroundPoint(zoomFactor, x, y);

    // Log debug information
    console.log("Wheel Zoom:", {
      zoomFactor,
      screenX: x,
      screenY: y,
      cameraPosition: this.camera.position,
      cameraZoom: this.camera.zoom,
    });

    this.emit("update");
  };

  destroy() {
    const canvas = this.canvas;
    canvas.removeEventListener("mousedown", this.onMouseDown);
    canvas.removeEventListener("mousemove", this.onMouseMove);
    canvas.removeEventListener("mouseup", this.onMouseUp);
    canvas.removeEventListener("mouseleave", this.onMouseUp);
    canvas.removeEventListener("wheel", this.onWheel);

    // Remove resize listener
    window.removeEventListener("resize", this.updateRect);
  }
}
