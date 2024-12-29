import init, { Graph } from "../lib/pkg";
import { GraphBuffer } from "./graph_buffer";
import { Renderer } from "./renderer/webgpu";
import { GraphData } from "./types";
import "./styles.css";

const x = await init();

console.log(x);

const resp = await fetch("test/fixtures/triangle.json");
const initialData = (await resp.json()) as GraphData;

const buffer = GraphBuffer.toBuffer(initialData);
const graph = new Graph(buffer);

// console.log(graph.add_node(5, 15, 15, 4, [0.5, 0.5, 0.5]));
// console.log(graph.add_node(6, 15, 15, 4, [0.5, 0.5, 0.5]));
// const nodes = graph.get_nodes();
// const edges = graph.get_edges();

// console.log(graph.node_count(), graph.edge_count());

// graph.remove_node(6);
console.log(graph.node_count(), graph.edge_count(), graph.get_nodes());

const canvas = document.querySelector("canvas")!;
const renderer = new Renderer(canvas, graph);
await renderer.init();
renderer.draw();
