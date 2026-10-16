// Real-browser checks for the October 2026 audit fixes. Serve the repo on 127.0.0.1:8100 first (npx http-server -p 8100 .).
// Needs Playwright with Chromium at /opt/pw-browsers/chromium.
import {chromium} from 'playwright';
import {createRequire} from 'node:module';
const {lessons}=createRequire(import.meta.url)('/home/claude/liya-and-family/.learning-test/lib/learning-content.js');
const answerAll=async(p,right=true)=>{const t=(await p.locator('#lesson-title').textContent()).trim();const l=lessons.find(x=>x.title===t);const qs=await p.locator('.practice-question').all();for(let i=0;i<qs.length;i++){const lg=(await qs[i].locator('legend').textContent()).replace(/^\d+\.\s*/,'').trim();const qq=l.questions.find(x=>x.prompt.trim()===lg);if(!qq)throw Error('question not found: '+lg);const a=qq.answer;await qs[i].locator('input[type=radio]').nth(right?a:(a+1)%qq.options.length).check();}};
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
await answerAll(p,true);
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
// 7. Save and continue with progress
{const {p,ctx,errs}=await fresh();await p.goto(base+'?grade=3#learn');await p.waitForTimeout(300);await p.getByRole('button',{name:'Math',exact:true}).click();
ok((await p.locator('.level-progress').textContent()).includes('0 of 12'),'level shows 0 of 12 done');
await p.getByRole('button',{name:/Start lesson/}).first().click();ok(await p.locator('.save-continue').count()===0,'no Save button before answers are checked');ok(await p.getByRole('button',{name:'Skip for now'}).count()===0,'no skipping ahead');
await answerAll(p,false);await p.getByRole('button',{name:'Check my answers'}).click();
ok(await p.locator('.not-yet-note').isVisible()&&await p.locator('.save-continue').count()===0,'wrong answers: no Save and continue');
ok(!(await p.locator('.active-lesson').textContent()).includes('The answer is'),'wrong answers do not reveal the right choice');
await p.getByRole('button',{name:'Try again'}).click();ok(await p.locator('.practice-question input:checked').count()===0,'Try again clears the wrong answers');
await p.getByRole('button',{name:'Close lesson'}).click();await p.waitForTimeout(200);
ok((await p.locator('.lesson-card').nth(0).textContent()).includes('Best so far 0/5'),'card shows best so far');ok(await p.getByRole('button',{name:'Keep practicing'}).count()===1,'card says Keep practicing');
ok(await p.locator('.lesson-card').nth(1).locator('.lesson-bottom button').isDisabled(),'step 2 is locked');ok((await p.locator('.lesson-card').nth(1).textContent()).includes('Finish step 1 first'),'locked card explains why');
await p.getByRole('button',{name:'Keep practicing'}).click();
for(let k=0;k<4;k++){await answerAll(p,true);await p.getByRole('button',{name:'Check my answers'}).click();
 ok((await p.locator('.saved-note').textContent()).includes((k+1)+' of 4 Math steps'),'saved note shows '+(k+1)+' of 4');
 ok(await p.locator('.step-track li.done').count()===k+1,'step tracker marks '+(k+1)+' done');
 if(k<3){await p.getByRole('button',{name:/Save and continue/}).click();await p.waitForTimeout(200);ok(await p.locator('.step-track li.current .step-dot').textContent()===String(k+2),'now on step '+(k+2));}
 else{await p.getByRole('button',{name:/Save and finish Math/}).click();await p.waitForTimeout(200);ok(await p.locator('#lesson-title').count()===0,'Save and finish closes the lesson');}}
ok((await p.locator('.learn-status').textContent()).includes('finished every Math step'),'finish message shown');
ok(await p.locator('.card-done').count()===4,'4 cards marked done');ok(await p.getByRole('button',{name:/Practice again/}).count()===4,'done cards say Practice again');await p.getByRole('button',{name:'All subjects'}).click();ok(await p.locator('.lesson-card .learn-btn.locked').count()===6,'Reading and Science steps 2 to 4 stay locked');await p.locator('.lesson-grid').screenshot({path:'/tmp/claude-0/-home-claude/560f7a84-74bf-5a77-8a8a-aa688ab539c3/scratchpad/cards.png'});ok((await p.locator('.level-progress').textContent()).includes('4 of 12'),'level shows 4 of 12 done');
await p.reload();await p.waitForTimeout(300);ok((await p.locator('.level-progress').textContent()).includes('4 of 12'),'progress kept after reload');
ok(errs.length===0,'no page errors');await ctx.close();}
// 8. Question banks: Grade 3 shows 5 of 10, and a new try draws a new mix
{const {p,ctx}=await fresh();await p.goto(base+'?grade=3#learn');await p.waitForTimeout(300);await p.getByRole('button',{name:/Start lesson/}).first().click();
ok(await p.locator('.practice-question').count()===5,'Grade 3 lesson shows 5 questions');const seen=new Set();for(let k=0;k<6;k++){for(const lg of await p.locator('.practice-question legend').allTextContents())seen.add(lg.replace(/^\d+\.\s*/,''));await p.getByRole('button',{name:'Close lesson'}).click();await p.waitForTimeout(100);await p.getByRole('button',{name:/Start lesson|Keep practicing|Practice again/}).first().click();await p.waitForTimeout(100);}
ok(seen.size>5,'different tries show different questions ('+seen.size+' seen)');
await answerAll(p,true);await p.getByRole('button',{name:'Check my answers'}).click();ok((await p.locator('.saved-note').textContent()).includes('All correct'),'5 of 5 correct counts as done');await ctx.close();}
{const {p,ctx}=await fresh();await p.goto(base+'?grade=4#learn');await p.waitForTimeout(300);await p.getByRole('button',{name:/Start lesson/}).first().click();ok(await p.locator('.practice-question').count()===3,'levels without a bank still show their 3 questions');await ctx.close();}
// 9. Parent report link works with 5-question tries
{const {p,ctx,errs}=await fresh();await p.goto(base+'?grade=2#learn');await p.waitForTimeout(300);await p.getByRole('button',{name:/Start lesson/}).first().click();await answerAll(p,true);await p.getByRole('button',{name:'Check my answers'}).click();await p.getByRole('button',{name:/Parent report/}).first().click();await p.waitForTimeout(200);await p.getByRole('button',{name:'Create report link'}).click();await p.waitForTimeout(200);ok((await p.locator('.phone-report-tools textarea').inputValue()).includes('#report='),'report link works after a 5-question try');ok(errs.length===0,'no page errors '+errs.join('|'));await ctx.close();}
await b.close();console.log('ALL AUDIT FIX CHECKS PASSED');
