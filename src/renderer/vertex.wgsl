#include "types.wgsl"

@binding(0) @group(0) var<uniform> uniforms: Uniforms;

@vertex
fn main(
  @location(0) id: f32,
  @location(1) position: vec2<f32>,
  @location(2) radius: f32,
  @location(3) color: vec3<f32>
) -> VertexOutput {
  var output: VertexOutput;
  // Transform position
  output.position = uniforms.viewProj * vec4<f32>(position, 0.0, 1.0);
  // Pass through other attributes
  output.radius = radius * uniforms.viewProj[0][0]; // Scale radius with view matrix
  output.color = color;
  output.center = output.position.xy; // Store center for fragment shader
  return output;
}
