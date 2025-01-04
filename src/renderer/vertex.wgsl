#include "types.wgsl"

@binding(0) @group(0) var<uniform> uniforms: Uniforms;


// Node vertex shader
@vertex
fn vs_node(
  @location(0) element_type: f32,
  @location(1) position: vec2<f32>,
  @location(2) radius: f32,
  @location(3) color: vec3<f32>,
  @location(4) quad_pos: vec2<f32>,
  @location(5) quad_uv: vec2<f32>,
  @builtin(instance_index) instance_index: u32,
) -> VertexOutput {
  var output: VertexOutput;
  let world_pos = position + (quad_pos * radius);

  // Convert instance index to normalized depth
  // Using a large divisor to get small depth differences
  let depth = f32(instance_index) / 10000.0;

  output.position = uniforms.viewProj * vec4<f32>(world_pos, depth, 1.0);
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
  @builtin(instance_index) instance_index: u32,
) -> VertexOutput {
  var output: VertexOutput;

  let edge_vector = targetXY - sourceXY;
  // Calculate perpendicular vector
  let perp = normalize(vec2<f32>(-edge_vector.y, edge_vector.x));
  let depth = (f32(instance_index) + 10000.0) / 20000.0;

  // Position along edge + perpendicular offset scaled by width
  let pos = sourceXY + edge_vector * position.x + perp * position.y * width;

  output.position = uniforms.viewProj * vec4<f32>(pos, depth, 1.0);
  output.color = color;

  return output;
}
