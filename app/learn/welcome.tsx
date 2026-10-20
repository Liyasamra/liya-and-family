import { grades, type Grade, type Lesson, type Subject } from "@/lib/learning-content";
import { currentLang, t } from "@/lib/i18n";
import ReferenceArt from "./reference-art";
export const subjectDetails: {name:Subject;icon:string;copy:string}[] = [
 {name:"Math",icon:"＋",copy:"Numbers, patterns, and problem solving."},
 {name:"Reading",icon:"Aa",copy:"Build word skills and a love of stories."},
 {name:"Writing",icon:"✎",copy:"Share your ideas with confidence."},
 {name:"Science",icon:"✧",copy:"Explore our amazing world."},
 {name:"Social Studies",icon:"◎",copy:"People, places, and communities."},
];
export default function Welcome({onStart,onGrade,onFamilies,nextUp,onContinue}:{onStart:(s?:Subject)=>void;onGrade:(g:Grade)=>void;onFamilies:()=>void;nextUp?:Lesson;onContinue:(l:Lesson)=>void}) {
 return <>
 <section className="welcome-hero" aria-labelledby="welcome-title"><div className="welcome-copy"><h1 id="welcome-title">{currentLang()==="en"?<><span>Small steps.</span>{" "}<span>Bright futures.</span></>:t("Small steps. Bright futures.")}</h1><p className="hero-copy">{t("Short, playful practice for growing minds.")}</p><div className="home-actions"><button className="learn-btn big" onClick={()=>nextUp?onContinue(nextUp):onStart()}>{nextUp?t("Continue lesson"):t("Start learning")} <span aria-hidden="true">→</span></button><a className="learn-btn big outline register-action" href="./parent-portal.html">{t("Register your little ones")}</a></div></div><ReferenceArt name="hero" className="welcome-art" label={t("Children reading, counting, and exploring a plant together. A girl wears Ethiopian traditional clothing.")}/></section>
 <section className="welcome-levels" aria-labelledby="welcome-level-title"><h2 id="welcome-level-title">{t("Choose a learning level")}</h2><div className="welcome-grade-grid">{grades.map(g=><button key={g.id} onClick={()=>onGrade(g.id)} aria-label={t("Start {0}",t(g.label))}><strong>{g.id==="pre"?t("Pre-K"):g.id==="k"?t("K"):g.id}</strong></button>)}</div></section>
 <section className="welcome-subjects" aria-labelledby="welcome-subject-title"><h2 id="welcome-subject-title">{t("Explore subjects")}</h2><div className="welcome-subject-grid">{subjectDetails.map(s=><button key={s.name} className={`welcome-subject ${s.name.toLowerCase().replace(" ","-")}`} onClick={()=>onStart(s.name)}><ReferenceArt name={s.name as 'Math'|'Reading'|'Writing'|'Science'|'Social Studies'} className="welcome-subject-art"/><strong>{t(s.name)}</strong><small>{t(s.copy)}</small><span className="subject-arrow" aria-hidden="true">→</span></button>)}</div></section>
 <section className="welcome-family"><ReferenceArt name="family"/><h2>{currentLang()==="en"?<><span>For every child.</span>{" "}<span>With support for every family.</span></>:t("For every child. With support for every family.")}</h2><ReferenceArt name="landscape"/><button className="family-banner-link" onClick={onFamilies} aria-label={t("For families")}/></section>
 </>;
}
