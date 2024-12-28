@fragment
fn main(@builtin(position) pos: vec4<f32>) -> @location(0) vec4<f32> {
  let dist = length(pos.xy);
  // Much larger radius
  //let circle = 1.0 - smoothstep(100.0, 110.0, dist);
  //return vec4<f32>(1.0, 0.0, 0.0, circle);
  // return vec4<f32>(
  //   (pos.x / 1000.0) + 0.5,  // R
  //   (pos.y / 1000.0) + 0.5,  // G
  //   0.0,                        // B
  //   1.0
  // );

  return vec4<f32>(1.0, 0.0, 0.0, 1.0);  // Bright red
  //return vec4<f32>(1.0, 0.0, 0.0, 1.0);
}
