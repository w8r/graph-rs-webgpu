import {
  describe,
  it,
  expect,
  vi,
  beforeEach,
  afterEach,
  beforeAll,
  afterAll
} from 'vitest';
import { Mouse } from '../../src/handler/mouse';
import { Camera } from '../../src/camera';
import { setupWasmMock } from '../utils/setup_wasm';

describe('Mouse Handler', () => {
  let mouse: Mouse;
  let camera: Camera;
  let canvas: HTMLCanvasElement;

  let cleanup: () => void;

  beforeAll(() => {
    cleanup = setupWasmMock();
  });

  afterAll(() => {
    cleanup();
  });

  beforeEach(() => {
    canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 600;
    camera = new Camera();
    mouse = new Mouse(canvas, camera);
  });

  afterEach(() => {
    mouse.destroy();
    vi.restoreAllMocks();
  });

  it('should handle mouse drag correctly', () => {
    const updateSpy = vi.spyOn(mouse, 'emit');

    // Simulate mouse down
    canvas.dispatchEvent(
      new MouseEvent('mousedown', {
        clientX: 100,
        clientY: 100
      })
    );

    // Simulate mouse move
    canvas.dispatchEvent(
      new MouseEvent('mousemove', {
        clientX: 150,
        clientY: 150
      })
    );

    expect(updateSpy).toHaveBeenCalledWith('update');
    expect(camera.position.x).not.toBe(0);
    expect(camera.position.y).not.toBe(0);
  });

  it('should handle smooth zoom correctly', async () => {
    const updateSpy = vi.spyOn(mouse, 'emit');

    // Simulate wheel event
    canvas.dispatchEvent(
      new WheelEvent('wheel', {
        deltaY: -100
      })
    );

    expect(updateSpy).toHaveBeenCalled();
    expect(camera.zoom).not.toBe(1);
  });
});
