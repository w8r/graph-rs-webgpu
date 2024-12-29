import { defineConfig } from "vite";
import { ViteRsw as rsw } from "vite-plugin-rsw";

export default defineConfig({
  base: "./",
  plugins: [rsw()],
  build: {
    target: "esnext",
  },
});
