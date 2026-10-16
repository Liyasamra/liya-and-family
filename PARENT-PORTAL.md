# Ewket Kids private parent portal

Project: cossjxrtskwjpywbwcxk, independent Ewket Kids organization.

## Implemented and tested
- Private registry tables, permanent server-allocated EW IDs, immutable ledger and retirement.
- Required name/nickname/grade/age constraints; four learners per parent account.
- Idempotent registration requests serialized per parent; globally serialized ID allocation.
- Verified nonanonymous email and active auth session required for every registry request.
- Parents can retrieve only their own ID/nickname/grade/age dashboard; direct table access denied.
- Authoritative administrator membership, MFA (aal2) and audit entries required for nickname corrections.
- Static parent-portal.html with sign-in, signup, recovery, password change, registration and own-family views. Session storage is tab-scoped; credentials are not logged or stored in GitHub. Publishable key only; no secret/service-role keys.
- Real-name registration is disabled both in the interface and database. Backend gate remains closed if its settings row is missing. Public status intentionally returns false until launch review.
- SQL tests use two fictional parent/session fixtures inside a transaction and roll back. They check cross-family denial, anonymous denial, direct-table denial, idempotency, required nickname and MFA-protected correction. No real email delivery tested.

## Required launch configuration
1. Supabase Authentication URL Configuration: Site URL and allowed Redirect URL both https://ewketkids.org with redirect allow list https://ewketkids.org/** and https://www.ewketkids.org/** (done 2026-10-15).
2. Configure custom SMTP; default Supabase SMTP is team-only and unsuitable for parent enrollment. Verify sending domain records and perform owner-authorized confirmation/recovery tests. Never paste SMTP credentials into chat or public source.
3. Owner creates and confirms their own parent account, enrolls MFA, and verifies identity before a privileged database operator assigns administrator membership. Do not trust user-editable metadata or email text alone for admin access.
4. Finish a reviewed parent notice, verifiable consent workflow as applicable, retention policy, export/deletion process, administrator UI and cloud learning/assessment synchronization. Current checkbox is only acknowledgment, not complete consent verification.
5. Review backup/recovery under the selected plan; perform restore exercise and live two-account allow/deny tests before admitting real students.
6. Only after readiness, update the public status function and registration gate in a coordinated launch. Registration is currently unavailable. Student names must not be entered until launch.

## Limits
- Local learner profiles remain local and are not permanent registrations. Required nicknames and read-only assigned ID display are the local transition changes.
- No cloud lesson/assessment synchronization, admin UI, parent data export/deletion UI, verified honors, or enrollment email delivery is live.
- RLS-without-policy informational notices are expected for internal tables: clients have no table grants and narrowly granted private functions explicitly authorize requests. Security-definer functions are private with an empty search path; public wrappers are security-invoker.
- Database migrations are saved as reviewed SQL source files, not falsely recorded as CLI-generated migrations. CLI unavailable in this workspace. Do not re-run foundation creation against the populated project.

## Names, certificates and recognition (2026-10-15)
- supabase/certificates-api.sql: parents see their own child's name; optional public-recognition consent per child; organizer looks up one name at a time by EW number (MFA required, each lookup audited as name_viewed_for_certificate). Admin list stays nickname-only. New registrations record parent-notice-v2.
- supabase/certificates-test.sql: two-family allow/deny test, rolls back.
- privacy.html: public Parent Privacy Notice v2, linked from the registration consent and portal footer.
- Custom SMTP (Google Workspace, sender hello@ewketkids.org) is configured; owner admin account has MFA.

## Progress saved to the parent account (2026-10-16)
- supabase/progress-sync.sql: ewket_private.lesson_progress holds one summary row per child per lesson (best score, latest score, tries, date mastered). No names, answers or free text. ewket_sync_progress merges a device's batch (best keeps the higher score, latest keeps the newest date, tries keep the larger count, mastered keeps the earliest date); ewket_student_progress returns one child's rows. Both require a verified parent session and the child must belong to that parent.
- supabase/progress-sync-test.sql: two-family allow/deny test (own sync and merge, invalid data refused, other family cannot read or write, direct table and anonymous access denied). Rolls back. Verified locally against PGlite with an auth stub; run it in Supabase after the API file.
- Parent portal: on sign-in, results stored on this device for learners linked to an EW number are saved to the account, then a progress card shows lessons done at the child's grade, recent lessons and what needs more practice. Learners not linked to an EW number are never sent.
- The learning page also saves a linked learner's lessons and practice checks right away when a parent signed in to the portal in the same tab (lib/account-link.ts reuses that session; nothing new is stored). An expired session does nothing, and the portal catches up at the next sign-in on that device.
- supabase/checks-sync.sql + checks-sync-test.sql: practice checks (weekly quizzes, monthly reviews) saved per child (level, week, score, date), insert-only by check id, same ownership rules. The Practice checks page and yearly certificate show account checks from every device.
