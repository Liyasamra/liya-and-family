// Learning page: with a parent signed in on this tab, a linked learner's lessons and checks are saved to the account,
// and checks from other devices appear in the history. Without a session, nothing is sent.
const fs=require('fs'),assert=require('node:assert/strict'),{JSDOM}=require('jsdom');
const user={id:'11111111-1111-4111-8111-111111111111'};
const session={access_token:'test-token',refresh_token:'r',token_type:'bearer',expires_in:3600,expires_at:Math.floor(Date.now()/1000)+3600,user};
const learner={id:'l1',studentId:'EW001',nickname:'Fox',icon:'🦊',grade:'3',progress:{'3-math':{score:5,total:5,date:'2026-10-15'}},attempts:[{id:'a1',lessonId:'3-math',date:'2026-10-15',score:5,total:5}],reading:[],assessments:[{id:'chk-local',date:'2026-10-16',grade:'3',week:1,score:7,total:9}],legacyMinutes:0,plan:['a','b','c','d','e','f','g']};
const json=v=>new Response(JSON.stringify(v),{status:200,headers:{'Content-Type':'application/json'}});
function load(withSession){const calls=[];const dom=new JSDOM(fs.readFileSync('index.html','utf8'),{url:'https://example.test/index.html#assessments',runScripts:'dangerously',pretendToBeVisual:true,beforeParse(w){
 if(withSession)w.sessionStorage.setItem('ewket-parent-session',JSON.stringify(session));
 w.localStorage.setItem('liya-family-learning-v2',JSON.stringify({version:2,activeId:'l1',learners:[learner]}));w.localStorage.setItem('ewket-auto-read','off');
 w.fetch=async(url,init={})=>{const u=String(url);const body=init.body?JSON.parse(init.body):{};calls.push({u,body,auth:init.headers&&init.headers.Authorization});
  if(u.includes('rpc/ewket_my_students'))return json([{student_id:'EW001',student_uuid:'aaaa0000-0000-4000-8000-000000000001'}]);
  if(u.includes('rpc/ewket_student_checks'))return json([{check_id:'remote-1',grade:'3',week:2,score:6,total:9,taken_on:'2026-10-15'},{check_id:'chk-local',grade:'3',week:1,score:7,total:9,taken_on:'2026-10-16'}]);
  if(u.includes('rpc/ewket_sync'))return json(1);
  return new Response('',{status:404});};
 w.Headers=Headers;w.Response=Response;w.Request=Request;w.HTMLMediaElement.prototype.play=()=>Promise.resolve();w.speechSynthesis={speak(){},cancel(){},getVoices:()=>[]};}});return {dom,calls};}
const delay=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{
 {const {dom,calls}=load(true);const d=dom.window.document;for(let i=0;i<100&&!/to your parent account/.test(d.body.textContent);i++)await delay(50);await delay(1600);
  assert.match(d.body.textContent,/Saved on this device and to your parent account/);
  const rows=[...d.querySelectorAll('.assessments table tbody tr')].map(r=>r.textContent);assert.equal(rows.length,2,'local and remote checks, no duplicate');assert.ok(rows.some(r=>/Week 2.*6\/9/.test(r)));
  const sp=calls.find(c=>c.u.includes('ewket_sync_progress')),sc=calls.find(c=>c.u.includes('ewket_sync_checks'));assert.ok(sp&&sc,'lessons and checks saved');
  assert.equal(sp.body.p_student,'aaaa0000-0000-4000-8000-000000000001');assert.equal(sc.body.p_items[0].check_id,'chk-local');assert.equal(sp.auth,'Bearer test-token');
  assert.ok(!JSON.stringify(calls.map(c=>c.body)).includes('Fox'),'no nickname sent');dom.window.close();}
 {const {dom,calls}=load(false);const d=dom.window.document;for(let i=0;i<60&&!/Saved on this device/.test(d.body.textContent);i++)await delay(50);await delay(1600);
  assert.match(d.body.textContent,/Sign in to the Parent portal on this device/);assert.equal(calls.length,0,'nothing sent without a session');dom.window.close();}
 console.log('Passed: learning page saves a linked learner\'s lessons and checks with the parent session, shows checks from other devices once, sends no names, and sends nothing when signed out.');
})().catch(e=>{console.error(e);process.exitCode=1;});
