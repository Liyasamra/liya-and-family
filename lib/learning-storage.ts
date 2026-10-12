import { lessons } from "./learning-content";
export type Progress = Record<string,{score:number;date:string}>;
export type Saved = {version:1;progress:Progress;minutes:number;plan:string[]};
export const defaults:Saved={version:1,progress:{},minutes:0,plan:["Read together","Practice math","Explore science","Read and retell","Review a lesson","Create something","Rest and reflect"]};
export function validSaved(d:unknown):d is Saved {
 if(!d||typeof d!=="object")return false;
 const s=d as Saved;
 return s.version===1&&Number.isInteger(s.minutes)&&s.minutes>=0&&s.minutes<=1000000&&Array.isArray(s.plan)&&s.plan.length===7&&s.plan.every(p=>typeof p==="string"&&p.length<=300)&&!!s.progress&&typeof s.progress==="object"&&!Array.isArray(s.progress)&&Object.entries(s.progress).every(([id,p])=>lessons.some(l=>l.id===id)&&p&&Number.isInteger(p.score)&&p.score>=0&&p.score<=3&&typeof p.date==="string"&&/^\d{4}-\d{2}-\d{2}$/.test(p.date));
}
const KEY="liya-family-learning-v1";
const serverSnapshot={data:defaults,message:""};
let snapshot=serverSnapshot,loaded=false;
const listeners=new Set<()=>void>();
export function getServerSnapshot(){return serverSnapshot;}
export function getSnapshot(){
 if(!loaded&&typeof window!=="undefined"){
  loaded=true;
  try{const raw=localStorage.getItem(KEY);if(raw){const d:unknown=JSON.parse(raw);snapshot=validSaved(d)?{data:d,message:""}:{data:defaults,message:"Saved progress could not be read. Restore a valid backup if you have one."};}}
  catch{snapshot={data:defaults,message:"Browser saving is unavailable. Download a backup before leaving."};}
 }
 return snapshot;
}
export function subscribe(listener:()=>void){listeners.add(listener);return ()=>{listeners.delete(listener);};}
export function updateSaved(update:Saved|((s:Saved)=>Saved)){
 const current=getSnapshot().data;
 const next=typeof update==="function"?update(current):update;
 if(!validSaved(next))throw new Error("Invalid learning progress");
 let message="";
 try{localStorage.setItem(KEY,JSON.stringify(next));}catch{message="Progress could not be saved in this browser. Download a backup before leaving.";}
 snapshot={data:next,message};
 for(const listener of listeners)listener();
}
