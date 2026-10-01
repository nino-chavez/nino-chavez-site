import { expect, test, type Page } from "@playwright/test";

async function openMenu(page: Page) {
  await page.locator(".menu-button").tap();
  await expect(page.getByRole("dialog")).toBeVisible();
}

function observePageReloads(page: Page) {
  const requests: string[] = [];
  page.on("request", (request) => {
    // A same-page menu history entry must not ask the router to render again.
    if (new URL(request.url()).pathname === "/.rsc") requests.push(request.url());
  });
  return requests;
}

for (const [label, path] of [
  ["Writing", "/blog"], ["Building", "/work"], ["Photography", "/photography"],
  ["About", "/about"], ["Now", "/now"], ["Links", "/links"],
]) {
  test(`tapping ${label} opens its destination without reloading the page being left`, async ({ page }) => {
    await page.goto("/");
    await openMenu(page);
    const reloads = observePageReloads(page);
    await page.getByRole("dialog").locator(`a[href="${path}"]`).tap();
    await expect(page).toHaveURL(new RegExp(`${path}$`));
    await page.waitForLoadState("networkidle");
    await expect(page).toHaveURL(new RegExp(`${path}$`));
    expect(reloads).toEqual([]);
    await page.goBack();
    await expect(page).toHaveURL(/\/$/);
    await expect(page.getByRole("dialog")).not.toBeVisible();
  });
}

test("menu search navigates and Back returns to the original page", async ({ page }) => {
  await page.goto("/");
  await openMenu(page);
  const reloads = observePageReloads(page);
  await page.getByLabel("Search this site").fill("Rally HQ");
  await page.getByRole("dialog").getByRole("button", { name: "Search", exact: true }).tap();
  await expect(page).toHaveURL(/\/search\?q=Rally\+HQ$/);
  expect(reloads).toEqual([]);
  await page.goBack();
  await expect(page).toHaveURL(/\/$/);
  await expect(page.getByRole("dialog")).not.toBeVisible();
});

for (const dismissal of ["Close", "Escape", "Back"]) {
  test(`${dismissal} dismisses the menu and permits another tap`, async ({ page }) => {
    await page.goto("/");
    await openMenu(page);
    if (dismissal === "Close") await page.getByRole("button", { name: "Close", exact: true }).tap();
    if (dismissal === "Escape") await page.keyboard.press("Escape");
    if (dismissal === "Back") await page.goBack();
    await page.waitForFunction(() => !window.history.state?.siteNavigationDialog);
    await expect(page.getByRole("dialog")).not.toBeVisible();
    await expect(page.locator(".menu-button")).toBeFocused();
    await openMenu(page);
    await page.getByRole("dialog").locator('a[href="/about"]').tap();
    await expect(page).toHaveURL(/\/about$/);
  });
}
