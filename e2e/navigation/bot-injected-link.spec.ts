import { expect, test } from "@playwright/test";

// Cloudflare AI Labyrinth adds a hidden link as the first thing in <body> for traffic it
// scores as a bot. At <body> level React pairs elements by tag name alone, so a first
// React element of the same tag claims that empty link, finds no text, and throws away
// the server HTML with error 418.
const injected =
  '<a href="/cdn-cgi/content?id=test" aria-hidden="true" rel="nofollow noopener" style="display: none !important; visibility: hidden !important"></a>';

for (const route of ["/", "/work", "/about"]) {
  test(`${route} hydrates with the bot link first in body`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.route(route, async (request) => {
      if (request.request().resourceType() !== "document") return request.continue();
      const response = await request.fetch();
      const html = (await response.text()).replace(/<body[^>]*>/, (body) => body + injected);
      await request.fulfill({ response, body: html });
    });
    await page.goto(route, { waitUntil: "load" });

    // Hydration kept the server HTML: a full client re-render would remove the link.
    await expect(page.locator('a[href*="cdn-cgi/content"]')).toHaveCount(1);
    await page.waitForTimeout(1000);
    expect(errors).toEqual([]);
  });
}
