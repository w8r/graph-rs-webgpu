
struct Node {
  id: u32,    // offset 0
  pos: vec2f, // offset 4
  radius: f32,// offset 12
  color: vec3f// offset 16
}

@vertex
fn main(@location(0) pos: vec2<f32>, @location(1) color: vec3<f32>) -> @builtin(position) vec4<f32> {
  // Much larger scale
  return vec4<f32>(pos * 0.2, 0.0, 1.0); // Try 0.2 instead of 0.5
}
