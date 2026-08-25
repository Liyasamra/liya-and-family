-- ============================================================
-- 0002: identity + tenancy
-- public.users mirrors auth.users (1:1, populated by trigger).
-- family_groups -> profiles -> profile_members is the tenant chain
-- every other table's RLS ultimately traces back to.
-- ============================================================

-- ---------- users ----------
-- App-level profile row for every authenticated person. Never store a
-- password or MFA secret here — Supabase Auth owns those in its own
-- schema; this table only holds what our app needs to display/authorize.
create table if not exists public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  display_name text,
  avatar_url text,
  is_platform_owner boolean not null default false,
  status text not null default 'active' check (status in ('active','suspended')),
  mfa_enrolled boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Keep public.users in sync with auth.users automatically.
create or replace function public.handle_new_auth_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.users (id, email, display_name)
  values (new.id, new.email, coalesce(new.raw_user_meta_data->>'display_name', new.email))
  on conflict (id) do update set email = excluded.email;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_auth_user();

-- ---------- family_groups ----------
create table if not exists public.family_groups (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  owner_user_id uuid not null references public.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

-- ---------- profiles ----------
-- One row per person the platform holds a learning/keepsake profile
-- for (Liya, a cousin, a student). This is the tenant unit.
create table if not exists public.profiles (
  id uuid primary key default gen_random_uuid(),
  family_group_id uuid not null references public.family_groups(id) on delete cascade,
  display_name text not null,
  template text not null default 'child_learning_portfolio',
  theme jsonb not null default '{}'::jsonb,       -- colors/branding, no code required
  birth_year int,                                  -- year only — never a full DOB, per Phase 1
  bio text,
  status text not null default 'active' check (status in ('active','archived')),
  created_by uuid references public.users(id),
  updated_by uuid references public.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);
create index if not exists idx_profiles_family_group on public.profiles(family_group_id);

-- ---------- profile_members ----------
-- The join table almost every RLS policy in this schema keys off.
create table if not exists public.profile_members (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles(id) on delete cascade,
  user_id uuid not null references public.users(id) on delete cascade,
  role_id uuid not null references public.roles(id),
  invited_by uuid references public.users(id),
  joined_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz,                          -- soft-removes access immediately (RLS filters on this)
  unique (profile_id, user_id)
);
create index if not exists idx_profile_members_profile on public.profile_members(profile_id);
create index if not exists idx_profile_members_user on public.profile_members(user_id);

-- ---------- member_permissions ----------
-- Per-member overrides — additive grants beyond the member's role
-- default (Section D's "granular permissions" requirement).
create table if not exists public.member_permissions (
  id uuid primary key default gen_random_uuid(),
  profile_member_id uuid not null references public.profile_members(id) on delete cascade,
  module text not null references public.modules(key) on update cascade,
  action text not null,
  granted boolean not null default true,
  expires_at timestamptz,                          -- time-limited access, per the access-request spec
  created_by uuid references public.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (profile_member_id, module, action)
);

-- ---------- profile_visibility_settings ----------
create table if not exists public.profile_visibility_settings (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles(id) on delete cascade,
  section text not null,                           -- e.g. 'heritage', 'creations', whole-profile = 'profile'
  visibility text not null default 'private' check (visibility in ('private','shared','public')),
  updated_by uuid references public.users(id),
  updated_at timestamptz not null default now(),
  unique (profile_id, section)
);

-- ---------- invitations ----------
create table if not exists public.invitations (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles(id) on delete cascade,
  email text not null,
  role_id uuid not null references public.roles(id),
  invited_by uuid not null references public.users(id),
  token_hash text not null,                        -- never store the raw token
  expires_at timestamptz not null default (now() + interval '7 days'),
  accepted_at timestamptz,
  revoked_at timestamptz,
  created_at timestamptz not null default now()
);
create index if not exists idx_invitations_profile on public.invitations(profile_id);

-- ---------- access_requests ----------
create table if not exists public.access_requests (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles(id) on delete cascade,
  applicant_user_id uuid not null references public.users(id),
  requested_role_id uuid not null references public.roles(id),
  reason text not null,
  status text not null default 'pending'
    check (status in ('pending','approved','partial','rejected','info_requested','expired')),
  decided_by uuid references public.users(id),
  decided_at timestamptz,
  decision_note text,
  expires_at timestamptz,                          -- time-limited grants
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists idx_access_requests_profile on public.access_requests(profile_id);
create index if not exists idx_access_requests_applicant on public.access_requests(applicant_user_id);

-- Rate-limit / duplicate detection support: an applicant should not be
-- able to have two pending requests for the same profile.
create unique index if not exists uq_one_pending_request
  on public.access_requests(profile_id, applicant_user_id)
  where status = 'pending';
