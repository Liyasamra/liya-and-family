-- ============================================================
-- 0001: extensions + reference tables (roles, permissions, modules)
-- These are read-only catalogs the whole schema keys off. No family
-- data lives here — safe to run in any environment.
-- ============================================================

create extension if not exists pgcrypto;

-- ---------- roles ----------
-- The 7 roles from the Phase 1 permission matrix.
create table if not exists public.roles (
  id uuid primary key default gen_random_uuid(),
  key text unique not null,             -- stable machine key, e.g. 'profile_admin'
  label text not null,                  -- human label, e.g. 'Profile Administrator / Parent'
  description text,
  created_at timestamptz not null default now()
);

insert into public.roles (key, label, description) values
  ('platform_owner',  'Platform Owner',               'Full control over the whole platform.'),
  ('profile_admin',   'Profile Administrator / Parent','Manages only the profiles assigned to them.'),
  ('teacher_tutor',    'Teacher / Tutor',              'Views approved educational content; edits only when authorized.'),
  ('contributor',      'Contributor',                  'Adds approved content; edits only their own submissions.'),
  ('viewer',           'Viewer',                        'Read-only access to specifically shared content.'),
  ('child',            'Child / Profile Owner',         'Simplified interface; drafts and submits work for approval.'),
  ('guest',            'Guest',                          'Sees only intentionally published content.')
on conflict (key) do nothing;

-- ---------- modules ----------
-- The content areas from the existing site, unchanged in spirit.
create table if not exists public.modules (
  id uuid primary key default gen_random_uuid(),
  key text unique not null,             -- e.g. 'homework', 'learning', 'reading'
  label text not null,
  icon text,
  created_at timestamptz not null default now()
);

insert into public.modules (key, label, icon) values
  ('learning',     'Learning Center',        '📖'),
  ('homework',     'Weekly Homework',        '📝'),
  ('reading',      'Reading Log',            '📚'),
  ('creations',    'Creations',              '🎨'),
  ('achievements', 'Achievements',           '🏆'),
  ('story',        'Personal Story',         '💭'),
  ('heritage',     'Faith & Heritage',       '✝️'),
  ('dreams',       'Dreams',                 '🌟')
on conflict (key) do nothing;

-- ---------- permissions ----------
-- Catalog of (module, action) pairs. Actions match the Phase 1 matrix.
create table if not exists public.permissions (
  id uuid primary key default gen_random_uuid(),
  module text not null references public.modules(key) on update cascade,
  action text not null check (action in (
    'view','create','edit','comment','approve','publish',
    'download','export','invite','manage_users','manage_permissions',
    'delete','restore'
  )),
  created_at timestamptz not null default now(),
  unique (module, action)
);

insert into public.permissions (module, action)
select m.key, a.action
from public.modules m
cross join (values
  ('view'),('create'),('edit'),('comment'),('download'),('delete')
) as a(action)
on conflict (module, action) do nothing;

-- ---------- role_permissions ----------
-- Default grants per role (the role-level columns of the Phase 1 matrix).
-- Platform Owner is handled in code/RLS as "bypasses everything" rather
-- than an exhaustive row per permission — see auth_is_platform_owner().
create table if not exists public.role_permissions (
  id uuid primary key default gen_random_uuid(),
  role_id uuid not null references public.roles(id) on delete cascade,
  permission_id uuid not null references public.permissions(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (role_id, permission_id)
);

-- Profile Admin: full view/create/edit/comment/delete on every module
-- except platform-level actions (invite/manage_users/manage_permissions/
-- publish/approve/export are granted narrowly via code, not blanket here).
insert into public.role_permissions (role_id, permission_id)
select r.id, p.id
from public.roles r
join public.permissions p on p.action in ('view','create','edit','comment','delete')
where r.key = 'profile_admin'
on conflict do nothing;

-- Teacher/Tutor: view everything by default (per-module edit grants are
-- added later via member_permissions, not blanket here).
insert into public.role_permissions (role_id, permission_id)
select r.id, p.id
from public.roles r
join public.permissions p on p.action in ('view','comment')
where r.key = 'teacher_tutor'
on conflict do nothing;

-- Contributor: view + create + comment; edit is restricted to their own
-- rows at the application layer (RLS can't easily express "own row" for
-- a blanket role grant, so contributor edit/delete policies check
-- created_by = auth.uid() directly — see 0005_rls_policies.sql).
insert into public.role_permissions (role_id, permission_id)
select r.id, p.id
from public.roles r
join public.permissions p on p.action in ('view','create','comment')
where r.key = 'contributor'
on conflict do nothing;

-- Viewer: view only.
insert into public.role_permissions (role_id, permission_id)
select r.id, p.id
from public.roles r
join public.permissions p on p.action = 'view'
where r.key = 'viewer'
on conflict do nothing;

-- Child: view + create + comment (their own drafts) — edit/delete of
-- their own rows is enforced via created_by checks, same as Contributor.
insert into public.role_permissions (role_id, permission_id)
select r.id, p.id
from public.roles r
join public.permissions p on p.action in ('view','create','comment')
where r.key = 'child'
on conflict do nothing;

-- Guest: nothing by default — profile_visibility_settings governs what a
-- guest can see (public sections only), enforced separately in RLS.
