export class Camera {
  position: { x: number; y: number } = { x: 0, y: 0 };
  zoom: number = 1;
  width: number = 0;
  height: number = 0;
  maxZoom: number = 10;
  minZoom: number = 0.1;

  zoomAroundPoint(zoomFactor: number, screenX: number, screenY: number) {
    // Get the world point before zooming
    const worldPointBefore = this.screenToWorld(screenX, screenY);

    // Apply zoom
    this.zoom *= zoomFactor;

    // Get the world point after zooming
    const worldPointAfter = this.screenToWorld(screenX, screenY);

    // Adjust camera position to keep the point fixed
    this.position.x += worldPointBefore.x - worldPointAfter.x;
    this.position.y += worldPointBefore.y - worldPointAfter.y;
  }

  move(dx: number, dy: number) {
    // Adjust movement based on current zoom
    this.position.x -= dx / this.zoom;
    this.position.y -= dy / this.zoom;
  }

  getScale() {
    return this.maxZoom / this.zoom;
  }

  worldToScreen(worldX: number, worldY: number): { x: number; y: number } {
    // Apply current zoom and camera position
    const screenX = (worldX - this.position.x) * this.zoom + this.width / 2;
    const screenY = this.height / 2 - (worldY - this.position.y) * this.zoom;

    return { x: screenX, y: screenY };
  }

  // Conversion from screen space to world space
  screenToWorld(screenX: number, screenY: number): { x: number; y: number } {
    // Adjust coordinates to be centered
    const centerX = screenX - this.width / 2;
    const centerY = screenY - this.height / 2;

    // Apply current zoom and camera position
    const worldX = centerX / this.zoom + this.position.x;
    const worldY = -centerY / this.zoom + this.position.y;

    return { x: worldX, y: worldY };
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
