import fs from 'node:fs';
const srcs=process.argv.slice(2),out='/home/claude/liya-and-family/lib/social-studies.ts';
const lessons=[];for(const f of srcs)lessons.push(...(await import(f)).lessons);
const J=JSON.stringify;let k=0;const pics={};
const built=lessons.map(l=>{const qs=l.q.map(([p,c,w,e,cp,pp],qi)=>{if(w.length!==2)throw l.id+qi;const pos=k++%3;const o=[...w];o.splice(pos,0,c);let ch;if(cp){const x=[...cp.slice(1)];x.splice(pos,0,cp[0]);ch=x;}if(ch||pp){(pics[l.id]??={})[qi]={...(pp?{prompt:pp}:{}),...(ch?{choices:ch}:{})};}return {prompt:p,options:o,answer:pos,explanation:e};});
 return {id:l.id,grade:l.grade,subject:"Social Studies",title:l.title,objective:l.objective,explain:l.explain,example:l.example,activity:l.activity,questions:qs};});
let existing=fs.existsSync(out)?fs.readFileSync(out,'utf8'):null;
let prev=[],prevPics={};
if(existing){const m=existing.match(/\/\/DATA (.*)\n/);if(m){const d=JSON.parse(m[1]);prev=d.lessons;prevPics=d.pics;}}
const ids=new Set(built.map(l=>l.id));const all=[...prev.filter(l=>!ids.has(l.id)),...built];const allPics={...prevPics,...pics};
fs.writeFileSync(out,`// Social Studies lessons (Ohio-informed themes: families and community, history, geography, economics, government and culture).
// Generated from reviewed source lists; ten standalone questions per lesson with balanced answer positions.
import type { Lesson } from "./learning-content";
export const socialLessons: Lesson[] = ${J(all,null,1)};
export const socialPictures: Record<string, Record<number, { prompt?: string; choices?: string[] }>> = ${J(allPics)};
`);
console.log(all.length,'lessons',Object.keys(allPics).length,'with pictures');
