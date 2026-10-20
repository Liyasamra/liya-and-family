"use client";
import {useId,useState,type ReactNode} from "react";
import type {Lesson} from "@/lib/learning-content";
import type {Picture} from "@/lib/visual-learning";
import PictureArt from "./picture-art";
import AuditedDiagram from "./audited-diagram";

function scenePicture(lesson:Lesson):Picture{
 const t=lesson.title.toLowerCase();
 const rules:[RegExp,Picture][] = lesson.subject==="Reading"?[
  [/sound|vowel|letter|word family/,"ear"],[/clue|inference|infer|evidence/,"eye"],[/order|sequence/,"map"],[/character|who/,"cat"],[/cause|problem|claim/,"claim"],[/compare|two texts|accounts/,"book"],[/summary|summarize|write/,"notebook"]
 ]:[[/weather record|data|investigation|evidence/,"chart"],[/weather|rain/,"cloud"],[/shadow|day and night|sun/,"sun"],[/animal|coverings/,"bird"],[/land|erosion|weathering/,"roots"],[/water|absorbs|matter/,"water"],[/wave|vibration|listen/,"ear"],[/push|pull|transformation/,"plane"],[/mass|weight|material/,"block"],[/energy|food chain/,"hawk"],[/life cycle|decomposer|living/,"sprout"]];
 return rules.find(([r])=>r.test(t))?.[1]||(lesson.subject==="Reading"?"book":"sprout");
}
export default function LessonScene({lesson,illustration,showExample=true}:{lesson:Lesson;illustration?:ReactNode;showExample?:boolean}){
 const id=useId().replaceAll(":","");const [expanded,setExpanded]=useState(false);
 const t=lesson.title.toLowerCase();
 const art=illustration||(lesson.subject==="Math"?<AuditedDiagram id={lesson.id}/>:<svg viewBox="0 0 260 112" aria-hidden="true"><g transform="translate(7 8) scale(.82)"><PictureArt picture={scenePicture(lesson)}/></g><g transform="translate(143 25) scale(.56)"><PictureArt picture={lesson.subject==="Reading"?"book":/water|weather/.test(t)?"sun":"eye"}/></g></svg>);
 return <div className="scene-preview"><div className="lesson-cover dimensional-scene">{art}</div>{showExample&&<button className="scene-toggle" type="button" aria-expanded={expanded} aria-controls={`example-${id}`} onClick={()=>setExpanded(v=>!v)}>{expanded?"Close example":"Explore an example"}<span aria-hidden="true">{expanded?" −":" +"}</span></button>}{showExample&&expanded&&<div className="scene-example" id={`example-${id}`}><strong>Picture it</strong><p>{lesson.example}</p><small>Try the lesson to practice this idea.</small></div>}</div>;
}
