-- ============================================================
-- 0005: Row-Level Security
-- Every table below defaults to DENY. A row is visible or writable
-- only because a policy explicitly says so — "hiding a link is not
-- security" only holds if the database enforces it too.
--
-- Helper functions are SECURITY DEFINER so a policy on
-- profile_members can safely call a function that itself queries
-- profile_members, without infinite RLS recursion (a well-known
-- Postgres RLS pattern — the function runs as its owner, bypassing
-- RLS on the tables *it* touches, while the outer query is still
-- fully policy-checked for the calling user).
-- ============================================================

-- ---------- helper functions ----------

create or replace function public.auth_is_platform_owner()
returns boolean
language sql stable security definer set search_path = public as $$
  select coalesce((select is_platform_owner from public.users where id = auth.uid()), false)
$$;

create or replace function public.auth_member_role(p_profile_id uuid)
returns text
language sql stable security definer set search_path = public as $$
  select r.key
  from public.profile_members pm
  join public.roles r on r.id = pm.role_id
  where pm.profile_id = p_profile_id
    and pm.user_id = auth.uid()
    and pm.deleted_at is null
  limit 1
$$;

create or replace function public.auth_is_profile_member(p_profile_id uuid)
returns boolean
language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from public.profile_members
    where profile_id = p_profile_id and user_id = auth.uid() and deleted_at is null
  )
$$;

create or replace function public.auth_is_profile_admin(p_profile_id uuid)
returns boolean
language sql stable security definer set search_path = public as $$
  select public.auth_is_platform_owner()
    or public.auth_member_role(p_profile_id) = 'profile_admin'
$$;

-- The core check almost every content policy calls: does the current
-- user have (module, action) on this profile — via their role's
-- defaults, or a per-member override, or being Owner/Admin?
create or replace function public.auth_has_permission(p_profile_id uuid, p_module text, p_action text)
returns boolean
language sql stable security definer set search_path = public as $$
  select
    public.auth_is_platform_owner()
    or public.auth_member_role(p_profile_id) = 'profile_admin'
    or exists (
      select 1
      from public.profile_members pm
      join public.member_permissions mp on mp.profile_member_id = pm.id
      where pm.profile_id = p_profile_id
        and pm.user_id = auth.uid()
        and pm.deleted_at is null
        and mp.module = p_module
        and mp.action = p_action
        and mp.granted = true
        and (mp.expires_at is null or mp.expires_at > now())
    )
    or exists (
      select 1
      from public.profile_members pm
      join public.role_permissions rp on rp.role_id = pm.role_id
      join public.permissions perm on perm.id = rp.permission_id
      where pm.profile_id = p_profile_id
        and pm.user_id = auth.uid()
        and pm.deleted_at is null
        and perm.module = p_module
        and perm.action = p_action
    )
$$;

-- Was this row created by the current user? Used for Contributor/Child
-- "own submissions only" edit/delete rights.
create or replace function public.auth_owns_row(p_created_by uuid)
returns boolean
language sql stable as $$
  select p_created_by = auth.uid()
$$;

-- ---------- reference tables: readable by any authenticated user, ----------
-- ---------- writable only via migrations / service role           ----------
alter table public.roles enable row level security;
alter table public.modules enable row level security;
alter table public.permissions enable row level security;
alter table public.role_permissions enable row level security;
alter table public.lessons enable row level security;

create policy "roles_read" on public.roles for select to authenticated using (true);
create policy "modules_read" on public.modules for select to authenticated using (true);
create policy "permissions_read" on public.permissions for select to authenticated using (true);
create policy "role_permissions_read" on public.role_permissions for select to authenticated using (true);

create policy "lessons_read" on public.lessons for select to authenticated using (deleted_at is null);
create policy "lessons_write_owner" on public.lessons for all to authenticated
  using (public.auth_is_platform_owner()) with check (public.auth_is_platform_owner());

-- ---------- users ----------
alter table public.users enable row level security;

create policy "users_read_self_or_owner" on public.users for select to authenticated
  using (id = auth.uid() or public.auth_is_platform_owner());
create policy "users_update_self" on public.users for update to authenticated
  using (id = auth.uid()) with check (id = auth.uid());
create policy "users_owner_manage" on public.users for update to authenticated
  using (public.auth_is_platform_owner()) with check (public.auth_is_platform_owner());

-- ---------- family_groups ----------
alter table public.family_groups enable row level security;

create policy "family_groups_read" on public.family_groups for select to authenticated
  using (
    owner_user_id = auth.uid()
    or public.auth_is_platform_owner()
    or exists (
      select 1 from public.profiles p
      where p.family_group_id = family_groups.id and public.auth_is_profile_member(p.id)
    )
  );
create policy "family_groups_write_owner" on public.family_groups for all to authenticated
  using (owner_user_id = auth.uid() or public.auth_is_platform_owner())
  with check (owner_user_id = auth.uid() or public.auth_is_platform_owner());

