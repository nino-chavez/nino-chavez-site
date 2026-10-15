import { expect, test } from "@playwright/test";

// fill() sets the whole value in one event, which hid a bug where each
// keystroke re-rendered the route on the server and the box snapped back,
// dropping characters typed before the response landed. Type key by key.
const libraries = [
  { path: "/blog", box: "#writing-query", text: "agentic workflow" },
  { path: "/work?view=all", box: "#work-query", text: "volleyball tournament" },
  { path: "/demos", box: "#demo-query", text: "commerce agent" },
];

for (const { path, box, text } of libraries) {
  test(`${path} search keeps every keystroke without a server round trip`, async ({ page }) => {
    await page.goto(path);
    const input = page.locator(box);
    await expect(input).toBeVisible();

    // Link prefetches also carry _rsc; only a render of a query URL is the bug.
    const serverRenders: string[] = [];
    page.on("request", (request) => {
      const url = new URL(request.url());
      if (url.searchParams.has("_rsc") && url.searchParams.has("q")) serverRenders.push(request.url());
    });

    await input.pressSequentially(text, { delay: 60 });

    await expect(input).toHaveValue(text);
    await expect(page).toHaveURL(new RegExp(`q=${encodeURIComponent(text).replace(/%20/g, "\\+")}`));
    expect(serverRenders).toEqual([]);
  });
}
