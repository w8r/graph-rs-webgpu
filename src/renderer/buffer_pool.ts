export class BufferPool {
  private pools: Map<number, GPUBuffer[]> = new Map();
  private device: GPUDevice;

  constructor(device: GPUDevice) {
    this.device = device;
  }

  // Get nearest power of 2 for size bucketing
  private getNearestSize(size: number): number {
    return Math.pow(2, Math.ceil(Math.log2(size)));
  }

  acquireBuffer(requestedSize: number, usage: GPUBufferUsageFlags): GPUBuffer {
    const size = this.getNearestSize(requestedSize);
    const pool = this.pools.get(size) || [];

    if (pool.length > 0) {
      return pool.pop()!;
    }

    // Create new buffer if pool is empty
    return this.device.createBuffer({
      size,
      usage
    });
  }

  releaseBuffer(buffer: GPUBuffer) {
    const size = buffer.size;
    if (!this.pools.has(size)) {
      this.pools.set(size, []);
    }
    this.pools.get(size)!.push(buffer);
  }

  cleanup() {
    for (const [_, buffers] of this.pools) {
      buffers.forEach((buffer) => buffer.destroy());
    }
    this.pools.clear();
  }
}
