# Liya & Family — free learning center

## Included

- Public learning routes at `/` and `/learn`, requiring no learner account.
- Eight levels: preschool, kindergarten, and grades 1–6.
- 96 lessons: four ordered lessons in Math, Reading, and Science at each of the eight levels (12 lessons per level).
- Each lesson includes an objective, explanation, example, off-screen activity, and three practice questions with answer explanations (288 questions total).
- Grade and subject selection, lesson search, retries, best-score and dated-attempt tracking, next-lesson navigation, printable lesson and answer guide.
- Up to four local learner profiles, per-learner weekly routine and dated reading logs, printable weekly parent reports, and validated JSON backup/merge.
- Family guidance, transparent local-storage notices, and links to learning references.

This is a supplemental collection, not a complete curriculum, accreditation claim, diagnostic assessment, or staffed live tutoring service. Add lessons through `lib/learning-content.ts` as the program grows. Preschool and kindergarten activities need adult help.

## Architecture and privacy

The existing Next.js application, package lock, family-account routes, Supabase clients, database policies, and MFA implementation are retained. Only `/` and exact `/learn` bypass session initialization because they serve bundled educational content and perform no family-data queries. All other routes retain the existing proxy logic. This change does not establish that the existing authentication foundation has been audited or deployed.

Learning progress is browser-local under `liya-family-learning-v2`. Optional nicknames and animal icons are stored locally. No photos, required child names, school details, or new tracking are collected. A shared browser profile can read progress. Progress does not synchronize across devices. Backups contain learner IDs, optional nicknames, icons, scores, attempt dates, reading entries, and weekly plans; families should avoid personal information in plans.

Restore validates data and merges matching learner IDs, keeps higher best scores, deduplicates attempt and reading records, and keeps existing plans. Importing more than four profiles is rejected without changing current data. An unused starter profile is replaced on a fresh browser so a four-profile backup can be restored. Legacy v1 progress migrates to Original learner; undated old reading minutes are excluded from weekly reports. No old browser-storage key is deleted.

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

## Release: October 12, 2026

- Grade 3 contains four ordered Math lessons (equal groups, arrays, division, area), four Reading lessons (inference, sequence, cause/effect, evidence), and four Science lessons (water cycle, weather, observation records, conservation).
- All levels now have four-step sequences in every subject. This remains a supplement, not a school-year curriculum.
- Parent reports use the selected week, most recent attempt per lesson, and dated reading totals. Labels suggest review or another check; they do not claim mastery or diagnose grade-level readiness.
- A nickname appears in downloaded backups and printed reports. Review before sharing.
- Run `npm run build:pages` after changing public learning sources. It generates both root and docs index files from the same component, using a pinned esbuild version.
- Validation covers legacy migration, multi-learner separation, calendar weeks, latest attempts, idempotent merges, four-profile limits, reloads, and storage failures.

## Trust and community release - October 12, 2026

- About & contact names Samra Ayele as founder and explains the family-led purpose and limits.
- GitHub feedback uses a public issue form with a privacy reminder and requires a GitHub account. No private support inbox is provided.
- Community kit includes three one-page PDFs and a QR SVG. Rebuild with `python scripts/build-community-kit.py` (ReportLab and DejaVu Sans fonts required), then `npm run build:pages`.
- Bundled Latin Quicksand and Baloo font subsets define the CSS variables used by GitHub Pages. Their SIL OFL licenses are in `assets/font-licenses/`. No font requests go to Google.
- `#about`, `#community`, and `#families` open the relevant tab directly. The four-week plan follows the selected learner level.
- Source repository remains public. Progress stays local; the repository does not receive browser progress. This is not a full repository-history or deployed backend security audit.
- Cross-device parent access remains unavailable. The connected Supabase project is Habesha Hub, not a Liya & Family service. A dedicated parent-only backend needs account ownership, child-data minimization, tested authorization, recovery/export/deletion, and an agreed hosting plan before launch.
- Current content remains 96 lessons, not a full-year program; lesson review and longer sequences remain open.
