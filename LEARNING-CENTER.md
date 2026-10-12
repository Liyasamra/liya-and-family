# Liya & Family — free learning center

## Included

- Public learning routes at `/` and `/learn`, requiring no learner account.
- Eight levels: preschool, kindergarten, and grades 1–6.
- 24 original starter lessons: one math, one reading, and one science lesson per level.
- Each lesson includes an objective, explanation, example, off-screen activity, and three practice questions with answer explanations (72 questions total).
- Grade and subject selection, lesson search, retries, best-score tracking, printable lesson and answer guide.
- Weekly routine editor, reading-minute log, JSON backup and validated restore.
- Family guidance, transparent local-storage notices, and links to learning references.

This is a supplemental starter collection, not a complete curriculum, accreditation claim, diagnostic assessment, or staffed live tutoring service. Add lessons through `lib/learning-content.ts` as the program grows. Preschool and kindergarten activities need adult help.

## Architecture and privacy

The existing Next.js application, package lock, family-account routes, Supabase clients, database policies, and MFA implementation are retained. Only `/` and exact `/learn` bypass session initialization because they serve bundled educational content and perform no family-data queries. All other routes retain the existing proxy logic. This change does not establish that the existing authentication foundation has been audited or deployed.

Learning progress is browser-local under `liya-family-learning-v1`. No names, photographs, school details, or new tracking are collected. A shared browser profile can read progress. Progress does not synchronize across devices. Backups contain scores, dates, reading minutes, and weekly plans; families should avoid personal information in plans.

Restore validates data, retains the higher score for each lesson, retains the larger reading-minute total, and restores the incoming weekly plan. This prevents duplicate backups from doubling reading totals.

## Checks

```bash
npm ci
npm run lint
npm run test:learning
npm run build
```

These checks passed when this update was prepared. Automated data tests cover grade coverage, question structure, progress persistence/reload, notification subscriptions, invalid-input rejection, and unavailable-storage fallback. A production browser review, mobile-device testing, print review, and live authentication checks remain necessary before launch. No live Supabase database was modified.

## Install into the existing repository

Apply `Liya-and-Family-Learning.patch` from the repository root with `git apply --check` first. It was prepared against the source fetched on October 11, 2026; review any conflicts if the repository has changed. Alternatively, copy the included `changes/` files to their matching paths. The patch preserves unrelated repository files.

## Hosting

This project uses Next.js server features, authentication callbacks, and server actions. It cannot be deployed unchanged as ordinary GitHub Pages static HTML. Use a Next.js-compatible host for the complete application, with the existing server-only environment configuration. Do not place service-role keys in public variables or GitHub commits. Publishing and account setup have not been performed by this update.

The downloadable HTML preview bundles only the public learning center. It uses system fonts and omits private family-account routes. It is a review tool, not the complete Next.js deployment. Opening it locally may restrict browser storage depending on browser settings; the app reports storage failures and provides backups.

## Instructional references

All lesson text and practice prompts are original. Skill selection was informed by general learning progressions; no claim of full standards alignment is made.

- Reading Rockets, reading aloud: https://www.readingrockets.org/reading-101/pre-k-years/reading-aloud
- Reading Rockets, phonological and phonemic awareness: https://www.readingrockets.org/reading-101/reading-and-writing-basics/phonological-and-phonemic-awareness
- Common Core State Standards, grade 6 ratios: https://www.thecorestandards.org/Math/Content/6/RP/
