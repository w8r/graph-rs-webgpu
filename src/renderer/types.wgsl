struct Uniforms {
  viewProj: mat4x4<f32>,
}

struct VertexOutput {
  @builtin(position) position: vec4<f32>,
  @location(0) radius: f32,
  @location(1) color: vec3<f32>,
  @location(2) uv: vec2<f32>
}
