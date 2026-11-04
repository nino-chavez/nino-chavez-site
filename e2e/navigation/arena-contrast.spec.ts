import { expect, test } from "@playwright/test";

// Arena inverts a palette the shared components were written for; this catches dark-on-dark and light-on-light text.
const routes = ["/", "/about", "/now", "/links", "/privacy", "/cv", "/work", "/work?view=all", "/work?q=rally", "/work?state=live", "/work/blueprint", "/learn", "/demos", "/search?q=Rally", "/search?q=no-such-profile-project", "/photography", "/photography/coverage", "/learn/explorer", "/demos/twelve-messages", "/demos/applied/two-ways", "/missing-profile-page"];

for (const width of [1440, 390]) test(`text keeps at least 4.5:1 contrast, or 3:1 when large, on Arena surfaces at ${width}px`, async ({ page }) => {
  test.setTimeout(240_000);
  await page.setViewportSize({ width, height: 900 });
  const failures: string[] = [];
  for (const route of routes) {
    await page.goto(route);
    await page.evaluate(() => document.fonts.ready);
    const scan = () => page.evaluate(() => {
      const parse = (value: string) => {
        const numbers = value.match(/[\d.]+/g)?.map(Number) ?? [0, 0, 0, 0];
        return { r: numbers[0], g: numbers[1], b: numbers[2], a: numbers[3] ?? 1 };
      };
      const over = (top: ReturnType<typeof parse>, under: ReturnType<typeof parse>) => ({
        r: top.r * top.a + under.r * (1 - top.a), g: top.g * top.a + under.g * (1 - top.a), b: top.b * top.a + under.b * (1 - top.a), a: 1,
      });
      const luminance = (color: ReturnType<typeof parse>) => {
        const channel = (value: number) => { const c = value / 255; return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; };
        return 0.2126 * channel(color.r) + 0.7152 * channel(color.g) + 0.0722 * channel(color.b);
      };
      const out: string[] = [];
      const walker = document.createTreeWalker(document.querySelector("#main, #masthead") ?? document.body, NodeFilter.SHOW_TEXT);
      const seen = new Set<Element>();
      while (walker.nextNode()) {
        const element = walker.currentNode.parentElement;
        const text = walker.currentNode.textContent?.trim();
        if (!element || !text || seen.has(element)) continue;
        seen.add(element);
        const style = getComputedStyle(element);
        const box = element.getBoundingClientRect();
        if (style.visibility === "hidden" || style.display === "none" || box.width < 2 || box.height < 2 || element.closest(".demo-story-surface, script, style, .visually-hidden, .assistive-text")) continue;
        // Text over an image has no computed background to compare.
        const layers: ReturnType<typeof parse>[] = [];
        let overImage = false;
        for (let node: Element | null = element; node; node = node.parentElement) {
          const nodeStyle = getComputedStyle(node);
          if (nodeStyle.backgroundImage !== "none" || node.querySelector(":scope > img")) overImage = true;
          const background = parse(nodeStyle.backgroundColor);
          if (background.a > 0) { layers.push(background); if (background.a === 1) break; }
        }
        if (overImage) continue;
        let background = { r: 255, g: 255, b: 255, a: 1 };
        for (const layer of layers.reverse()) background = over(layer, background);
        const color = over(parse(style.color), background);
        const [high, low] = [luminance(color), luminance(background)].sort((a, b) => b - a);
        const ratio = (high + 0.05) / (low + 0.05);
        const size = parseFloat(style.fontSize);
        const large = size >= 24 || (size >= 18.66 && Number(style.fontWeight) >= 700);
        if (ratio < (large ? 3 : 4.5)) out.push(`${ratio.toFixed(2)} ${element.tagName}.${element.className} "${text.slice(0, 40)}"`);
      }
      return out;
    });
    failures.push(...(await scan()).map((item) => `${route}: ${item}`));
    // Cards that invert on hover only reveal their color pair in that state.
    const invertingCard = page.locator(".photography-route-deck a").first();
    if (route === "/photography" && await invertingCard.isVisible()) {
      await invertingCard.hover();
      await page.waitForTimeout(400);
      failures.push(...(await scan()).map((item) => `${route} (hover): ${item}`));
    }
  }
  expect(failures).toEqual([]);
});

test("the CV still prints in black on white", async ({ page }) => {
  await page.goto("/cv");
  await page.emulateMedia({ media: "print" });
  await expect(page.locator("body")).toHaveCSS("background-color", "rgb(255, 255, 255)");
  await expect(page.locator(".cv-opening h1")).toHaveCSS("color", "rgb(0, 0, 0)");
  await expect(page.locator(".profile-header")).toBeHidden();
});
