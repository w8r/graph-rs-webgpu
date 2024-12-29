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
  @location(0) type_id: f32,
  @location(1) sourceXY: vec2<f32>,
  @location(2) targetXY: vec2<f32>,
  @location(3) width: f32,
  @location(4) color: vec3<f32>,
  @location(5) position: vec2<f32>, // x=progress along line, y=side offset
) -> VertexOutput {
  var output: VertexOutput;

  let edge_vector = targetXY - sourceXY;
  // Calculate perpendicular vector
  let perp = normalize(vec2<f32>(-edge_vector.y, edge_vector.x));

  // Position along edge + perpendicular offset scaled by width
  let pos = sourceXY + edge_vector * position.x + perp * position.y * width;

  output.position = uniforms.viewProj * vec4<f32>(pos, 0.5, 1.0);
  output.color = color;

  return output;
}