-- ---------- profiles ----------
alter table public.profiles enable row level security;

create policy "profiles_read" on public.profiles for select to authenticated
  using (public.auth_is_profile_member(id) or public.auth_is_platform_owner());
create policy "profiles_write_admin" on public.profiles for all to authenticated
  using (public.auth_is_profile_admin(id)) with check (public.auth_is_profile_admin(id));

-- ---------- profile_members ----------
alter table public.profile_members enable row level security;

create policy "profile_members_read" on public.profile_members for select to authenticated
  using (user_id = auth.uid() or public.auth_is_profile_admin(profile_id));
create policy "profile_members_write_admin" on public.profile_members for all to authenticated
  using (public.auth_is_profile_admin(profile_id)) with check (public.auth_is_profile_admin(profile_id));

-- ---------- member_permissions ----------
alter table public.member_permissions enable row level security;

create policy "member_permissions_read" on public.member_permissions for select to authenticated
  using (
    exists (
      select 1 from public.profile_members pm
      where pm.id = member_permissions.profile_member_id
        and (pm.user_id = auth.uid() or public.auth_is_profile_admin(pm.profile_id))
    )
  );
create policy "member_permissions_write_admin" on public.member_permissions for all to authenticated
  using (
    exists (select 1 from public.profile_members pm where pm.id = profile_member_id and public.auth_is_profile_admin(pm.profile_id))
  )
  with check (
    exists (select 1 from public.profile_members pm where pm.id = profile_member_id and public.auth_is_profile_admin(pm.profile_id))
  );

-- ---------- profile_visibility_settings ----------
alter table public.profile_visibility_settings enable row level security;

create policy "visibility_read" on public.profile_visibility_settings for select to authenticated
  using (public.auth_is_profile_member(profile_id) or visibility = 'public');
create policy "visibility_write_admin" on public.profile_visibility_settings for all to authenticated
  using (public.auth_is_profile_admin(profile_id)) with check (public.auth_is_profile_admin(profile_id));

-- ---------- invitations ----------
alter table public.invitations enable row level security;

create policy "invitations_read" on public.invitations for select to authenticated
  using (
    public.auth_is_profile_admin(profile_id)
    or email = (select email from public.users where id = auth.uid())
  );
create policy "invitations_write_admin" on public.invitations for all to authenticated
  using (public.auth_is_profile_admin(profile_id)) with check (public.auth_is_profile_admin(profile_id));

-- ---------- access_requests ----------
alter table public.access_requests enable row level security;

-- Applicants can create their own request and see only their own.
create policy "access_requests_read" on public.access_requests for select to authenticated
  using (applicant_user_id = auth.uid() or public.auth_is_profile_admin(profile_id));
create policy "access_requests_insert_self" on public.access_requests for insert to authenticated
  with check (applicant_user_id = auth.uid());
-- Only a profile admin (or platform owner) may change status — an
-- applicant can never approve their own request.
create policy "access_requests_decide_admin" on public.access_requests for update to authenticated
  using (public.auth_is_profile_admin(profile_id))
  with check (public.auth_is_profile_admin(profile_id));

-- ---------- profile_modules ----------
alter table public.profile_modules enable row level security;

create policy "profile_modules_read" on public.profile_modules for select to authenticated
  using (public.auth_is_profile_member(profile_id));
create policy "profile_modules_write_admin" on public.profile_modules for all to authenticated
  using (public.auth_is_profile_admin(profile_id)) with check (public.auth_is_profile_admin(profile_id));

-- ---------- assignments / submissions / feedback (homework module) ----------
alter table public.assignments enable row level security;
alter table public.submissions enable row level security;
alter table public.feedback enable row level security;

create policy "assignments_select" on public.assignments for select to authenticated
  using (deleted_at is null and public.auth_has_permission(profile_id, 'homework', 'view'));
create policy "assignments_insert" on public.assignments for insert to authenticated
  with check (public.auth_has_permission(profile_id, 'homework', 'create'));
create policy "assignments_update" on public.assignments for update to authenticated
  using (public.auth_has_permission(profile_id, 'homework', 'edit'))
  with check (public.auth_has_permission(profile_id, 'homework', 'edit'));
create policy "assignments_delete" on public.assignments for delete to authenticated
  using (public.auth_has_permission(profile_id, 'homework', 'delete'));

create policy "submissions_select" on public.submissions for select to authenticated
  using (deleted_at is null and (submitted_by = auth.uid() or public.auth_has_permission(profile_id, 'homework', 'view')));
create policy "submissions_insert" on public.submissions for insert to authenticated
  with check (submitted_by = auth.uid() and public.auth_is_profile_member(profile_id));
create policy "submissions_update_own_or_admin" on public.submissions for update to authenticated
  using (submitted_by = auth.uid() or public.auth_is_profile_admin(profile_id))
  with check (submitted_by = auth.uid() or public.auth_is_profile_admin(profile_id));

