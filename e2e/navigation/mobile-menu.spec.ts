import { expect, test } from "@playwright/test";

for (const [label, anchor] of [["About", "about"], ["Projects", "projects"], ["Contact", "contact"]]) {
  test(`${label} is visible on a phone and opens its section`, async ({ page }) => {
    await page.goto("/");
    const link = page.getByRole("navigation", { name: "Profile sections" }).getByRole("link", { name: label, exact: true });
    await expect(link).toBeVisible();
    await link.tap();
    await expect(page).toHaveURL(new RegExp(`#${anchor}$`));
    await expect(page.locator(`#${anchor}`)).toBeInViewport();
    await expect(page.locator(".menu-button")).toHaveCount(0);
  });
}

test("a deep project page returns to the personal page through the same local navigation", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "All projects", exact: true }).tap();
  await expect(page).toHaveURL(/\/work$/);
  const nav = page.getByRole("navigation", { name: "Profile sections" });
  await expect(nav.getByRole("link")).toHaveCount(3);
  await nav.getByRole("link", { name: "Contact", exact: true }).tap();
  await expect(page).toHaveURL(/\/#contact$/);
  await expect(page.locator("#contact")).toBeInViewport();
  await page.goBack();
  await expect(page).toHaveURL(/\/work$/);
});

test("profile Elsewhere links open the specialist archive and photo Events page", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("link", { name: "Signal Dispatch", exact: true })).toHaveAttribute("href", "https://ninochavez.co/blog/archive");
  await expect(page.getByRole("link", { name: "my photography site" })).toHaveAttribute("href", "https://ninochavez.co/photography/albums");
  await expect(page.getByRole("navigation", { name: "Profile sections" })).not.toContainText("Writing");
});
