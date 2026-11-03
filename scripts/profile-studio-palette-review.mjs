import {createRequire} from 'node:module';
import {mkdir, writeFile} from 'node:fs/promises';
const require = createRequire(new URL('../package.json', import.meta.url));
const {chromium, expect} = require('@playwright/test');
const origin = process.env.PROFILE_REVIEW_BASE_URL || 'http://127.0.0.1:8872';
const output = process.env.PROFILE_REVIEW_OUTPUT || new URL('../.artifacts/studio-palettes/', import.meta.url).pathname;
await mkdir(output, {recursive: true});
const browser = await chromium.launch({headless: true});
const records = [];
const selectors = ['.identity-rail', '.stream', '.photography-opening', '.writing', '.work', '.about', '.project'];
async function ready(page) {
  await page.evaluate(() => document.fonts.ready);
  await page.locator('img').evaluateAll(images => {
    images.forEach(image => image.loading = 'eager');
    return Promise.all(images.map(image => image.decode()));
  });
}
async function snapshot(page) {
  return page.evaluate(selectors => ({
    text: document.body.innerText,
    links: [...document.querySelectorAll('a')].map(a => a.getAttribute('href')),
    images: [...document.images].map(i => ({src: i.getAttribute('src'), fit: getComputedStyle(i).objectFit, filter: getComputedStyle(i).filter, width: i.getBoundingClientRect().width, height: i.getBoundingClientRect().height})),
    boxes: selectors.flatMap(selector => [...document.querySelectorAll(selector)].map(e => {const box=e.getBoundingClientRect(); return {selector,x:box.x,y:box.y,width:box.width,height:box.height};})),
    overflow: document.documentElement.scrollWidth > innerWidth,
    ground: getComputedStyle(document.body).backgroundColor,
  }), selectors);
}
try {
  for (const width of [1440,390,320]) {
    const page = await browser.newPage({viewport:{width,height:width===1440?1000:844}, reducedMotion:'reduce'});
    const errors=[];
    page.on('pageerror',e=>errors.push(e.message));
    await page.goto(origin+'/__profile_review/rethink/studio.html');
    await ready(page);
    const baseline=await snapshot(page);
    for (const palette of ['navy','porcelain','mulberry']) {
      await page.goto(origin+'/__profile_review/rethink/studio.html?palette='+palette);
      await ready(page);
      await expect(page.locator('html')).toHaveAttribute('data-studio-palette',palette);
      const state=await snapshot(page);
      expect(state.text).toBe(baseline.text);
      expect(state.links).toEqual(baseline.links);
      expect(state.images).toEqual(baseline.images);
      expect(state.boxes).toEqual(baseline.boxes);
      expect(state.overflow).toBe(false);
      expect(state.ground).not.toBe(baseline.ground);
      await page.screenshot({path:output+palette+'-'+width+'-top.png',animations:'disabled'});
      if(width!==320) await page.screenshot({path:output+palette+'-'+width+'-full.png',fullPage:true,animations:'disabled'});
      await page.addScriptTag({content:require('axe-core').source});
      const violations=await page.evaluate(async()=> (await axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa']}})).violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)})));
      expect(violations).toEqual([]);
      const skip=page.locator('.skip-link');
      await skip.focus();
      await expect(skip).toBeFocused();
      await expect(skip).toHaveCSS('outline-style','solid');
      const focused=await page.evaluate(async()=> (await axe.run(document,{runOnly:{type:'rule',values:['color-contrast']}})).violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)})));
      expect(focused).toEqual([]);
      const action=page.locator('.primary-nav a').first();
      await action.focus();
      await expect(action).toHaveCSS('outline-width','3px');
      await action.hover();
      expect(await page.locator('img').evaluateAll(es=>es.every(e=>getComputedStyle(e).filter==='none'))).toBe(true);
      const transitions=await page.locator('a').evaluateAll(es=>es.map(e=>getComputedStyle(e).transitionDuration));
      expect(transitions.every(v=>v.split(',').every(x=>parseFloat(x)<=.01))).toBe(true);
      if(width===390) {
        const paragraph=page.locator('.about-copy p').first();
        const before=await paragraph.evaluate(e=>parseFloat(getComputedStyle(e).fontSize));
        await page.addStyleTag({content:'html{font-size:200%!important}'});
        await expect.poll(()=>paragraph.evaluate(e=>parseFloat(getComputedStyle(e).fontSize))).toBeCloseTo(before*2,1);
        expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
        await page.screenshot({path:output+palette+'-enlarged.png',fullPage:true,animations:'disabled'});
      }
      records.push({palette,width,contentAndLayoutUnchanged:true,imagesUnchanged:true,ground:state.ground,automatedAccessibilityViolations:violations,focusedContrastViolations:focused,keyboardFocus:true,reducedMotion:true,enlargedText:width===390});
    }
    expect(errors).toEqual([]);
    await page.close();
  }
  const page=await browser.newPage({viewport:{width:1440,height:1100}});
  await page.goto(origin+'/__profile_review/studio-colors.html');
  const desktop=page.frameLocator('iframe').first();
  for(const palette of ['navy','porcelain','mulberry','original']) {
    await page.locator(`[data-palette="${palette}"]`).click();
    await expect(desktop.locator('h1')).toBeVisible();
    if(palette!=='original') await expect(desktop.locator('html')).toHaveAttribute('data-studio-palette',palette);
    else await expect(desktop.locator('html')).not.toHaveAttribute('data-studio-palette');
    for(const section of ['writing','work','about','top']) {
      await page.locator('#position').selectOption(section);
      for(const frame of [desktop,page.frameLocator('iframe').nth(1)]) {
        if(section!=='top') await expect.poll(()=>frame.locator('.'+section).evaluate(el=>{const desired=Math.min(el.getBoundingClientRect().top+scrollY,document.documentElement.scrollHeight-innerHeight);return Math.abs(scrollY-desired);})).toBeLessThan(2);
        else await expect.poll(()=>frame.locator('html').evaluate(()=>scrollY)).toBe(0);
      }
    }
  }
  await page.locator('[data-palette="navy"]').click();
  for(const f of page.frames().filter(f=>f.parentFrame())) {await expect(f.locator('html')).toHaveAttribute('data-studio-palette','navy');await ready(f);}
  await page.screenshot({path:output+'comparison.png'});
  await page.setViewportSize({width:320,height:844});
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  await page.screenshot({path:output+'comparison-320.png'});
  records.push({comparison:true,allPalettes:true,sectionControls:true,wrapper320:true});
  await page.close();
} finally {
  await browser.close();
  await writeFile(output+'checks.json',JSON.stringify(records,null,2)+'\n');
}
console.log('Passed',records.length,'Studio palette records');
