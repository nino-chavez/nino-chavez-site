import { defineConfig } from '@playwright/test';
export default defineConfig({testDir:'.',testMatch:'verify.spec.mjs',workers:1,reporter:'line',outputDir:'../../../../.artifacts/building-rethink-tests',use:{baseURL:'http://127.0.0.1:4372',browserName:'chromium',deviceScaleFactor:1},timeout:30000});
