import { Point } from "./types";

export class Camera {
  position: Point = { x: 0, y: 0 };
  zoom: number = 1;
  width: number = 0;
  height: number = 0;
  maxZoom: number = 10;
  minZoom: number = 0.1;

  zoomAroundPoint(zoomFactor: number, screenX: number, screenY: number) {
    // Compute and clamp the proposed new zoom level
    const newZoom = Math.max(
      this.minZoom,
      Math.min(this.maxZoom, this.zoom * zoomFactor)
    );

    // Convert the screen point to world coordinates
    const worldX = this.position.x + (screenX - this.width / 2) * this.zoom;
    const worldY = this.position.y - (screenY - this.height / 2) * this.zoom;

    // Adjust the camera position to keep the world point under the mouse cursor
    const zoomRatio = newZoom / this.zoom;
    this.position.x = worldX - (worldX - this.position.x) * zoomRatio;
    this.position.y = worldY - (worldY - this.position.y) * zoomRatio;

    // Update the zoom
    this.zoom = newZoom;
  }

  move(dx: number, dy: number) {
    this.position.x -= dx * this.zoom;
    this.position.y -= dy * this.zoom;
  }

  getScale() {
    return (this.zoom * Math.min(this.width, this.height)) / 2;
  }

  getViewProjMatrix(aspect: number): Float32Array {
    const scale = this.getScale();
    // prettier-ignore
    return new Float32Array([
      1 / (scale * aspect),                                       0, 0, 0,
      0,                                                  1 / scale, 0, 0,
      0,                                                          0, 1, 0,
      -this.position.x / (scale * aspect), -this.position.y / scale, 0, 1
    ]);
  }

  debugState() {
    console.log("Camera State:", {
      position: this.position,
      zoom: this.zoom,
      width: this.width,
      height: this.height,
    });
  }
}
