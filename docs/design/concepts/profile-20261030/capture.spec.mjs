// Reproducible render captures and bounded interaction checks for this comparison.
// Serve repository root at 127.0.0.1:4327 before running this local-only suite.
import { test, expect } from '@playwright/test';
import { writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { destinations, profile, projects } from './content.js';
const base='http://127.0.0.1:4327/docs/design/concepts/profile-20261030/';
const evidence=fileURLToPath(new URL('./evidence/',import.meta.url));
const overflows=page=>page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1);

for(const concept of ['a','b','c'])for(const surface of ['home','links'])for(const [device,width,height] of [['desktop',1440,900],['phone',390,844]]){
  test(`${concept} ${surface} ${device}`,async({page})=>{
    const errors=[];page.on('pageerror',e=>errors.push(e.message));
    await page.setViewportSize({width,height});
    await page.goto(`${base}${concept}/${surface==='home'?'index':'links'}.html`);
    await expect(page.locator('main h1')).toBeVisible();
    await page.evaluate(()=>document.fonts.ready);
    await page.waitForFunction(()=>[...document.images].every(i=>i.complete));
    expect(await page.evaluate(()=>[...document.images].filter(i=>!i.naturalWidth).map(i=>i.src))).toEqual([]);
    expect(await overflows(page)).toBe(false);
    expect(errors).toEqual([]);
    if(surface==='links'){
      const hrefs=await page.locator('main a').evaluateAll(as=>as.map(a=>a.href));
      for(const dest of destinations)expect(hrefs.filter(h=>h===new URL(dest.href).href),dest.name).toHaveLength(1);
    }else{
      await expect(page.locator('main')).toContainText(profile.intro);
      for(const p of projects)await expect(page.locator('main')).toContainText(p.description);
    }
    await page.screenshot({path:`${evidence}${concept}-${surface}-${device}.jpg`,quality:85,type:'jpeg'});
    await page.screenshot({path:`${evidence}${concept}-${surface}-${device}-full.jpg`,quality:85,type:'jpeg',fullPage:true});
    const metrics=await page.evaluate(()=>({width:innerWidth,height:innerHeight,documentHeight:document.documentElement.scrollHeight,headings:[...document.querySelectorAll('h1,h2,h3')].map(h=>({text:h.textContent,size:getComputedStyle(h).fontSize})),links:[...document.querySelectorAll('main a')].map(a=>({text:a.innerText,href:a.href}))}));
    await writeFile(`${evidence}${concept}-${surface}-${device}.json`,JSON.stringify(metrics,null,2)+'\n');
    // Text enlargement is a separate stress state, not a claim of full accessibility.
    if(device==='phone'){
      await page.evaluate(()=>{const sizes=[...document.querySelectorAll('h1,h2,h3,p,a,span,strong,small,figcaption')].map(e=>[e,parseFloat(getComputedStyle(e).fontSize)]);for(const [e,size] of sizes)e.style.fontSize=`${size*2}px`;});
      expect(await overflows(page),'horizontal overflow with doubled text').toBe(false);
      await page.screenshot({path:`${evidence}${concept}-${surface}-text200.jpg`,quality:80,type:'jpeg',fullPage:true});
    }
  });
}

test('comparison controls and history',async({page})=>{
  await page.setViewportSize({width:1440,height:1000});await page.goto(base);
  await page.locator('[data-concept="b"]').click();
  await page.locator('[data-surface="links"]').click();
  await page.locator('[data-size="phone"]').click();
  await expect(page.locator('#preview')).toHaveAttribute('src','b/links.html');
  await expect(page.locator('[data-size="phone"]')).toHaveAttribute('aria-pressed','true');
  await expect(page.frameLocator('#preview').getByRole('heading',{name:'Links',exact:true})).toBeVisible();
  await page.goBack();await expect(page.locator('[data-size="desktop"]')).toHaveAttribute('aria-pressed','true');
  await page.locator('[data-concept="a"]').click();await page.locator('[data-surface="home"]').click();
  await page.screenshot({path:`${evidence}comparison.jpg`,quality:88,type:'jpeg',fullPage:true});
  // Confirm the overflow check can detect a real defect before relying on it.
  await page.evaluate(()=>{const d=document.createElement('div');d.id='overflow-probe';d.style.width='5000px';d.textContent='check probe';document.body.append(d);});
  expect(await overflows(page)).toBe(true);
  await page.locator('#overflow-probe').evaluate(e=>e.remove());
  expect(await overflows(page)).toBe(false);
});
