-- Opens parent registration (owner decision, 2026-10-15).
-- The public status now reads the real setting instead of always returning false.
-- To CLOSE registration again later, run only:
--   update ewket_private.portal_settings set registration_open=false where singleton;
begin;
create or replace function public.ewket_registration_status() returns boolean language sql stable security definer set search_path='' as $$
  select coalesce((select registration_open from ewket_private.portal_settings where singleton),false)
$$;
revoke all on function public.ewket_registration_status() from public;
grant execute on function public.ewket_registration_status() to anon,authenticated;
update ewket_private.portal_settings set registration_open=true where singleton;
commit;
select public.ewket_registration_status() as registration_open;
