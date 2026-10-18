begin;
-- Privacy Notice version 3, self-serve deletion, and the retention schedule (owner request, 2026-10-18).
-- Run once in the Supabase SQL editor after quiz-and-device-links.sql. Then run privacy-v3-test.sql,
-- then retention-schedule.sql to turn on the daily clean-up.
--
-- 1. Parents agree to notice version 3 once. Until they do, saving progress and linking devices waits
--    (the notice promises to ask before using information in a new way). Registering a child records it.
-- 2. A parent can delete one child's data, or their whole account, from the Parent portal.
--    Deleting removes the name, nickname, grade, age, progress, checks and device links.
--    The EW number is retired and never reused. The audit log keeps only "deleted", with no names.
-- 3. purge_expired() applies the retention schedule; retention-schedule.sql runs it daily.

-- 1. Notice version 3
create table ewket_private.notice_acceptance(
 parent_user_id uuid primary key references auth.users(id) on delete cascade,
 version text not null,
 accepted_at timestamptz not null default now()
);
alter table ewket_private.notice_acceptance enable row level security;
revoke all on ewket_private.notice_acceptance from public,anon,authenticated,service_role;

create function ewket_private.current_notice() returns text language sql immutable set search_path='' as $$select 'parent-notice-v3'::text$$;

create function ewket_private.require_current_notice(p_parent uuid) returns void language plpgsql security definer set search_path='' as $$
begin
 if not exists(select 1 from ewket_private.notice_acceptance where parent_user_id=p_parent and version=ewket_private.current_notice()) then
  raise exception 'Please review and agree to the updated Privacy Notice in the Parent portal.' using hint='notice';
 end if;
end;$$;

create function ewket_private.notice_status() returns jsonb language plpgsql security definer set search_path='' as $$
declare actor uuid:=ewket_private.require_parent(); a record;
begin
 select version,accepted_at into a from ewket_private.notice_acceptance where parent_user_id=actor;
 return jsonb_build_object('current',ewket_private.current_notice(),'accepted',coalesce(a.version=ewket_private.current_notice(),false),'accepted_at',a.accepted_at);
end;$$;

create function ewket_private.accept_notice(p_version text) returns jsonb language plpgsql security definer set search_path='' as $$
declare actor uuid:=ewket_private.require_parent();
begin
 if p_version is distinct from ewket_private.current_notice() then raise exception 'Please reload the page to see the current Privacy Notice';end if;
 insert into ewket_private.notice_acceptance(parent_user_id,version,accepted_at) values(actor,p_version,now())
  on conflict(parent_user_id) do update set version=excluded.version,accepted_at=excluded.accepted_at;
 update ewket_private.student_registration set consent_notice_version=p_version,consent_recorded_at=now(),updated_at=now() where parent_user_id=actor;
 insert into ewket_private.registry_audit(actor_user_id,student_uuid,action)
  select actor,student_uuid,'notice_v3_accepted' from ewket_private.student_registration where parent_user_id=actor;
 return ewket_private.notice_status();
end;$$;

