import { allLessons, lessons, type Grade } from "./learning-content";
import type { Learner } from "./learning-storage";

// One summary per lesson, the shape saved by supabase/progress-sync.sql. No names or answers.
export type SyncItem = { lesson_id: string; best_score: number; best_total: number; last_score: number; last_total: number; last_date: string; attempts: number; mastered_on?: string };
export type SavedRow = SyncItem & { mastered_on: string | null };

export function buildSyncItems(learner: Learner): SyncItem[] {
  const ids = new Set([...Object.keys(learner.progress), ...learner.attempts.map(a => a.lessonId)]);
  const items: SyncItem[] = [];
  for (const id of ids) {
    if (!allLessons.some(l => l.id === id)) continue;
    const tries = learner.attempts.filter(a => a.lessonId === id);
    let last = tries[tries.length - 1];
    for (const t of tries) if (!last || t.date > last.date) last = t;
    const best = learner.progress[id] || (tries.length ? tries.reduce((b, t) => (t.score / t.total > b.score / b.total ? t : b)) : undefined);
    if (!best) continue;
    const latest = last || best;
    const masteredDates = tries.filter(t => t.score === t.total).map(t => t.date).sort();
    const mastered_on = masteredDates[0] || (best.score === best.total ? best.date : undefined);
    items.push({ lesson_id: id, best_score: best.score, best_total: best.total, last_score: latest.score, last_total: latest.total, last_date: latest.date > best.date ? latest.date : best.date, attempts: Math.min(10000, Math.max(1, tries.length)), ...(mastered_on ? { mastered_on } : {}) });
  }
  return items.slice(0, 300);
}

export function summarize(rows: SavedRow[], grade: Grade | string) {
  const gradeLessons = lessons.filter(l => l.grade === grade);
  const byId = new Map(rows.map(r => [r.lesson_id, r]));
  const mastered = gradeLessons.filter(l => byId.get(l.id)?.mastered_on);
  const practiced = gradeLessons.filter(l => byId.has(l.id));
  const needsPractice = practiced.filter(l => !byId.get(l.id)?.mastered_on).map(l => ({ lesson: l, row: byId.get(l.id)! }));
  const recent = [...rows].sort((a, b) => (a.last_date < b.last_date ? 1 : a.last_date > b.last_date ? -1 : 0)).slice(0, 3).map(r => ({ row: r, lesson: allLessons.find(l => l.id === r.lesson_id) })).filter(x => x.lesson);
  return { total: gradeLessons.length, mastered: mastered.length, practiced: practiced.length, needsPractice: needsPractice.slice(0, 3), recent, lastDate: rows.reduce((d, r) => (r.last_date > d ? r.last_date : d), "") };
}

// Finished weekly quizzes and monthly reviews, the shape saved by supabase/checks-sync.sql.
export type CheckItem = { check_id: string; grade: string; week: number; score: number; total: number; taken_on: string };
export function buildCheckItems(learner: Learner): CheckItem[] {
  return (learner.assessments || [])
    .filter(a => /^[A-Za-z0-9-]{1,100}$/.test(a.id) && a.date >= "2026-01-01")
    .map(a => ({ check_id: a.id, grade: a.grade, week: a.week, score: a.score, total: a.total, taken_on: a.date }))
    .slice(-200);
}
