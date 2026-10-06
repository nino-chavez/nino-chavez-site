// Automated prototype checks. Uses the photography project's installed Playwright.
// Run from this folder with node verify.cjs; the local preview must be on 4336.
const { chromium } = require('/Users/nino/Workspace/dev/sites/nino/nino-chavez-photography/node_modules/@playwright/test');
const fs=require('node:fs');const path=require('node:path');const assert=require('node:assert/strict');
const root=__dirname;const result={started:new Date().toISOString(),routes:[],interactions:[],errors:[],gateCanary:false};
const pages=['home','building','writing','article','photography','album','product','study','about'];
(async()=>{const browser=await chromium.launch({headless:true,channel:"chrome"});const ctx=await browser.newContext({viewport:{width:1440,height:900},deviceScaleFactor:1});const page=await ctx.newPage();page.setDefaultTimeout(8000);
page.on('pageerror',e=>result.errors.push(e.message));
try{
// Prove the overflow measurement detects a real 4px defect before relying on it.
await page.setViewportSize({width:390,height:844});await page.setContent('<meta name="viewport" content="width=device-width,initial-scale=1"><style>body{margin:0}div{width:394px;height:10px}</style><div></div>');
result.gateCanary=await page.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth===4);assert(result.gateCanary,'Overflow canary failed');
for(const c of ['a','b','c']){
 for(const width of [1440,390,320]){
  await page.setViewportSize({width,height:width===1440?900:844});
  for(const surface of pages){
   const url=`http://127.0.0.1:4336/${c}/index.html?page=${surface}`;await page.goto(url,{waitUntil:'domcontentloaded'});await page.locator('h1').waitFor();await page.evaluate(()=>document.fonts.ready);
   await page.evaluate(()=>Promise.race([Promise.all([...document.images].filter(i=>i.getBoundingClientRect().top<innerHeight).map(i=>i.decode().catch(()=>{}))),new Promise(r=>setTimeout(r,5000))]));
   const info=await page.evaluate(()=>({h1:document.querySelectorAll('h1').length,main:document.querySelectorAll('main').length,overflow:document.documentElement.scrollWidth-document.documentElement.clientWidth,broken:[...document.images].filter(i=>i.complete&&!i.naturalWidth).map(i=>i.src),firstPhoto:document.querySelector('[data-view-photo]')?.getBoundingClientRect().top,links:[...document.querySelectorAll('a')].map(a=>a.getAttribute('href')).filter(h=>!h||h==='#')}));
   result.routes.push({concept:c,width,surface,...info});
   if(width!==320)await page.screenshot({path:path.join(root,'evidence',`${c}-${surface}-${width}.png`)});
  }
 }
 await page.setViewportSize({width:390,height:844});await page.goto(`http://127.0.0.1:4336/${c}/index.html?page=album`);
 await page.locator('[data-photo-search]').fill('nothing-will-match-0926');assert.equal(await page.locator('[data-view-photo]:visible').count(),0);assert(await page.locator('[data-photo-empty]').isVisible());
 await page.locator('[data-photo-reset]').click();assert.equal(await page.locator('[data-view-photo]:visible').count(),43);
 await page.locator('[data-view-photo]').first().click();assert(await page.locator('dialog').isVisible());await page.locator('[data-photo-next]').click();assert.match(await page.locator('[data-viewer-position]').innerText(),/^2\s*\/\s*43/);await page.keyboard.press('Escape');assert(!(await page.locator('dialog').isVisible()));assert.equal(await page.evaluate(()=>document.activeElement.dataset.viewPhoto),'0');
 await page.setViewportSize({width:320,height:844});await page.locator('[data-view-photo]').first().click();const dialogFit=await page.locator('dialog').evaluate(d=>d.scrollWidth<=d.clientWidth);assert(dialogFit,'Viewer controls overflow');await page.keyboard.press('Escape');
 await page.goto(`http://127.0.0.1:4336/${c}/index.html?page=building`);await page.locator('[data-product-search]').fill('nothing-will-match-0926');assert(await page.locator('[data-product-empty]').isVisible());await page.locator('[data-product-search]').fill('');await page.locator('[data-product-filter="Web"]').click();assert.equal(await page.locator('[data-product]:visible').count(),2);await page.locator('[data-product-filter="all"]').click();assert.equal(await page.locator('[data-product]:visible').count(),5);
 const menu=page.locator('details.nav-mobile');await menu.locator('summary').click();assert(await menu.evaluate(d=>d.open));await page.keyboard.press('Escape');assert(!(await menu.evaluate(d=>d.open)));
 for(const product of ['minder','rotation','rally','cutting-board','yawn']){await page.goto(`http://127.0.0.1:4336/${c}/index.html?page=product&product=${product}`);assert.equal(await page.locator('h1').count(),1)}
 result.interactions.push({concept:c,photoSearch:'pass',searchReset:'pass',viewerKeyboardAndFocus:'pass',viewer320:'pass',productFilters:'pass',mobileMenu:'pass',fiveProducts:'pass'});
}
await page.setViewportSize({width:1440,height:1000});await page.goto('http://127.0.0.1:4336/comparison.html');await page.selectOption('#surface','album');await page.locator('[data-size="phone"]').click();await page.locator('[data-concept="b"]').click();await page.frameLocator('#preview').locator('[data-view-photo]').first().waitFor();assert.match(await page.locator('#preview').getAttribute('src'),/^b\/index.html\?page=album/);await page.locator('[data-concept="c"]').click();await page.frameLocator('#preview').locator('[data-view-photo]').first().waitFor();result.comparison='Preserves album and phone size across switches';
}catch(e){result.errors.push(e.stack)}finally{await browser.close();result.finished=new Date().toISOString();result.failures=result.routes.filter(r=>r.h1!==1||r.main!==1||r.overflow>0||r.broken.length||r.links.length||(r.surface==='album'&&r.width<700&&r.firstPhoto>=844));fs.writeFileSync(path.join(root,'evidence','checks.json'),JSON.stringify(result,null,2));console.log(JSON.stringify({routes:result.routes.length,interactions:result.interactions,failures:result.failures,errors:result.errors,gateCanary:result.gateCanary},null,2));if(result.errors.length||result.failures.length)process.exitCode=1}
})();
