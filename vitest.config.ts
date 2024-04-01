import { defineVitestConfig } from "@nuxt/test-utils/config";

export default defineVitestConfig({
  test: {
    setupFiles: ["tests/setup.ts"],
    include: ["tests/components/**.ts"],
    globals: true,
    environment: "nuxt",
    environmentOptions: {
      nuxt: {
        domEnvironment: "jsdom",
      },
    },
  },
  resolve: {
    alias: {
      "@": ".",
    },
  },
});
