-- ============================================================
-- 0006: explicit grants
-- Postgres normally grants EXECUTE on new functions to PUBLIC by
-- default, which is enough for `authenticated`/`anon` to call them —
-- but relying on an implicit default is exactly the kind of thing
-- that quietly breaks later. Make it explicit.
-- ============================================================

grant execute on function public.auth_is_platform_owner() to authenticated;
grant execute on function public.auth_member_role(uuid) to authenticated;
grant execute on function public.auth_is_profile_member(uuid) to authenticated;
grant execute on function public.auth_is_profile_admin(uuid) to authenticated;
grant execute on function public.auth_has_permission(uuid, text, text) to authenticated;
grant execute on function public.auth_owns_row(uuid) to authenticated;

revoke execute on function public.auth_is_platform_owner() from anon;
revoke execute on function public.auth_member_role(uuid) from anon;
revoke execute on function public.auth_is_profile_member(uuid) from anon;
revoke execute on function public.auth_is_profile_admin(uuid) from anon;
revoke execute on function public.auth_has_permission(uuid, text, text) from anon;
revoke execute on function public.auth_owns_row(uuid) from anon;
