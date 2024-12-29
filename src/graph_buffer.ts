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
      const color = parseHexColor(node.attributes.color)!;
      console.log(color);
      buffer.set(
        [
          node.id,
          node.attributes.x,
          node.attributes.y,
          node.attributes.r,
          color.r,
          color.g,
          color.b,
        ],
        offset
      );
      offset += nodeSize;
    });

    // Convert edges
    data.edges.forEach((edge) => {
      const color = parseHexColor(edge.attributes.color)!;
      buffer.set(
        [
          edge.id,
          edge.source,
          edge.target,
          edge.attributes.width,
          color.r,
          color.g,
          color.b,
        ],
        offset
      );
      offset += edgeSize;
    });

    return buffer;
  }
}

function parseHexColor(
  hex: string
): { r: number; g: number; b: number } | null {
  if (!hex || (hex.length !== 4 && hex.length !== 7) || hex[0] !== "#") {
    return null; // Invalid format
  }

  let r: string, g: string, b: string;

  if (hex.length === 4) {
    // #rgb format
    r = hex[1] + hex[1];
    g = hex[2] + hex[2];
    b = hex[3] + hex[3];
  } else {
    // #rrggbb format
    r = hex.substring(1, 3);
    g = hex.substring(3, 5);
    b = hex.substring(5, 7);
  }

  try {
    const red = parseInt(r, 16) / 255;
    const green = parseInt(g, 16) / 255;
    const blue = parseInt(b, 16) / 255;

    if (isNaN(red) || isNaN(green) || isNaN(blue)) return null;

    return { r: red, g: green, b: blue };
  } catch (error) {
    return null; // Parsing error
  }
}
