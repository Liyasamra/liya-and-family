begin;
create table ewket_private.portal_settings(singleton boolean primary key default true check(singleton),registration_open boolean not null default false);
insert into ewket_private.portal_settings values(true,false);
create table ewket_private.administrators(user_id uuid primary key references auth.users(id));
create table ewket_private.registration_requests(parent_user_id uuid not null references auth.users(id),request_id uuid not null,student_uuid uuid not null references ewket_private.student_ids(id),primary key(parent_user_id,request_id));
create table ewket_private.registry_audit(id bigint generated always as identity primary key,actor_user_id uuid not null,student_uuid uuid not null,action text not null,recorded_at timestamptz not null default now());
alter table ewket_private.student_registration add column consent_notice_version text not null default 'pending',add column consent_recorded_at timestamptz;
create function ewket_private.require_parent() returns uuid language plpgsql security definer set search_path='' as $$
declare actor uuid:=auth.uid(); sid uuid;
begin
 if actor is null then raise exception 'Sign in required' using errcode='42501';end if;
 if not exists(select 1 from auth.users where id=actor and email_confirmed_at is not null and not is_anonymous) then raise exception 'Verified parent email required' using errcode='42501';end if;
 begin sid:=(auth.jwt()->>'session_id')::uuid;exception when invalid_text_representation then raise exception 'Valid session required' using errcode='42501';end;
 if sid is null or not exists(select 1 from auth.sessions where id=sid and user_id=actor and (not_after is null or not_after>now())) then raise exception 'Active session required' using errcode='42501';end if;
 return actor;
end;$$;
create function ewket_private.register_student(p_request_id uuid,p_real_name text,p_nickname text,p_grade text,p_age integer,p_parent_acknowledged boolean) returns jsonb language plpgsql security definer set search_path='' as $$
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
 insert into ewket_private.student_registration(student_uuid,parent_user_id,real_name,nickname,grade,age_years,consent_notice_version,consent_recorded_at) values(student,actor,btrim(p_real_name),btrim(p_nickname),p_grade,p_age,'parent-notice-v1',now());
 insert into ewket_private.registration_requests values(actor,p_request_id,student);
 insert into ewket_private.registry_audit(actor_user_id,student_uuid,action) values(actor,student,'registered');
 return jsonb_build_object('student_id',code,'student_uuid',student);
end;$$;
create function ewket_private.my_students() returns jsonb language plpgsql security definer set search_path='' as $$
declare actor uuid:=ewket_private.require_parent();
begin
 return coalesce((select jsonb_agg(jsonb_build_object('student_uuid',s.student_uuid,'student_id',i.student_id,'nickname',s.nickname,'grade',s.grade,'age_years',s.age_years,'age_recorded_at',s.age_recorded_at) order by i.number) from ewket_private.student_registration s join ewket_private.student_ids i on i.id=s.student_uuid where s.parent_user_id=actor and i.retired_at is null),'[]'::jsonb);
end;$$;
create function ewket_private.correct_nickname(p_student uuid,p_nickname text) returns void language plpgsql security definer set search_path='' as $$
declare actor uuid:=ewket_private.require_parent();
begin
 if coalesce(auth.jwt()->>'aal','')<>'aal2' or not exists(select 1 from ewket_private.administrators where user_id=actor) then raise exception 'Authorized administrator with MFA required' using errcode='42501';end if;
 if p_nickname is null or length(btrim(p_nickname)) not between 1 and 24 then raise exception 'A nickname is required';end if;
 update ewket_private.student_registration set nickname=btrim(p_nickname),updated_at=now() where student_uuid=p_student;
 if not found then raise exception 'Student not found';end if;
 insert into ewket_private.registry_audit(actor_user_id,student_uuid,action) values(actor,p_student,'nickname_corrected');
end;$$;
create function public.ewket_registration_status() returns boolean language sql stable security invoker set search_path='' as $$select false$$;
create function public.ewket_register_student(p_request_id uuid,p_real_name text,p_nickname text,p_grade text,p_age integer,p_parent_acknowledged boolean) returns jsonb language sql security invoker set search_path='' as $$select ewket_private.register_student(p_request_id,p_real_name,p_nickname,p_grade,p_age,p_parent_acknowledged)$$;
create function public.ewket_my_students() returns jsonb language sql security invoker set search_path='' as $$select ewket_private.my_students()$$;
create function public.ewket_correct_nickname(p_student uuid,p_nickname text) returns void language sql security invoker set search_path='' as $$select ewket_private.correct_nickname(p_student,p_nickname)$$;
alter table ewket_private.portal_settings enable row level security;
alter table ewket_private.administrators enable row level security;
alter table ewket_private.registration_requests enable row level security;
alter table ewket_private.registry_audit enable row level security;
revoke all on all tables in schema ewket_private from public,anon,authenticated,service_role;
revoke all on all functions in schema ewket_private from public,anon,authenticated,service_role;
revoke all on function public.ewket_registration_status(),public.ewket_my_students(),public.ewket_register_student(uuid,text,text,text,integer,boolean),public.ewket_correct_nickname(uuid,text) from public,anon,authenticated,service_role;
grant execute on function public.ewket_registration_status() to anon,authenticated;
grant usage on schema ewket_private to authenticated;
grant execute on function ewket_private.register_student(uuid,text,text,text,integer,boolean),ewket_private.my_students(),ewket_private.correct_nickname(uuid,text) to authenticated;
grant execute on function public.ewket_my_students(),public.ewket_register_student(uuid,text,text,text,integer,boolean),public.ewket_correct_nickname(uuid,text) to authenticated;
commit;
