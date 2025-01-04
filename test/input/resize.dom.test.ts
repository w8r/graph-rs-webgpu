import {
  describe,
  it,
  expect,
  vi,
  beforeEach,
  beforeAll,
  afterAll
} from 'vitest';
import { setupWasmMock } from '../utils/setup_wasm';
import { GraphViewer } from '../../src';

describe('Resize Handling', () => {
  let viewer: GraphViewer;
  let canvas: HTMLCanvasElement;
  let resizeObserver: ResizeObserver;

  let cleanup: () => void;

  beforeAll(() => {
    cleanup = setupWasmMock();
  });

  afterAll(() => {
    cleanup();
  });

  beforeEach(async () => {
    canvas = document.createElement('canvas');
    // Mock ResizeObserver
    global.ResizeObserver = vi.fn((callback) => {
      resizeObserver = {
        observe: vi.fn(),
        unobserve: vi.fn(),
        disconnect: vi.fn()
      };
      return resizeObserver;
    });

    viewer = new GraphViewer(canvas);
    await viewer.init();
  });

  it('should observe canvas resize', () => {
    expect(resizeObserver.observe).toHaveBeenCalledWith(canvas);
  });

  it('should update size correctly', async () => {
    viewer.updateSize(1000, 800);
    expect(canvas.width).toBe(1000);
    expect(canvas.height).toBe(800);
    expect(viewer['camera'].width).toBe(1000);
    expect(viewer['camera'].height).toBe(800);
  });
});
