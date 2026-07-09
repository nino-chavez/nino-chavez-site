/**
 * Review Portal smoke suite (@smoke) — happy path per portal flow.
 *
 * Prerequisite: the portal server is running (`./serve.sh` at the repo root,
 * port 8903). The prototype-smoke-runner (Stage 6 ship gate) boots serve.sh
 * itself; run locally with:
 *   ./serve.sh &  npx playwright test e2e/blueprint-portal.spec.ts --grep @smoke
 */
import { test, expect } from '@playwright/test';

const PORTAL = 'http://localhost:8903';

const PAGES = [
  { id: 'ai-front-door', h1: /work this way/i },
  { id: 'ai-learn-builder', h1: /builder/i },
  { id: 'ai-work', h1: /shipped work/i },
];

test.describe('blueprint portal @smoke', () => {
  test('front door catalog renders the manifest', async ({ page }) => {
    await page.goto(`${PORTAL}/`);
    await expect(page).toHaveTitle(/AI Practice Surface Rebuild/);
  });

  for (const p of PAGES) {
    test(`two-minute-path: ${p.id} renders proposed view + chrome`, async ({ page }) => {
      await page.goto(`${PORTAL}/pages/${p.id}.html`);
      // Proposed surface renders with its mock heading
      await expect(page.locator('.proposed-view .nc-hero-h1')).toHaveText(p.h1);
      // Portal chrome mounted (top bar injected by proto-nav.js)
      await expect(page.locator('.proposed-view .nc-mock')).toBeVisible();
      // Shipped view present for the comparison toggle
      await expect(page.locator('.shipped-view img')).toHaveCount(1);
    });
  }
});
