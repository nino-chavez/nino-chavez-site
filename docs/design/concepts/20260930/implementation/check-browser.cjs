const {chromium}=require('/Users/nino/Workspace/dev/sites/nino/nino-chavez-photography/node_modules/@playwright/test');
const fs=require('node:fs');const path=require('node:path');const assert=require('node:assert/strict');
const out=path.join(__dirname,'evidence'),base='http://127.0.0.1:4343';
const routes=[['home','/'],['building','/work'],['writing','/blog'],['about','/about'],['photography','/photography'],['process','/demos'],['guides','/learn'],['rally','/work/rally-hq'],['privacy','/privacy'],['article','/blog/the-work-doesnt-end-at-send'],['tutorial','/blog/tutorials/diff-your-spec-against-its-system-class'],['album','/photography/albums/college-womens-vb-millikin-at-north-central-09-23-2026-DWdCET'],['timeline','/photography/timeline']];
(async()=>{const browser=await chromium.launch({channel:'chrome',headless:true});const ctx=await browser.newContext({deviceScaleFactor:1});const page=await ctx.newPage();page.setDefaultTimeout(10000);const report={routes:[],errors:[],interactions:[],canary:false};
await ctx.route('**/*',route=>['GET','HEAD','OPTIONS'].includes(route.request().method())?route.continue():route.fulfill({status:403,body:'Read-only review'}));
page.on('pageerror',e=>report.errors.push({url:page.url(),message:e.message}));
try{
await page.setViewportSize({width:390,height:844});await page.setContent('<meta name="viewport" content="width=device-width,initial-scale=1"><style>body{margin:0}div{width:394px;height:10px}</style><div></div>');report.canary=await page.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth===4);assert(report.canary);
for(const width of [1440,390]){
 await page.setViewportSize({width,height:width===1440?900:844});
 for(const [name,route] of routes){
 const response=await page.goto(base+route,{waitUntil:'networkidle',timeout:45000});await page.evaluate(()=>document.fonts.ready);
 await page.evaluate(()=>Promise.race([Promise.all([...document.images].filter(i=>i.getBoundingClientRect().top<innerHeight).map(i=>i.decode().catch(()=>{}))),new Promise(r=>setTimeout(r,5000))]));
 const info=await page.evaluate(()=>({title:document.title,h1:document.querySelectorAll('h1').length,main:document.querySelectorAll('main').length,overflow:document.documentElement.scrollWidth-document.documentElement.clientWidth,broken:[...document.images].filter(i=>i.getBoundingClientRect().top<innerHeight && i.complete && !i.naturalWidth).map(i=>i.getAttribute('src')),nav:[...document.querySelectorAll('nav[aria-label="Primary navigation"] a')].map(a=>a.textContent.trim()),photoTop:document.querySelector('.album-photo-grid')?.getBoundingClientRect().top}));
 report.routes.push({name,width,status:response.status(),...info});await page.screenshot({path:path.join(out,`${name}-${width}.png`)});
 }
}
await page.setViewportSize({width:390,height:844});
for(const [name,route] of [routes[0],routes[9],routes[11]]){
 await page.goto(base+route,{waitUntil:'networkidle'});const trigger=page.getByRole('button',{name:'Menu',exact:true});await trigger.click();const dialog=page.locator('dialog[open]');assert.equal(await dialog.count(),1);await page.keyboard.press('Escape');await page.waitForTimeout(150);assert.equal(await dialog.count(),0);assert(await trigger.evaluate(e=>e===document.activeElement));
 await trigger.click();await page.goBack();assert.equal(await dialog.count(),0);report.interactions.push(`${name}: menu Escape/Back/focus`);
}
await page.goto(base+'/work?domain=Publishing&state=live',{waitUntil:'networkidle'});assert.equal(await page.locator('.operated-product').count(),0);assert.equal(await page.locator('#work-library').count(),1);report.interactions.push('Filtered Building opens the existing results without the curated introduction');
await page.goto(base+'/blog',{waitUntil:'networkidle'});await page.locator('.writing-featured a').click();await page.waitForLoadState('networkidle');assert(new URL(page.url()).origin===base);assert(new URL(page.url()).pathname.startsWith('/blog/'));report.interactions.push('Main writing entrance reaches local article across the application seam');
}catch(e){report.errors.push({message:e.stack})}finally{report.knownBaseline=['The existing tutorial template and authored tutorial both contain a level-one heading; two are retained in this route, with no source-copy edits.'];report.finished=new Date().toISOString();report.failures=report.routes.filter(r=>r.status!==200||r.h1!==(r.name==='tutorial'?2:1)||r.main!==1||r.overflow>0||r.broken.length);fs.writeFileSync(path.join(out,'checks.json'),JSON.stringify(report,null,2));await browser.close();console.log(JSON.stringify({routes:report.routes.length,failures:report.failures,errors:report.errors,interactions:report.interactions},null,2));if(report.failures.length||report.errors.length)process.exitCode=1}
})();
