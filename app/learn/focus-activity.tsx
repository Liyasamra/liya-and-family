import {useState} from 'react';
import {type Lesson} from '@/lib/learning-content';
import {t} from '@/lib/i18n';
import {visualActivities} from '@/lib/visual-learning';
import ReferenceArt from './reference-art';
import VisualLab from './visual-lab';
import UiIcon from './ui-icon';
import ReadAloud from './read-aloud';

export default function FocusActivity({lesson,onOpen}:{lesson:Lesson;onOpen:(l:Lesson)=>void}){
 const [trying,setTrying]=useState(false),[groups,setGroups]=useState(4),[count,setCount]=useState(3);
 const isGroups=visualActivities[lesson.id]?.kind==='groups';
 return <article className={`focus-card ${trying?'trying':''}`} aria-labelledby="focus-heading"><p className="focus-label"><UiIcon name="book"/> {t('Focus lesson')}</p><h2 id="focus-heading">{isGroups?t('Build equal groups'):lesson.title}</h2>{isGroups?<><p className="focus-instruction">{t('Look at the groups below. Each circle has {0} dots.',count)}</p><div className="focus-bubble" aria-live="polite">{t('We have {0} equal groups with {1} in each group. So {0} × {1} = {2}.',groups,count,groups*count)}</div>{trying&&<div className="focus-steppers">{[{label:t('Groups'),value:groups,set:setGroups},{label:t('Objects per group'),value:count,set:setCount}].map(s=><div key={s.label}><span>{s.label}</span><button aria-label={t('Decrease {0}',s.label)} disabled={s.value<=1} onClick={()=>s.set(s.value-1)}>−</button><output>{s.value}</output><button aria-label={t('Increase {0}',s.label)} disabled={s.value>=6} onClick={()=>s.set(s.value+1)}>+</button></div>)}</div>}<div className="focus-groups" role="img" aria-label={t('{0} equal groups with {1} dots each',groups,count)}>{Array.from({length:groups},(_,i)=><div className="focus-circle" key={i}>{Array.from({length:count},(_,j)=><span key={j}/>)}</div>)}</div><p className="focus-equation" aria-live="polite">{groups} × {count} = {groups*count}</p></>:visualActivities[lesson.id]?<div className="focus-existing"><VisualLab lessonId={lesson.id}/></div>:<div className="focus-example"><p>{lesson.objective}</p><p>{lesson.example}</p><p>{lesson.activity}</p></div>}<ReferenceArt name="mascot" className="focus-mascot"/><div className="focus-actions"><ReadAloud compact label={t('Listen')} text={isGroups?`${groups} groups of ${count} make ${groups*count}. ${lesson.explain}`:`${lesson.title}. ${lesson.explain}. ${lesson.example}`}/><button className="focus-try" onClick={()=>setTrying(v=>!v)} aria-expanded={trying}><span aria-hidden="true">▶</span> {t(trying?'Finish exploring':'Try')}</button><button onClick={()=>onOpen(lesson)}><span aria-hidden="true">✎</span> {t('Practice')}</button></div></article>;
}
