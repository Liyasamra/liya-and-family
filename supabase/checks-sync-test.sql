begin;
-- Two-family allow/deny test for saved practice checks.
-- Uses fictional accounts inside one transaction and rolls everything back.
-- Expected result: the last result shows test_users_left = 0.
insert into auth.users(id,email,email_confirmed_at,is_anonymous) values('11111111-1111-4111-8111-111111111111','parent-a@example.invalid',now(),false),('22222222-2222-4222-8222-222222222222','parent-b@example.invalid',now(),false);
insert into auth.sessions(id,user_id,created_at,updated_at) values('aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa','11111111-1111-4111-8111-111111111111',now(),now()),('bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb','22222222-2222-4222-8222-222222222222',now(),now());
update ewket_private.portal_settings set registration_open=true where singleton;

-- Parent A registers a child and saves checks from two devices.
select set_config('request.jwt.claims','{"sub":"11111111-1111-4111-8111-111111111111","session_id":"aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa","aal":"aal1","role":"authenticated"}',true);
set local role authenticated;
do $$declare a jsonb;sid uuid;c jsonb;
begin
 a:=public.ewket_register_student(gen_random_uuid(),'Fictional Child A','Fox','3',8,true);
 sid:=(a->>'student_uuid')::uuid;
 perform set_config('test.sid',sid::text,true);
 if public.ewket_student_checks(sid)<>'[]'::jsonb then raise exception 'New child should have no checks';end if;
 if public.ewket_sync_checks(sid,'[{"check_id":"device1-week1","grade":"3","week":1,"score":7,"total":9,"taken_on":"2026-10-16"}]'::jsonb)<>1 then raise exception 'First save count wrong';end if;
 -- The same check sent again from the same device is not duplicated or changed.
 if public.ewket_sync_checks(sid,'[{"check_id":"device1-week1","grade":"3","week":1,"score":0,"total":9,"taken_on":"2026-10-16"},{"check_id":"device2-review","grade":"3","week":0,"score":30,"total":36,"taken_on":"2026-10-17"}]'::jsonb)<>1 then raise exception 'Second save count wrong';end if;
 c:=public.ewket_student_checks(sid);
 if jsonb_array_length(c)<>2 then raise exception 'Expected two checks';end if;
 if c->0->>'check_id'<>'device2-review' or (c->1->>'score')::int<>7 then raise exception 'Checks saved wrongly: %',c;end if;
 -- Invalid data is refused.
 begin perform public.ewket_sync_checks(sid,'[{"check_id":"x1","grade":"3","week":1,"score":10,"total":9,"taken_on":"2026-10-16"}]'::jsonb);raise exception 'Score above total accepted';exception when check_violation then null;end;
 begin perform public.ewket_sync_checks(sid,'[{"check_id":"x2","grade":"3","week":1,"score":5,"total":36,"taken_on":"2026-10-16"}]'::jsonb);raise exception 'Wrong total accepted';exception when check_violation then null;end;
 begin perform public.ewket_sync_checks(sid,'[{"check_id":"bad id!","grade":"3","week":1,"score":5,"total":9,"taken_on":"2026-10-16"}]'::jsonb);raise exception 'Bad id accepted';exception when check_violation then null;end;
 begin perform public.ewket_sync_checks(sid,'[{"check_id":"x3","grade":"9","week":1,"score":5,"total":9,"taken_on":"2026-10-16"}]'::jsonb);raise exception 'Bad grade accepted';exception when check_violation then null;end;
 begin perform public.ewket_sync_checks(sid,'[{"check_id":"x4","grade":"3","week":1,"score":5,"total":9,"taken_on":"2030-01-01"}]'::jsonb);raise exception 'Future date accepted';exception when raise_exception then if sqlerrm<>'Check is not valid' then raise;end if;end;
end;$$;
reset role;

-- Parent B cannot read or write Parent A's child.
select set_config('request.jwt.claims','{"sub":"22222222-2222-4222-8222-222222222222","session_id":"bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb","aal":"aal2","role":"authenticated"}',true);
set local role authenticated;
do $$begin
 begin perform public.ewket_student_checks(current_setting('test.sid')::uuid);raise exception 'Other family read checks';exception when raise_exception then if sqlerrm<>'Student not found' then raise;end if;end;
 begin perform public.ewket_sync_checks(current_setting('test.sid')::uuid,'[{"check_id":"intruder","grade":"3","week":1,"score":0,"total":9,"taken_on":"2026-10-16"}]'::jsonb);raise exception 'Other family wrote checks';exception when raise_exception then if sqlerrm<>'Student not found' then raise;end if;end;
 begin perform count(*) from ewket_private.practice_checks;raise exception 'Direct table read allowed';exception when insufficient_privilege then null;end;
end;$$;
reset role;

-- Signed-out visitors are refused.
select set_config('request.jwt.claims','{"role":"anon"}',true);
set local role anon;
do $$begin
 begin perform public.ewket_student_checks(current_setting('test.sid')::uuid);raise exception 'Anonymous read checks';exception when insufficient_privilege then null;end;
end;$$;
reset role;

-- Parent A's checks are unchanged.
select set_config('request.jwt.claims','{"sub":"11111111-1111-4111-8111-111111111111","session_id":"aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa","aal":"aal1","role":"authenticated"}',true);
set local role authenticated;
do $$begin
 if jsonb_array_length(public.ewket_student_checks(current_setting('test.sid')::uuid))<>2 then raise exception 'Other family changed checks';end if;
end;$$;
reset role;
rollback;
select (select count(*) from auth.users where email like 'parent-_@example.invalid') as test_users_left;