-- Registering a child records agreement to version 3 (same checkbox, same arguments as before).
create or replace function ewket_private.register_student(p_request_id uuid,p_real_name text,p_nickname text,p_grade text,p_age integer,p_parent_acknowledged boolean) returns jsonb language plpgsql security definer set search_path='' as $$
declare actor uuid:=ewket_private.require_parent(); student uuid; code text;
begin
 if not coalesce((select registration_open from ewket_private.portal_settings where singleton),false) then raise exception 'Registration is not open: privacy and consent setup is being completed' using errcode='42501';end if;
 if p_request_id is null or p_parent_acknowledged is distinct from true then raise exception 'Parent acknowledgment required';end if;
 if p_real_name is null or length(btrim(p_real_name)) not between 1 and 120 or p_nickname is null or length(btrim(p_nickname)) not between 1 and 24 or p_grade is null or p_grade not in ('pre','k','1','2','3','4','5','6') or p_age is null or p_age not between 2 and 18 then raise exception 'Name, nickname, grade and age are required';end if;
 perform pg_advisory_xact_lock(hashtextextended(actor::text,0));
 select student_uuid into student from ewket_private.registration_requests where parent_user_id=actor and request_id=p_request_id;
 if student is not null then select student_id into code from ewket_private.student_ids where id=student;return jsonb_build_object('student_id',code,'student_uuid',student);end if;
 if (select count(*) from ewket_private.student_registration where parent_user_id=actor)>=4 then raise exception 'Four students per parent account are supported';end if;
 insert into ewket_private.notice_acceptance(parent_user_id,version,accepted_at) values(actor,ewket_private.current_notice(),now())
  on conflict(parent_user_id) do update set version=excluded.version,accepted_at=excluded.accepted_at;
 insert into ewket_private.student_ids default values returning id,student_id into student,code;
 insert into ewket_private.student_registration(student_uuid,parent_user_id,real_name,nickname,grade,age_years,consent_notice_version,consent_recorded_at) values(student,actor,btrim(p_real_name),btrim(p_nickname),p_grade,p_age,ewket_private.current_notice(),now());
 insert into ewket_private.registration_requests values(actor,p_request_id,student);
 insert into ewket_private.registry_audit(actor_user_id,student_uuid,action) values(actor,student,'registered');
 return jsonb_build_object('student_id',code,'student_uuid',student);
end;$$;

-- Saving progress and linking devices wait for version 3. Same names, arguments and results as before.
create or replace function ewket_private.sync_progress(p_student uuid,p_items jsonb) returns integer language plpgsql security definer set search_path='' as $$
declare sid uuid:=ewket_private.own_student(p_student);
begin perform ewket_private.require_current_notice(auth.uid());return ewket_private.merge_progress(sid,p_items);end;$$;
create or replace function ewket_private.sync_checks(p_student uuid,p_items jsonb) returns integer language plpgsql security definer set search_path='' as $$
declare sid uuid:=ewket_private.own_student(p_student);
begin perform ewket_private.require_current_notice(auth.uid());return ewket_private.merge_checks(sid,p_items);end;$$;

create or replace function ewket_private.create_device_code(p_student uuid) returns text language plpgsql security definer set search_path='' as $$
declare sid uuid:=ewket_private.own_student(p_student); actor uuid:=auth.uid();
 alphabet text:='ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; raw bytea; code text:=''; i int;
begin
 perform ewket_private.require_current_notice(actor);
 delete from ewket_private.device_link_codes where parent_user_id=actor and (expires_at<now() or used_at is not null);
 if (select count(*) from ewket_private.device_link_codes where parent_user_id=actor)>=5 then raise exception 'Too many open codes. Wait 15 minutes or use one of them.';end if;
 raw:=decode(replace(gen_random_uuid()::text,'-',''),'hex');
 foreach i in array array[0,1,2,3,4,5,10,11] loop code:=code||substr(alphabet,(get_byte(raw,i)%32)+1,1);end loop;
 insert into ewket_private.device_link_codes(code_hash,student_uuid,parent_user_id,expires_at) values(ewket_private.key_hash(code),sid,actor,now()+interval '15 minutes');
 insert into ewket_private.registry_audit(actor_user_id,student_uuid,action) values(actor,sid,'device_code_created');
 return substr(code,1,4)||'-'||substr(code,5,4);
end;$$;

