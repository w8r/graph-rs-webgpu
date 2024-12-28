import { GraphData } from "./types";

// Flat array structure for Rust
export class GraphBuffer {
  // Format: [nodeCount, edgeCount, ...nodeData, ...edgeData]
  // Node: [id, x, y, r, colorR, colorG, colorB]
  // Edge: [id, source, target, width, colorR, colorG, colorB]

  static toBuffer(data: GraphData): Float32Array {
    const nodeSize = 7; // id, x, y, r, colorR, colorG, colorB
    const edgeSize = 7; // id, source, target, width, colorR, colorG, colorB

    const buffer = new Float32Array(
      2 + data.nodes.length * nodeSize + data.edges.length * edgeSize
    );

    buffer[0] = data.nodes.length;
    buffer[1] = data.edges.length;

    let offset = 2;

    // Convert nodes
    data.nodes.forEach((node) => {
      const color = this.hexToRgb(node.attributes.color);
      buffer.set(
        [
          node.id,
          node.attributes.x,
          node.attributes.y,
          node.attributes.r,
          color.r / 255,
          color.g / 255,
          color.b / 255,
        ],
        offset
      );
      offset += nodeSize;
    });

    // Convert edges
    data.edges.forEach((edge) => {
      const color = this.hexToRgb(edge.attributes.color);
      buffer.set(
        [
          edge.id,
          edge.source,
          edge.target,
          edge.attributes.width,
          color.r / 255,
          color.g / 255,
          color.b / 255,
        ],
        offset
      );
      offset += edgeSize;
    });

    return buffer;
  }

  private static hexToRgb(hex: string): { r: number; g: number; b: number } {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : { r: 0, g: 0, b: 0 };
  }
}
