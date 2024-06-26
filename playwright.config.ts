import { fileURLToPath } from "node:url";
import { defineConfig, devices } from "@playwright/test";
import type { ConfigOptions } from "@nuxt/test-utils/playwright";

const devicesToTest = ["Desktop Chrome"] satisfies Array<
  string | (typeof devices)[string]
>;

/* See https://playwright.dev/docs/test-configuration.*/
export default defineConfig<ConfigOptions>({
  testDir: "./tests/e2e",
  fullyParallel: true,
  reporter: "html",
  use: {
    trace: "on-first-retry",
    nuxt: {
      rootDir: fileURLToPath(new URL(".", import.meta.url)),
    },
  },
  projects: devicesToTest.map((p) =>
    typeof p === "string" ? { name: p, use: devices[p] } : p,
  ),
  webServer: {
    command: "npm run dev",
    port: 3000,
    reuseExistingServer: true,
  },
});
