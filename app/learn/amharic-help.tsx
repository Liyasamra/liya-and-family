"use client";
import { useEffect, useState } from "react";
import { t, type Lang } from "@/lib/i18n";
// "Say it in Amharic": the lesson's goal and explanation in Amharic, for children and helpers at home (owner request, 2026-10-18).
// The Amharic for all lessons is one small file (assets/amharic-lessons.json), fetched the first time it is needed.
type Entry = { goal: string; explain: string };
let cache: Promise<Record<string, Entry>> | null = null;
function loadAll() {
  if (!cache) cache = fetch("assets/amharic-lessons.json").then(r => { if (!r.ok) throw Error(String(r.status)); return r.json(); }).catch(e => { cache = null; throw e; });
  return cache;
}
function amharicVoice() {
  try { return typeof window !== "undefined" && "speechSynthesis" in window ? window.speechSynthesis.getVoices().find(v => /^am\b/i.test(v.lang)) || null : null; } catch { return null; }
}
export default function AmharicHelp({ lessonId, lang }: { lessonId: string; lang: Lang }) {
  const [open, setOpen] = useState(lang === "am");
  const [entry, setEntry] = useState<Entry | null>(null), [failed, setFailed] = useState(false), [speaking, setSpeaking] = useState(false);
  useEffect(() => { if (!open || entry) return; let live = true; loadAll().then(all => { if (live) { setEntry(all[lessonId] || null); setFailed(!all[lessonId]); } }).catch(() => { if (live) setFailed(true); }); return () => { live = false; }; }, [open, entry, lessonId]);
  const voice = open && entry ? amharicVoice() : null;
  function listen() {
    if (!entry || !voice) return;
    try { window.speechSynthesis.cancel(); const u = new SpeechSynthesisUtterance(`${entry.goal} ${entry.explain}`); u.lang = voice.lang; u.voice = voice; u.rate = .85; u.onend = u.onerror = () => setSpeaking(false); setSpeaking(true); window.speechSynthesis.speak(u); } catch { setSpeaking(false); }
  }
  useEffect(() => () => { try { if (speaking) window.speechSynthesis.cancel(); } catch {} }, [speaking]);
  return <div className="amharic-help">
    <button type="button" className="learn-btn small outline" aria-expanded={open} onClick={() => setOpen(v => !v)}><span lang="am">በአማርኛ</span>{lang === "am" ? "" : " · Say it in Amharic"}</button>
    {open && <div className="amharic-box" lang="am" role="region" aria-label={t("The lesson in Amharic")}>
      {entry ? <><p><strong>ግባችን፦</strong> {entry.goal}</p><p>{entry.explain}</p>
        {voice ? <button type="button" className="learn-btn small outline" onClick={speaking ? () => { window.speechSynthesis.cancel(); setSpeaking(false); } : listen}>{speaking ? "ንባብ አቁም" : "🔊 በአማርኛ አዳምጥ"}</button>
          : <p className="fine-print">ይህ መሣሪያ የአማርኛ ድምፅ የለውም። አዋቂ ሰው ይህን ጮክ ብሎ ሊያነብልህ ይችላል።</p>}</>
        : failed ? <p className="fine-print">የአማርኛው ማብራሪያ አሁን አልተገኘም። ኢንተርኔትዎን አረጋግጠው እንደገና ይሞክሩ።</p> : <p className="fine-print">በመጫን ላይ…</p>}
      <p className="fine-print">ጥያቄዎቹና መልሶቹ በእንግሊዝኛ ናቸው፤ ትምህርቱ ከኦሃዮ የትምህርት ቤት መለኪያዎች ጋር እንዲስማማ።</p>
    </div>}
  </div>;
}
