"use client";
import { useState } from "react";
import { grades, type Grade } from "@/lib/learning-content";
import { choicePictures } from "@/lib/choice-pictures";
import { placementQuestions, nextStep, type PlacementStep } from "@/lib/placement";
import Pic, { hasPicture } from "./picture-icons";
import ReadAloud from "./read-aloud";

const label = (g: Grade) => grades.find(x => x.id === g)?.label || g;

// A short level check: four questions per level, moving up after a strong round and down after a hard one.
export default function Placement({ grade, onUse }: { grade: Grade; onUse: (g: Grade) => void }) {
  const [open, setOpen] = useState(false);
  const [steps, setSteps] = useState<PlacementStep[]>([]);
  const [level, setLevel] = useState<Grade>(grade);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [result, setResult] = useState<Grade | null>(null);
  const [note, setNote] = useState("");
  const qs = placementQuestions(level);

  function start() { setOpen(true); setSteps([]); setLevel(grade); setAnswers({}); setResult(null); setNote(""); }
  function submit() {
    if (qs.some((_, i) => answers[i] === undefined)) { setNote("Choose an answer for every question first."); return; }
    const correct = qs.filter((q, i) => answers[i] === q.answer).length;
    const all = [...steps, { grade: level, correct, total: qs.length }];
    const next = nextStep(all);
    setSteps(all); setAnswers({}); setNote("");
    if (next.done) setResult(next.suggest); else { setLevel(next.level); window.scrollTo({ top: (document.getElementById("placement")?.offsetTop || 0) - 80 }); }
  }

  if (!open) return <div className="placement-callout" id="placement"><p><strong>Not sure which level fits?</strong> Take a short level check. It takes about 5 minutes.</p><button type="button" className="learn-btn" onClick={start}>Find my level</button></div>;

  return <section className="placement family-resource" id="placement" aria-live="polite">
    <div className="section-title"><div><p className="learn-eyebrow">LEVEL CHECK</p><h3>{result ? "Your suggested starting level" : `Round ${steps.length + 1}: ${label(level)} questions`}</h3></div><button type="button" className="link-btn" onClick={() => setOpen(false)}>Close</button></div>
    {result ? <>
      <p className="placement-result">Start with <strong>{label(result)}</strong>.</p>
      <ul className="placement-rounds">{steps.map((s, i) => <li key={i}>{label(s.grade)}: {s.correct} of {s.total} correct</li>)}</ul>
      <p className="fine-print">This is a quick practice check, not a test or a school placement. If the lessons feel too easy or too hard, switch levels anytime.</p>
      <div className="hero-actions">{result !== grade ? <><button type="button" className="learn-btn" onClick={() => { onUse(result); setOpen(false); }}>Use {label(result)}</button><button type="button" className="link-btn" onClick={() => setOpen(false)}>Keep {label(grade)}</button></> : <button type="button" className="learn-btn" onClick={() => setOpen(false)}>Keep {label(grade)}</button>}<button type="button" className="link-btn" onClick={start}>Take it again</button></div>
    </> : <form onSubmit={e => { e.preventDefault(); submit(); }}>
      <p className="fine-print">{level === "pre" || level === "k" ? "A grown-up can read each question aloud or tap Listen. " : ""}Answer what you can. It is fine to guess. The next round gets easier or harder based on your answers.</p>
      {qs.map((q, i) => { const pics = choicePictures[q.lessonId]?.[q.index]; const usePics = pics?.choices?.length === q.options.length && pics.choices.every(hasPicture);
        return <fieldset className="practice-question" key={`${level}-${i}`}><legend>{i + 1}. {q.prompt}</legend>
          {pics?.prompt && hasPicture(pics.prompt) && <Pic name={pics.prompt} className="prompt-pic" />}
          <ReadAloud compact label={`Listen to question ${i + 1}`} text={`${q.prompt.replace(/●/g, " dot ")}. ${q.options.map((s, n) => `${String.fromCharCode(65 + n)}. ${s}`).join(". ")}`} />
          <div className={`answer-grid ${usePics ? "with-pics" : ""}`}>{q.options.map((o, n) => <label key={n} className={answers[i] === n ? "selected" : ""}><input type="radio" name={`placement-${i}`} checked={answers[i] === n} onChange={() => setAnswers(a => ({ ...a, [i]: n }))} />{usePics ? <Pic name={pics!.choices![n]} /> : null}<span>{o}</span></label>)}</div>
        </fieldset>; })}
      {note && <p className="auth-error" role="alert">{note}</p>}
      <button className="learn-btn big-action">{steps.length ? "Next" : "Check my answers"}</button>
    </form>}
  </section>;
}
