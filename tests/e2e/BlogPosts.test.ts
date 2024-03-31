import { expect, test } from "@nuxt/test-utils/playwright";

test("test", async ({ page, goto }: { page: any; goto: any }) => {
  await goto("/posts", { waitUntil: "hydration" });
  await expect(page.getByRole("heading")).toHaveText("Our Blog");

  expect(
    page.getByRole("heading", { name: "My Blog Post #554" }),
  ).toBeDefined();
  console.log(page.getByRole("heading"));
  expect(page.getByRole("heading"));
});
