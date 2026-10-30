import { expect, test } from "@playwright/test";

const representativeRoutes = [
  "/", "/about", "/now", "/links", "/privacy", "/cv", "/work",
  "/work?view=all", "/work?q=no-such-profile-project", "/work/blueprint",
  "/learn", "/demos", "/search?q=Rally", "/search?q=no-such-profile-project",
  "/photography/coverage", "/missing-profile-page",
];

const profileDestinations = [
  ["Home", "/"],
  ["Writing", "https://ninochavez.co/blog/archive"],
  ["Photography", "https://ninochavez.co/photography/albums"],
  ["Links", "/links"],
  ["Email", "mailto:nino@ninochavez.co"],
] as const;

for (const width of [1440, 390]) {
  test(`profile pages share the Work in view shell at ${width}px`, async ({ page, request }) => {
    test.setTimeout(240_000);
    await page.setViewportSize({ width, height: 900 });
    const sitemap = await (await request.get("/sitemap.xml")).text();
    const indexedRoutes = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)]
      .map((match) => new URL(match[1]).pathname);
    const routes = process.env.PROFILE_FULL_REVIEW
      ? [...new Set([...representativeRoutes, ...indexedRoutes])]
      : [...representativeRoutes,
        ...["/demos/", "/demos/applied/", "/learn/"].map((prefix) => indexedRoutes.find((route) => route.startsWith(prefix))).filter((route): route is string => !!route)];

    for (const route of routes) {
      await test.step(route, async () => {
        const response = await page.goto(route);
        expect(response?.status()).toBe(route === "/missing-profile-page" ? 404 : 200);
        await page.evaluate(() => document.fonts.ready);
        if (route === "/demos") {
          await expect(page.locator(".demo-session-card").first()).toBeVisible();
          for (const preview of await page.locator(".demo-session-card img").all()) {
            await preview.scrollIntoViewIfNeeded();
            await expect.poll(() => preview.evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0)).toBe(true);
          }
          await page.evaluate(() => window.scrollTo(0, 0));
        }
        await expect(page.locator("body")).toHaveCSS("background-color", "rgb(255, 253, 249)");
        await expect(page.locator("body")).toHaveCSS("font-family", /Inter/);
        // Embedded session evidence keeps its source typography; the enclosing profile heading uses the shared system.
        await expect(page.locator("#main h1:not(.demo-story-surface h1), .demo-record-context__header h2").first()).toHaveCSS("font-family", /Schibsted/);
        await expect(page.locator(".profile-header")).toBeVisible();
        await expect(page.locator(".profile-header__wordmark")).toHaveText("Nino Chavez");
        const navigation = page.locator(".profile-header nav");
        const visibleDestinations = width > 720 ? profileDestinations : [
          profileDestinations[0], profileDestinations[3], profileDestinations[4],
        ];
        for (const [name, href] of visibleDestinations) {
          const specialist = name === "Writing" || name === "Photography";
          const link = navigation.getByRole("link", { name: specialist ? `${name} (opens in a new tab)` : name, exact: true });
          await expect(link).toHaveAttribute("href", href);
          if (specialist) {
            await expect(link).toHaveAttribute("target", "_blank");
            await expect(link).toHaveAttribute("rel", "noopener noreferrer");
          }
        }
        await expect(navigation.locator("a:visible")).toHaveCount(width > 720 ? 5 : 3);
        expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth), route).toBeLessThanOrEqual(1);
        const name = (route === "/" ? "home" : route.slice(1)).replace(/[^a-z0-9-]/gi, "-");
        await page.screenshot({ path: `outputs/profile-review/${test.info().project.name}/${width}/${name}.png`, fullPage: true, scale: "css" });
        await page.screenshot({ path: `outputs/profile-review/${test.info().project.name}/${width}/${name}-first.png`, scale: "css" });
      });
    }
  });
}

test("About keeps a readable measure inside the wider Work in view shell and Guides keep distinct grid cells", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/about");
  const paragraph = page.locator(".about-biography .about-lead");
  await expect(paragraph).toHaveCSS("font-weight", "400");
  const paragraphWidth = (await paragraph.boundingBox())?.width;
  expect(paragraphWidth).toBeGreaterThan(550);
  expect(paragraphWidth).toBeLessThan(800);
  await page.goto("/learn");
  const firstGuide = page.locator(".learn-track-register a").first();
  const title = await firstGuide.locator(".learn-track-name").boundingBox();
  const output = await firstGuide.locator(".learn-track-output").boundingBox();
  expect(title).not.toBeNull();
  expect(output).not.toBeNull();
  expect(title!.x + title!.width).toBeLessThan(output!.x);
});

test("Sessions keeps the featured title clear of its image after the collection loads", async ({ page }) => {
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/demos");
    await expect(page.locator(".demo-session-card").first()).toBeVisible();
    await expect(page.getByText("Loading the complete collection…")).toHaveCount(0);
    const feature = page.locator(".demo-studio__feature");
    const image = await feature.locator(":scope > div").boundingBox();
    const title = await feature.locator("strong").boundingBox();
    expect(image).not.toBeNull();
    expect(title).not.toBeNull();
    if (width > 640) expect(image!.x + image!.width).toBeLessThan(title!.x);
    else expect(image!.y + image!.height).toBeLessThan(title!.y);
    await expect(feature).toHaveCSS("transform", "none");
    const heading = await page.locator("#sessions-title").boundingBox();
    expect(heading!.width).toBeGreaterThan(200);
    expect(heading!.height).toBeLessThan(80);
    const cards = page.locator(".demo-session-card");
    const first = (await cards.nth(0).boundingBox())!;
    const next = (await cards.nth(1).boundingBox())!;
    if (width > 640) {
      expect(first.x + first.width).toBeLessThan(next.x);
      expect((await cards.nth(2).boundingBox())!.y).toBeGreaterThanOrEqual(first.y + first.height);
    } else expect(next.y).toBeGreaterThanOrEqual(first.y + first.height);
  }
});
