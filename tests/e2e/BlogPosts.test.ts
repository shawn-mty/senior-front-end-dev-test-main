import { expect, test } from "@nuxt/test-utils/playwright";

test("Blog posts page", async ({ page, goto }: { page: any; goto: any }) => {
  await goto("/posts", { waitUntil: "hydration" });
  await expect(page.getByRole("heading")).toHaveText("Our Blog");

  expect(
    page.getByRole("heading", { name: "My Blog Post #554" }),
  ).toBeDefined();
  console.log(page.getByRole("heading"));
  expect(page.getByRole("heading"));

  // test that there are 10 articles
  // test that it's sorted based on the url on page load
  // test that sort works
  // data test id for the sort
});
