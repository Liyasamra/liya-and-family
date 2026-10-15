const assert=require('node:assert/strict');
const fs=require('node:fs');
const {JSDOM}=require('jsdom');
const {lessons,grades}=require('../.learning-test/lib/learning-content.js');
const {visualActivities}=require('../.learning-test/lib/visual-learning.js');
const html=fs.readFileSync('index.html','utf8');
assert.equal(Object.keys(visualActivities).length,24);
for(const grade of grades)for(const subject of ['Math','Reading','Science'])assert.equal(lessons.filter(l=>l.grade===grade.id&&l.subject===subject&&visualActivities[l.id]).length,1);
for(const [id,a] of Object.entries(visualActivities)){assert.ok(lessons.some(l=>l.id===id));if(a.kind==='choice'){assert.equal(a.options.length,3);assert.ok(a.answer>=0&&a.answer<3);}if(a.kind==='sequence')assert.equal(a.steps.length,3);}
let cancelled=0;const spoken=[];
function create(speech){return new JSDOM(html,{url:'https://learning.test/#learn',runScripts:'dangerously',pretendToBeVisual:true,beforeParse(w){w.HTMLElement.prototype.scrollIntoView=function(){};if(speech){w.SpeechSynthesisUtterance=class {constructor(text){this.text=text;}};w.speechSynthesis={getVoices:()=>[{name:'Remote',lang:'en-US',localService:false},{name:'Local',lang:'en-GB',localService:true}],cancel:()=>cancelled++,speak:u=>spoken.push(u)};}}});}
const delay=()=>new Promise(r=>setTimeout(r,25));
let dom=create(true),doc=dom.window.document;
function click(text,scope=doc){const b=[...scope.querySelectorAll('button')].find(b=>b.textContent.trim()===text||b.getAttribute('aria-label')===text);assert.ok(b,`Missing button: ${text}`);assert.equal(b.disabled,false,`Disabled: ${text}`);b.click();}
function input(el,value){Object.getOwnPropertyDescriptor(dom.window.HTMLInputElement.prototype,'value').set.call(el,value);el.dispatchEvent(new dom.window.Event('input',{bubbles:true}));}
async function open(id){const l=lessons.find(l=>l.id===id);click('Learn',doc.querySelector('nav'));await delay();const label=grades.find(g=>g.id===l.grade).label;[...doc.querySelectorAll('.grade-picker button')].find(b=>b.textContent.includes(label)).click();await delay();click(l.subject,doc.querySelector('.subject-picker'));await delay();const card=[...doc.querySelectorAll('.lesson-card')].find(c=>c.querySelector('h3').textContent===l.title);assert.ok(card.querySelector('.picture-card-label'));card.querySelector('button').click();await delay();assert.equal(doc.querySelector('#lesson-title').textContent,l.title);assert.ok(doc.querySelector('.visual-lab'));}
const lab=()=>doc.querySelector('.visual-lab');
const feedback=()=>lab().querySelector('.visual-feedback')?.textContent||'';
(async()=>{
 await delay();
 for(const [id,a] of Object.entries(visualActivities)){
  await open(id);
  if(a.kind==='choice'){
   const bs=[...lab().querySelectorAll('.picture-choices button')];bs[(a.answer+1)%3].click();await delay();assert.match(feedback(),/clues again/);bs[a.answer].click();await delay();assert.match(feedback(),/You found it/);
  }else if(a.kind==='sequence'){
   for(const b of lab().querySelectorAll('.picture-choices button')){b.click();await delay();}click('Check picture order',lab());await delay();assert.match(feedback(),/Try another order/);click('Start again',lab());await delay();
   for(const step of a.steps){click(step.text,lab());await delay();}click('Undo last picture',lab());await delay();assert.equal(lab().querySelectorAll('.picture-choices button:disabled').length,2);click(a.steps[2].text,lab());await delay();click('Check picture order',lab());await delay();assert.match(feedback(),/in order/);
  }else if(a.kind==='count'){
   const apples=lab().querySelectorAll('.apple-counter button');apples[0].click();await delay();apples[0].click();await delay();assert.match(feedback(),/1 counted/);apples[1].click();apples[2].click();await delay();assert.match(feedback(),/3 counted/);click('Count again',lab());await delay();assert.match(feedback(),/0 counted/);
  }else if(a.kind==='ten'){
   const spaces=lab().querySelectorAll('.ten-frame button');assert.equal([...spaces].filter(b=>b.disabled).length,6);for(const b of [...spaces].slice(6))b.click();await delay();assert.match(feedback(),/6 \+ 4 = 10/);
  }else if(a.kind==='place'){
   assert.match(feedback(),/2 tens \+ 4 ones = 24/);lab().querySelector('[aria-label="Increase tens"]').click();await delay();assert.match(feedback(),/3 tens \+ 4 ones = 34/);
  }else if(a.kind==='regroup'){
   assert.match(feedback(),/3 tens \+ 12 ones = 42/);click('Trade 10 ones for 1 ten',lab());await delay();assert.match(feedback(),/4 tens \+ 2 ones = 42/);assert.equal(lab().querySelectorAll('.ten-rod').length,4);assert.equal(lab().querySelectorAll('.unit-blocks span').length,2);click('Undo the trade',lab());await delay();assert.equal(lab().querySelectorAll('.unit-blocks span').length,12);
  }else if(a.kind==='groups'){
   assert.match(feedback(),/4 × 3 = 12/);lab().querySelector('[aria-label="Increase objects per group"]').click();await delay();assert.match(feedback(),/4 × 4 = 16/);assert.equal(lab().querySelectorAll('.object-dot').length,16);
  }else if(a.kind==='equivalent'||a.kind==='fraction-add'){
   const bs=lab().querySelectorAll('.fraction-bar button');bs[0].click();await delay();click('Check the shaded amount',lab());await delay();assert.match(feedback(),/different number/);bs[1].click();if(a.kind==='fraction-add')bs[2].click();await delay();click('Check the shaded amount',lab());await delay();assert.match(feedback(),/matched the amount/);
  }else if(a.kind==='rate'){
   input(lab().querySelector('input'),'4');await delay();click('Check unit price',lab());await delay();assert.match(feedback(),/Divide the total/);input(lab().querySelector('input'),'3');await delay();click('Check unit price',lab());await delay();assert.match(feedback(),/price for one/);lab().querySelector('[aria-label="Increase notebooks"]').click();await delay();assert.match(lab().querySelector('.model-equation').textContent,/5 notebooks cost \$15/);
  }else if(a.kind==='plant'){
   click('Add light',lab());await delay();click('Add water',lab());await delay();assert.match(feedback(),/time to grow/);click('Remove water',lab());await delay();assert.match(feedback(),/Add both/);
  }else if(a.kind==='cycle'){
   assert.equal(lab().querySelectorAll('.water-cycle-art path[marker-end]').length,3);
   click('Evaporation',lab());await delay();assert.match(feedback(),/liquid water becomes water vapor/);click('Condensation',lab());await delay();assert.match(feedback(),/tiny liquid droplets/);click('Precipitation',lab());await delay();assert.match(feedback(),/falls from clouds/);
  }
 }
 // Picture exploration is separate from scored practice.
 const stored=JSON.parse(dom.window.localStorage.getItem('liya-family-learning-v2'));
 assert.equal(stored.learners[0].attempts.length,0);assert.equal(Object.keys(stored.learners[0].progress).length,0);
 await open('3-math');click('Listen to the lesson');await delay();assert.equal(spoken.length,1);assert.ok(spoken[0].text.includes('Equal groups and multiplication'));assert.equal(spoken[0].voice.localService,true);assert.equal(spoken[0].rate,.85);click('Stop reading');await delay();assert.equal(doc.querySelector('.read-aloud').textContent.includes('Reading stopped'),true);
 click('Listen to the lesson');await delay();const before=cancelled;click('Close lesson');await delay();assert.ok(cancelled>before);assert.equal(spoken[1].onend,null);
 await open('pre-reading');click('Listen to the lesson');await delay();spoken.at(-1).onerror();await delay();assert.match(doc.querySelector('.read-aloud').textContent,/Audio is unavailable/);dom.window.close();
 dom=create(false);doc=dom.window.document;await delay();await open('pre-math');assert.ok(doc.querySelector('.read-aloud button').disabled);assert.match(doc.querySelector('.read-aloud').textContent,/browser speech support/);dom.window.close();
 console.log('Passed all 24 picture activities: every grade/subject, correct and incorrect feedback, story ordering/undo, math models, regrouping preserves value, fractions, unit rates, plant needs, water-cycle definitions, score isolation, speech/local-voice selection/stop/cleanup/error and unsupported-browser fallback.');
})().catch(e=>{console.error(e);dom.window.close();process.exitCode=1;});
