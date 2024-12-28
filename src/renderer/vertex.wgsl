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

  // Scale quad by radius and position it at node center
  let world_pos = node_pos + (quad_pos * node_radius);
  output.position = uniforms.viewProj * vec4<f32>(world_pos, 0.0, 1.0);

  output.radius = node_radius;
  output.color = node_color;
  output.uv = quad_uv;
  return output;
}
