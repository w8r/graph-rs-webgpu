#include "types.wgsl"

@fragment
fn main(in: VertexOutput) -> @location(0) vec4<f32> {
  // Convert UV from [0,1] to [-1,1] range
  let uv = in.uv * 2.0 - 1.0;

  // Calculate distance from center (0,0)
  let dist = length(uv);

  // Smooth circle with anti-aliasing
  let edgeWidth = 0.1 / in.radius;  // Adjust the 0.5 factor to taste
  let alpha = 1.0 - smoothstep(1. - edgeWidth, 1.0, dist);

  return vec4<f32>(in.color, alpha);
}


// Fragment shaders
@fragment
fn fs_node(in: VertexOutput) -> @location(0) vec4<f32> {
    let uv = in.uv * 2.0 - 1.0;
    let dist = length(uv);
    let edgeWidth = 0.05 / in.radius;
    let alpha = 1.0 - smoothstep(1.0 - edgeWidth, 1.0, dist);
    return vec4<f32>(in.color, alpha);
}

@fragment
fn fs_edge(in: VertexOutput) -> @location(0) vec4<f32> {
   return vec4<f32>(in.color, 1.0);
}
