// English / Amharic switch (owner request, 2026-10-18).
// English text is the key; lib/amharic.ts holds the Amharic for each one. Anything without Amharic yet shows in English.
// The choice is saved on this device only. First render is always English so the prerendered page matches.
import { am } from "./amharic";

export type Lang = "en" | "am";
const KEY = "ewket-lang";
const listeners = new Set<() => void>();
let saved: Lang | null = null;
// The language used while a screen draws. The page's top component sets it each time it draws.
let drawing: Lang = "en";

function readSaved(): Lang {
  if (saved) return saved;
  try { saved = window.localStorage.getItem(KEY) === "am" ? "am" : "en"; } catch { saved = "en"; }
  return saved;
}
export function subscribeLang(fn: () => void) { listeners.add(fn); return () => { listeners.delete(fn); }; }
export function getLang(): Lang { return typeof window === "undefined" ? "en" : readSaved(); }
export function getServerLang(): Lang { return "en"; }
export function setLang(next: Lang) {
  saved = next;
  try { window.localStorage.setItem(KEY, next); } catch {}
  applyDocumentLang(next);
  listeners.forEach(fn => fn());
}
export function applyDocumentLang(lang: Lang) { if (typeof document !== "undefined") document.documentElement.lang = lang === "am" ? "am" : "en"; }
/** Called by the page's top component with the language it is drawing in. */
export function useDrawingLang(lang: Lang) { drawing = lang; }
export function currentLang() { return drawing; }

/** Translate one English text. {0}, {1}… are filled from values, in either language. */
export function t(en: string, ...values: (string | number)[]): string {
  const text = drawing === "am" && am[en] ? am[en] : en;
  return values.length ? text.replace(/\{(\d+)\}/g, (m, i) => (values[+i] !== undefined ? String(values[+i]) : m)) : text;
}
/** True when this English text has an Amharic version (used by tests and the review sheet). */
export function hasAmharic(en: string) { return !!am[en]; }
