import { Point } from "./types";

export class Camera {
  position: Point = { x: 0, y: 0 };
  zoom: number = 1;
  width: number = 0;
  height: number = 0;
  maxZoom: number = 10;
  minZoom: number = 0.1;

  zoomAroundPoint(zoomFactor: number, screenX: number, screenY: number) {
    const worldPointBefore = this.screenToWorld(screenX, screenY);

    this.zoom = Math.min(
      this.maxZoom,
      Math.max(this.minZoom, this.zoom * zoomFactor)
    );

    const worldPointAfter = this.screenToWorld(screenX, screenY);

    this.position.x += worldPointBefore.x - worldPointAfter.x;
    this.position.y += worldPointBefore.y - worldPointAfter.y;
  }

  move(dx: number, dy: number) {
    this.position.x -= dx / this.zoom;
    this.position.y -= dy / this.zoom;
  }

  worldToScreen(worldX: number, worldY: number): Point {
    return {
      x: (worldX - this.position.x) * this.zoom + this.width / 2,
      y: this.height / 2 - (worldY - this.position.y) * this.zoom,
    };
  }

  screenToWorld(screenX: number, screenY: number): Point {
    return {
      x: (screenX - this.width / 2) / this.zoom + this.position.x,
      y: -(screenY - this.height / 2) / this.zoom + this.position.y,
    };
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
