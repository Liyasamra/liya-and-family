-- ============================================================
-- 0003: content & learning modules
-- Everything Liya's World already does today, mapped onto real,
-- tenant-scoped tables. `profile_id` is the isolation boundary RLS
-- (0005) filters every one of these on.
-- ============================================================

create table if not exists public.profile_modules (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles(id) on delete cascade,
  module_key text not null references public.modules(key) on update cascade,
  enabled boolean not null default true,
  created_at timestamptz not null default now(),
  unique (profile_id, module_key)
);

-- Shared curriculum library (the 11-subject/54-lesson content from the
-- current site). Not tenant-scoped — it's reference content every
-- profile with the Learning module enabled can read.
create table if not exists public.lessons (
  id uuid primary key default gen_random_uuid(),
  subject text not null,
  unit text,
  title text not null,
  objective text,
  body jsonb not null default '{}'::jsonb,     -- explain/example/practice/vocab/review/etc.
  created_by uuid references public.users(id),
  updated_by uuid references public.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);
create index if not exists idx_lessons_subject on public.lessons(subject);

create table if not exists public.assignments (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles(id) on delete cascade,
  module_key text not null default 'homework' references public.modules(key),
  title text not null,
  instructions text,
  subject text,
  due_date date,
  priority text default 'normal' check (priority in ('low','normal','high')),
  status text not null default 'not_started'
    check (status in ('not_started','in_progress','submitted','reviewed','complete')),
  is_demo boolean not null default false,
  created_by uuid references public.users(id),
  updated_by uuid references public.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);
create index if not exists idx_assignments_profile on public.assignments(profile_id);
create index if not exists idx_assignments_due on public.assignments(profile_id, due_date);

create table if not exists public.submissions (
  id uuid primary key default gen_random_uuid(),
  assignment_id uuid not null references public.assignments(id) on delete cascade,
  profile_id uuid not null references public.profiles(id) on delete cascade,  -- denormalized for RLS simplicity
  submitted_by uuid not null references public.users(id),
  content text,
  attachments uuid[] default '{}',              -- file ids
  status text not null default 'submitted' check (status in ('submitted','reviewed')),
  submitted_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);
create index if not exists idx_submissions_assignment on public.submissions(assignment_id);
create index if not exists idx_submissions_profile on public.submissions(profile_id);

create table if not exists public.feedback (
  id uuid primary key default gen_random_uuid(),
  submission_id uuid not null references public.submissions(id) on delete cascade,
  profile_id uuid not null references public.profiles(id) on delete cascade,
  author_id uuid not null references public.users(id),
  body text not null,
  rubric_score numeric,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);
create index if not exists idx_feedback_submission on public.feedback(submission_id);

create table if not exists public.reading_logs (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles(id) on delete cascade,
  title text not null,
  author text,
  sessions jsonb not null default '[]'::jsonb,   -- [{date, minutes, pages}]
  is_demo boolean not null default false,
  created_by uuid references public.users(id),
  updated_by uuid references public.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);
create index if not exists idx_reading_logs_profile on public.reading_logs(profile_id);

create table if not exists public.achievements (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles(id) on delete cascade,
  title text not null,
  category text,
  achieved_on date,
  is_demo boolean not null default false,
  created_by uuid references public.users(id),
  updated_by uuid references public.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);
create index if not exists idx_achievements_profile on public.achievements(profile_id);

create table if not exists public.creations (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles(id) on delete cascade,
  title text not null,
  type text,
  file_id uuid,                                  -- references files(id); FK added after files exists
  description text,
  created_by uuid references public.users(id),
  updated_by uuid references public.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);
create index if not exists idx_creations_profile on public.creations(profile_id);

create table if not exists public.goals (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles(id) on delete cascade,
  subject text,
  description text not null,
  target_date date,
  status text not null default 'active' check (status in ('active','met','dropped')),
  created_by uuid references public.users(id),
  updated_by uuid references public.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);
create index if not exists idx_goals_profile on public.goals(profile_id);

-- ---------- files ----------
-- Metadata row for anything in Supabase Storage. Storage buckets stay
-- private; every access happens through a signed URL issued after this
-- table's RLS says the requester is allowed to see the row.
create table if not exists public.files (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles(id) on delete cascade,
  owner_id uuid not null references public.users(id),
  storage_path text not null,
  mime_type text,
  byte_size bigint,
  exif_stripped boolean not null default false,
  visibility text not null default 'private' check (visibility in ('private','shared','public')),
  created_at timestamptz not null default now(),
  deleted_at timestamptz
);
create index if not exists idx_files_profile on public.files(profile_id);

alter table public.creations
  add constraint creations_file_id_fkey foreign key (file_id) references public.files(id) on delete set null;
