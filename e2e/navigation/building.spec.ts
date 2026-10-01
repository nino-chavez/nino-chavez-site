import { expect, test } from "@playwright/test";

const selections = [
  ["minder", "iOS app"], ["flickday", "Sports-media business"],
  ["the-rotation", "Website"], ["lets-pepper", "Tournament series"],
  ["rally-hq", "Web app"], ["cutting-board", "App"],
  ["yawn", "App"], ["work-library", "Publication library"],
];

test("Building identifies mixed work and preserves honest availability and destinations", async ({ page }) => {
  await page.goto("/work");
  await expect(page.locator(".work-entry")).toHaveCount(8);
  for (const [slug, kind] of selections) {
    await expect(page.locator(`[data-work="${slug}"] .work-kind`)).toHaveText(kind);
  }
  await expect(page.getByText("Internal alpha", { exact: true })).toBeVisible();
  await expect(page.getByText("Public alpha", { exact: true })).toBeVisible();
  await expect(page.getByText("Published app preview; fictional sample day.")).toBeVisible();
  await expect(page.getByText("Public studies · private handoffs", { exact: true })).toBeVisible();
  await expect(page.getByRole("link", { name: "Visit Flickday Media" })).toHaveAttribute("href", "https://flickdaymedia.com/");
  await expect(page.getByRole("link", { name: "Visit Let’s Pepper" })).toHaveAttribute("href", "https://letspepper.com/");
  await expect(page.locator(".library-controls")).toHaveCount(0);
  await page.getByRole("link", { name: "Explore Rally HQ" }).click();
  await expect(page).toHaveURL(/\/work\/rally-hq$/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Rally");
});

test("catalogue filters, reload, reset, return and browser Back keep their meaning", async ({ page }) => {
  await page.goto("/work");
  await page.getByRole("link", { name: "Browse all work" }).click();
  await expect(page.locator(".work-record")).toHaveCount(34);
  for (const name of ["Flickday", "Pepper"]) {
    await page.getByRole("searchbox", { name: "Search work" }).fill(name);
    await expect(page.locator(".work-record")).toHaveCount(1);
    await page.reload();
    await expect(page.getByRole("searchbox", { name: "Search work" })).toHaveValue(name);
    await expect(page.locator(".work-record")).toHaveCount(1);
  }
  await page.getByRole("button", { name: "Clear filters" }).click();
  await expect(page.locator(".work-record")).toHaveCount(34);
  await page.getByRole("combobox", { name: "Format", exact: true }).selectOption("app");
  await expect(page.locator(".work-record")).toHaveCount(7);
  await page.getByRole("combobox", { name: "Format", exact: true }).selectOption("");
  await expect(page.locator(".work-record")).toHaveCount(34);
  await page.getByRole("searchbox", { name: "Search work" }).fill("no-such-work-1234");
  await expect(page.getByRole("heading", { name: "No work matches these filters." })).toBeVisible();
  await page.getByRole("button", { name: "Clear filters" }).first().click();
  await page.getByRole("link", { name: "Back to selected work" }).click();
  await expect(page.locator(".work-entry")).toHaveCount(8);
  await page.goBack();
  await expect(page.locator(".work-record")).toHaveCount(34);
});

test("old filter URLs and the catalogue hash still open the full library", async ({ page }) => {
  await page.goto("/work?domain=volleyball&state=Live");
  await expect(page.locator(".library-controls")).toBeVisible();
  await expect(page.getByRole("combobox", { name: "Domain", exact: true })).toHaveValue("Volleyball");
  await page.goto("/work#work-library");
  await expect(page).toHaveURL(/view=all#work-library$/);
  await expect(page.locator(".work-record")).toHaveCount(34);
  await page.getByRole("link", { name: "Back to selected work" }).click();
  await expect(page.locator(".work-entry")).toHaveCount(8);
  await page.goto("/work?form=unknown-format");
  await expect(page.getByRole("heading", { name: "No work matches these filters." })).toBeVisible();
  await expect(page.locator(".empty-state")).toContainText("format “unknown-format”");
});

for (const width of [1440, 800, 640, 390, 320]) {
  test(`Building renders at ${width}px without broken previews or horizontal overflow`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/work");
    await page.evaluate(() => document.fonts.ready);
    for (const img of await page.locator(".work-preview img").all()) {
      await img.scrollIntoViewIfNeeded();
      await expect.poll(() => img.evaluate((el: HTMLImageElement) => el.complete && el.naturalWidth > 0)).toBe(true);
    }
    const overflow = () => page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(await overflow()).toBeLessThanOrEqual(0);
    // Prove the detector can see sideways overflow rather than only returning green.
    await page.evaluate(() => {
      const canary = document.createElement("div"); canary.id = "overflow-canary";
      Object.assign(canary.style, { position: "absolute", left: "0", top: "0", width: `${document.documentElement.clientWidth + 4}px`, height: "1px" });
      document.body.appendChild(canary);
    });
    expect(await overflow()).toBeGreaterThanOrEqual(4);
    await page.locator("#overflow-canary").evaluate(el => el.remove());
    expect(await overflow()).toBeLessThanOrEqual(0);
    await page.evaluate(() => window.scrollTo(0, 0));
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
    await page.screenshot({ path: `outputs/navigation-tests/building-${test.info().project.name}-${width}.png`, fullPage: true, scale: "css" });
    await page.screenshot({ path: `outputs/navigation-tests/building-${test.info().project.name}-${width}-first.png`, scale: "css" });
    await page.getByRole("link", { name: "Browse all work" }).click();
    expect(await overflow()).toBeLessThanOrEqual(0);
  });
}
