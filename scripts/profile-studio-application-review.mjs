import {createRequire} from 'node:module';
import {mkdir, writeFile} from 'node:fs/promises';
const require = createRequire(new URL('../package.json', import.meta.url));
const {chromium, expect} = require('@playwright/test');
const origin = process.env.PROFILE_REVIEW_BASE_URL || 'http://127.0.0.1:8872';
const output = process.env.PROFILE_REVIEW_OUTPUT || new URL('../.artifacts/studio-application/', import.meta.url).pathname;
await mkdir(output, {recursive:true});
const browser = await chromium.launch({headless:true});
const records = [];
async function ready(page) {
  await page.evaluate(()=>document.fonts.ready);
  await page.locator('img').evaluateAll(images=>{
    images.forEach(image=>image.loading='eager');
    return Promise.all(images.map(image=>image.decode()));
  });
}
async function content(page) {
  return page.evaluate(()=>({
    text:document.body.innerText,
    links:[...document.querySelectorAll('a')].map(a=>a.getAttribute('href')),
    images:[...document.images].map(i=>({src:i.getAttribute('src'),width:i.getBoundingClientRect().width,height:i.getBoundingClientRect().height,fit:getComputedStyle(i).objectFit,filter:getComputedStyle(i).filter})),
    headings:[...document.querySelectorAll('h1,h2,h3')].map(e=>({text:e.innerText,size:getComputedStyle(e).fontSize,family:getComputedStyle(e).fontFamily})),
    overflow:document.documentElement.scrollWidth>innerWidth,
  }));
}
async function audit(page) {
  return page.evaluate(async()=> (await axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa']}})).violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)})));
}
try {
  for(const width of [1440,390,320,700]) {
    const page=await browser.newPage({viewport:{width,height:width===1440?1000:844},reducedMotion:'reduce'});
    const errors=[];page.on('pageerror',e=>errors.push(e.message));
    await page.goto(origin+'/__profile_review/rethink/studio.html?palette=porcelain');
    await ready(page);
    const previous=await content(page);
    if(width!==700) await page.screenshot({path:output+'previous-'+width+'.png',fullPage:true,animations:'disabled'});
    await page.goto(origin+'/__profile_review/rethink/studio.html?palette=porcelain-refined');
    await ready(page);
    const refined=await content(page);
    expect(refined.text).toBe(previous.text);
    expect(refined.links).toEqual(previous.links);
    expect(refined.images).toEqual(previous.images);
    expect(refined.headings).toEqual(previous.headings);
    expect(refined.overflow).toBe(false);
    await expect(page.locator('.identity-rail')).toHaveCSS('background-color','rgb(36, 76, 194)');
    await expect(page.locator('.writing')).toHaveCSS('background-color','rgb(229, 234, 244)');
    await expect(page.locator('.photo-line h2')).toHaveCSS('color','rgb(35, 51, 67)');
    await page.addScriptTag({content:require('axe-core').source});
    expect(await audit(page)).toEqual([]);
    if(width!==700) {
      await page.screenshot({path:output+'refined-'+width+'-top.png',animations:'disabled'});
      await page.screenshot({path:output+'refined-'+width+'.png',fullPage:true,animations:'disabled'});
      for(const section of ['writing','work','about']) {
        await page.locator('.'+section).evaluate(e=>e.scrollIntoView({block:'start'}));
        if(width===1440) expect(Math.abs((await page.locator('.identity-rail').boundingBox()).y)).toBeLessThan(1);
        await page.screenshot({path:output+'refined-'+section+'-'+width+'.png',animations:'disabled'});
      }
    }
    for(const selector of ['.skip-link','.primary-nav a[href^="mailto:"]','.about-actions a[href^="mailto:"]','.photo-link']) {
      const link=page.locator(selector);await link.focus();await expect(link).toBeFocused();await expect(link).toHaveCSS('outline-width','3px');expect(await audit(page)).toEqual([]);
    }
    await page.locator('.photo-link').hover();
    await expect(page.locator('.photo-line h2')).toHaveCSS('color','rgb(36, 76, 194)');
    expect(await page.locator('img').evaluateAll(es=>es.every(e=>getComputedStyle(e).filter==='none'))).toBe(true);
    expect(await page.locator('a').evaluateAll(es=>es.every(e=>getComputedStyle(e).transitionDuration.split(',').every(v=>parseFloat(v)<=.01)))).toBe(true);
    if(width===390) {
      const paragraph=page.locator('.about-copy p').first();const normal=await paragraph.evaluate(e=>parseFloat(getComputedStyle(e).fontSize));
      await page.addStyleTag({content:'html{font-size:200%!important}'});
      await expect.poll(()=>paragraph.evaluate(e=>parseFloat(getComputedStyle(e).fontSize))).toBeCloseTo(normal*2,1);
      expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
      await page.screenshot({path:output+'refined-enlarged.png',fullPage:true,animations:'disabled'});
    }
    expect(errors).toEqual([]);
    records.push({width,sourceTextLinksImagesFontsUnchanged:true,noOverflow:true,normalAndFourFocusStateScansPass:true,colorSurfaces:true,photoHover:true,reducedMotion:true,enlargedText:width===390});
    await page.close();
  }
  const page=await browser.newPage({viewport:{width:1440,height:1100}});const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto(origin+'/__profile_review/studio-application.html');
  for(const application of ['previous','refined']) {
    await page.locator(`[data-application="${application}"]`).click();
    for(const frame of page.frames().filter(f=>f.parentFrame())) {
      await expect(frame.locator('html')).toHaveAttribute('data-studio-palette',application==='refined'?'porcelain-refined':'porcelain');await ready(frame);
    }
    for(const section of ['writing','work','about','top']) {
      await page.locator('#position').selectOption(section);
      for(const frame of page.frames().filter(f=>f.parentFrame())) {
        if(section==='top') await expect.poll(()=>frame.evaluate(()=>scrollY)).toBe(0);
        else await expect.poll(()=>frame.locator('.'+section).evaluate(e=>Math.abs(scrollY-Math.min(scrollY+e.getBoundingClientRect().top,document.documentElement.scrollHeight-innerHeight)))).toBeLessThan(2);
      }
    }
    await page.screenshot({path:output+'comparison-'+application+'.png'});
  }
  await page.setViewportSize({width:320,height:844});expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);await page.screenshot({path:output+'comparison-320.png'});
  expect(errors).toEqual([]);records.push({comparison:true,bothApplications:true,bothFrameSectionsAlign:true,wrapper320:true,pageErrors:errors});await page.close();
} finally {
  await browser.close();await writeFile(output+'checks.json',JSON.stringify(records,null,2)+'\n');
}
console.log('Passed',records.length,'Studio application records');
