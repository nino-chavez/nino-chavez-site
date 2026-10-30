import { expect, test } from "@playwright/test";

test("phone navigation exposes Home, Links, and Email without a drawer", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  const navigation = page.locator(".profile-header nav");
  for (const [name, href] of [["Home", "/"], ["Links", "/links"], ["Email", "mailto:nino@ninochavez.co"]] as const) {
    const link = navigation.getByRole("link", { name, exact: true });
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute("href", href);
  }
  await expect(navigation.locator("a:visible")).toHaveCount(3);
  await expect(page.locator(".menu-button, .navigation-dialog, [role=dialog]")).toHaveCount(0);
  await navigation.getByRole("link", { name: "Links", exact: true }).tap();
  await expect(page).toHaveURL(/\/links$/);
  await expect(page.getByRole("heading", { name: "Links", exact: true })).toBeVisible();
  await page.goBack();
  await expect(page.locator("#profile-title")).toBeVisible();
});

test("phone home keeps the specialist destinations visible as ordinary document links", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  for (const [name, href] of [
    ["Writing", "https://ninochavez.co/blog/archive"],
    ["Photography", "https://ninochavez.co/photography/albums"],
  ] as const) {
    const link = page.locator(".profile-home__quick-links").getByRole("link", { name: new RegExp(`^${name}`) });
    await expect(link).toBeInViewport();
    await expect(link).toHaveAttribute("href", href);
    expect(await link.evaluate((element) => element instanceof HTMLAnchorElement)).toBe(true);
  }
});

test("Work in view keeps the selected project previews loaded on phone", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  for (const alt of [
    "Minder app preview showing a fictional sample day",
    "Rally HQ tournament interface",
    "The Rotation schedule and must-watch match cards",
  ]) {
    const preview = page.locator(`img[alt="${alt}"]`);
    await expect(preview).toBeVisible();
    await expect.poll(() => preview.evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0)).toBe(true);
  }
  expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBeLessThanOrEqual(1);
});
