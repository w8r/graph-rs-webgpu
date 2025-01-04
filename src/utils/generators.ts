// src/utils/sierpinski.ts
import { GraphData, Node, Edge } from '../types';

export function generateSierpinskiGraph(depth: number): GraphData {
  const nodes: Node[] = [];
  const edges: Edge[] = [];
  let nextNodeId = 0;
  let nextEdgeId = 0;

  // Initial triangle
  const size = 100; // Size of the outer triangle
  const baseNodes = [
    { x: -size, y: -size / 2, color: '#ff0000' },
    { x: size, y: -size / 2, color: '#00ff00' },
    { x: 0, y: size, color: '#0000ff' }
  ];

  // Add initial triangle nodes
  baseNodes.forEach(({ x, y, color }) => {
    nodes.push({
      id: nextNodeId++,
      attributes: {
        x,
        y,
        r: 5,
        color
      }
    });
  });

  // Connect initial triangle
  for (let i = 0; i < 3; i++) {
    edges.push({
      id: nextEdgeId++,
      source: i,
      target: (i + 1) % 3,
      attributes: {
        width: 0.2,
        color: '#ffffff'
      }
    });
  }

  // Recursive function to add subdivisions
  function subdivide(p1: number, p2: number, p3: number, level: number) {
    if (level === 0) return;

    // Get the positions of the three vertices
    const n1 = nodes[p1].attributes;
    const n2 = nodes[p2].attributes;
    const n3 = nodes[p3].attributes;

    // Calculate midpoints
    const m1 = {
      x: (n1.x + n2.x) / 2,
      y: (n1.y + n2.y) / 2,
      color: '#888888'
    };
    const m2 = {
      x: (n2.x + n3.x) / 2,
      y: (n2.y + n3.y) / 2,
      color: '#888888'
    };
    const m3 = {
      x: (n3.x + n1.x) / 2,
      y: (n3.y + n1.y) / 2,
      color: '#888888'
    };

    // Add midpoint nodes
    const mid1 = nextNodeId++;
    const mid2 = nextNodeId++;
    const mid3 = nextNodeId++;

    nodes.push(
      {
        id: mid1,
        attributes: { ...m1, r: 1 }
      },
      {
        id: mid2,
        attributes: { ...m2, r: 1 }
      },
      {
        id: mid3,
        attributes: { ...m3, r: 1 }
      }
    );

    // Add edges connecting midpoints
    edges.push(
      {
        id: nextEdgeId++,
        source: mid1,
        target: mid2,
        attributes: { width: 0.1, color: '#666666' }
      },
      {
        id: nextEdgeId++,
        source: mid2,
        target: mid3,
        attributes: { width: 0.1, color: '#666666' }
      },
      {
        id: nextEdgeId++,
        source: mid3,
        target: mid1,
        attributes: { width: 0.1, color: '#666666' }
      }
    );

    // Recursively subdivide three new triangles
    subdivide(p1, mid1, mid3, level - 1);
    subdivide(mid1, p2, mid2, level - 1);
    subdivide(mid3, mid2, p3, level - 1);
  }

  // Start subdivision
  subdivide(0, 1, 2, depth);

  return { nodes, edges };
}
