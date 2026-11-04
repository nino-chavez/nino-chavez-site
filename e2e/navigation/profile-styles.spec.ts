import { expect, test } from "@playwright/test";

const representativeRoutes = [
  "/", "/about", "/now", "/links", "/privacy", "/cv", "/work",
  "/work?view=all", "/work?q=no-such-profile-project", "/work/blueprint",
  "/learn", "/demos", "/search?q=Rally", "/search?q=no-such-profile-project",
  "/photography/coverage", "/missing-profile-page",
];

const innerDestinations = [["Home", "/"], ["Writing", "https://ninochavez.co/blog/archive"], ["Photography", "https://ninochavez.co/photography/albums"], ["Links", "/links"], ["Email", "mailto:nino@ninochavez.co"]] as const;
const mastheadDestinations = [["Work", "/work"], ["Writing", "https://ninochavez.co/blog/archive"], ["Photography", "https://ninochavez.co/photography/albums"], ["About", "/about"], ["Email", "mailto:nino@ninochavez.co"]] as const;

for (const width of [1440, 390]) {
  test(`inner profile pages retain their existing shell at ${width}px`, async ({ page, request }) => {
    test.setTimeout(240_000);
    await page.setViewportSize({ width, height: 900 });
    const sitemap = await (await request.get("/sitemap.xml")).text();
    const indexedRoutes = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)]
      .map((match) => new URL(match[1]).pathname);
    const innerRoutes = representativeRoutes.filter((route) => route !== "/");
    const routes = process.env.PROFILE_FULL_REVIEW
      ? [...new Set([...innerRoutes, ...indexedRoutes.filter((route) => route !== "/")])]
      : [...innerRoutes,
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
        await expect(page.locator("body")).toHaveCSS("background-color", "rgb(7, 7, 15)");
        await expect(page.locator("body")).toHaveCSS("font-family", /Inter/);
        // Embedded session evidence keeps its source typography; the enclosing profile heading uses the shared system.
        await expect(page.locator("#main h1:not(.demo-story-surface h1), .demo-record-context__header h2").first()).toHaveCSS("font-family", /Anton|Schibsted/);
        await expect(page.locator(".profile-header")).toBeVisible();
        await expect(page.locator(".profile-header__wordmark")).toHaveText("Nino Chavez");
        const navigation = page.locator(".profile-header nav");
        const visibleDestinations = width > 720 ? innerDestinations : [
          innerDestinations[0], innerDestinations[3], innerDestinations[4],
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

  test(`Masthead home has its full-width name and one ground at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);
    const masthead = page.locator("#masthead");
    await expect(masthead).toBeVisible();
    await expect(page.locator(".profile-header, .profile-footer")).toHaveCount(0);
    const wordmark = masthead.locator(".wordmark");
    await expect(wordmark).toHaveCSS("font-family", /Anton/);
    await expect(wordmark).toHaveText(/Nino\s*Chavez/);
    const wordmarkLink = await wordmark.locator("a").boundingBox();
    expect(wordmarkLink!.width).toBeGreaterThan(width * (width > 760 ? 0.85 : 0.5));
    expect(wordmarkLink!.x + wordmarkLink!.width).toBeLessThanOrEqual(width);
    const navigation = masthead.locator(".primary-nav");
    for (const [name, href] of mastheadDestinations) {
      const specialist = name === "Writing" || name === "Photography";
      const link = navigation.getByRole("link", { name: specialist ? `${name} (opens in a new tab)` : name, exact: true });
      await expect(link).toHaveAttribute("href", href);
      if (specialist) await expect(link).toHaveAttribute("target", "_blank");
    }
    await expect(navigation.locator("a:visible")).toHaveCount(5);
    // Arena keeps one ground: no section takes its own color. The closing line is the one exception.
    for (const section of [masthead, masthead.locator(".writing"), masthead.locator(".project").first(), masthead.locator(".about")]) {
      const background = await section.evaluate((element) => getComputedStyle(element).backgroundColor);
      expect(["rgb(7, 7, 15)", "rgba(0, 0, 0, 0)"]).toContain(background);
    }
    await expect(masthead.locator(".touch")).toHaveCSS("background-color", "rgb(143, 203, 234)");
    await expect(masthead.locator(".touch a[href^='mailto:']")).toHaveText(/Get in touch/i);
    expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBeLessThanOrEqual(1);
  });

  test(`Work uses the Masthead grammar on its records at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/work");
    await page.evaluate(() => document.fonts.ready);
    await expect(page.locator(".profile-header")).toBeVisible();
    await expect(page.locator("#main h1")).toHaveCSS("font-family", /Anton/);
    await expect(page.locator("#main h1")).toHaveCSS("text-transform", "uppercase");
    expect(await page.locator(".work-entry").count()).toBeGreaterThanOrEqual(5);
    await expect(page.locator(".work-entry h3").first()).toHaveCSS("font-family", /Anton/);
    for (const image of await page.locator(".work-preview img").all()) {
      // Previews render at full size here, so missing dimensions move the links beside them as they load.
      await expect(image).toHaveAttribute("width", /\d+/);
      await expect(image).toHaveAttribute("height", /\d+/);
      await image.scrollIntoViewIfNeeded();
      await expect.poll(() => image.evaluate((element: HTMLImageElement) => element.complete && element.naturalWidth > 0)).toBe(true);
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBeLessThanOrEqual(1);
  });
}

test("About practice links stay on one line on a phone", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/about");
  const link = page.locator(".about-practice-register a").first();
  await expect(link).toBeVisible();
  expect((await link.boundingBox())!.height).toBeLessThan(60);
});

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
