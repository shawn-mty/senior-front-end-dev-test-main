import { defineVitestConfig } from "@nuxt/test-utils/config";

export default defineVitestConfig({
  test: {
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
