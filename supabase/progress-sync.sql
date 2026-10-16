-- Lesson progress saved to the parent account (owner request, 2026-10-16).
-- Stores one summary row per child per lesson: best score, latest score, tries, and the date mastered.
-- No names, answers or free text are stored. Only the child's own parent can save or read it.
-- Run once in the Supabase SQL editor after certificates-api.sql. Then run progress-sync-test.sql.
begin;

create table ewket_private.lesson_progress(
 student_uuid uuid not null references ewket_private.student_ids(id),
 lesson_id text not null check(lesson_id ~ '^[a-z0-9]+(-[a-z0-9]+){0,3}$' and length(lesson_id)<=40),
 best_score integer not null check(best_score>=0),
 best_total integer not null check(best_total between 1 and 12 and best_score<=best_total),
 last_score integer not null check(last_score>=0),
 last_total integer not null check(last_total between 1 and 12 and last_score<=last_total),
 last_date date not null,
 attempts integer not null default 1 check(attempts between 1 and 10000),
 mastered_on date,
 updated_at timestamptz not null default now(),
 primary key(student_uuid,lesson_id)
);
alter table ewket_private.lesson_progress enable row level security;
revoke all on ewket_private.lesson_progress from public,anon,authenticated,service_role;

-- Returns the student's uuid only when it belongs to the signed-in parent and is not retired.
create function ewket_private.own_student(p_student uuid) returns uuid language plpgsql security definer set search_path='' as $$
declare actor uuid:=ewket_private.require_parent();
begin
 if p_student is null or not exists(select 1 from ewket_private.student_registration s join ewket_private.student_ids i on i.id=s.student_uuid where s.student_uuid=p_student and s.parent_user_id=actor and i.retired_at is null) then raise exception 'Student not found';end if;
 return p_student;
end;$$;

-- Saves a batch of lesson summaries from one device. Merges with what is already stored:
-- best keeps the higher score, latest keeps the newest date, tries keep the larger count.
create function ewket_private.sync_progress(p_student uuid,p_items jsonb) returns integer language plpgsql security definer set search_path='' as $$
declare sid uuid:=ewket_private.own_student(p_student); item jsonb; n integer:=0;
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

-- The parent's view of one child's saved progress.
create function ewket_private.student_progress(p_student uuid) returns jsonb language plpgsql security definer set search_path='' as $$
declare sid uuid:=ewket_private.own_student(p_student);
begin
 return coalesce((select jsonb_agg(jsonb_build_object('lesson_id',lesson_id,'best_score',best_score,'best_total',best_total,'last_score',last_score,'last_total',last_total,'last_date',last_date,'attempts',attempts,'mastered_on',mastered_on) order by last_date desc,lesson_id) from ewket_private.lesson_progress where student_uuid=sid),'[]'::jsonb);
end;$$;

create function public.ewket_sync_progress(p_student uuid,p_items jsonb) returns integer language sql security invoker set search_path='' as $$select ewket_private.sync_progress(p_student,p_items)$$;
create function public.ewket_student_progress(p_student uuid) returns jsonb language sql security invoker set search_path='' as $$select ewket_private.student_progress(p_student)$$;

revoke all on function ewket_private.own_student(uuid),ewket_private.sync_progress(uuid,jsonb),ewket_private.student_progress(uuid),public.ewket_sync_progress(uuid,jsonb),public.ewket_student_progress(uuid) from public,anon,authenticated,service_role;
grant execute on function ewket_private.own_student(uuid),ewket_private.sync_progress(uuid,jsonb),ewket_private.student_progress(uuid),public.ewket_sync_progress(uuid,jsonb),public.ewket_student_progress(uuid) to authenticated;

commit;
