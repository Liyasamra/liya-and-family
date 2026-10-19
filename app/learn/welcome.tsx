import { grades, type Grade, type Lesson, type Subject } from "@/lib/learning-content";
import { t } from "@/lib/i18n";

export const subjectDetails: {name:Subject;icon:string;copy:string}[] = [
 {name:"Math",icon:"＋",copy:"Numbers, patterns, and problem solving."},
 {name:"Reading",icon:"Aa",copy:"Build word skills and a love of stories."},
 {name:"Writing",icon:"✎",copy:"Share your ideas with confidence."},
 {name:"Science",icon:"✧",copy:"Explore our amazing world."},
 {name:"Social Studies",icon:"◎",copy:"People, places, and communities."},
];
export default function Welcome({onStart,onGrade,onFamilies,nextUp,onContinue}:{onStart:(s?:Subject)=>void;onGrade:(g:Grade)=>void;onFamilies:()=>void;nextUp?:Lesson;onContinue:(l:Lesson)=>void}) {
 return <>
  <section className="welcome-hero" aria-labelledby="welcome-title">
   <div className="welcome-copy"><p className="learn-eyebrow">{t("FREE LEARNING · PRESCHOOL TO GRADE 6")}</p><h1 id="welcome-title">{t("Small steps. Bright futures.")}</h1><p className="hero-copy">{t("Short, playful practice for growing minds.")}</p><p className="welcome-description">{t("Explore reading, numbers, science, and more. Find a level that fits and learn at your own pace.")}</p><div className="home-actions"><button className="learn-btn big" onClick={()=>nextUp?onContinue(nextUp):onStart()}>{nextUp?t("Continue lesson"):t("Start learning")} <span aria-hidden="true">→</span></button><a className="learn-btn big outline register-action" href="./parent-portal.html">{t("Register your little ones")}</a></div><p className="home-signin">{t("Free to explore. Register to save progress to your parent account.")}</p></div>
   <figure className="welcome-art"><img src="learning-together.webp" width="1200" height="800" fetchPriority="high" alt={t("Children reading, counting, and exploring a plant together. A girl wears Ethiopian traditional clothing.")}/></figure>
  </section>
  <section className="welcome-levels" aria-labelledby="welcome-level-title"><div className="welcome-section-title"><h2 id="welcome-level-title">{t("Choose a learning level")}</h2><span>{t("A starting point, not a limit.")}</span></div><div className="welcome-grade-grid">{grades.map(g=><button key={g.id} onClick={()=>onGrade(g.id)} aria-label={t("Start {0}",t(g.label))}><strong>{g.id==="pre"?t("Pre-K"):g.id==="k"?t("K"):g.id}</strong><small>{t(g.label)}</small><span aria-hidden="true">→</span></button>)}</div></section>
  <section className="welcome-subjects" aria-labelledby="welcome-subject-title"><div className="welcome-section-title"><h2 id="welcome-subject-title">{t("Explore subjects")}</h2><span>{t("A little discovery, every day.")}</span></div><div className="welcome-subject-grid">{subjectDetails.map(s=><button key={s.name} className={`welcome-subject ${s.name.toLowerCase().replace(" ","-")}`} onClick={()=>onStart(s.name)}><span className="welcome-subject-art" aria-hidden="true">{s.icon}</span><strong>{t(s.name)}</strong><small>{t(s.copy)}</small><span className="subject-arrow" aria-hidden="true">↗</span></button>)}</div><button className="heritage-link" onClick={()=>{onGrade("pre");onStart("Amharic");}}><span lang="am" aria-hidden="true">ሀ</span><span><strong>{t("Discover Amharic")}</strong><small>{t("Heritage-language lessons for Pre-K to Grade 2")}</small></span><span aria-hidden="true">→</span></button></section>
  <section className="welcome-family"><div><p className="learn-eyebrow">{t("GROWING TOGETHER")}</p><h2>{t("For every child. With support for every family.")}</h2><p>{t("Build a gentle routine, celebrate progress, and make room for curiosity.")}</p></div><button className="learn-btn outline" onClick={onFamilies}>{t("For families")} <span aria-hidden="true">→</span></button></section>
  <ul className="welcome-promises"><li><span aria-hidden="true">✓</span>{t("Always free")}</li><li><span aria-hidden="true">✓</span>{t("Optional read-aloud")}</li><li><span aria-hidden="true">✓</span>{t("Learn at your own pace")}</li></ul>
  <p className="welcome-scope">{t("Supplemental learning for home and community. Not a complete curriculum or live tutoring service.")}</p>
 </>;
}
