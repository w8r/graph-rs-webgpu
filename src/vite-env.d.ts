/// <reference types="vite/client" />
/// <reference types="@webgpu/types" />

declare module "*.wgsl" {
  const shader: string;
  export default shader;
}
