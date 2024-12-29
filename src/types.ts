export interface NodeAttributes {
  x: number;
  y: number;
  r: number;
  color: string;
}

export interface EdgeAttributes {
  width: number;
  color: string;
}

export interface Node {
  id: number;
  attributes: NodeAttributes;
}

export interface Edge {
  id: number;
  source: number;
  target: number;
  attributes: EdgeAttributes;
}

export interface GraphData {
  nodes: Node[];
  edges: Edge[];
}

export type Point = { x: number; y: number };
