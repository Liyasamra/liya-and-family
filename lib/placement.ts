import { grades, lessonSequence, type Grade, type Subject } from "./learning-content";

// Four questions per level: two math, one reading, one science. Uses the first extra practice
// question of each lesson (not one of the three a child sees first), so it is fresh for most children.
const PICKS: [Subject, number][] = [["Math", 0], ["Math", 1], ["Reading", 0], ["Science", 0]];
export type PlacementQuestion = { lessonId: string; index: number; prompt: string; options: string[]; answer: number };
export type PlacementStep = { grade: Grade; correct: number; total: number };
export const PASS = 3;
const order = grades.map(g => g.id);

export function placementQuestions(g: Grade): PlacementQuestion[] {
  return PICKS.map(([subject, step]) => lessonSequence(g, subject)[step]).filter(Boolean).map(l => {
    const index = l.questions.length > 3 ? 3 : 0;
    const q = l.questions[index];
    return { lessonId: l.id, index, prompt: q.prompt, options: q.options, answer: q.answer };
  });
}

// Strong round (3 or 4 of 4): try the next level up. Hard round: try the level below.
// Stops at the highest level passed, after at most four rounds.
export function nextStep(steps: PlacementStep[]): { done: true; suggest: Grade } | { done: false; level: Grade } {
  const last = steps[steps.length - 1];
  const i = order.indexOf(last.grade);
  const passed = (g: Grade) => steps.some(s => s.grade === g && s.correct >= PASS);
  const failed = (g: Grade) => steps.some(s => s.grade === g && s.correct < PASS);
  if (last.correct >= PASS) {
    const up = order[i + 1];
    if (!up || failed(up) || steps.length >= 4) return { done: true, suggest: last.grade };
    return { done: false, level: up };
  }
  const down = order[i - 1];
  if (!down) return { done: true, suggest: last.grade };
  if (passed(down) || steps.length >= 4) return { done: true, suggest: down };
  return { done: false, level: down };
}
