import { expect, test } from "@nuxt/test-utils/playwright";

test("test", async ({ page, goto }: { page: any; goto: any }) => {
  await goto("/", { waitUntil: "hydration" });
  await expect(page.getByRole("heading")).toHaveText("🎉 You're all set up!");
});
