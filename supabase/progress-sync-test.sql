-- Two-family allow/deny test for saved lesson progress.
-- Uses fictional accounts inside one transaction and rolls everything back.
-- Expected result: "Progress sync test passed" then the last result shows test_users_left = 0.
begin;
insert into auth.users(id,email,email_confirmed_at,is_anonymous) values('11111111-1111-4111-8111-111111111111','parent-a@example.invalid',now(),false),('22222222-2222-4222-8222-222222222222','parent-b@example.invalid',now(),false);
insert into auth.sessions(id,user_id,created_at,updated_at) values('aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa','11111111-1111-4111-8111-111111111111',now(),now()),('bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb','22222222-2222-4222-8222-222222222222',now(),now());
update ewket_private.portal_settings set registration_open=true where singleton;

-- Parent A registers a child and saves progress from two devices.
select set_config('request.jwt.claims','{"sub":"11111111-1111-4111-8111-111111111111","session_id":"aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa","aal":"aal1","role":"authenticated"}',true);
set local role authenticated;
do $$declare a jsonb;sid uuid;p jsonb;
begin
 a:=public.ewket_register_student(gen_random_uuid(),'Fictional Child A','Fox','3',8,true);
 sid:=(a->>'student_uuid')::uuid;
 perform set_config('test.sid',sid::text,true);
 if public.ewket_student_progress(sid)<>'[]'::jsonb then raise exception 'New child should have no progress';end if;
 -- Device 1: 3-math tried twice, best 4/5, latest 4/5.
 if public.ewket_sync_progress(sid,'[{"lesson_id":"3-math","best_score":4,"best_total":5,"last_score":4,"last_total":5,"last_date":"2026-10-14","attempts":2}]'::jsonb)<>1 then raise exception 'Sync count wrong';end if;
 -- Device 2: 3-math mastered later with 3 tries; 3-reading tried once.
 perform public.ewket_sync_progress(sid,'[{"lesson_id":"3-math","best_score":5,"best_total":5,"last_score":5,"last_total":5,"last_date":"2026-10-15","attempts":3,"mastered_on":"2026-10-15"},{"lesson_id":"3-reading","best_score":2,"best_total":5,"last_score":2,"last_total":5,"last_date":"2026-10-13","attempts":1}]'::jsonb);
 -- Device 1 again with older data: must not overwrite the newer, better result.
 perform public.ewket_sync_progress(sid,'[{"lesson_id":"3-math","best_score":3,"best_total":5,"last_score":3,"last_total":5,"last_date":"2026-10-12","attempts":1}]'::jsonb);
 p:=public.ewket_student_progress(sid);
 if jsonb_array_length(p)<>2 then raise exception 'Expected two lessons';end if;
 if p->0->>'lesson_id'<>'3-math' or (p->0->>'best_score')::int<>5 or (p->0->>'last_score')::int<>5 or (p->0->>'attempts')::int<>3 or p->0->>'mastered_on'<>'2026-10-15' or p->0->>'last_date'<>'2026-10-15' then raise exception 'Merge kept the wrong result: %',p->0;end if;
 -- Invalid data is refused.
 begin perform public.ewket_sync_progress(sid,'[{"lesson_id":"3-math","best_score":6,"best_total":5,"last_score":1,"last_total":5,"last_date":"2026-10-15"}]'::jsonb);raise exception 'Score above total accepted';exception when check_violation then null;end;
 begin perform public.ewket_sync_progress(sid,'[{"lesson_id":"bad id!","best_score":1,"best_total":5,"last_score":1,"last_total":5,"last_date":"2026-10-15"}]'::jsonb);raise exception 'Bad lesson id accepted';exception when check_violation then null;end;
 begin perform public.ewket_sync_progress(sid,'[{"lesson_id":"3-math","best_score":1,"best_total":5,"last_score":1,"last_total":5,"last_date":"2030-01-01"}]'::jsonb);raise exception 'Future date accepted';exception when raise_exception then if sqlerrm<>'Progress item is not valid' then raise;end if;end;
 begin perform public.ewket_sync_progress(sid,'{"not":"a list"}'::jsonb);raise exception 'Non-list accepted';exception when raise_exception then if sqlerrm not like 'Progress must be%' then raise;end if;end;
end;$$;
reset role;

-- Parent B cannot read or write Parent A's child.
select set_config('request.jwt.claims','{"sub":"22222222-2222-4222-8222-222222222222","session_id":"bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb","aal":"aal2","role":"authenticated"}',true);
set local role authenticated;
do $$begin
 begin perform public.ewket_student_progress(current_setting('test.sid')::uuid);raise exception 'Other family read progress';exception when raise_exception then if sqlerrm<>'Student not found' then raise;end if;end;
 begin perform public.ewket_sync_progress(current_setting('test.sid')::uuid,'[{"lesson_id":"3-math","best_score":0,"best_total":5,"last_score":0,"last_total":5,"last_date":"2026-10-16"}]'::jsonb);raise exception 'Other family wrote progress';exception when raise_exception then if sqlerrm<>'Student not found' then raise;end if;end;
 begin perform count(*) from ewket_private.lesson_progress;raise exception 'Direct table read allowed';exception when insufficient_privilege then null;end;
end;$$;
reset role;

-- Signed-out visitors are refused.
select set_config('request.jwt.claims','{"role":"anon"}',true);
set local role anon;
do $$begin
 begin perform public.ewket_student_progress(current_setting('test.sid')::uuid);raise exception 'Anonymous read progress';exception when insufficient_privilege then null;end;
end;$$;
reset role;

-- Parent A's data is unchanged by Parent B's attempts.
select set_config('request.jwt.claims','{"sub":"11111111-1111-4111-8111-111111111111","session_id":"aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa","aal":"aal1","role":"authenticated"}',true);
set local role authenticated;
do $$begin
 if (public.ewket_student_progress(current_setting('test.sid')::uuid)->0->>'best_score')::int<>5 then raise exception 'Other family changed progress';end if;
 raise notice 'Progress sync test passed';
end;$$;
reset role;
select 'Progress sync test passed' as result;
rollback;
select (select count(*) from auth.users where email like 'parent-_@example.invalid') as test_users_left;
