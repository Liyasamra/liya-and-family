import type {Lesson} from "@/lib/learning-content";
import {visualActivities} from "@/lib/visual-learning";
import PictureArt from "./picture-art";
export default function LessonPreview({lesson}:{lesson:Lesson}){
 const a=visualActivities[lesson.id];
 if(a?.kind==="choice")return <div className="lesson-cover"><PictureArt picture={a.scene[0].picture}/></div>;
 if(a?.kind==="sequence")return <div className="lesson-cover mini-scenes">{a.steps.map((s,i)=><PictureArt key={i} picture={s.picture}/>)}</div>;
 if(a&&lesson.subject==="Math"&&["k","1","2","3","4","5"].includes(lesson.grade)){
  const fraction=["4","5"].includes(lesson.grade),groups=lesson.grade==="3",place=["1","2"].includes(lesson.grade);
  return <div className="lesson-cover"><svg viewBox="0 0 260 112" aria-hidden="true"><rect x="2" y="2" width="256" height="108" rx="22" fill="#fffaf2"/>{fraction?<><rect x="35" y="22" width="190" height="25" fill="#e8dfef" stroke="#675090" strokeWidth="2"/><rect x="35" y="22" width="95" height="25" fill="#8b71ad"/><path d="M130 22v25" stroke="#675090" strokeWidth="2"/><rect x="35" y="64" width="190" height="25" fill="#e8dfef" stroke="#675090" strokeWidth="2"/><rect x="35" y="64" width={lesson.grade==="5"?142.5:95} height="25" fill="#8b71ad"/><path d="M82.5 64v25m47.5-25v25m47.5-25v25" stroke="#675090" strokeWidth="2"/></>:place?<><rect x="51" y="20" width="17" height="74" fill="#a8c396" stroke="#55734e" strokeWidth="2"/><rect x="80" y="20" width="17" height="74" fill="#a8c396" stroke="#55734e" strokeWidth="2"/>{Array.from({length:9},(_,i)=><path key={i} d={`M51 ${27.4+i*7.4}h17m12 0h17`} stroke="#55734e"/>)}{Array.from({length:4},(_,i)=><rect key={i} x={136+(i%2)*23} y={38+Math.floor(i/2)*23} width="16" height="16" fill="#769cc1" stroke="#517f9f" strokeWidth="2"/>)}</>:groups?<>{Array.from({length:4},(_,i)=><g key={i}><rect x={17+i*58} y="20" width="48" height="72" rx="12" fill="#ede3f7" stroke="#8b71ad"/>{[0,1,2].map(j=><circle key={j} cx={41+i*58} cy={35+j*21} r="7" fill="#769cc1"/>)}</g>)}</>:<>{Array.from({length:10},(_,i)=><g key={i}><rect x={25+(i%5)*43} y={17+Math.floor(i/5)*43} width="39" height="39" rx="7" fill="white" stroke="#8b71ad" strokeWidth="2"/>{i<6&&<circle cx={44.5+(i%5)*43} cy={36.5+Math.floor(i/5)*43} r="12" fill="#769cc1"/>}</g>)}</>}</svg></div>;
 }
 return <div className="lesson-cover"><PictureArt picture={lesson.subject==="Math"?(lesson.grade==="pre"?"apple":"notebook"):lesson.subject==="Reading"?"book":lesson.grade==="3"?"cloud":"sprout"}/></div>;
}
