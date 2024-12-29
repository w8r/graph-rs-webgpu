use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub struct Graph {
    nodes: Vec<Node>,
    edges: Vec<Edge>,
}

#[derive(Clone)]
struct Node {
    id: u32,
    x: f32,
    y: f32,
    r: f32,
    color: [f32; 3],
}

#[derive(Clone)]
struct Edge {
    id: u32,
    source: u32,
    target: u32,
    width: f32,
    color: [f32; 3],
}

#[wasm_bindgen]
impl Graph {
    #[wasm_bindgen(constructor)]
    pub fn new(buffer: &[f32]) -> Graph {
        let node_count = buffer[0] as usize;
        let edge_count = buffer[1] as usize;

        let mut nodes = Vec::with_capacity(node_count);
        let mut edges = Vec::with_capacity(edge_count);

        let mut offset = 2;

        // Parse nodes
        for _ in 0..node_count {
            nodes.push(Node {
                id: buffer[offset] as u32,
                x: buffer[offset + 1],
                y: buffer[offset + 2],
                r: buffer[offset + 3],
                color: [buffer[offset + 4], buffer[offset + 5], buffer[offset + 6]],
            });
            offset += 7;
        }

        // Parse edges
        for _ in 0..edge_count {
            edges.push(Edge {
                id: buffer[offset] as u32,
                source: buffer[offset + 1] as u32,
                target: buffer[offset + 2] as u32,
                width: buffer[offset + 3],
                color: [buffer[offset + 4], buffer[offset + 5], buffer[offset + 6]],
            });
            offset += 7;
        }

        Graph { nodes, edges }
    }

    pub fn add_node(&mut self, id: u32, x: f32, y: f32, r: f32, color: &[f32]) -> bool {
        if self.nodes.iter().any(|n| n.id == id) {
            return false;
        }
        self.nodes.push(Node {
            id,
            x,
            y,
            r,
            color: [color[0], color[1], color[2]],
        });
        true
    }

    pub fn add_edge(&mut self, id: u32, source: u32, target: u32, width: f32, color: &[f32]) -> bool {
        if self.edges.iter().any(|e| e.id == id) {
            return false;
        }
        self.edges.push(Edge {
            id,
            source,
            target,
            width,
            color: [color[0], color[1], color[2]],
        });
        true
    }

    pub fn update_node(&mut self, id: u32, x: f32, y: f32, r: f32, color: &[f32]) -> bool {
        if let Some(node) = self.nodes.iter_mut().find(|n| n.id == id) {
            node.x = x;
            node.y = y;
            node.r = r;
            node.color = [color[0], color[1], color[2]];
            true
        } else {
            false
        }
    }

    pub fn update_edge(&mut self, id: u32, width: f32, color: &[f32]) -> bool {
        if let Some(edge) = self.edges.iter_mut().find(|e| e.id == id) {
            edge.width = width;
            edge.color = [color[0], color[1], color[2]];
            true
        } else {
            false
        }
    }

    pub fn remove_node(&mut self, id: u32) -> bool {
        let initial_len = self.nodes.len();
        self.nodes.retain(|n| n.id != id);
        self.edges.retain(|e| e.source != id && e.target != id);
        initial_len != self.nodes.len()
    }

    pub fn remove_edge(&mut self, id: u32) -> bool {
        let initial_len = self.edges.len();
        self.edges.retain(|e| e.id != id);
        initial_len != self.edges.len()
    }

    pub fn get_nodes(&self) -> js_sys::Float32Array {
        let mut data = Vec::with_capacity(self.nodes.len() * 7);
        for node in &self.nodes {
            data.extend_from_slice(&[
                node.id as f32,
                node.x,
                node.y,
                node.r,
                node.color[0],
                node.color[1],
                node.color[2],
            ]);
        }
        unsafe { js_sys::Float32Array::view(&data) }
    }

    pub fn get_edges(&self) -> js_sys::Float32Array {
        let mut data = Vec::with_capacity(self.edges.len() * 7);
        for edge in &self.edges {
            data.extend_from_slice(&[
                edge.id as f32,
                edge.source as f32,
                edge.target as f32,
                edge.width,
                edge.color[0],
                edge.color[1],
                edge.color[2],
            ]);
        }
        unsafe { js_sys::Float32Array::view(&data) }
    }

    pub fn node_count(&self) -> usize {
      self.nodes.len()
    }

    pub fn edge_count(&self) -> usize {
      self.edges.len()
    }

    pub fn get_buffer(&self) -> js_sys::Float32Array {
        let mut buffer = Vec::with_capacity((self.nodes.len() + self.edges.len()) * 7);

        // Add nodes (type = 0)
        for node in &self.nodes {
            buffer.extend_from_slice(&[
                0.0,    // type identifier for node
                node.x,
                node.y,
                node.r,
                node.color[0],
                node.color[1],
                node.color[2]
            ]);
        }

        // Add edges (type = 1)
        for edge in &self.edges {
            if let (Some(source), Some(target)) = (
                self.nodes.iter().find(|n| n.id == edge.source),
                self.nodes.iter().find(|n| n.id == edge.target)
            ) {
                buffer.extend_from_slice(&[
                    1.0,            // type (edge)
                    source.x,       // source x
                    source.y,       // source y
                    target.x,       // target x
                    target.y,       // target y
                    edge.width,
                    edge.color[0],
                    edge.color[1],
                    edge.color[2]
                ]);
            }
        }

        unsafe { js_sys::Float32Array::view(&buffer) }
    }

    // We'll still need these for counting draw calls
    pub fn get_total_elements(&self) -> usize {
        self.nodes.len() + self.edges.len()
    }

    pub fn get_buffer_info(&self) -> js_sys::Array {
        let nodes_offset = 0;
        let nodes_size = self.nodes.len() * 7;
        let edges_offset = nodes_size;

        let result = js_sys::Array::new();
        result.push(&JsValue::from(nodes_offset));
        result.push(&JsValue::from(edges_offset));
        result.push(&JsValue::from(self.edges.len()));

        result
    }

    pub fn get_edges_offset(&self) -> usize {
        self.nodes.len() * 7  // each node has 7 floats
    }
}
