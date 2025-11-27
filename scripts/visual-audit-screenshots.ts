import { chromium, type Page } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

const BASE_URL = 'http://localhost:4173';
const OUTPUT_DIR = './visual-audit-screenshots';

// Sections to capture
const sections = [
  { id: 'hero', name: '01-hero', scrollTo: false },
  { id: 'focus', name: '02-focus-about', scrollTo: true },
  { id: 'frame', name: '03-frame-approach', scrollTo: true },
  { id: 'exposure', name: '04-exposure-experience', scrollTo: true },
  { id: 'gallery', name: '05-gallery', scrollTo: true },
  { id: 'consultation', name: '06-consultation-contact', scrollTo: true },
];

// Viewports to test
const viewports = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'mobile', width: 375, height: 812 },
];

async function scrollToSection(page: Page, sectionId: string) {
  await page.evaluate((id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'instant', block: 'start' });
    }
  }, sectionId);
  // Wait for animations and lazy loading
  await page.waitForTimeout(1500);
}

async function captureScreenshots() {
  // Create output directory
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const browser = await chromium.launch({ headless: true });

  for (const viewport of viewports) {
    console.log(`\nCapturing ${viewport.name} (${viewport.width}x${viewport.height})...`);

    const context = await browser.newContext({
      viewport: { width: viewport.width, height: viewport.height },
      deviceScaleFactor: 2, // Retina quality
    });

    const page = await context.newPage();

    // Go to homepage
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000); // Wait for initial animations

    // Capture full page screenshot
    await page.screenshot({
      path: path.join(OUTPUT_DIR, `${viewport.name}-00-fullpage.png`),
      fullPage: true,
    });
    console.log(`  Captured: ${viewport.name}-00-fullpage.png`);

    // Capture each section
    for (const section of sections) {
      if (section.scrollTo) {
        await scrollToSection(page, section.id);
      }

      // Try to capture just the section element
      const sectionElement = await page.$(`#${section.id}`);
      if (sectionElement) {
        await sectionElement.screenshot({
          path: path.join(OUTPUT_DIR, `${viewport.name}-${section.name}.png`),
        });
      } else {
        // Fallback to viewport screenshot
        await page.screenshot({
          path: path.join(OUTPUT_DIR, `${viewport.name}-${section.name}.png`),
        });
      }
      console.log(`  Captured: ${viewport.name}-${section.name}.png`);
    }

    await context.close();
  }

  // Capture header states (scrolled vs not scrolled)
  console.log('\nCapturing header states...');
  const headerContext = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
  });
  const headerPage = await headerContext.newPage();
  await headerPage.goto(BASE_URL, { waitUntil: 'networkidle' });
  await headerPage.waitForTimeout(1000);

  // Header at top
  await headerPage.screenshot({
    path: path.join(OUTPUT_DIR, 'header-top.png'),
    clip: { x: 0, y: 0, width: 1440, height: 100 },
  });

  // Scroll down for sticky header
  await headerPage.evaluate(() => window.scrollTo(0, 500));
  await headerPage.waitForTimeout(500);
  await headerPage.screenshot({
    path: path.join(OUTPUT_DIR, 'header-scrolled.png'),
    clip: { x: 0, y: 0, width: 1440, height: 100 },
  });

  await headerContext.close();
  await browser.close();

  console.log(`\nScreenshots saved to ${OUTPUT_DIR}/`);
  console.log('Total screenshots:', fs.readdirSync(OUTPUT_DIR).length);
}

captureScreenshots().catch(console.error);
