// Browser check for the level check. Run from a folder with playwright, with the site served on :8100.
import {chromium} from 'playwright';import {createRequire} from 'node:module';
const require=createRequire(import.meta.url);const {placementQuestions}=require('/home/claude/liya-and-family/.learning-test/lib/placement.js');
const base='http://localhost:8100/index.html',shots=process.env.SHOTS||'';
const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});const errors=[];
async function round(p,g,right){const qs=placementQuestions(g);for(let i=0;i<qs.length;i++){const pick=right?qs[i].answer:(qs[i].answer+1)%qs[i].options.length;await p.locator('#placement fieldset').nth(i).locator('input[type=radio]').nth(pick).check();}await p.locator('#placement button.big-action').click();await p.waitForTimeout(200);}
const ok=(c,m)=>{if(!c)throw new Error('FAIL: '+m);console.log('pass:',m);};
for(const [w,h,n] of [[390,900,'phone'],[1280,900,'desk']]){
 const ctx=await b.newContext({viewport:{width:w,height:h}});const p=await ctx.newPage();p.on('pageerror',e=>errors.push(e.message));
 await p.goto(base+'?grade=3#learn');await p.evaluate(()=>localStorage.setItem('ewket-auto-read','off'));await p.waitForTimeout(300);
 await p.getByRole('button',{name:'Find my level'}).click();
 ok(await p.locator('#placement fieldset').count()===4,n+': four questions');ok(/Round 1: Grade 3/.test(await p.locator('#placement').textContent()),n+': starts at the chosen level');
 if(shots)await p.locator('#placement').screenshot({path:`${shots}/placement-q-${n}.png`});
 await round(p,'3',false);ok(/Round 2: Grade 2/.test(await p.locator('#placement').textContent()),n+': moves down after a hard round');
 await round(p,'2',true);const t=await p.locator('#placement').textContent();ok(/Start with Grade 2/.test(t)&&/Grade 3: 0 of 4/.test(t)&&/Grade 2: 4 of 4/.test(t),n+': suggests Grade 2 with round scores');
 if(shots)await p.locator('#placement').screenshot({path:`${shots}/placement-r-${n}.png`});
 await p.getByRole('button',{name:'Use Grade 2'}).click();await p.waitForTimeout(200);
 ok(await p.locator('.grade-picker button[aria-pressed=true]').textContent().then(x=>/^2/.test(x)),n+': Use Grade 2 switches the level');
 await p.getByRole('button',{name:'Find my level'}).click();await round(p,'2',true);ok(/Round 2: Grade 3/.test(await p.locator('#placement').textContent()),n+': moves up after a strong round');await round(p,'3',false);ok(/Start with Grade 2/.test(await p.locator('#placement').textContent()),n+': stops at the highest level passed');
 ok(!(await p.locator('#placement').textContent()).includes('Use Grade'),n+': no switch offered when it matches');
 await ctx.close();}
ok(errors.length===0,'no page errors '+errors.join(';'));await b.close();console.log('ALL PLACEMENT CHECKS PASSED');
