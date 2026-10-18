# Amharic on Ewket Kids

Added October 18, 2026. Draft Amharic by Claude, reviewed by Samra before it goes live.

## What families see
- **English / አማርኛ button** in the header of the learning site and the Parent portal. The choice is saved on that device.
- **Site text in Amharic**: menus, buttons, messages, About, quizzes, level check, device linking and the whole Parent portal.
- **"Say it in Amharic" (በአማርኛ)** on every lesson: the lesson's goal and explanation in Amharic. Questions and answers stay in English, so lessons still match Ohio's school standards. If the device has an Amharic voice, it can read the Amharic aloud; most devices do not, so the box says a grown-up can read it.
- **Amharic subject (fidel)** for Preschool to Grade 2, four steps per level: letter sounds, the seven forms of a fidel family, first words, numbers and Ge'ez numerals, family words, greetings, short sentences, the Ethiopian calendar, punctuation and opposites. These are heritage-language lessons, not part of Ohio's standards, and they are not in the weekly quizzes or the level check.

## Where things live
- `lib/i18n.ts`: the switch and `t("English text")`. The first draw is always English so the ready-made home screen matches; Amharic follows right after.
- `lib/amharic.ts`: Amharic for every site text, keyed by the English. A text with no Amharic shows in English.
- `content-src/amharic-lessons-*.json`: Amharic goal and explanation per lesson. The build merges them into `assets/amharic-lessons.json`, which loads only when "Say it in Amharic" is opened.
- `content-src/amharic-fidel.mjs` → `lib/amharic-fidel.ts` (build with `node content-src/build-lessons.mjs "Amharic" amharicFidel lib/amharic-fidel.ts ./amharic-fidel.mjs`).
- Font: Noto Sans Ethiopic (SIL OFL, `assets/font-licenses/`), in `assets/fonts/`. Browsers download it only when Amharic letters are on screen.

## Adding or changing text
1. Wrap new visible English in `t("…")` (blanks as `t("{0} of {1} done", a, b)`).
2. Add its Amharic to `lib/amharic.ts`, with the same `{0}` blanks.
3. `tests/amharic.cjs` fails if any wrapped text has no Amharic, if blanks differ, or if a lesson lacks its Amharic help.

## Review
`scripts/amharic-review-items.cjs` lists every Amharic text for the review page. Corrections saved there are read back by Claude and applied to the files above.
