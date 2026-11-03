import { expect, test } from "@playwright/test";

test("Studio keeps a usable skip link and restores its shell after local navigation", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("main#main")).toHaveCount(1);
  await expect(page.locator("h1")).toHaveCount(1);
  const skip = page.locator('a.skip-link[href="#main"]');
  await skip.focus();
  await expect(skip).toBeFocused();
  await expect(skip).toBeInViewport();
  await page.keyboard.press("Enter");
  await expect(page.locator("main#main")).toBeFocused();
  await page.locator(".primary-nav").getByRole("link", { name: "Work", exact: true }).click();
  await expect(page).toHaveURL(/\/work$/);
  await expect(page.locator("#studio")).toHaveCount(0);
  await expect(page.locator(".profile-header")).toBeVisible();
  if (await page.locator("script[data-site-navigation=react]").count()) {
    await expect(page.locator("html")).toHaveAttribute("data-analytics-path", "/work");
  }
  await expect(page.locator("main#main")).toHaveCount(1);
  await expect(page.locator("a.skip-link")).toHaveCount(1);
  await page.goBack();
  await expect(page.locator("#studio .identity-rail")).toBeVisible();
  await expect(page.locator(".profile-header")).toHaveCount(0);
});

test("Photography affordance changes on hover and keyboard focus independently", async ({ page }) => {
  await page.goto("/");
  const link = page.locator(".photo-link");
  const heading = link.locator("h2");
  await page.mouse.move(0, 0);
  await expect(heading).toHaveCSS("color", "rgb(35, 51, 67)");
  // Dispatch mouse movement directly: mobile projects cannot rely on hover capability.
  await link.hover();
  await expect(heading).toHaveCSS("color", "rgb(36, 76, 194)");
  await page.mouse.move(0, 0);
  await expect(heading).toHaveCSS("color", "rgb(35, 51, 67)");
  await link.focus();
  await expect(heading).toHaveCSS("color", "rgb(36, 76, 194)");
  await expect(link).toHaveCSS("outline-style", "solid");
});


for (const height of [600, 520]) {
  test(`Studio contact remains reachable in a ${height}px desktop window`, async ({ page }) => {
    await page.setViewportSize({ width:1366, height });
    await page.goto("/");
    const email = page.locator('.primary-nav a[href^="mailto:"]');
    await email.focus();
    await expect(email).toBeFocused();
    await expect(email).toBeInViewport();
    expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
  });
}
