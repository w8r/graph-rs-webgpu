import { describe, it, expect, beforeAll } from 'vitest';
import init, { Graph } from '../lib/pkg';
import { GraphBuffer } from '../src/graph_buffer';
import path from 'path';
import fs from 'fs';

const toColor = (rgb: number[]) => new Float32Array(rgb);

describe('Graph CRUD Operations', () => {
  const initialData = {
    nodes: [
      { id: 0, attributes: { x: 0, y: 0, r: 5, color: '#ff0000' } },
      { id: 1, attributes: { x: 10, y: 10, r: 3, color: '#00ff00' } }
    ],
    edges: [
      {
        id: 0,
        source: 0,
        target: 1,
        attributes: { width: 1, color: '#0000ff' }
      }
    ]
  };

  beforeAll(async () => {
    const wasmPath = path.resolve(
      __dirname,
      '../lib/pkg/webgpu_graph_renderer_bg.wasm'
    );
    const wasmBuffer = fs.readFileSync(wasmPath);
    await init({ module_or_path: wasmBuffer });
  });

  it('creates graph from buffer', () => {
    const buffer = GraphBuffer.toBuffer(initialData);
    const graph = new Graph(buffer);
    const nodes = graph.get_nodes();
    const edges = graph.get_edges();

    expect(nodes.length).toBe(14); // 2 nodes * 7 values
    expect(edges.length).toBe(7); // 1 edge * 7 values
  });

  it('adds a new node', () => {
    const buffer = GraphBuffer.toBuffer(initialData);
    const graph = new Graph(buffer);

    const result = graph.add_node(2, 15, 15, 4, toColor([0.5, 0.5, 0.5]));
    expect(result).toBe(true);

    const nodes = graph.get_nodes();
    expect(nodes.length).toBe(21); // 3 nodes * 7 values
  });

  it('prevents duplicate node ids', () => {
    const buffer = GraphBuffer.toBuffer(initialData);
    const graph = new Graph(buffer);

    const result = graph.add_node(0, 15, 15, 4, toColor([0.5, 0.5, 0.5]));
    expect(result).toBe(false);
  });

  it('adds a new edge', () => {
    const buffer = GraphBuffer.toBuffer(initialData);
    const graph = new Graph(buffer);

    const result = graph.add_edge(1, 0, 1, 2, toColor([0.7, 0.7, 0.7]));
    expect(result).toBe(true);

    const edges = graph.get_edges();
    expect(edges.length).toBe(14); // 2 edges * 7 values
  });

  it('updates node attributes', () => {
    const buffer = GraphBuffer.toBuffer(initialData);
    const graph = new Graph(buffer);

    const result = graph.update_node(0, 5, 5, 6, toColor([1, 0, 0]));
    expect(result).toBe(true);

    const nodes = graph.get_nodes();
    expect(nodes[3]).toBe(6); // radius
    expect(nodes[4]).toBe(1); // red
    expect(nodes[5]).toBe(0); // green
  });

  it('updates edge attributes', () => {
    const buffer = GraphBuffer.toBuffer(initialData);
    const graph = new Graph(buffer);

    const result = graph.update_edge(0, 2, toColor([0, 1, 0]));
    expect(result).toBe(true);

    const edges = graph.get_edges();
    expect(edges[3]).toBe(2); // width
    expect(edges[4]).toBe(0); // red
    expect(edges[5]).toBe(1); // green
  });

  it('removes a node and its connected edges', () => {
    const buffer = GraphBuffer.toBuffer(initialData);
    const graph = new Graph(buffer);

    const result = graph.remove_node(0);
    expect(result).toBe(true);

    const nodes = graph.get_nodes();
    const edges = graph.get_edges();

    expect(nodes.length).toBe(7); // 1 node * 7 values
    expect(edges.length).toBe(0); // edge should be removed as it was connected
  });

  it('removes an edge', () => {
    const buffer = GraphBuffer.toBuffer(initialData);
    const graph = new Graph(buffer);

    const result = graph.remove_edge(0);
    expect(result).toBe(true);

    const edges = graph.get_edges();
    expect(edges.length).toBe(0);
  });

  it('handles invalid updates', () => {
    const buffer = GraphBuffer.toBuffer(initialData);
    const graph = new Graph(buffer);

    expect(graph.update_node(999, 0, 0, 0, toColor([0, 0, 0]))).toBe(false);
    expect(graph.update_edge(999, 0, toColor([0, 0, 0]))).toBe(false);
    expect(graph.remove_node(999)).toBe(false);
    expect(graph.remove_edge(999)).toBe(false);
  });

  it('counts nodes and edges', () => {
    const buffer = GraphBuffer.toBuffer({
      nodes: [
        { id: 0, attributes: { x: 0, y: 0, r: 5, color: '#ff0000' } },
        { id: 1, attributes: { x: 10, y: 10, r: 3, color: '#00ff00' } }
      ],
      edges: [
        {
          id: 0,
          source: 0,
          target: 1,
          attributes: { width: 1, color: '#0000ff' }
        }
      ]
    });

    const graph = new Graph(buffer);
    expect(graph.node_count()).toBe(2);
    graph.add_node(2, 15, 15, 4, toColor([0.5, 0.5, 0.5]));
    expect(graph.node_count()).toBe(3);
    expect(graph.edge_count()).toBe(1);
  });
});
