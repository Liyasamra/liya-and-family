begin;
-- Two changes (owner request, 2026-10-17). Run once after checks-sync.sql, then run quiz-and-device-links-test.sql.
-- 1. Weekly quizzes now have 15 questions (all five subjects) and the monthly review 40. Old 9 and 36 question checks stay valid.
-- 2. A parent can link a child's own device with a short code. The device can then SAVE that one child's progress
--    without a parent signing in. It can never read anything. Parents can see and unlink devices.
--    Codes expire after 15 minutes and work once. Only hashes of codes and device keys are stored.

-- 1. Quiz sizes
do $$declare c text;
begin
 for c in select conname from pg_constraint where conrelid='ewket_private.practice_checks'::regclass and contype='c' and pg_get_constraintdef(oid) like '%total%' loop
  execute format('alter table ewket_private.practice_checks drop constraint %I',c);
 end loop;
end$$;
alter table ewket_private.practice_checks add constraint practice_checks_total_check
 check(score>=0 and score<=total and (case when week=0 then total in (36,40) else total in (9,15) end));

-- Shared merge steps, used by the parent path and the device path.
create function ewket_private.merge_progress(sid uuid,p_items jsonb) returns integer language plpgsql security definer set search_path='' as $$
declare item jsonb; n integer:=0;
 v_lesson text; v_best int; v_best_total int; v_last int; v_last_total int; v_date date; v_attempts int; v_mastered date;
begin
 if p_items is null or jsonb_typeof(p_items)<>'array' or jsonb_array_length(p_items)>300 then raise exception 'Progress must be a list of at most 300 lessons';end if;
 perform pg_advisory_xact_lock(hashtextextended(sid::text,1));
 for item in select value from jsonb_array_elements(p_items) loop
  begin
   v_lesson:=item->>'lesson_id';
   v_best:=(item->>'best_score')::int; v_best_total:=(item->>'best_total')::int;
   v_last:=(item->>'last_score')::int; v_last_total:=(item->>'last_total')::int;
   v_date:=(item->>'last_date')::date; v_attempts:=coalesce((item->>'attempts')::int,1);
   v_mastered:=nullif(item->>'mastered_on','')::date;
  exception when others then raise exception 'Progress item is not valid';end;
  if v_lesson is null or v_best is null or v_best_total is null or v_last is null or v_last_total is null or v_date is null
     or v_date<date '2026-01-01' or v_date>current_date+1
     or (v_mastered is not null and (v_mastered<date '2026-01-01' or v_mastered>current_date+1)) then raise exception 'Progress item is not valid';end if;
  insert into ewket_private.lesson_progress as p(student_uuid,lesson_id,best_score,best_total,last_score,last_total,last_date,attempts,mastered_on)
   values(sid,v_lesson,v_best,v_best_total,v_last,v_last_total,v_date,v_attempts,v_mastered)
  on conflict(student_uuid,lesson_id) do update set
   best_score=case when excluded.best_score::numeric/excluded.best_total>p.best_score::numeric/p.best_total then excluded.best_score else p.best_score end,
   best_total=case when excluded.best_score::numeric/excluded.best_total>p.best_score::numeric/p.best_total then excluded.best_total else p.best_total end,
   last_score=case when excluded.last_date>=p.last_date then excluded.last_score else p.last_score end,
   last_total=case when excluded.last_date>=p.last_date then excluded.last_total else p.last_total end,
   last_date=greatest(p.last_date,excluded.last_date),
   attempts=greatest(p.attempts,excluded.attempts),
   mastered_on=case when p.mastered_on is null then excluded.mastered_on when excluded.mastered_on is null then p.mastered_on else least(p.mastered_on,excluded.mastered_on) end,
   updated_at=now();
  n:=n+1;
 end loop;
 return n;
end;$$;

create function ewket_private.merge_checks(sid uuid,p_items jsonb) returns integer language plpgsql security definer set search_path='' as $$
declare item jsonb; n integer:=0; v_id text; v_grade text; v_week int; v_score int; v_total int; v_date date;
begin
 if p_items is null or jsonb_typeof(p_items)<>'array' or jsonb_array_length(p_items)>200 then raise exception 'Checks must be a list of at most 200';end if;
 perform pg_advisory_xact_lock(hashtextextended(sid::text,2));
 for item in select value from jsonb_array_elements(p_items) loop
  begin
   v_id:=item->>'check_id'; v_grade:=item->>'grade'; v_week:=(item->>'week')::int;
   v_score:=(item->>'score')::int; v_total:=(item->>'total')::int; v_date:=(item->>'taken_on')::date;
  exception when others then raise exception 'Check is not valid';end;
  if v_id is null or v_grade is null or v_week is null or v_score is null or v_total is null or v_date is null or v_date<date '2026-01-01' or v_date>current_date+1 then raise exception 'Check is not valid';end if;
  insert into ewket_private.practice_checks(student_uuid,check_id,grade,week,score,total,taken_on) values(sid,v_id,v_grade,v_week,v_score,v_total,v_date) on conflict do nothing;
  if found then n:=n+1;end if;
 end loop;
 if (select count(*) from ewket_private.practice_checks where student_uuid=sid)>5000 then raise exception 'Too many saved checks for one child';end if;
 return n;
