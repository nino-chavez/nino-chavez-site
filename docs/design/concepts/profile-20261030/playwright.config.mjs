import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: '.', testMatch: 'capture.spec.mjs', workers: 1,
  outputDir: '.playwright-output', reporter: 'list',
  use: { headless: true, browserName: 'chromium', deviceScaleFactor: 1 },
});
