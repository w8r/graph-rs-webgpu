#include "types.wgsl"

@fragment
fn main(in: VertexOutput) -> @location(0) vec4<f32> {
  let dist = length(in.uv * 2.0 - 1.0);
  let circle = 1.0 - smoothstep(0.8, 1.0, dist);
  return vec4<f32>(in.color, circle);
}
