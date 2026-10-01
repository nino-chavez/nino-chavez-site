import { defineConfig, devices } from "@playwright/test";

const baseURL = process.env.NAVIGATION_BASE_URL ?? "http://127.0.0.1:4318";

export default defineConfig({
  testDir: "./e2e/navigation",
  outputDir: "./outputs/navigation-tests",
  workers: 1,
  use: { baseURL, trace: "retain-on-failure" },
  projects: [
    { name: "iphone-webkit", use: { ...devices["iPhone 13"], browserName: "webkit" } },
    { name: "mobile-chromium", use: { ...devices["Pixel 7"], browserName: "chromium" } },
  ],
  webServer: process.env.NAVIGATION_BASE_URL ? undefined : {
    command: "npm start -- --port 4318",
    url: baseURL,
    reuseExistingServer: !process.env.CI,
  },
});
