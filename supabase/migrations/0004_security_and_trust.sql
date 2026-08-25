-- ============================================================
-- 0004: security & trust + platform operations
-- Powers Active Sessions, Recognized Devices, Recent Activity,
-- Security Alerts, and the Admin Audit Log from the master prompt.
-- All append-only or self-scoped — see RLS in 0005.
-- ============================================================

create table if not exists public.active_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  session_id text not null,                       -- Supabase Auth session identifier
  device_id uuid,
  ip_approx text,                                  -- coarse (city/region), never full precision
  user_agent text,
  created_at timestamptz not null default now(),
  last_seen_at timestamptz not null default now(),
  revoked_at timestamptz
);
create index if not exists idx_active_sessions_user on public.active_sessions(user_id);

create table if not exists public.recognized_devices (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  device_fingerprint text not null,
  label text,
  first_seen_at timestamptz not null default now(),
  last_seen_at timestamptz not null default now(),
  unique (user_id, device_fingerprint)
);

create table if not exists public.login_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users(id) on delete set null,
  email_attempted text,
  success boolean not null,
  ip_approx text,
  device_id uuid references public.recognized_devices(id),
  mfa_used boolean not null default false,
  failure_reason text,
  created_at timestamptz not null default now()
);
create index if not exists idx_login_events_user on public.login_events(user_id, created_at desc);

create table if not exists public.security_alerts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  type text not null check (type in (
    'new_device','unusual_location','unusual_time','repeated_failures',
    'password_reset','mfa_failure','role_change','bulk_export',
    'multi_profile_access','rapid_requests'
  )),
  detail jsonb not null default '{}'::jsonb,
  status text not null default 'open' check (status in ('open','acknowledged','dismissed')),
  created_at timestamptz not null default now(),
  resolved_at timestamptz
);
create index if not exists idx_security_alerts_user on public.security_alerts(user_id, status);

-- Append-only. Nothing in the application ever updates or deletes a row
-- here — see RLS 0005 (insert + select only, no update/delete grants).
create table if not exists public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  actor_user_id uuid references public.users(id),
  profile_id uuid references public.profiles(id),   -- null for platform-level actions
  action text not null,                              -- e.g. 'permission.grant', 'profile.archive'
  target_table text,
  target_id uuid,
  before jsonb,
  after jsonb,
  created_at timestamptz not null default now()
);
create index if not exists idx_audit_logs_profile on public.audit_logs(profile_id, created_at desc);
create index if not exists idx_audit_logs_actor on public.audit_logs(actor_user_id, created_at desc);

create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  type text not null,
  payload jsonb not null default '{}'::jsonb,
  read_at timestamptz,
  created_at timestamptz not null default now()
);
create index if not exists idx_notifications_user on public.notifications(user_id, read_at);

-- Consent is always recorded against the consenting ADULT, even when it
-- concerns a child's profile — a child is never the subject that grants
-- their own consent record.
create table if not exists public.consent_records (
  id uuid primary key default gen_random_uuid(),
  recorded_against uuid not null references public.users(id),
  profile_id uuid references public.profiles(id),
  consent_type text not null,                       -- e.g. 'data_collection', 'photo_use'
  granted boolean not null,
  policy_version text not null,
  recorded_at timestamptz not null default now()
);
create index if not exists idx_consent_records_user on public.consent_records(recorded_against);
