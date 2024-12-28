#include "types.wgsl"

@fragment
fn main(in: VertexOutput) -> @location(0) vec4<f32> {
  let dist = length(in.center);
  let circle = 1.0 - smoothstep(in.radius - 0.01, in.radius + 0.01, dist);
  return vec4<f32>(in.color, circle);
}
