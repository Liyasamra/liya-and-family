begin;
create function ewket_private.admin_status() returns boolean language plpgsql security definer set search_path='' as $$declare actor uuid:=ewket_private.require_parent();begin return exists(select 1 from ewket_private.administrators where user_id=actor);end;$$;
create function ewket_private.admin_students() returns jsonb language plpgsql security definer set search_path='' as $$declare actor uuid:=ewket_private.require_parent();begin
if coalesce(auth.jwt()->>'aal','')<>'aal2' or not exists(select 1 from ewket_private.administrators where user_id=actor) then raise exception 'Authorized administrator with MFA required' using errcode='42501';end if;
return coalesce((select jsonb_agg(to_jsonb(r)) from (select s.student_uuid,i.student_id,s.nickname,s.grade from ewket_private.student_registration s join ewket_private.student_ids i on i.id=s.student_uuid where i.retired_at is null order by i.number limit 1000) r),'[]'::jsonb);end;$$;
create function public.ewket_admin_status() returns boolean language sql security invoker set search_path='' as $$select ewket_private.admin_status()$$;
create function public.ewket_admin_students() returns jsonb language sql security invoker set search_path='' as $$select ewket_private.admin_students()$$;
revoke all on function ewket_private.admin_status(),ewket_private.admin_students(),public.ewket_admin_status(),public.ewket_admin_students() from public,anon,authenticated,service_role;
grant execute on function ewket_private.admin_status(),ewket_private.admin_students(),public.ewket_admin_status(),public.ewket_admin_students() to authenticated;
commit;