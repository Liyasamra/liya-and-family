"use client";
// Lets the learning page save results to the parent account when a parent signed in to the
// Parent portal in this same browser tab (for example by tapping "Start learning" on a child's card).
// Uses the parent's existing session; nothing new is stored. If the session has expired, it does nothing
// and the Parent portal saves the results the next time a parent signs in on this device.
import { useEffect } from "react";
import type { Learner } from "./learning-storage";
import { buildCheckItems, buildSyncItems, type CheckItem } from "./progress-sync";

const API = "https://cossjxrtskwjpywbwcxk.supabase.co";
const KEY = "sb_publishable_Nl7pxdy3XGiploiAAONesQ_zwZ5jbav";

function token(): string | null {
  try {
    const s = JSON.parse(sessionStorage.getItem("ewket-parent-session") || "null");
    if (s && typeof s.access_token === "string" && typeof s.expires_at === "number" && s.expires_at * 1000 > Date.now() + 60000) return s.access_token;
  } catch { /* storage unavailable */ }
  return null;
}
export const parentSignedIn = () => typeof window !== "undefined" && !!token();

async function rpc<T>(name: string, args: object): Promise<T> {
  const t = token();
  if (!t) throw new Error("Not signed in");
  const r = await fetch(`${API}/rest/v1/rpc/${name}`, { method: "POST", headers: { apikey: KEY, Authorization: `Bearer ${t}`, "Content-Type": "application/json" }, body: JSON.stringify(args) });
  if (!r.ok) throw new Error(`Request failed (${r.status})`);
  return r.json() as Promise<T>;
}

let students: Promise<Record<string, string>> | null = null;
async function studentUuid(code: string) {
  students ??= rpc<{ student_id: string; student_uuid: string }[]>("ewket_my_students", {})
    .then(list => Object.fromEntries((Array.isArray(list) ? list : []).map(s => [s.student_id, s.student_uuid])))
    .catch(e => { students = null; throw e; });
  return (await students)[code] || null;
}

export async function saveToAccount(learner: Learner) {
  if (!learner.studentId || !token()) return false;
  const sid = await studentUuid(learner.studentId);
  if (!sid) return false;
  const lessonsDone = buildSyncItems(learner), checks = buildCheckItems(learner);
  if (lessonsDone.length) await rpc("ewket_sync_progress", { p_student: sid, p_items: lessonsDone });
  if (checks.length) await rpc("ewket_sync_checks", { p_student: sid, p_items: checks });
  return true;
}

export async function accountChecks(learner: Learner): Promise<CheckItem[] | null> {
  if (!learner.studentId || !token()) return null;
  const sid = await studentUuid(learner.studentId);
  if (!sid) return null;
  const list = await rpc<CheckItem[]>("ewket_student_checks", { p_student: sid });
  return Array.isArray(list) ? list : [];
}

// Saves shortly after each finished lesson or check. Failures are quiet; results stay on the device.
export function useAccountSync(learner: Learner) {
  const key = `${learner.id}|${learner.studentId || ""}|${learner.attempts.length}|${learner.assessments?.length || 0}`;
  useEffect(() => {
    if (!learner.studentId || !parentSignedIn()) return;
    const t = setTimeout(() => { saveToAccount(learner).catch(() => {}); }, 1200);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);
}
