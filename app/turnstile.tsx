"use client";
// Small Cloudflare Turnstile ("verify you are human") box, used before parent and admin sign-in.
import { useEffect, useRef } from "react";
import { TURNSTILE_SITE_KEY } from "@/lib/turnstile-config";
type TS = { render: (el: HTMLElement, o: Record<string, unknown>) => string; reset: (id?: string) => void; remove: (id: string) => void };
declare global { interface Window { turnstile?: TS } }
let loading: Promise<void> | null = null;
function load() {
  if (window.turnstile) return Promise.resolve();
  loading ??= new Promise<void>((ok, fail) => { const s = document.createElement("script"); s.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"; s.async = true; s.onload = () => ok(); s.onerror = () => { loading = null; fail(new Error("The human check could not load. Check your internet connection and try again.")); }; document.head.appendChild(s); });
  return loading;
}
export const turnstileOn = TURNSTILE_SITE_KEY.length > 0;
// resetKey: change it after each sign-in attempt, because every token works only once.
export default function Turnstile({ onToken, resetKey = 0 }: { onToken: (t: string | undefined) => void; resetKey?: number }) {
  const box = useRef<HTMLDivElement>(null), id = useRef<string | null>(null), cb = useRef(onToken);
  useEffect(() => { cb.current = onToken; });
  useEffect(() => {
    if (!turnstileOn || !box.current) return;
    let dead = false;
    load().then(() => { if (dead || !box.current || !window.turnstile) return; id.current = window.turnstile.render(box.current, { sitekey: TURNSTILE_SITE_KEY, theme: "light", callback: (t: string) => cb.current(t), "expired-callback": () => cb.current(undefined), "error-callback": () => cb.current(undefined) }); }).catch(() => cb.current(undefined));
    return () => { dead = true; if (id.current && window.turnstile) window.turnstile.remove(id.current); id.current = null; };
  }, []);
  useEffect(() => { if (resetKey && id.current && window.turnstile) { window.turnstile.reset(id.current); cb.current(undefined); } }, [resetKey]);
  if (!turnstileOn) return null;
  return <div className="turnstile-box" ref={box} />;
}
