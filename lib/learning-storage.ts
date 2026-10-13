import { lessons, type Grade } from "./learning-content";
export type Progress = Record<string,{score:number;total:number;date:string}>;
export type Attempt={id:string;lessonId:string;date:string;score:number;total:number};
export type ReadingEntry={id:string;date:string;minutes:number};
export type AssessmentAttempt={id:string;date:string;grade:Grade;week:number;score:number;total:number};
export type Learner={studentId?:string;assessments?:AssessmentAttempt[];id:string;nickname:string;icon:string;grade:Grade;progress:Progress;attempts:Attempt[];reading:ReadingEntry[];legacyMinutes:number;plan:string[]};
export type Saved={version:2;activeId:string;learners:Learner[]};
export const icons=["🦊","🐻","🐰","🦉"];
const plan=["Read together","Practice math","Explore science","Read and retell","Review a lesson","Create something","Rest and reflect"];
export const today=()=>{const d=new Date();return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;};
export const uid=()=>typeof crypto!=="undefined"&&crypto.randomUUID?crypto.randomUUID():`${Date.now()}-${Math.random().toString(36).slice(2)}`;
export function newLearner(n=1,id=uid()):Learner{return {id,nickname:`Learner ${n}`,icon:icons[(n-1)%4],grade:"3",progress:{},attempts:[],reading:[],legacyMinutes:0,plan:[...plan]};}
export const defaults:Saved={version:2,activeId:"initial",learners:[newLearner(1,"initial")]};
function dateValid(x:unknown):x is string {if(typeof x!=="string"||!/^\d{4}-\d{2}-\d{2}$/.test(x))return false;const d=new Date(x+"T12:00:00Z");return !isNaN(d.getTime())&&d.toISOString().slice(0,10)===x;}
function scoreValid(p:{score:number;total:number;date:string},id:string){const l=lessons.find(l=>l.id===id);return !!l&&Number.isInteger(p.score)&&Number.isInteger(p.total)&&p.total>=1&&p.total<=l.questions.length&&p.score>=0&&p.score<=p.total&&dateValid(p.date);}
export function validSaved(d:unknown):d is Saved {
 if(!d||typeof d!=="object")return false;const s=d as Saved;
 if(s.version!==2||!Array.isArray(s.learners)||s.learners.length<1||s.learners.length>4||new Set(s.learners.map(p=>p?.id)).size!==s.learners.length||!s.learners.some(p=>p?.id===s.activeId))return false;
 const ids=s.learners.map(p=>p?.studentId).filter(Boolean);if(new Set(ids).size!==ids.length)return false;
 return s.learners.every(p=>p&&(p.studentId===undefined||/^EW(?!0+$)[0-9]{3,9}$/.test(p.studentId))&&(p.assessments===undefined||(Array.isArray(p.assessments)&&p.assessments.length<=5000&&new Set(p.assessments.map(a=>a?.id)).size===p.assessments.length&&p.assessments.every(a=>a&&typeof a.id==="string"&&a.id.length>0&&a.id.length<=100&&dateValid(a.date)&&["pre","k","1","2","3","4","5","6"].includes(a.grade)&&Number.isInteger(a.week)&&a.week>=0&&a.week<=4&&a.total===(a.week===0?36:9)&&Number.isInteger(a.score)&&a.score>=0&&a.score<=a.total)))&&typeof p.id==="string"&&p.id.length>0&&p.id.length<=100&&typeof p.nickname==="string"&&p.nickname.trim().length>0&&p.nickname.length<=24&&icons.includes(p.icon)&&["pre","k","1","2","3","4","5","6"].includes(p.grade)&&Number.isInteger(p.legacyMinutes)&&p.legacyMinutes>=0&&p.legacyMinutes<=1000000&&Array.isArray(p.plan)&&p.plan.length===7&&p.plan.every(x=>typeof x==="string"&&x.length<=300)&&p.progress&&typeof p.progress==="object"&&!Array.isArray(p.progress)&&Object.entries(p.progress).every(([id,v])=>v&&scoreValid(v,id))&&Array.isArray(p.attempts)&&p.attempts.length<=5000&&new Set(p.attempts.map(a=>a?.id)).size===p.attempts.length&&p.attempts.every(a=>a&&typeof a.id==="string"&&a.id.length>0&&a.id.length<=100&&scoreValid(a,a.lessonId))&&Array.isArray(p.reading)&&p.reading.length<=5000&&new Set(p.reading.map(a=>a?.id)).size===p.reading.length&&p.reading.every(a=>a&&typeof a.id==="string"&&a.id.length>0&&a.id.length<=100&&dateValid(a.date)&&Number.isInteger(a.minutes)&&a.minutes>=1&&a.minutes<=180));
}
export function parseBackup(d:unknown):Saved|null {
 if(validSaved(d))return d;
 if(!d||typeof d!=="object")return null;const s=d as {version:number;progress:Record<string,{score:number;date:string}>;minutes:number;plan:string[]};
 if(s.version!==1||!Number.isInteger(s.minutes)||s.minutes<0||s.minutes>1000000||!s.progress||Array.isArray(s.progress)||typeof s.progress!=="object"||!Array.isArray(s.plan))return null;
 const learner=newLearner(1,"legacy-learner");learner.nickname="Original learner";learner.legacyMinutes=s.minutes;learner.plan=s.plan;for(const [id,p] of Object.entries(s.progress)){if(!p||!Number.isInteger(p.score)||p.score<0||p.score>3||!dateValid(p.date)||!lessons.some(l=>l.id===id))return null;learner.progress[id]={...p,total:3};}
 const result:Saved={version:2,activeId:learner.id,learners:[learner]};return validSaved(result)?result:null;
}
export function mergeBackups(current:Saved,incoming:Saved):Saved {
 const initial=current.learners[0];
 const unusedStarter=current.learners.length===1&&initial.nickname==="Learner 1"&&initial.grade==="3"&&!initial.studentId&&!(initial.assessments?.length)&&initial.legacyMinutes===0&&Object.keys(initial.progress).length===0&&initial.attempts.length===0&&initial.reading.length===0&&JSON.stringify(initial.plan)===JSON.stringify(plan)&&!incoming.learners.some(p=>p.id===initial.id);
 const merged=(unusedStarter?[]:current.learners).map(p=>({...p,progress:{...p.progress},attempts:[...p.attempts],reading:[...p.reading]}));
 for(const p of incoming.learners){const existing=merged.find(x=>x.id===p.id);if(!existing){merged.push({...p});continue;}for(const [id,v] of Object.entries(p.progress)){const old=existing.progress[id];if(!old||v.score/v.total>old.score/old.total)existing.progress[id]=v;}
 if(existing.studentId&&p.studentId&&existing.studentId!==p.studentId)throw Error("Student IDs conflict. Current data was kept.");existing.studentId=existing.studentId||p.studentId;existing.assessments=[...new Map([...(p.assessments||[]),...(existing.assessments||[])].map(a=>[a.id,a])).values()];
 existing.attempts=[...new Map([...p.attempts,...existing.attempts].map(x=>[x.id,x])).values()];existing.reading=[...new Map([...p.reading,...existing.reading].map(x=>[x.id,x])).values()];existing.legacyMinutes=Math.max(existing.legacyMinutes,p.legacyMinutes);
 }
 const result:Saved={...current,activeId:unusedStarter?incoming.activeId:current.activeId,learners:merged};if(!validSaved(result))throw Error("The combined backup exceeds four learners or record limits. Current data was kept.");return result;
}
export function weekBounds(day:string){const d=new Date(day+"T12:00:00");d.setDate(d.getDate()-((d.getDay()+6)%7));const format=(v:Date)=>`${v.getFullYear()}-${String(v.getMonth()+1).padStart(2,"0")}-${String(v.getDate()).padStart(2,"0")}`;const start=format(d);d.setDate(d.getDate()+6);return {start,end:format(d)};}
export function weeklyReport(p:Learner,day:string){const {start,end}=weekBounds(day);const attempts=p.attempts.filter(a=>a.date>=start&&a.date<=end);const reading=p.reading.filter(a=>a.date>=start&&a.date<=end);const latest=new Map<string,Attempt>();for(const a of attempts){const prior=latest.get(a.lessonId);if(!prior||a.date>=prior.date)latest.set(a.lessonId,a);}return {start,end,attempts,minutes:reading.reduce((n,a)=>n+a.minutes,0),skills:[...latest.values()].map(a=>({...a,lesson:lessons.find(l=>l.id===a.lessonId)!,review:a.score<a.total}))};}
const KEY="liya-family-learning-v2",OLD="liya-family-learning-v1";const serverSnapshot={data:defaults,message:""};let snapshot=serverSnapshot,loaded=false;const listeners=new Set<()=>void>();
export function getServerSnapshot(){return serverSnapshot;}
export function getSnapshot(){if(!loaded&&typeof window!=="undefined"){loaded=true;try{const raw=localStorage.getItem(KEY)||localStorage.getItem(OLD);if(raw){const parsed=parseBackup(JSON.parse(raw));snapshot=parsed?{data:parsed,message:parsed.learners[0].id==="legacy-learner"?"Existing progress was preserved in Original learner. Earlier reading time has no date.":""}:{data:defaults,message:"Saved data could not be read. Restore a valid backup before making changes."};if(parsed)localStorage.setItem(KEY,JSON.stringify(parsed));}else{const first=newLearner();snapshot={data:{version:2,activeId:first.id,learners:[first]},message:""};localStorage.setItem(KEY,JSON.stringify(snapshot.data));}}catch{snapshot={data:defaults,message:"Browser saving is unavailable. Download a backup before leaving."};}}return snapshot;}
export function subscribe(listener:()=>void){listeners.add(listener);return ()=>{listeners.delete(listener);};}
export function updateSaved(update:Saved|((s:Saved)=>Saved)){const current=getSnapshot().data;const next=typeof update==="function"?update(current):update;if(!validSaved(next))throw Error("Invalid progress or record limit reached. Download a backup.");let message="";try{localStorage.setItem(KEY,JSON.stringify(next));}catch{message="Could not save. Download a backup before leaving.";}snapshot={data:next,message};for(const l of listeners)l();}
export function updateLearner(id:string,update:(p:Learner)=>Learner){updateSaved(s=>({...s,learners:s.learners.map(p=>p.id===id?update(p):p)}));}
