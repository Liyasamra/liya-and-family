// Child device linking: a code from the Parent portal links this device; then results save with the device key (no parent session).
const fs=require('fs'),assert=require('node:assert/strict'),{JSDOM,VirtualConsole}=require('jsdom');
const learner={id:'l1',studentId:'EW001',nickname:'Fox',icon:'🦊',grade:'3',progress:{'3-math':{score:5,total:5,date:'2026-10-15'}},attempts:[{id:'a1',lessonId:'3-math',date:'2026-10-15',score:5,total:5}],reading:[],assessments:[{id:'chk1',date:'2026-10-16',grade:'3',week:1,score:12,total:15}],legacyMinutes:0,plan:['a','b','c','d','e','f','g']};
const json=(v,status=200)=>new Response(JSON.stringify(v),{status,headers:{'Content-Type':'application/json'}});
const vc=new VirtualConsole();vc.on('jsdomError',()=>{});
function load({keys,linkedLearner,syncStatus=200}){const calls=[];const dom=new JSDOM(fs.readFileSync('index.html','utf8'),{url:'https://example.test/index.html#learn',runScripts:'dangerously',pretendToBeVisual:true,virtualConsole:vc,beforeParse(w){
 if(keys)w.localStorage.setItem('ewket-device-keys',JSON.stringify(keys));
 w.localStorage.setItem('liya-family-learning-v2',JSON.stringify({version:2,activeId:'l1',learners:[linkedLearner?learner:{...learner,studentId:undefined,progress:{},attempts:[],assessments:[]}]}));w.localStorage.setItem('ewket-auto-read','off');
 w.fetch=async(url,init={})=>{const u=String(url);const body=init.body?JSON.parse(init.body):{};calls.push({u,body,headers:init.headers||{}});
  if(u.includes('rpc/ewket_claim_device_code'))return json(body.p_code==='ABCD-EFGH'?{device_key:'k'.repeat(64),student_id:'EW001',grade:'3'}:{error:'That code is not valid or has expired. Ask your parent for a new one.'});
  if(u.includes('rpc/ewket_device_sync'))return syncStatus===200?json({lessons:1,checks:1}):json({message:'This device is not linked'},syncStatus);
  return json({},404);};
 w.Headers=Headers;w.Response=Response;w.Request=Request;w.speechSynthesis={speak(){},cancel(){},getVoices:()=>[]};}});return {dom,calls};}
const delay=ms=>new Promise(r=>setTimeout(r,ms));
const setVal=(w,el,v)=>{const proto=Object.getOwnPropertyDescriptor(w.HTMLInputElement.prototype,'value');proto.set.call(el,v);el.dispatchEvent(new w.Event('input',{bubbles:true}));};
(async()=>{
 // 1. Link with a code
 {const {dom,calls}=load({linkedLearner:false});const d=dom.window.document;for(let i=0;i<60&&!d.querySelector('.learner-bar');i++)await delay(50);
  const btn=[...d.querySelectorAll('button')].find(b=>b.textContent==='Link to parent account');assert.ok(btn,'link button shown');btn.click();await delay(50);
  const input=d.querySelector('.device-link input');setVal(dom.window,input,'WXYZ-2345');await delay(30);d.querySelector('.device-link form').dispatchEvent(new dom.window.Event('submit',{bubbles:true,cancelable:true}));await delay(150);
  assert.match(d.querySelector('.device-link').textContent,/not valid or has expired/);assert.equal(dom.window.localStorage.getItem('ewket-device-keys'),null);
  setVal(dom.window,input,'ABCD-EFGH');await delay(30);d.querySelector('.device-link form').dispatchEvent(new dom.window.Event('submit',{bubbles:true,cancelable:true}));await delay(150);
  assert.deepEqual(JSON.parse(dom.window.localStorage.getItem('ewket-device-keys')),{EW001:'k'.repeat(64)});
  assert.ok(calls.every(c=>!c.headers.Authorization),'linking sends no session');dom.window.close();}
 // 2. A linked device saves with its key
 {const {dom,calls}=load({keys:{EW001:'k'.repeat(64)},linkedLearner:true});const d=dom.window.document;for(let i=0;i<60&&!d.querySelector('.learner-bar');i++)await delay(50);await delay(1600);
  assert.match(d.querySelector('.learner-bar').textContent,/Saved on this device and to your parent account/);assert.ok(![...d.querySelectorAll('button')].some(b=>b.textContent==='Link to parent account'));
  const s=calls.find(c=>c.u.includes('ewket_device_sync'));assert.ok(s,'device sync called');assert.equal(s.body.p_key,'k'.repeat(64));assert.equal(s.body.p_progress[0].lesson_id,'3-math');assert.equal(s.body.p_checks[0].total,15);
  assert.ok(!s.headers.Authorization,'no parent session used');assert.ok(!JSON.stringify(s.body).includes('Fox'),'no nickname sent');dom.window.close();}
 // 3. An unlinked device forgets its key
 {const {dom}=load({keys:{EW001:'k'.repeat(64)},linkedLearner:true,syncStatus:401});await delay(2200);assert.deepEqual(JSON.parse(dom.window.localStorage.getItem('ewket-device-keys')),{});dom.window.close();}
 console.log('Passed: a parent code links the device, a wrong code is refused, the device saves with its key and no session or names, and an unlinked device forgets its key.');
})().catch(e=>{console.error(e);process.exitCode=1;});
