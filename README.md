# Liya & Family — free learning

Live site: https://liyasamra.github.io/liya-and-family/

The public learning center now includes 96 lessons across preschool through Grade 6, four ordered lessons per subject at every level, up to four local learner profiles, dated practice and reading records, and printable weekly parent reports. Learning requires no online account. Progress stays in the browser, with validated backups for moving between devices.

The learning library has illustrated lesson cards, 24 interactive picture activities (one per subject at each level), and optional browser read-aloud for all 96 lessons. Activities support taps and keyboard controls without dragging and keep exploration separate from scored practice. Run `npm run test:visual` to check the interactive activities and speech fallbacks.

Parent reports now provide read-only sharing links for another phone; these are encoded snapshots, not encrypted links or automatic synchronization. Practice questions, answer choices, and feedback have optional read-aloud controls. Private parent contact is pending creation of a dedicated project inbox; GitHub is for technical reporting only. See `FIX-TRACKER.md` for current gaps.

The public pages include About & contact, a four-week practice plan for each selected level, and a printable community kit (flyer, QR code, family start guide, group-leader guide). Fonts are bundled locally under SIL Open Font Licenses. Feedback goes to public GitHub issues; never submit child information or progress files.

This is a supplemental learning resource, not a complete school-year curriculum or staffed tutoring service. Every level offers four lessons each in Math, Reading, and Science.

See LEARNING-CENTER.md for privacy, migration, and reporting details. Run npm run lint, npm run test:learning, npm run build, and npm run build:pages to validate and regenerate the public site.

The existing private family-account foundation below is separate and is not served by GitHub Pages. Its configuration and deployment requirements still apply.

---

# Liya's World — Phase 2 (Foundation)

This is the secure foundation from the Phase 1 plan: real authentication, real
database-enforced authorization (Row-Level Security, not a front-end PIN), the
role/permission system, and the access-request workflow. It does **not** yet
include the Learning Center, Homework, Reading, or the full Parent/Owner
dashboards — that's Phase 3, built on top of what's here.

Nothing in this folder is deployed. It's a complete, tested (typecheck + lint
+ production build all pass locally) codebase ready for you to connect to
your own Supabase project and deploy — following your own working rule to
approve deployment before anything goes live.

## What's actually working right now

- Sign up, email verification, sign in, password reset — all through Supabase
  Auth, no passwords or tokens ever touch this app's own database.
- Mandatory TOTP (authenticator-app) MFA for Platform Owners and Profile
  Admins, enforced in `proxy.ts` (Next.js 16's renamed `middleware.ts`) — you
  cannot reach `/dashboard` or `/admin/*` without it.
- "Log out of all devices."
- The full 29-table schema and Row-Level Security policies from the Phase 1
  plan, migration-tested end to end (see `supabase/migrations/`).
- The role/permission engine: 7 roles, per-module and per-record overrides,
  all enforced in the database via the `auth_has_permission(...)` function
  every content-table policy calls.
- The "Request Access" workflow: request form, rate limiting, duplicate
  prevention, admin approve/partial/reject/info-requested, audit log entry,
  notification to the applicant with no private profile content leaked.

## 1. Create your Supabase project

1. Go to [supabase.com](https://supabase.com) and create a free project (see
   the Phase 1 plan for current pricing — this fits the free tier easily at
   family scale).
2. In the SQL Editor, run each file in `supabase/migrations/` **in order**,
   0001 through 0006. (Or, if you have the Supabase CLI installed:
   `supabase link` then `supabase db push`.)
3. In **Authentication → Providers**, email sign-up is on by default. In
   **Authentication → Multi-Factor**, make sure TOTP is enabled (it is by
   default).
4. In **Project Settings → API**, copy your Project URL, anon key, and
   service role key.

## 2. Configure this app

```bash
cp .env.example .env.local
# then fill in the four values from Supabase's API settings
```

Never commit `.env.local`. The service role key in particular bypasses every
RLS policy — it's only used server-side, in `lib/supabase/server.ts`'s
`createServiceRoleClient()`, reserved for one-time admin/migration scripts.

## 3. Run it locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## 4. Make yourself the first Platform Owner

There's deliberately no self-service way to become a Platform Owner — that
would defeat the whole point of the role. After you sign up through the app
once:

1. In Supabase's SQL Editor, run:
   ```sql
   update public.users set is_platform_owner = true where email = 'you@example.com';
   ```
2. Sign back in — you'll be sent to `/mfa/enroll` (mandatory for Owners),
   then land on `/dashboard`.

From there, use the SQL Editor (for now — a proper admin UI for this is
Phase 3) to create your first `family_groups` and `profiles` row, and add
yourself to `profile_members` with the `profile_admin` role, so you can
actually invite people and manage a profile day to day.

## 5. Try the access-request flow

Share a link like `/request-access/<profile-id>` with a teacher, tutor, or
relative (once they've created an account). Their request lands in
`/admin/access-requests` for whoever administers that profile to approve,
partially approve, reject, or ask for more information — matching the
workflow in the Phase 1 plan exactly.

## 6. Deploy (when you're ready — not before you say so)

1. Push this repository to a **private** GitHub repo.
2. Import it into Vercel, add the same four environment variables from step
   2 in Vercel's Project Settings → Environment Variables.
3. Set `NEXT_PUBLIC_SITE_URL` to your real Vercel URL (needed for the email
   verification / password-reset redirect links to work).
4. Deploy.

Per your own working rules, I have not deployed this, changed any domain, or
touched the live `liyasamra.github.io/liyas-world` site — that one keeps
running exactly as it is until you've reviewed this, and until Phase 4's
tests all pass.

## Project structure

```
proxy.ts                     Next.js 16's `middleware.ts` — session refresh,
                              login redirect, mandatory-MFA enforcement
lib/supabase/
  client.ts                  Browser Supabase client
  server.ts                  Server Supabase client + service-role client
  middleware.ts               Session-refresh logic proxy.ts calls
lib/permissions.ts            Server-side permission-check helpers (UI only —
                               RLS is the real enforcement)
lib/validation/auth.ts        Every Zod schema used by a Server Action
app/actions/
  auth.ts                    Sign up/in/out, password reset, MFA enroll/challenge
  access-requests.ts          Create + decide access requests
app/(auth)/                   Login, signup, reset/update password, MFA pages
app/auth/callback/route.ts    Email verification / reset link handler
app/dashboard/                Minimal authenticated landing (Phase 3 expands this)
app/request-access/[profileId]/  Public request form
app/admin/access-requests/    Pending-requests queue for admins
supabase/migrations/          The full schema + RLS, 0001 through 0006, in order
```

## What's next (Phase 3)

The multi-profile switcher, the "Create Your World" guided profile setup,
every learning module rebuilt on this real data, the full Parent/Owner
dashboards, Security Center, audit log viewer, and notifications UI — all
specified in the Phase 1 plan, all building on the foundation in this
repository without changing any of it.

