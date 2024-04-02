import { expect, test } from "@nuxt/test-utils/playwright";

/**
 * A note about the e2e tests, these won't work when DB is generated again
 * because it is setup by fakerJS (random vals). If I had more time I would have
 * seeded the DB with the same data every time for the test env. I added a picture
 * to docs/images showing that the tests were passing.
 */

test.describe("Blog posts page", () => {
  test("sorts from newest first by default", async ({ page }) => {
    await page.goto("/posts");

    const articleHeadings = page.getByRole("article").getByRole("heading");
    await expect(await articleHeadings.count()).toBe(10);

    await expect(articleHeadings.nth(0)).toHaveText("My Blog Post #1070");
    await expect(articleHeadings.nth(1)).toHaveText("My Blog Post #305");
  });

  test("navigates to individual blog post", async ({ page }) => {
    await page.goto("/posts");
    await expect(
      page.getByRole("heading", { name: "My Blog Post #305" }),
    ).toBeVisible();
    const articles = page.getByRole("article");
    await expect(await articles.count()).toBe(10);

    await page
      .locator("footer")
      .filter({ hasText: "Monique Cummerata Read more" })
      .getByRole("link")
      .click();
    await page.waitForURL("**/posts/my-blog-post-305");
    await expect(page).toHaveTitle(/My Blog Post #305/);
    await expect(page.getByRole("time")).toHaveText("Mar 31, 2024");
  });

  test("sorts articles based on URL parameter", async ({ page }) => {
    await page.goto("/posts?order=oldestFirst");
    await expect(page.getByRole("heading", { name: "Our Blog" })).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "My Blog Post #605" }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "My Blog Post #893" }),
    ).toBeVisible();

    const articleHeadings = page.getByRole("article").getByRole("heading");
    await expect(await articleHeadings.count()).toBe(10);

    await expect(articleHeadings.nth(0)).toHaveText("My Blog Post #605");
    await expect(articleHeadings.nth(1)).toHaveText("My Blog Post #893");
  });

  test("sorts articles by checking sort box", async ({ page }) => {
    await page.goto("/posts");

    await expect(
      page.getByRole("heading", { name: "My Blog Post #305" }),
    ).toBeVisible();

    await expect(page.getByText("Newest to Oldest")).toBeVisible();

    await page.getByText("Newest to Oldest").click();

    const heading = page.getByRole("heading", { name: "My Blog Post #893" });
    await heading.waitFor();
    await expect(heading).toBeVisible();

    await expect(page.getByRole("heading", { name: "Our Blog" })).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "My Blog Post #893" }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "My Blog Post #605" }),
    ).toBeVisible();
  });

  test("infinite scrolling with newestFirst sort loads correct articles", async ({
    page,
  }) => {
    await page.goto("/posts");
    await expect(
      page.getByRole("heading", { name: "My Blog Post #305" }),
    ).toBeVisible();

    const pageHeight = await page.evaluate("document.body.scrollHeight");
    await page.mouse.wheel(0, pageHeight as number);

    await page.mouse.wheel(0, 200);

    const heading = page.getByRole("heading", { name: "My Blog Post #992" });
    await heading.waitFor();
    await expect(heading).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "My Blog Post #617" }),
    ).toBeVisible();

    const articleHeadings = page.getByRole("article").getByRole("heading");
    await expect(await articleHeadings.count()).toBe(20);
  });

  test("infinite scrolling with oldestFirst sort loads correct articles", async ({
    page,
  }) => {
    await page.goto("/posts?order=oldestFirst");
    await expect(
      page.getByRole("heading", { name: "My Blog Post #893" }),
    ).toBeVisible();

    const pageHeight = await page.evaluate("document.body.scrollHeight");
    await page.mouse.wheel(0, pageHeight as number);

    await page.mouse.wheel(0, 200);

    const heading = page.getByRole("heading", { name: "My Blog Post #405" });
    await heading.waitFor();
    await expect(heading).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "My Blog Post #538" }),
    ).toBeVisible();

    const articleHeadings = page.getByRole("article").getByRole("heading");
    await expect(await articleHeadings.count()).toBe(20);
  });
});
