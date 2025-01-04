import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    environmentMatchGlobs: [
      // Tests that need jsdom
      ["**/*.dom.test.ts", "jsdom"],
      // All other tests use node environment
      ["**/*.test.ts", "node"],
    ],
    globals: true,
  },
});
