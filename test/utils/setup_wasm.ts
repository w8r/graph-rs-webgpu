// test/utils/setup-wasm.ts
import { readFileSync } from 'fs';
import { join } from 'path';
import { vi } from 'vitest';

export function setupWasmMock() {
  const wasmBuffer = readFileSync(
    join(__dirname, '../../lib/pkg/webgpu_graph_renderer_bg.wasm')
  );

  // Store original fetch if it exists
  const originalFetch = global.fetch;

  // Mock fetch
  // @ts-expect-error global fetch
  global.fetch = vi.fn((url: string | URL) => {
    if (
      (typeof url === 'string' && url.endsWith('.wasm')) ||
      (url instanceof URL && url.pathname.endsWith('.wasm'))
    ) {
      return Promise.resolve(wasmBuffer) as unknown as Response;
    }
    // Fall back to original fetch for non-wasm requests
    return originalFetch(url);
  });

  return () => {
    global.fetch = originalFetch; // Cleanup function
  };
}