create policy "feedback_select" on public.feedback for select to authenticated
  using (deleted_at is null and public.auth_has_permission(profile_id, 'homework', 'view'));
create policy "feedback_insert" on public.feedback for insert to authenticated
  with check (author_id = auth.uid() and public.auth_has_permission(profile_id, 'homework', 'comment'));

-- ---------- reading_logs / achievements / creations / goals ----------
-- Same shape, four times: view via the module permission, create via
-- the module permission, edit/delete restricted to the row's own
-- creator unless the actor is a profile admin.
do $$
declare
  t text; m text;
begin
  for t, m in
    select * from (values
      ('reading_logs','reading'),
      ('achievements','achievements'),
      ('creations','creations'),
      ('goals','learning')
    ) as x(t, m)
  loop
    execute format('alter table public.%I enable row level security', t);

    execute format($f$
      create policy "%1$s_select" on public.%1$I for select to authenticated
        using (deleted_at is null and public.auth_has_permission(profile_id, %2$L, 'view'))
    $f$, t, m);

    execute format($f$
      create policy "%1$s_insert" on public.%1$I for insert to authenticated
        with check (public.auth_has_permission(profile_id, %2$L, 'create'))
    $f$, t, m);

    execute format($f$
      create policy "%1$s_update" on public.%1$I for update to authenticated
        using (public.auth_owns_row(created_by) or public.auth_is_profile_admin(profile_id))
        with check (public.auth_owns_row(created_by) or public.auth_is_profile_admin(profile_id))
    $f$, t);

    execute format($f$
      create policy "%1$s_delete" on public.%1$I for delete to authenticated
        using (public.auth_owns_row(created_by) or public.auth_is_profile_admin(profile_id))
    $f$, t);
  end loop;
end $$;

-- ---------- files ----------
alter table public.files enable row level security;

create policy "files_select" on public.files for select to authenticated
  using (
    visibility = 'public'
    or owner_id = auth.uid()
    or (public.auth_is_profile_member(profile_id) and visibility in ('shared','private'))
  );
create policy "files_insert" on public.files for insert to authenticated
  with check (owner_id = auth.uid() and public.auth_is_profile_member(profile_id));
create policy "files_delete_own_or_admin" on public.files for delete to authenticated
  using (owner_id = auth.uid() or public.auth_is_profile_admin(profile_id));

-- ---------- active_sessions / recognized_devices / login_events ----------
-- Self-only, plus Platform Owner for incident response. Nothing here is
-- ever exposed to a Profile Admin about a user outside their own account.
alter table public.active_sessions enable row level security;
alter table public.recognized_devices enable row level security;
alter table public.login_events enable row level security;

create policy "active_sessions_self" on public.active_sessions for select to authenticated
  using (user_id = auth.uid() or public.auth_is_platform_owner());
create policy "active_sessions_revoke_self" on public.active_sessions for update to authenticated
  using (user_id = auth.uid() or public.auth_is_platform_owner())
  with check (user_id = auth.uid() or public.auth_is_platform_owner());

create policy "recognized_devices_self" on public.recognized_devices for select to authenticated
  using (user_id = auth.uid() or public.auth_is_platform_owner());

create policy "login_events_self" on public.login_events for select to authenticated
  using (user_id = auth.uid() or public.auth_is_platform_owner());

-- ---------- security_alerts ----------
alter table public.security_alerts enable row level security;

create policy "security_alerts_self" on public.security_alerts for select to authenticated
  using (user_id = auth.uid() or public.auth_is_platform_owner());
create policy "security_alerts_ack_self" on public.security_alerts for update to authenticated
  using (user_id = auth.uid() or public.auth_is_platform_owner())
  with check (user_id = auth.uid() or public.auth_is_platform_owner());

-- ---------- audit_logs ----------
-- Insert-only for the application (server actions write with the
-- service role); read access is Platform Owner platform-wide, or a
-- Profile Admin for entries about their own profile.
alter table public.audit_logs enable row level security;

create policy "audit_logs_read" on public.audit_logs for select to authenticated
  using (
    public.auth_is_platform_owner()
    or (profile_id is not null and public.auth_is_profile_admin(profile_id))
  );
-- Deliberately no update/delete policy at all — an audit log that can
-- be edited or removed by any application role is not an audit log.

-- ---------- notifications ----------
alter table public.notifications enable row level security;

create policy "notifications_self" on public.notifications for select to authenticated
  using (user_id = auth.uid());
create policy "notifications_mark_read_self" on public.notifications for update to authenticated
  using (user_id = auth.uid()) with check (user_id = auth.uid());

-- ---------- consent_records ----------
alter table public.consent_records enable row level security;

create policy "consent_records_self" on public.consent_records for select to authenticated
  using (recorded_against = auth.uid() or public.auth_is_platform_owner());
create policy "consent_records_insert_self" on public.consent_records for insert to authenticated
  with check (recorded_against = auth.uid());
