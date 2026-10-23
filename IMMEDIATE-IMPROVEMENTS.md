# Ewket Kids: educator and parent-account acceptance review

October 22, 2026. This is a review checklist, not a claim of completed educator or production security certification.

## Educator review

Active library: 176 lessons, including 160 school-subject lessons and 16 Amharic heritage lessons at preschool, kindergarten, Grades 1 and 2. Review each lesson for age-appropriate objectives, accurate explanations and examples, valid question choices/answers, progression, standard-reference accuracy, accessibility of picture/audio activities, and suitability for bilingual learners. Review Amharic with a fluent educator. Record lesson ID, reviewer qualification, date, findings, correction and retest; publish a reviewer credit only with permission and after actual review. Automated structural and answer-consistency checks do not establish educational validity.

Reviewer: pending
Scope: pending
Findings and sign-off: pending

## Parent-account production acceptance

The connected Supabase account exposes Habesha Hub, not the Ewket Kids project referenced by the source. No child records were queried or modified. No new live account was created, no password reset was sent and no deletion was attempted. Production backend verification remains pending access to an isolated test environment or owner-operated test accounts.

Use synthetic data only in a dedicated staging environment. Do not test by accessing real children’s records. Create two parent test accounts; verify email confirmation and recovery. Register one synthetic learner per account. Confirm each parent sees only their own records, including direct API checks for denied cross-account access. Confirm a signed-out request cannot read family data. Link a test device using a one-time code; verify expiry, one-time use, correct learner restriction, saving scores, and denial of reading family data through device credentials. Unlink the device and verify writes are rejected. Confirm failed sync preserves browser progress and does not claim success. Test parent-initiated deletion only against named disposable staging records; verify deletion and retention/backups behavior against the published policy. Confirm privacy consent/version and optional public recognition default. Check organizer access, second-factor enforcement and audit trail using staging permissions. Capture results without names/tokens/passwords. Reconfirm email delivery and redirects on ewketkids.org.

## Implemented public-site fixes

Visible Amharic homepage entry and actual coverage label; clearer parent-account action and free-without-account explanation; data-driven family counts and weekly plan including available Amharic lessons; corrected About coverage; consistent local versus linked-account explanations; parent-controlled exploration of later steps for the current visit, reset on level/learner change; mastery still requires all-correct results; age-neutral help wording; custom-domain canonical/social metadata.