end;$$;

-- The parent path now uses the shared steps. Same names, arguments and results as before.
create or replace function ewket_private.sync_progress(p_student uuid,p_items jsonb) returns integer language plpgsql security definer set search_path='' as $$
begin return ewket_private.merge_progress(ewket_private.own_student(p_student),p_items);end;$$;
create or replace function ewket_private.sync_checks(p_student uuid,p_items jsonb) returns integer language plpgsql security definer set search_path='' as $$
begin return ewket_private.merge_checks(ewket_private.own_student(p_student),p_items);end;$$;

-- 2. Device links
create table ewket_private.device_link_codes(
 code_hash bytea primary key,
 student_uuid uuid not null references ewket_private.student_ids(id),
 parent_user_id uuid not null references auth.users(id),
 expires_at timestamptz not null,
 used_at timestamptz
);
create index device_link_codes_parent_idx on ewket_private.device_link_codes(parent_user_id);
create table ewket_private.device_links(
 id uuid primary key default gen_random_uuid(),
 token_hash bytea not null unique,
 student_uuid uuid not null references ewket_private.student_ids(id),
 parent_user_id uuid not null references auth.users(id),
 created_at timestamptz not null default now(),
 last_used_at timestamptz,
 revoked_at timestamptz
);
create index device_links_student_idx on ewket_private.device_links(student_uuid);
create table ewket_private.device_claim_failures(at timestamptz not null default now());
create index device_claim_failures_at_idx on ewket_private.device_claim_failures(at);
alter table ewket_private.device_link_codes enable row level security;
alter table ewket_private.device_links enable row level security;
alter table ewket_private.device_claim_failures enable row level security;
revoke all on ewket_private.device_link_codes,ewket_private.device_links,ewket_private.device_claim_failures from public,anon,authenticated,service_role;

create function ewket_private.key_hash(p text) returns bytea language sql immutable set search_path='' as $$select sha256(convert_to(p,'UTF8'))$$;

-- A parent makes a one-time code for one of their own children. Letters and digits that are easy to read (no 0, O, 1, I).
create function ewket_private.create_device_code(p_student uuid) returns text language plpgsql security definer set search_path='' as $$
declare sid uuid:=ewket_private.own_student(p_student); actor uuid:=auth.uid();
 alphabet text:='ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; raw bytea; code text:=''; i int;
begin
 delete from ewket_private.device_link_codes where parent_user_id=actor and (expires_at<now() or used_at is not null);
 if (select count(*) from ewket_private.device_link_codes where parent_user_id=actor)>=5 then raise exception 'Too many open codes. Wait 15 minutes or use one of them.';end if;
 raw:=decode(replace(gen_random_uuid()::text,'-',''),'hex');
 foreach i in array array[0,1,2,3,4,5,10,11] loop code:=code||substr(alphabet,(get_byte(raw,i)%32)+1,1);end loop;
 insert into ewket_private.device_link_codes(code_hash,student_uuid,parent_user_id,expires_at) values(ewket_private.key_hash(code),sid,actor,now()+interval '15 minutes');
 insert into ewket_private.registry_audit(actor_user_id,student_uuid,action) values(actor,sid,'device_code_created');
 return substr(code,1,4)||'-'||substr(code,5,4);
end;$$;

-- The child's device trades the code for a long device key. Works signed out. Returns the key, the EW number and the grade only,
-- or {error} for a wrong or expired code.
create function ewket_private.claim_device_code(p_code text) returns jsonb language plpgsql security definer set search_path='' as $$
declare norm text:=upper(regexp_replace(coalesce(p_code,''),'[^A-Za-z0-9]','','g')); r record; token text; ew text;
begin
 if (select count(*) from ewket_private.device_claim_failures where at>now()-interval '10 minutes')>300 then raise exception 'Too many tries right now. Please wait a few minutes.';end if;
 select * into r from ewket_private.device_link_codes where code_hash=ewket_private.key_hash(norm) and used_at is null and expires_at>now() for update;
 if not found or length(norm)<>8 then
  -- Recorded without raising, so the failure count survives and slows down guessing.
  insert into ewket_private.device_claim_failures default values;
  delete from ewket_private.device_claim_failures where at<now()-interval '1 day';
  return jsonb_build_object('error','That code is not valid or has expired. Ask your parent for a new one.');
 end if;
 if exists(select 1 from ewket_private.student_ids where id=r.student_uuid and retired_at is not null) then raise exception 'This student is no longer active.';end if;
 if (select count(*) from ewket_private.device_links where student_uuid=r.student_uuid and revoked_at is null)>=10 then raise exception 'This child already has 10 linked devices. Unlink one in the Parent portal first.';end if;
 update ewket_private.device_link_codes set used_at=now() where code_hash=r.code_hash;
 token:=replace(gen_random_uuid()::text,'-','')||replace(gen_random_uuid()::text,'-','');
 insert into ewket_private.device_links(token_hash,student_uuid,parent_user_id) values(ewket_private.key_hash(token),r.student_uuid,r.parent_user_id);
 insert into ewket_private.registry_audit(actor_user_id,student_uuid,action) values(r.parent_user_id,r.student_uuid,'device_linked');
 select student_id into ew from ewket_private.student_ids where id=r.student_uuid;
 return jsonb_build_object('device_key',token,'student_id',ew,'grade',(select grade from ewket_private.student_registration where student_uuid=r.student_uuid));
