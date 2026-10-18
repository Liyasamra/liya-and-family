// Parent portal, Privacy Notice version 3: the agree banner, deleting one child, and deleting the account.
const fs=require('fs'),assert=require('node:assert/strict'),{JSDOM}=require('jsdom');
const user={id:'11111111-1111-4111-8111-111111111111',aud:'authenticated',role:'authenticated',email:'Parent@Example.invalid',email_confirmed_at:'2026-10-01T00:00:00Z',app_metadata:{},user_metadata:{},created_at:'2026-10-01T00:00:00Z'};
const session={access_token:'test-token',refresh_token:'r',token_type:'bearer',expires_in:3600,expires_at:Math.floor(Date.now()/1000)+3600,user};
let students=[{student_uuid:'aaaa0000-0000-4000-8000-000000000001',student_id:'EW001',nickname:'Fox',grade:'3',age_years:8,age_recorded_at:'2026-10-01'},{student_uuid:'aaaa0000-0000-4000-8000-000000000002',student_id:'EW002',nickname:'Owl',grade:'1',age_years:6,age_recorded_at:'2026-10-01'}];
let accepted=false;const calls=[];
const json=(v,status=200)=>new Response(JSON.stringify(v),{status,headers:{'Content-Type':'application/json'}});
const dom=new JSDOM(fs.readFileSync('parent-portal.html','utf8'),{url:'https://example.test/parent-portal.html',runScripts:'dangerously',pretendToBeVisual:true,beforeParse(w){
 w.sessionStorage.setItem('ewket-parent-session',JSON.stringify(session));
 w.fetch=async(url,init={})=>{const u=String(url);const body=init.body?JSON.parse(init.body):{};calls.push([u.split('/').pop(),body]);
  if(u.includes('/auth/v1/user'))return json(user);
  if(u.includes('/auth/v1/logout'))return new Response(null,{status:204});
  if(u.includes('rpc/ewket_registration_status'))return json(true);
  if(u.includes('rpc/ewket_my_students'))return json(students);
  if(u.includes('rpc/ewket_notice_status'))return json({current:'parent-notice-v3',accepted});
  if(u.includes('rpc/ewket_accept_notice')){assert.equal(body.p_version,'parent-notice-v3');accepted=true;return json({current:'parent-notice-v3',accepted:true});}
  if(u.includes('rpc/ewket_delete_student')){const s=students.find(x=>x.student_uuid===body.p_student);if(!s||body.p_confirm.trim().toUpperCase()!==s.student_id)return json({message:'Type the student number exactly to confirm'},400);students=students.filter(x=>x!==s);return json({deleted:s.student_id});}
  if(u.includes('rpc/ewket_delete_my_account')){if(body.p_confirm.trim().toLowerCase()!==user.email.toLowerCase())return json({message:'Type your email address exactly to confirm'},400);return json({children_deleted:students.length,account_deleted:true});}
  if(/rpc\/ewket_(student_progress|student_checks|student_devices)/.test(u))return json([]);
  if(/rpc\/ewket_sync_/.test(u))return accepted?json(0):json({message:'Please review and agree to the updated Privacy Notice in the Parent portal.'},400);
  return json({},404);};
}});
const w=dom.window,d=w.document;const tick=(ms=60)=>new Promise(r=>setTimeout(r,ms));
const until=async(f,m)=>{for(let i=0;i<80;i++){if(f())return;await tick(50);}assert.fail(m);};
const btn=t=>[...d.querySelectorAll('button')].find(b=>b.textContent.trim()===t);
const type=(el,v)=>{const set=Object.getOwnPropertyDescriptor(w.HTMLInputElement.prototype,'value').set;set.call(el,v);el.dispatchEvent(new w.Event('input',{bubbles:true}));};
(async()=>{
 await until(()=>d.querySelectorAll('.child-card').length===2,'two children shown');
 await until(()=>d.querySelector('.notice-update'),'version 3 banner shown');
 assert.ok(d.querySelector('.notice-update a[href="privacy.html"]'),'banner links to the notice');
 btn('I agree to version 3').click();
 await until(()=>!d.querySelector('.notice-update'),'banner goes away after agreeing');
 assert.ok(calls.some(([n])=>n==='ewket_accept_notice'));
 // Delete one child: the button stays off until the EW number is typed.
 const card=d.querySelectorAll('.child-card')[0];card.querySelector('details.danger-zone').open=true;
 const del=[...card.querySelectorAll('button')].find(b=>b.textContent.includes('Delete permanently'));
 assert.ok(del.disabled,'delete starts disabled');
 type(card.querySelector('details input'),'ew002');await tick();assert.ok(del.disabled,'wrong number keeps it disabled');
 type(card.querySelector('details input'),'ew001');await tick();assert.ok(!del.disabled,'right number enables it');
 del.click();
 await until(()=>d.querySelectorAll('.child-card').length===1,'child removed from the page');
 assert.match(d.body.textContent,/Fox’s information was deleted\. Student number EW001 is retired/);
 assert.ok(![...d.querySelectorAll('.ew-badge')].some(b=>b.textContent==='EW001'),'no EW001 card left');
 // Delete the account: needs the email typed, then signs out.
 const acct=[...d.querySelectorAll('details.danger-zone')].find(x=>x.querySelector('#del-account'));acct.open=true;
 const go=[...acct.querySelectorAll('button')].find(b=>b.textContent.includes('Delete my account permanently'));
 assert.ok(go.disabled);type(acct.querySelector('#del-account'),' parent@example.INVALID ');await tick();assert.ok(!go.disabled,'email in any case enables it');
 go.click();
 await until(()=>/Your account and all of your children’s information were deleted/.test(d.body.textContent),'account deleted message');
 assert.equal(d.querySelectorAll('.child-card').length,0,'no children shown after deleting the account');
 assert.ok(d.querySelector('input[type=password]'),'back to the sign-in form');
 console.log('Passed: version 3 banner and agreement, delete one child with EW confirmation, delete account with email confirmation.');
 w.close();
})().catch(e=>{console.error(e);process.exit(1);});
