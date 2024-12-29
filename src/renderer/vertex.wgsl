#include "types.wgsl"

@binding(0) @group(0) var<uniform> uniforms: Uniforms;

@vertex
fn main(
  // Instance attributes (node data)
  @location(0) id: f32,
  @location(1) node_pos: vec2<f32>,
  @location(2) node_radius: f32,
  @location(3) node_color: vec3<f32>,
  // Vertex attributes (quad)
  @location(4) quad_pos: vec2<f32>,
  @location(5) quad_uv: vec2<f32>
) -> VertexOutput {
  var output: VertexOutput;

  let world_pos = node_pos + (quad_pos * node_radius);

  output.position = uniforms.viewProj * vec4<f32>(world_pos, 0.0, 1.0);
  output.color = node_color;
  output.uv = quad_uv;
  output.radius = node_radius;

  return output;
}

// Node vertex shader
@vertex
fn vs_node(
  @location(0) element_type: f32,
  @location(1) position: vec2<f32>,
  @location(2) radius: f32,
  @location(3) color: vec3<f32>,
  @location(4) quad_pos: vec2<f32>,
  @location(5) quad_uv: vec2<f32>,
) -> VertexOutput {
  var output: VertexOutput;
  let world_pos = position + (quad_pos * radius);
  output.position = uniforms.viewProj * vec4<f32>(world_pos, 0.1, 1.0);
  output.color = color;
  output.uv = quad_uv;
  output.radius = radius;
  return output;
}

// Edge vertex shader
@vertex
fn vs_edge(
  @location(0) element_type: f32,
  @location(1) position: vec2<f32>,
  @location(2) width: f32,
  @location(3) color: vec3<f32>,
) -> VertexOutput {
  var output: VertexOutput;
  output.position = uniforms.viewProj * vec4<f32>(position, 0.5, 1.0);
  output.color = color;
  output.uv = vec2<f32>(0.0);
  output.radius = width;
  return output;
}
