export interface BufferStats {
  size: number;
  usage: GPUBufferUsageFlags;
  timeCreated: number;
  timesReused: number;
}

export class BufferPool {
  private pools: Map<number, GPUBuffer[]> = new Map();
  private device: GPUDevice;
  private stats: Map<GPUBuffer, BufferStats> = new Map();
  private totalAllocated = 0;
  private totalReused = 0;

  constructor(device: GPUDevice) {
    this.device = device;
  }

  // Get nearest power of 2 for size bucketing
  private getNearestSize(size: number): number {
    return Math.pow(2, Math.ceil(Math.log2(size)));
  }

  public acquireBuffer(
    requestedSize: number,
    usage: GPUBufferUsageFlags
  ): GPUBuffer {
    const size = this.getNearestSize(requestedSize);
    const pool = this.pools.get(size) || [];

    if (pool.length > 0) {
      const buffer = pool.pop()!;
      const stats = this.stats.get(buffer)!;
      stats.timesReused++;
      this.totalReused++;
      return buffer;
    }

    this.totalAllocated++;
    const buffer = this.device.createBuffer({
      size,
      usage
    });

    this.stats.set(buffer, {
      size,
      usage,
      timeCreated: Date.now(),
      timesReused: 0
    });

    return buffer;
  }

  public releaseBuffer(buffer: GPUBuffer) {
    const size = buffer.size;
    if (!this.pools.has(size)) this.pools.set(size, []);
    this.pools.get(size)!.push(buffer);
  }

  public cleanupUnused(maxAgeMs: number = 30000) {
    const now = Date.now();
    for (const [size, buffers] of this.pools) {
      const stillUseful = buffers.filter((buffer) => {
        const stats = this.stats.get(buffer)!;
        if (now - stats.timeCreated > maxAgeMs) {
          buffer.destroy();
          this.stats.delete(buffer);
          return false;
        }
        return true;
      });
      this.pools.set(size, stillUseful);
    }
  }

  public cleanup() {
    for (const [_, buffers] of this.pools) {
      buffers.forEach((buffer) => buffer.destroy());
    }
    this.pools.clear();
    this.totalAllocated = 0;
    this.totalReused = 0;
  }

  public getPoolStats() {
    const poolSizes = Array.from(this.pools.entries()).map(
      ([size, buffers]) => ({
        size,
        availableCount: buffers.length,
        totalMemory: size * buffers.length
      })
    );

    const bufferStats = Array.from(this.stats.entries()).map(([_, stats]) => ({
      size: stats.size,
      timesReused: stats.timesReused,
      ageMs: Date.now() - stats.timeCreated
    }));

    return {
      pools: poolSizes,
      totalBuffers: this.stats.size,
      totalAllocated: this.totalAllocated,
      totalReused: this.totalReused,
      totalMemory: poolSizes.reduce((sum, pool) => sum + pool.totalMemory, 0),
      bufferStats,
      averageReuse: this.totalReused / this.stats.size || 0
    };
  }
}
