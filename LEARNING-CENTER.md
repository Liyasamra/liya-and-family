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

## Visual learning release - October 12, 2026

- All 96 lesson cards have bundled SVG illustrations. Model previews are tied to the specific picture activity; remaining cards use subject illustrations.
- 24 interactive activities cover one Math, Reading, and Science lesson at each level. Look for Picture lab labels; the remaining 72 lessons retain text, examples, and off-screen activities.
- Math models: three-apple counting, make-ten frame, tens and ones, regrouping 27 + 15, equal groups, equivalent fractions, adding fractions, and notebook unit prices.
- Reading: rhyming/blending pictures, illustrated event ordering, inference, main idea, evidence, and source checking. Science: safe senses, plant needs, solids/liquids, habitats, water-cycle exploration, food-chain ordering, changes to matter, and fair tests.
- Exploration is temporary and does not add a score, attempt, or mastery claim. Changing lessons resets its controls. Existing learner progress and reports are retained.
- Every lesson has an optional Listen control. It uses browser speech synthesis only after a click, prefers an English local voice, offers Stop, cancels on leaving a lesson, and reports unavailable audio. Voice availability and sound quality depend on the device. Some voices may use an online service; only public lesson text is read. A grown-up should model phonics sounds, which synthetic voices may mispronounce.
- SVG illustrations and fonts are bundled; no image service, advertising, third-party picture requests, account, or tracking is added. No autoplay or dragging is required; controls are native buttons/inputs with text labels and polite feedback.
- `npm run test:visual` checks all 24 activities, math and science feedback, wrong/correct choices, ordering/undo, progress isolation, speech lifecycle, local-voice preference, audio errors, and unsupported browsers. jsdom is a pinned development-only dependency.

## Phase 1 trust fixes - October 13, 2026

- Parent report can create a URL-fragment snapshot for another phone. It contains a generic learner number, selected grade, week, latest lesson results, attempt count, and dated reading minutes. Nicknames, plans, legacy undated minutes, and complete history are excluded. Sharing uses the device share sheet or clipboard when available, otherwise manual copy.
- Snapshot links are encoded, not encrypted; anyone holding one can read it. They are not live synchronization, cannot be revoked, and are not full backups. The viewer validates bounded payloads and never imports the summary into local progress.
- All practice questions have read-aloud controls for prompts and letter-labelled choices; checked answers have feedback read-aloud. Controls are present by default, including Preschool and Kindergarten. No autoplay is used. Voice availability and phonics limitations remain device-dependent.
- The family brand was retained by the owner. Current About copy and community-kit footers no longer connect a named child with a parent’s job or personal biography. Previously published copies and repository history are not erased by this change.
- All 63 template objectives were replaced with specific skill goals.
- Open Graph/Twitter metadata, a 1200-by-630 PNG share card, a canonical GitHub Pages URL, and no-JavaScript printable-resource guidance are included in the Pages build. Platform previews may cache older metadata.
- Private contact remains pending: the owner selected project email but still needs to create an inbox. GitHub is now described as a technical reporting channel only.
- Repository visibility, alternate deployments, optional parent accounts, and Phase 2/3 content work remain open. See FIX-TRACKER.md.
- `npm run test:phase-one` checks report validation, privacy filtering, receiving-browser persistence, question/choice/feedback audio, link creation, About trimming, and share metadata.
