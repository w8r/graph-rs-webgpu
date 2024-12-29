export class Camera {
  position: { x: number; y: number } = { x: 0, y: 0 };
  zoom: number = 1;

  getViewProjMatrix(aspect: number): Float32Array {
    const max = 50 / this.zoom;
    // prettier-ignore
    return new Float32Array([
      1 / (max * aspect), 0, 0, 0,
      0, 1 / max, 0, 0,
      0, 0, 1, 0,
      -this.position.x / (max * aspect), -this.position.y / max, 0, 1
    ]);
  }
}
