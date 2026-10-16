// Real-browser checks for the October 2026 audit fixes. Serve the repo on 127.0.0.1:8100 first (npx http-server -p 8100 .).
// Needs Playwright with Chromium at /opt/pw-browsers/chromium.
import {chromium} from 'playwright';
const base='http://127.0.0.1:8100/index.html';
const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});
const ok=(c,m)=>{if(!c)throw Error('FAIL: '+m);console.log('pass: '+m);};
const fresh=async(vp={width:1280,height:900})=>{const ctx=await b.newContext({viewport:vp});await ctx.addInitScript(()=>{window.__spoken=[];class U{constructor(t){this.text=t;}}window.SpeechSynthesisUtterance=U;Object.defineProperty(window,'speechSynthesis',{value:{speak:u=>window.__spoken.push(u.text),cancel(){},getVoices:()=>[]},configurable:true});});const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));return {ctx,p,errs};};
// 1. Back button
{const {p,errs,ctx}=await fresh();await p.goto(base);await p.getByRole('button',{name:/Start learning/}).first().click();ok(p.url().endsWith('#learn'),'Start learning goes to #learn');
await p.getByRole('button',{name:/Start lesson/}).first().click();await p.waitForSelector('#lesson-title');ok(true,'lesson opens');
await p.goBack();await p.waitForTimeout(300);ok(await p.locator('#lesson-title').count()===0,'Back closes the lesson');ok(p.url().endsWith('#learn')&&await p.locator('.lesson-grid').isVisible(),'Back stays on the lesson list');
await p.goBack();await p.waitForTimeout(300);ok(await p.locator('.home-hero').isVisible(),'second Back returns to home, still on Ewket Kids');
await p.goForward();await p.waitForTimeout(300);ok(await p.locator('.lesson-grid').isVisible(),'Forward returns to lessons');
await p.getByRole('button',{name:/Start lesson/}).first().click();await p.getByRole('button',{name:'Close lesson'}).click();await p.waitForTimeout(300);ok(await p.locator('#lesson-title').count()===0,'Close lesson closes it');await p.goBack();await p.waitForTimeout(300);ok(await p.locator('.home-hero').isVisible(),'Back after Close goes home, no ghost lesson');
// 2. Continue
await p.getByRole('button',{name:/Start learning/}).first().click();await p.getByRole('button',{name:/Start lesson/}).first().click();const first=await p.locator('#lesson-title').textContent();
for(const fs of await p.locator('.practice-question').all()){await fs.locator('input[type=radio]').first().check();}
await p.getByRole('button',{name:'Check my answers'}).click();await p.getByRole('button',{name:'Home'}).click();await p.waitForTimeout(200);
const cont=p.locator('.continue-btn');ok(await cont.isVisible(),'Continue button appears after a lesson');const ct=await cont.textContent();ok(!ct.includes(first),'Continue points to the next unfinished lesson ('+ct.trim()+')');
await cont.click();await p.waitForSelector('#lesson-title');ok(ct.includes(await p.locator('#lesson-title').textContent()),'Continue opens that lesson');await p.goBack();await p.waitForTimeout(200);ok(await p.locator('.lesson-grid').isVisible(),'Back from a continued lesson shows the list');
ok(errs.length===0,'no page errors '+errs.join('|'));await ctx.close();}
// 3. Child link from portal
{const {p,ctx}=await fresh();await p.goto(base+'?student=EW001&grade=5#learn');await p.waitForTimeout(400);ok(!p.url().includes('student='),'student number removed from the address bar');ok((await p.locator('.learner-now').textContent()).includes('EW001'),'learning as EW001');ok(await p.locator('.grade-picker button[aria-pressed=true]').textContent().then(t=>t.startsWith('5')),'Grade 5 selected');
await p.goto(base+'?student=EW002&grade=k#learn');await p.waitForTimeout(400);ok((await p.locator('.learner-now').textContent()).includes('EW002'),'second child gets a separate learner');ok(await p.locator('.grade-picker button[aria-pressed=true]').textContent().then(t=>t.startsWith('K')),'K selected for second child');
await p.goto(base+'?student=EW001#learn');await p.waitForTimeout(400);ok((await p.locator('.learner-now').textContent()).includes('EW001'),'switches back to EW001');ok(await p.locator('.grade-picker button[aria-pressed=true]').textContent().then(t=>t.startsWith('5')),'EW001 keeps Grade 5');
await p.goto(base+'?student=<script>&grade=9#learn');await p.waitForTimeout(400);ok(!(await p.content()).includes('<script>&'),'bad values ignored');await ctx.close();}
// 4. Tablet menu + tap targets
{const {p,ctx}=await fresh({width:768,height:1024});await p.goto(base+'#learn');await p.waitForTimeout(300);const h=await p.locator('.learn-header').boundingBox();ok(h.height<130,'tablet header height '+Math.round(h.height)+'px');ok(!(await p.locator('#main-nav').isVisible()),'nav folded behind Menu');await p.getByRole('button',{name:/Menu/}).click();ok(await p.locator('#main-nav').isVisible(),'Menu opens the nav');await p.getByRole('button',{name:/Parent report/}).click();ok(!(await p.locator('#main-nav').isVisible())&&p.url().endsWith('#reports'),'choosing an item closes the menu');
const small=await p.evaluate(()=>[...document.querySelectorAll('a,button,input,select')].filter(e=>{const r=e.getBoundingClientRect();return r.width>0&&r.height>0&&getComputedStyle(e).visibility!=='hidden'&&(r.height<44)&&!e.closest('label')&&!e.matches('input[type=radio],input[type=checkbox]')&&e.closest('.learn-header,.learn-footer')}).map(e=>e.textContent.trim().slice(0,30)+':'+Math.round(e.getBoundingClientRect().height)));ok(small.length===0,'header and footer targets 44px+ '+small.join(', '));await ctx.close();}
{const {p,ctx}=await fresh({width:1280,height:900});await p.goto(base+'#learn');ok(await p.locator('#main-nav').isVisible()&&!(await p.locator('.nav-toggle').isVisible()),'desktop keeps the full nav');await ctx.close();}
// 5. Images
{const ctx=await b.newContext({viewport:{width:390,height:844},deviceScaleFactor:2});const p=await ctx.newPage();await p.goto(base);await p.waitForLoadState('networkidle');const src=await p.locator('.ewket-cover img').evaluate(i=>i.currentSrc);ok(/cover-(640|960)\.webp/.test(src),'phone loads a smaller cover: '+src.split('/').pop());await ctx.close();}
// 6. Auto read-aloud
{const {p,ctx}=await fresh();await p.goto(base+'?grade=pre#learn');await p.waitForTimeout(300);await p.getByRole('button',{name:/Start lesson/}).first().click();await p.waitForTimeout(700);let spoken=await p.evaluate(()=>window.__spoken.length);ok(spoken===1,'Pre-K lesson reads aloud by itself');
await p.getByLabel('Read each lesson aloud when it opens').uncheck();await p.getByRole('button',{name:'Close lesson'}).click();await p.getByRole('button',{name:/Start lesson/}).nth(1).click();await p.waitForTimeout(700);ok(await p.evaluate(()=>window.__spoken.length)===spoken,'switch off stops automatic reading');
await p.reload();await p.getByRole('button',{name:/Start lesson/}).first().click();await p.waitForTimeout(700);ok(await p.evaluate(()=>window.__spoken.length)===0,'the off choice is remembered after reload');
await p.getByLabel('Learning level').getByRole('button',{name:/^3/}).click();await p.getByRole('button',{name:/Start lesson/}).first().click();await p.waitForTimeout(700);ok(await p.locator('.auto-read').count()===0,'Grade 3 has no automatic reading switch');await ctx.close();}
await b.close();console.log('ALL AUDIT FIX CHECKS PASSED');
