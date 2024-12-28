struct Uniforms {
  viewProj: mat4x4<f32>,
}
@binding(0) @group(0) var<uniform> uniforms: Uniforms;

@vertex
fn main(
  @location(0) id: f32,
  @location(1) position: vec2<f32>,
  @location(2) radius: f32,
  @location(3) color: vec3<f32>
) -> @builtin(position) vec4<f32> {
  return uniforms.viewProj * vec4<f32>(position, 0.0, 1.0);
}
