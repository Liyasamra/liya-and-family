begin;
-- Practice checks (weekly quizzes and monthly reviews) saved to the parent account (owner request, 2026-10-16).
-- One row per finished check: level, week, score and date. No names or answers.
-- Only the child's own parent can save or read them. Run once after progress-sync.sql, then run checks-sync-test.sql.

create table ewket_private.practice_checks(
 student_uuid uuid not null references ewket_private.student_ids(id),
 check_id text not null check(check_id ~ '^[A-Za-z0-9-]{1,100}$'),
 grade text not null check(grade in ('pre','k','1','2','3','4','5','6')),
 week integer not null check(week between 0 and 4),
 score integer not null check(score>=0),
 total integer not null,
 taken_on date not null,
 saved_at timestamptz not null default now(),
 primary key(student_uuid,check_id),
 check(total=case when week=0 then 36 else 9 end and score<=total)
);
alter table ewket_private.practice_checks enable row level security;
revoke all on ewket_private.practice_checks from public,anon,authenticated,service_role;

-- Saves finished checks from one device. A check that is already saved is left unchanged.
create function ewket_private.sync_checks(p_student uuid,p_items jsonb) returns integer language plpgsql security definer set search_path='' as $$
declare sid uuid:=ewket_private.own_student(p_student); item jsonb; n integer:=0;
 v_id text; v_grade text; v_week int; v_score int; v_total int; v_date date;
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

-- The parent's view of one child's saved checks, newest first.
create function ewket_private.student_checks(p_student uuid) returns jsonb language plpgsql security definer set search_path='' as $$
declare sid uuid:=ewket_private.own_student(p_student);
begin
 return coalesce((select jsonb_agg(jsonb_build_object('check_id',check_id,'grade',grade,'week',week,'score',score,'total',total,'taken_on',taken_on) order by taken_on desc,saved_at desc) from ewket_private.practice_checks where student_uuid=sid),'[]'::jsonb);
end;$$;

create function public.ewket_sync_checks(p_student uuid,p_items jsonb) returns integer language sql security invoker set search_path='' as $$select ewket_private.sync_checks(p_student,p_items)$$;
create function public.ewket_student_checks(p_student uuid) returns jsonb language sql security invoker set search_path='' as $$select ewket_private.student_checks(p_student)$$;

revoke all on function ewket_private.sync_checks(uuid,jsonb),ewket_private.student_checks(uuid),public.ewket_sync_checks(uuid,jsonb),public.ewket_student_checks(uuid) from public,anon,authenticated,service_role;
grant execute on function ewket_private.sync_checks(uuid,jsonb),ewket_private.student_checks(uuid),public.ewket_sync_checks(uuid,jsonb),public.ewket_student_checks(uuid) to authenticated;

commit;
