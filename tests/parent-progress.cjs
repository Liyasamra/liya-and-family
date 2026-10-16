// Signed-in parent portal: this device's progress is saved for linked children only, and the progress card shows account data.
const fs=require('fs'),assert=require('node:assert/strict'),{JSDOM}=require('jsdom');
const user={id:'11111111-1111-4111-8111-111111111111',aud:'authenticated',role:'authenticated',email:'parent@example.invalid',email_confirmed_at:'2026-10-01T00:00:00Z',app_metadata:{},user_metadata:{},created_at:'2026-10-01T00:00:00Z'};
const session={access_token:'test-token',refresh_token:'r',token_type:'bearer',expires_in:3600,expires_at:Math.floor(Date.now()/1000)+3600,user};
const students=[{student_uuid:'aaaa0000-0000-4000-8000-000000000001',student_id:'EW001',nickname:'Fox',grade:'3',age_years:8,age_recorded_at:'2026-10-01'},{student_uuid:'aaaa0000-0000-4000-8000-000000000002',student_id:'EW002',nickname:'Owl',grade:'1',age_years:6,age_recorded_at:'2026-10-01'}];
const learner={id:'l1',studentId:'EW001',nickname:'Fox',icon:'🦊',grade:'3',progress:{'3-math':{score:5,total:5,date:'2026-10-15'},'3-reading':{score:3,total:5,date:'2026-10-14'}},attempts:[{id:'a1',lessonId:'3-math',date:'2026-10-14',score:3,total:5},{id:'a2',lessonId:'3-math',date:'2026-10-15',score:5,total:5},{id:'a3',lessonId:'3-reading',date:'2026-10-14',score:3,total:5}],reading:[],legacyMinutes:0,plan:['a','b','c','d','e','f','g']};
const other={...learner,id:'l2',studentId:undefined,nickname:'Guest',progress:{'1-math':{score:3,total:5,date:'2026-10-15'}},attempts:[{id:'b1',lessonId:'1-math',date:'2026-10-15',score:3,total:5}]};delete other.studentId;
const saved=[];const calls=[];
const json=(v)=>new Response(JSON.stringify(v),{status:200,headers:{'Content-Type':'application/json'}});
const dom=new JSDOM(fs.readFileSync('parent-portal.html','utf8'),{url:'https://example.test/parent-portal.html',runScripts:'dangerously',pretendToBeVisual:true,beforeParse(w){
 w.sessionStorage.setItem('ewket-parent-session',JSON.stringify(session));
 w.localStorage.setItem('liya-family-learning-v2',JSON.stringify({version:2,activeId:'l1',learners:[learner,other]}));
 w.fetch=async(url,init={})=>{const u=String(url);calls.push(u);const body=init.body?JSON.parse(init.body):{};
  if(u.includes('/auth/v1/user'))return json(user);
  if(u.includes('rpc/ewket_registration_status'))return json(true);
  if(u.includes('rpc/ewket_my_students'))return json(students);
  if(u.includes('rpc/ewket_sync_progress')){saved.push(body);return json(body.p_items.length);}
  if(u.includes('rpc/ewket_student_progress')){if(body.p_student===students[0].student_uuid)return json([{lesson_id:'3-math',best_score:5,best_total:5,last_score:5,last_total:5,last_date:'2026-10-15',attempts:2,mastered_on:'2026-10-15'},{lesson_id:'3-reading',best_score:3,best_total:5,last_score:3,last_total:5,last_date:'2026-10-14',attempts:1,mastered_on:null}]);return json([]);}
  return json({});};
 w.Headers=Headers;w.Response=Response;w.Request=Request;}});
const d=dom.window.document,delay=()=>new Promise(r=>setTimeout(r,40));
(async()=>{for(let i=0;i<150&&!d.querySelector('.progress-card .progress-list');i++)await delay();
 const cards=[...d.querySelectorAll('.child-card')];assert.equal(cards.length,2,'two child cards');
 assert.equal(saved.length,1,'only the linked child is synced');assert.equal(saved[0].p_student,students[0].student_uuid);
 const items=saved[0].p_items;assert.equal(items.length,2);const m=items.find(i=>i.lesson_id==='3-math');
 assert.deepEqual(m,{lesson_id:'3-math',best_score:5,best_total:5,last_score:5,last_total:5,last_date:'2026-10-15',attempts:2,mastered_on:'2026-10-15'});
 const r=items.find(i=>i.lesson_id==='3-reading');assert.equal(r.mastered_on,undefined);assert.equal(r.attempts,1);
 assert.ok(!JSON.stringify(saved).includes('Fox')&&!JSON.stringify(saved).includes('Guest'),'no nicknames sent');
 const fox=cards[0].textContent,owl=cards[1].textContent;
 assert.match(fox,/Progress in Grade 3/);assert.match(fox,/1 of 12 lessons done/);assert.match(fox,/2 practiced/);assert.match(fox,/Done ✓/);assert.match(fox,/Could use more practice/);assert.match(fox,/best 3 of 5, 1 try/);
 assert.match(owl,/No lessons saved yet/);
 assert.match(d.body.textContent,/Progress from this device was saved to your account for 1 child/);
 dom.window.close();console.log('Passed: signed-in sync sends only linked children, merges best/latest/tries/mastered dates, sends no names, and the progress card shows account progress.');
})().catch(e=>{console.error(e);dom.window.close();process.exitCode=1});
