# Ewket Kids student program

## Available now
- An optional organizer-assigned EW student ID on a local learner profile; format EW001, EW002, continuing beyond EW999. IDs survive full backup and restore. Duplicate codes in one family browser are rejected. Codes are labels, never authentication credentials.
- Four weekly practice quizzes per level (9 questions each, covering Math, Reading and Science) and a monthly review (36 questions). All eight levels are included. Questions reuse the existing lessons; these are practice checks, not independently validated exams.
- Dated local assessment history, read-aloud questions and feedback, and full-backup inclusion. Phone report snapshots do not include assessments or student IDs yet.
- An ID-only printable calendar-year participation certificate after a recorded assessment that year. Local records are editable, unsigned and not independently verified; this is not an official honor credential.

## Required before permanent enrollment and official annual honors
1. Dedicated private parent service, parent authorization, access/deletion/export controls, and a reviewed privacy notice. Do not keep child names in GitHub, public forms, report URLs or browser nicknames.
2. Assign EW numbers centrally with a unique database constraint, never reuse retired numbers, and retain immutable internal UUIDs across devices and grade changes. Keep identity mapping private and separate from public learning.
3. Parent account access limited to their own children's records; limited authorized organizer access. Predictable EW numbers must never permit record lookup without authorization.
4. Teacher-reviewed question banks and rubrics, equivalent assessment forms, accommodations, supervised assessment procedures and an appeals/correction process.
5. Publish annual award criteria before the assessment period. Recognize improvement, steady participation and achievement separately; no public child ranking or automatic scholarship decisions from browser scores.
6. Organizer-reviewed yearly honor certificates, stable certificate numbers, parent consent for sharing, and verification that does not expose child identity or scores. Participation certificates remain distinct.

The site remains a practice supplement, not an accredited school or a full-year curriculum. No centralized registry, legal-name collection, automatic enrollment, verified honors or school credentials are live.

## Required registration specification (owner update)
Permanent registration requires an automatically allocated unique EW number and a nonblank nickname. The local learner screen now rejects blank nicknames and displays assigned IDs read-only; it cannot issue globally unique registrations. Existing local profiles and backups remain compatible. Admin authorization is not represented by this shared-browser screen.

The future registry must allocate identifiers transactionally, enforce a database uniqueness constraint and immutable ID trigger, keep a retired-ID ledger, and prohibit counter resets/reuse. Failed transactions may leave numeric gaps; uniqueness and non-reuse take priority over gap-free numbering. Registration requests need idempotency protection. Nickname corrections require authenticated authorized parent/admin access and an audit record, with no ID update permission. Never authorize access by knowing an EW number alone.

Blocked deployment dependency: no dedicated Ewket Kids Supabase project is connected. Only the Habesha Hub project/organization is currently available. Owner must select the organization for a separate project and review cost before provisioning. Authenticated parent registration and administrator-only nickname correction are not live.