end;$$;

-- A linked device saves progress and checks for its one child. Write-only: it returns counts, never data.
create function ewket_private.device_sync(p_key text,p_progress jsonb,p_checks jsonb) returns jsonb language plpgsql security definer set search_path='' as $$
declare l record; a int:=0; b int:=0;
begin
 select d.* into l from ewket_private.device_links d join ewket_private.student_ids i on i.id=d.student_uuid
  where d.token_hash=ewket_private.key_hash(coalesce(p_key,'')) and d.revoked_at is null and i.retired_at is null;
 if not found then raise exception 'This device is not linked' using errcode='42501';end if;
 if p_progress is not null and jsonb_typeof(p_progress)='array' and jsonb_array_length(p_progress)>0 then a:=ewket_private.merge_progress(l.student_uuid,p_progress);end if;
 if p_checks is not null and jsonb_typeof(p_checks)='array' and jsonb_array_length(p_checks)>0 then b:=ewket_private.merge_checks(l.student_uuid,p_checks);end if;
 update ewket_private.device_links set last_used_at=now() where id=l.id;
 return jsonb_build_object('lessons',a,'checks',b);
end;$$;

-- Parents see and unlink their child's devices.
create function ewket_private.student_devices(p_student uuid) returns jsonb language plpgsql security definer set search_path='' as $$
declare sid uuid:=ewket_private.own_student(p_student);
begin
 return coalesce((select jsonb_agg(jsonb_build_object('id',id,'created_at',created_at,'last_used_at',last_used_at) order by created_at desc) from ewket_private.device_links where student_uuid=sid and revoked_at is null),'[]'::jsonb);
end;$$;
create function ewket_private.unlink_device(p_student uuid,p_device uuid) returns void language plpgsql security definer set search_path='' as $$
declare sid uuid:=ewket_private.own_student(p_student);
begin
 update ewket_private.device_links set revoked_at=now() where id=p_device and student_uuid=sid and revoked_at is null;
 if not found then raise exception 'Device not found';end if;
 insert into ewket_private.registry_audit(actor_user_id,student_uuid,action) values(auth.uid(),sid,'device_unlinked');
end;$$;

create function public.ewket_create_device_code(p_student uuid) returns text language sql security invoker set search_path='' as $$select ewket_private.create_device_code(p_student)$$;
create function public.ewket_claim_device_code(p_code text) returns jsonb language sql security invoker set search_path='' as $$select ewket_private.claim_device_code(p_code)$$;
create function public.ewket_device_sync(p_key text,p_progress jsonb,p_checks jsonb) returns jsonb language sql security invoker set search_path='' as $$select ewket_private.device_sync(p_key,p_progress,p_checks)$$;
create function public.ewket_student_devices(p_student uuid) returns jsonb language sql security invoker set search_path='' as $$select ewket_private.student_devices(p_student)$$;
create function public.ewket_unlink_device(p_student uuid,p_device uuid) returns void language sql security invoker set search_path='' as $$select ewket_private.unlink_device(p_student,p_device)$$;

revoke all on function ewket_private.merge_progress(uuid,jsonb),ewket_private.merge_checks(uuid,jsonb),ewket_private.key_hash(text),
 ewket_private.create_device_code(uuid),ewket_private.claim_device_code(text),ewket_private.device_sync(text,jsonb,jsonb),ewket_private.student_devices(uuid),ewket_private.unlink_device(uuid,uuid),
 public.ewket_create_device_code(uuid),public.ewket_claim_device_code(text),public.ewket_device_sync(text,jsonb,jsonb),public.ewket_student_devices(uuid),public.ewket_unlink_device(uuid,uuid)
 from public,anon,authenticated,service_role;
-- Parents (signed in)
grant execute on function ewket_private.create_device_code(uuid),ewket_private.student_devices(uuid),ewket_private.unlink_device(uuid,uuid),
 public.ewket_create_device_code(uuid),public.ewket_student_devices(uuid),public.ewket_unlink_device(uuid,uuid) to authenticated;
-- Devices (signed out or in)
grant usage on schema ewket_private to anon;
grant execute on function ewket_private.claim_device_code(text),ewket_private.device_sync(text,jsonb,jsonb),
 public.ewket_claim_device_code(text),public.ewket_device_sync(text,jsonb,jsonb) to anon,authenticated;

commit;