-- A linked device keeps its key while the parent has not agreed yet; it simply cannot save until they do.
create or replace function ewket_private.device_sync(p_key text,p_progress jsonb,p_checks jsonb) returns jsonb language plpgsql security definer set search_path='' as $$
declare l record; a int:=0; b int:=0;
begin
 select d.* into l from ewket_private.device_links d join ewket_private.student_ids i on i.id=d.student_uuid
  where d.token_hash=ewket_private.key_hash(coalesce(p_key,'')) and d.revoked_at is null and i.retired_at is null;
 if not found then raise exception 'This device is not linked' using errcode='42501';end if;
 perform ewket_private.require_current_notice(l.parent_user_id);
 if p_progress is not null and jsonb_typeof(p_progress)='array' and jsonb_array_length(p_progress)>0 then a:=ewket_private.merge_progress(l.student_uuid,p_progress);end if;
 if p_checks is not null and jsonb_typeof(p_checks)='array' and jsonb_array_length(p_checks)>0 then b:=ewket_private.merge_checks(l.student_uuid,p_checks);end if;
 update ewket_private.device_links set last_used_at=now() where id=l.id;
 return jsonb_build_object('lessons',a,'checks',b);
end;$$;

-- 2. Deleting
-- Internal: removes everything about one child and retires the EW number. Not callable from the website.
create function ewket_private.erase_student(p_student uuid,p_actor uuid,p_reason text) returns void language plpgsql security definer set search_path='' as $$
begin
 delete from ewket_private.lesson_progress where student_uuid=p_student;
 delete from ewket_private.practice_checks where student_uuid=p_student;
 delete from ewket_private.device_link_codes where student_uuid=p_student;
 delete from ewket_private.device_links where student_uuid=p_student;
 delete from ewket_private.registration_requests where student_uuid=p_student;
 delete from ewket_private.student_registration where student_uuid=p_student;
 update ewket_private.student_ids set retired_at=now() where id=p_student and retired_at is null;
 insert into ewket_private.registry_audit(actor_user_id,student_uuid,action) values(p_actor,p_student,p_reason);
end;$$;

-- Internal: removes a whole family. Optionally deletes the parent's sign-in account too.
create function ewket_private.erase_family(p_parent uuid,p_reason text,p_delete_account boolean) returns integer language plpgsql security definer set search_path='' as $$
declare s uuid; n int:=0;
begin
 for s in select student_uuid from ewket_private.student_registration where parent_user_id=p_parent loop
  perform ewket_private.erase_student(s,p_parent,p_reason);n:=n+1;
 end loop;
 delete from ewket_private.device_link_codes where parent_user_id=p_parent;
 delete from ewket_private.device_links where parent_user_id=p_parent;
 delete from ewket_private.registration_requests where parent_user_id=p_parent;
 delete from ewket_private.notice_acceptance where parent_user_id=p_parent;
 if p_delete_account then delete from auth.users where id=p_parent;end if;
 return n;
end;$$;

-- A parent deletes one child's data. They type the child's EW number to confirm.
create function ewket_private.delete_student(p_student uuid,p_confirm text) returns jsonb language plpgsql security definer set search_path='' as $$
declare sid uuid:=ewket_private.own_student(p_student); code text;
begin
 select student_id into code from ewket_private.student_ids where id=sid;
 if upper(btrim(coalesce(p_confirm,''))) is distinct from code then raise exception 'Type the student number exactly to confirm';end if;
 perform ewket_private.erase_student(sid,auth.uid(),'deleted_by_parent');
 return jsonb_build_object('deleted',code);
end;$$;

-- A parent deletes their whole account. They type their email address to confirm.
create function ewket_private.delete_my_account(p_confirm text) returns jsonb language plpgsql security definer set search_path='' as $$
declare actor uuid:=ewket_private.require_parent(); mail text; n int;
begin
 select lower(email) into mail from auth.users where id=actor;
 if lower(btrim(coalesce(p_confirm,''))) is distinct from mail then raise exception 'Type your email address exactly to confirm';end if;
 if exists(select 1 from ewket_private.administrators where user_id=actor) then raise exception 'This account is an organizer account. Remove organizer access before deleting it.';end if;
 n:=ewket_private.erase_family(actor,'deleted_by_parent',true);
 return jsonb_build_object('children_deleted',n,'account_deleted',true);
end;$$;

