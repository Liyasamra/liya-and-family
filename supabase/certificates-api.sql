-- Certificates and names (owner request, 2026-10-15).
-- Parents see their own child's legal name (to check spelling for certificates).
-- The organizer can look up ONE student's name at a time by EW number, only with MFA (aal2),
-- and every lookup is written to registry_audit. The admin list stays nickname-only.
-- Public recognition (honor rolls, displays) needs a separate, optional parent consent.
-- Run once in the Supabase SQL editor after registry-api.sql and admin-portal-api.sql.
begin;

alter table ewket_private.student_registration
  add column public_recognition_consent boolean not null default false,
  add column public_recognition_consent_at timestamptz;

-- Same signature as before; only the notice version changes to parent-notice-v2.
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
 insert into ewket_private.student_ids default values returning id,student_id into student,code;
 insert into ewket_private.student_registration(student_uuid,parent_user_id,real_name,nickname,grade,age_years,consent_notice_version,consent_recorded_at) values(student,actor,btrim(p_real_name),btrim(p_nickname),p_grade,p_age,'parent-notice-v2',now());
 insert into ewket_private.registration_requests values(actor,p_request_id,student);
 insert into ewket_private.registry_audit(actor_user_id,student_uuid,action) values(actor,student,'registered');
 return jsonb_build_object('student_id',code,'student_uuid',student);
end;$$;

-- Parent view now includes the child's name and the recognition choice (own family only).
create or replace function ewket_private.my_students() returns jsonb language plpgsql security definer set search_path='' as $$
declare actor uuid:=ewket_private.require_parent();
begin
 return coalesce((select jsonb_agg(jsonb_build_object('student_uuid',s.student_uuid,'student_id',i.student_id,'real_name',s.real_name,'nickname',s.nickname,'grade',s.grade,'age_years',s.age_years,'age_recorded_at',s.age_recorded_at,'public_recognition_consent',s.public_recognition_consent) order by i.number) from ewket_private.student_registration s join ewket_private.student_ids i on i.id=s.student_uuid where s.parent_user_id=actor and i.retired_at is null),'[]'::jsonb);
end;$$;

-- A parent can turn public recognition on or off for their own child only.
create function ewket_private.set_recognition_consent(p_student uuid,p_consent boolean) returns void language plpgsql security definer set search_path='' as $$
declare actor uuid:=ewket_private.require_parent();
begin
 if p_student is null or p_consent is null then raise exception 'Student and choice are required';end if;
 update ewket_private.student_registration set public_recognition_consent=p_consent,public_recognition_consent_at=now(),updated_at=now()
  where student_uuid=p_student and parent_user_id=actor;
 if not found then raise exception 'Student not found';end if;
 insert into ewket_private.registry_audit(actor_user_id,student_uuid,action) values(actor,p_student,case when p_consent then 'recognition_consent_given' else 'recognition_consent_withdrawn' end);
end;$$;

-- Organizer certificate lookup: one student by EW number, MFA required, every view audited.
create function ewket_private.admin_student_name(p_student_id text) returns jsonb language plpgsql security definer set search_path='' as $$
declare actor uuid:=ewket_private.require_parent(); code text:=upper(btrim(coalesce(p_student_id,''))); result jsonb; sid uuid;
begin
 if coalesce(auth.jwt()->>'aal','')<>'aal2' or not exists(select 1 from ewket_private.administrators where user_id=actor) then raise exception 'Authorized administrator with MFA required' using errcode='42501';end if;
 if code !~ '^EW[0-9]{3,9}$' then raise exception 'Enter an EW number, such as EW001';end if;
 select s.student_uuid,jsonb_build_object('student_id',i.student_id,'real_name',s.real_name,'nickname',s.nickname,'grade',s.grade,'public_recognition_consent',s.public_recognition_consent)
   into sid,result
   from ewket_private.student_registration s join ewket_private.student_ids i on i.id=s.student_uuid
  where i.student_id=code and i.retired_at is null;
 if sid is null then raise exception 'Student not found';end if;
 insert into ewket_private.registry_audit(actor_user_id,student_uuid,action) values(actor,sid,'name_viewed_for_certificate');
 return result;
end;$$;

create function public.ewket_set_recognition_consent(p_student uuid,p_consent boolean) returns void language sql security invoker set search_path='' as $$select ewket_private.set_recognition_consent(p_student,p_consent)$$;
create function public.ewket_admin_student_name(p_student_id text) returns jsonb language sql security invoker set search_path='' as $$select ewket_private.admin_student_name(p_student_id)$$;

revoke all on function ewket_private.set_recognition_consent(uuid,boolean),ewket_private.admin_student_name(text),public.ewket_set_recognition_consent(uuid,boolean),public.ewket_admin_student_name(text) from public,anon,authenticated,service_role;
grant execute on function ewket_private.set_recognition_consent(uuid,boolean),ewket_private.admin_student_name(text),public.ewket_set_recognition_consent(uuid,boolean),public.ewket_admin_student_name(text) to authenticated;

commit;
