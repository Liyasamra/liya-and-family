"use client";
import {useId,useState} from "react";
import type {Lesson} from "@/lib/learning-content";
import type {Picture} from "@/lib/visual-learning";
import PictureArt from "./picture-art";

function scenePicture(lesson:Lesson):Picture{
 const t=lesson.title.toLowerCase();
 const rules:[RegExp,Picture][] = lesson.subject==="Reading"?[
  [/sound|vowel|letter|word family/,"ear"],[/clue|inference|infer|evidence/,"eye"],[/order|sequence/,"map"],[/character|who/,"cat"],[/cause|problem|claim/,"claim"],[/compare|two texts|accounts/,"book"],[/summary|summarize|write/,"notebook"]
 ]:[[/weather record|data|investigation|evidence/,"chart"],[/weather|rain/,"cloud"],[/shadow|day and night|sun/,"sun"],[/animal|coverings/,"bird"],[/land|erosion|weathering/,"roots"],[/water|absorbs|matter/,"water"],[/wave|vibration|listen/,"ear"],[/push|pull|transformation/,"plane"],[/mass|weight|material/,"block"],[/energy|food chain/,"hawk"],[/life cycle|decomposer|living/,"sprout"]];
 return rules.find(([r])=>r.test(t))?.[1]||(lesson.subject==="Reading"?"book":"sprout");
}
export default function LessonScene({lesson}:{lesson:Lesson}){
 const id=useId().replaceAll(":","");const [expanded,setExpanded]=useState(false);
 const t=lesson.title.toLowerCase();let art;
 if(lesson.subject==="Math"){
 const cube=(x:number,y:number,i:number)=><g key={i}><path d={`M${x} ${y+8}l13-8 13 8v18l-13 8-13-8z`} fill={`url(#${id})`} stroke="#437596" strokeWidth="1.5"/><path d={`M${x} ${y+8}l13 8 13-8m-13 8v18`} fill="none" stroke="#437596" strokeWidth="1.5"/></g>;
 if(/fraction/.test(t))art=<>{[0,1].map(row=><g key={row}>{[0,1,2,3].map(i=><rect key={i} x={43+i*43} y={28+row*38} width="40" height="26" rx="6" fill={i<(row?3:2)?"#a889dc":"#eee5fb"} stroke="#8060ac" strokeWidth="2"/>)}</g>)}</>;
 else if(/shape/.test(t))art=<><circle cx="60" cy="58" r="25" fill="#f9c85c"/><rect x="102" y="32" width="48" height="48" rx="8" fill={`url(#${id})`}/><path d="M195 27l30 53h-60z" fill="#e98277"/></>;
 else if(/negative|mean|median|expression/.test(t))art=<><path d="M30 65h200m-190-5v10m40-10v10m40-10v10m40-10v10m40-10v10" stroke="#675090" strokeWidth="3"/>{["−2","−1","0","1","2"].map((v,i)=><text key={v} x={40+i*40} y="91" textAnchor="middle" fontSize="16" fill="#55436c">{v}</text>)}<circle cx="120" cy="44" r="12" fill="#f9c85c"/></>;
 else if(/coin/.test(t))art=<>{[0,1,2,3].map(i=><g key={i}><ellipse cx={57+i*48} cy={66-i*5} rx="21" ry="24" fill="#dcad42"/><ellipse cx={57+i*48} cy={61-i*5} rx="21" ry="24" fill="#f9d574" stroke="#ac7d23" strokeWidth="2"/><text x={57+i*48} y={67-i*5} textAnchor="middle" fontSize="16" fill="#785619">5¢</text></g>)}</>;
 else if(/graph/.test(t))art=<><path d="M35 20v74h194" stroke="#675090" strokeWidth="3"/>{[2,3,4].map((n,col)=>Array.from({length:n},(_,i)=>cube(60+col*54,78-i*17,col*10+i)))}</>;
 else if(/pattern|sort/.test(t))art=<>{[0,1,2,3,4,5].map(i=>i%2?<rect key={i} x={31+i*34} y="40" width="27" height="27" rx="7" fill="#a889dc"/>:<circle key={i} cx={44+i*34} cy="53" r="14" fill="#f9c85c"/>)}</>;
 else if(/area|perimeter|measure/.test(t))art=<>{Array.from({length:12},(_,i)=><rect key={i} x={65+i%4*33} y={18+Math.floor(i/4)*27} width="30" height="24" rx="4" fill={i%2?"#bee2d1":"#80c2ac"} stroke="#4b947d" strokeWidth="2"/>)}</>;
 else if(/share|division/.test(t))art=<>{[0,1,2].map(i=><g key={i}><path d={`M${28+i*75} 62h58l-7 31h-44z`} fill="#e9bd79" stroke="#ab7942" strokeWidth="2"/>{[0,1,2,3].map(j=><circle key={j} cx={43+i*75+j%2*25} cy={33+Math.floor(j/2)*20} r="8" fill="#dd827b"/>)}</g>)}</>;
 else art=<>{Array.from({length:/volume/.test(t)?15:12},(_,i)=>cube(48+i%4*42,12+Math.floor(i/4)*28,i))}</>;
 }else art=<><g transform="translate(7 8) scale(.82)"><PictureArt picture={scenePicture(lesson)}/></g><g transform="translate(143 25) scale(.56)"><PictureArt picture={lesson.subject==="Reading"?"book":/water|weather/.test(t)?"sun":"eye"}/></g></>;
 return <div className="scene-preview"><div className="lesson-cover dimensional-scene"><svg viewBox="0 0 260 112" aria-hidden="true"><defs><linearGradient id={id} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#a6ddee"/><stop offset="1" stopColor="#6598cb"/></linearGradient></defs><ellipse cx="130" cy="103" rx="95" ry="6" fill="#66508d" opacity=".1"/>{art}</svg></div><button className="scene-toggle" type="button" aria-expanded={expanded} aria-controls={`example-${id}`} onClick={()=>setExpanded(v=>!v)}>{expanded?"Close example":"Explore an example"}<span aria-hidden="true">{expanded?" −":" +"}</span></button>{expanded&&<div className="scene-example" id={`example-${id}`}><strong>Picture it</strong><p>{lesson.example}</p><small>Try the lesson to practice this idea.</small></div>}</div>;
}
