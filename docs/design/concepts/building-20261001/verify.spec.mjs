import { test, expect } from '@playwright/test';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs';
const root='/docs/design/concepts/building-20261001/';
const evidence=fileURLToPath(new URL('./evidence/',import.meta.url));
for(const concept of ['a','b','c'])for(const viewport of [{width:1440,height:900},{width:390,height:844}]){
  test(`${concept}: ${viewport.width}px overview and archive`,async({page})=>{
    const errors=[];page.on('pageerror',e=>errors.push(e.message));
    await page.setViewportSize(viewport);
    await page.goto(root+concept+'.html');
    await page.waitForFunction(()=>document.body.dataset.ready==='true');
    await page.evaluate(async()=>{await document.fonts.ready;await Promise.all([...document.images].map(i=>i.decode().catch(()=>{})));});
    const geometry=await page.evaluate(()=>({width:document.documentElement.clientWidth,scrollWidth:document.documentElement.scrollWidth,height:document.documentElement.scrollHeight,brokenImages:[...document.images].filter(i=>!i.complete||i.naturalWidth===0).length}));
    expect(geometry.scrollWidth).toBeLessThanOrEqual(geometry.width);
    expect(geometry.brokenImages).toBe(0);
    await page.screenshot({path:`${evidence}${concept}-${viewport.width}.png`});
    expect(geometry.height).toBeLessThan(8192);
    await page.screenshot({path:`${evidence}${concept}-${viewport.width}-full.png`,fullPage:true});
    if(concept==='c')await page.locator('#everyday').screenshot({path:`${evidence}c-${viewport.width}-everyday.png`});
    if(concept==='b'){
      await page.getByRole('button',{name:/Yawn/}).click();
      await expect(page.locator('#selected-project h3')).toHaveText('Yawn');
      await expect(page.locator('#selected-project')).toContainText('Internal alpha');
      await expect(page.getByRole('button',{name:/Yawn/})).toBeFocused();
      await expect(page).toHaveURL(/project=yawn/);
      await page.screenshot({path:`${evidence}b-${viewport.width}-yawn.png`});
      await page.goBack();
      await expect(page.locator('#selected-project h3')).toHaveText('Minder');
    }
    await page.getByRole('link',{name:'Browse all work',exact:true}).click();
    await expect(page.locator('#overview')).toBeHidden();
    await expect(page.locator('.archive-row')).toHaveCount(34);
    await expect(page.getByRole('heading',{name:'Building',exact:true})).toBeVisible();
    await page.getByRole('searchbox',{name:'Search work'}).fill('no-such-work-987654');
    await expect(page.getByRole('heading',{name:'No work matches these filters.'})).toBeVisible();
    await page.screenshot({path:`${evidence}${concept}-${viewport.width}-empty.png`});
    await page.locator('.empty').getByRole('button',{name:'Clear filters'}).click();
    await expect(page.locator('.archive-row')).toHaveCount(34);
    await page.getByRole('combobox',{name:'Domain',exact:true}).selectOption('Volleyball');
    await expect(page).toHaveURL(/domain=Volleyball/);
    expect(await page.locator('.archive-row').count()).toBeGreaterThan(0);
    expect(await page.locator('.archive-row').count()).toBeLessThan(34);
    await page.reload();
    await expect(page.getByRole('combobox',{name:'Domain',exact:true})).toHaveValue('Volleyball');
    await page.getByRole('link',{name:/Back to the overview/}).click();
    await expect(page.locator('#overview')).toBeVisible();
    expect(errors).toEqual([]);
    fs.writeFileSync(`${evidence}${concept}-${viewport.width}.json`,JSON.stringify({concept,viewport,geometry,errors,archiveFlow:'34 items; empty; clear; filter; reload; return passed'},null,2)+'\n');
  });
}
test('overflow measurement rejects an injected defect',async({page})=>{
  await page.setViewportSize({width:390,height:844});await page.goto(root+'a.html');
  await page.evaluate(()=>{const el=document.createElement('div');el.id='overflow-canary';el.style.cssText='position:absolute;left:0;top:0;width:calc(100vw + 4px);height:1px';document.body.append(el);});
  expect(await page.evaluate(()=>document.documentElement.scrollWidth>document.documentElement.clientWidth)).toBe(true);
  await page.evaluate(()=>document.querySelector('#overflow-canary').remove());
  expect(await page.evaluate(()=>document.documentElement.scrollWidth>document.documentElement.clientWidth)).toBe(false);
});
test('comparison switches concept and phone viewport',async({page})=>{
  await page.goto(root+'comparison.html?concept=a&size=desktop');
  await expect(page.frameLocator('#preview').getByRole('heading',{name:'Building',exact:true})).toBeVisible();
  await page.getByRole('button',{name:'B · Project browser'}).click();
  await expect(page.frameLocator('#preview').getByRole('button',{name:/Yawn/})).toBeVisible();
  await page.getByRole('button',{name:'Phone',exact:true}).click();
  await expect(page.locator('iframe')).toHaveClass('phone');
  await expect.poll(()=>page.frameLocator('#preview').locator('body').evaluate(()=>innerWidth)).toBe(390);
  await page.getByRole('button',{name:'C · By purpose'}).click();
  await expect(page.frameLocator('#preview').getByRole('heading',{name:'Everyday software',exact:true})).toBeVisible();
});
