import { defineConfig } from "vite";
import { ViteRsw as rsw } from "vite-plugin-rsw";
import raw from "vite-raw-plugin";

export default defineConfig({
  plugins: [rsw(), raw({ fileRegex: /\.wgsl$/ })],
  build: {
    target: "esnext",
  },
});