-- 3. Retention schedule (see Privacy Notice version 3, "How long we keep it").
-- Families with no sign-in and no saved progress for 24 months: children and the parent account are deleted.
-- Device codes: deleted a day after they expire or are used. Unlinked devices: deleted after 30 days.
-- Failed code attempts: deleted after a day. Audit entries (no names): deleted after 3 years.
create function ewket_private.purge_expired() returns jsonb language plpgsql security definer set search_path='' as $$
declare p uuid; families int:=0; codes int; links int; fails int; audits int;
begin
 for p in
  select u.id from auth.users u
   where coalesce(u.last_sign_in_at,u.created_at)<now()-interval '24 months'
     and not exists(select 1 from ewket_private.administrators a where a.user_id=u.id)
     and not exists(select 1 from ewket_private.student_registration s join ewket_private.lesson_progress l on l.student_uuid=s.student_uuid where s.parent_user_id=u.id and l.updated_at>=now()-interval '24 months')
     and not exists(select 1 from ewket_private.student_registration s join ewket_private.practice_checks c on c.student_uuid=s.student_uuid where s.parent_user_id=u.id and c.saved_at>=now()-interval '24 months')
     and not exists(select 1 from ewket_private.device_links d where d.parent_user_id=u.id and d.last_used_at>=now()-interval '24 months')
     and not exists(select 1 from ewket_private.student_registration s where s.parent_user_id=u.id and s.created_at>=now()-interval '24 months')
 loop
  perform ewket_private.erase_family(p,'deleted_inactive_24_months',true);families:=families+1;
 end loop;
 delete from ewket_private.device_link_codes where expires_at<now()-interval '1 day' or used_at<now()-interval '1 day';get diagnostics codes=row_count;
 delete from ewket_private.device_links where revoked_at<now()-interval '30 days';get diagnostics links=row_count;
 delete from ewket_private.device_claim_failures where at<now()-interval '1 day';get diagnostics fails=row_count;
 delete from ewket_private.registry_audit where recorded_at<now()-interval '3 years';get diagnostics audits=row_count;
 return jsonb_build_object('families_deleted',families,'codes_deleted',codes,'unlinked_devices_deleted',links,'failed_attempts_deleted',fails,'audit_entries_deleted',audits,'ran_at',now());
end;$$;

-- Website functions
create function public.ewket_notice_status() returns jsonb language sql security invoker set search_path='' as $$select ewket_private.notice_status()$$;
create function public.ewket_accept_notice(p_version text) returns jsonb language sql security invoker set search_path='' as $$select ewket_private.accept_notice(p_version)$$;
create function public.ewket_delete_student(p_student uuid,p_confirm text) returns jsonb language sql security invoker set search_path='' as $$select ewket_private.delete_student(p_student,p_confirm)$$;
create function public.ewket_delete_my_account(p_confirm text) returns jsonb language sql security invoker set search_path='' as $$select ewket_private.delete_my_account(p_confirm)$$;

revoke all on function ewket_private.current_notice(),ewket_private.require_current_notice(uuid),ewket_private.notice_status(),ewket_private.accept_notice(text),
 ewket_private.erase_student(uuid,uuid,text),ewket_private.erase_family(uuid,text,boolean),ewket_private.delete_student(uuid,text),ewket_private.delete_my_account(text),ewket_private.purge_expired(),
 public.ewket_notice_status(),public.ewket_accept_notice(text),public.ewket_delete_student(uuid,text),public.ewket_delete_my_account(text) from public,anon,authenticated,service_role;
grant execute on function ewket_private.notice_status(),ewket_private.accept_notice(text),
 ewket_private.delete_student(uuid,text),ewket_private.delete_my_account(text),
 public.ewket_notice_status(),public.ewket_accept_notice(text),public.ewket_delete_student(uuid,text),public.ewket_delete_my_account(text) to authenticated;
-- Internal steps (erase_student, erase_family, purge_expired, require_current_notice) run only inside the functions above or the daily job.
commit;
