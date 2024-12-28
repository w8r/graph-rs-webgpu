import { describe, it, expect } from "vitest";
import { GraphBuffer } from "../src/graph_buffer";

describe("Graph Data Processing", () => {
  const sampleData = {
    nodes: [
      { id: 0, attributes: { x: 0, y: 0, r: 5, color: "#ff0000" } },
      { id: 1, attributes: { x: 10, y: 10, r: 3, color: "#00ff00" } },
    ],
    edges: [
      {
        id: 0,
        source: 0,
        target: 1,
        attributes: { width: 1, color: "#0000ff" },
      },
    ],
  };

  it("converts graph data to float buffer", () => {
    const buffer = GraphBuffer.toBuffer(sampleData);
    expect(buffer[0]).toBe(2); // node count
    expect(buffer[1]).toBe(1); // edge count

    // First node
    expect(buffer[2]).toBe(0); // id
    expect(buffer[3]).toBe(0); // x
    expect(buffer[4]).toBe(0); // y
    expect(buffer[5]).toBe(5); // r
    expect(buffer[6]).toBeCloseTo(1); // red
    expect(buffer[7]).toBe(0); // green
    expect(buffer[8]).toBe(0); // blue
  });
});
