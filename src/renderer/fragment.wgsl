#include "types.wgsl"

@fragment
fn main(in: VertexOutput) -> @location(0) vec4<f32> {
  // Convert UV from [0,1] to [-1,1] range
  let uv = in.uv * 2.0 - 1.0;

  // Calculate distance from center (0,0)
  let dist = length(uv);

  // Smooth circle with anti-aliasing
  let alpha = 1.0 - smoothstep(0.9, 1.0, dist);

  return vec4<f32>(in.color, alpha);
  //return vec4<f32>(in.uv.x, in.uv.y, 0.0, 1.0);
  //return vec4<f32>(in.color, 1.0); // Solid color first
  // let dist = length(in.uv * 2.0 - 1.0);
  // let circle = 1.0 - smoothstep(0.8, 1.0, dist);
  // return vec4<f32>(in.color, circle);
}
