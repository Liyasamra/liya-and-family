begin;
-- Two-family test for new quiz sizes and device links. Uses fictional accounts and rolls everything back.
-- Expected result: the last result shows test_users_left = 0.
insert into auth.users(id,email,email_confirmed_at,is_anonymous) values('11111111-1111-4111-8111-111111111111','parent-a@example.invalid',now(),false),('22222222-2222-4222-8222-222222222222','parent-b@example.invalid',now(),false);
insert into auth.sessions(id,user_id,created_at,updated_at) values('aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa','11111111-1111-4111-8111-111111111111',now(),now()),('bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb','22222222-2222-4222-8222-222222222222',now(),now());
update ewket_private.portal_settings set registration_open=true where singleton;

-- Parent A: register a child, save new and old quiz sizes, make a device code.
select set_config('request.jwt.claims','{"sub":"11111111-1111-4111-8111-111111111111","session_id":"aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa","aal":"aal1","role":"authenticated"}',true);
set local role authenticated;
do $$declare a jsonb;sid uuid;code text;
begin
 a:=public.ewket_register_student(gen_random_uuid(),'Fictional Child A','Fox','3',8,true);
 sid:=(a->>'student_uuid')::uuid;
 perform set_config('test.sid',sid::text,true);
 perform set_config('test.ew',a->>'student_id',true);
 if public.ewket_sync_checks(sid,'[{"check_id":"old9","grade":"3","week":1,"score":7,"total":9,"taken_on":"2026-10-16"},{"check_id":"new15","grade":"3","week":2,"score":12,"total":15,"taken_on":"2026-10-17"},{"check_id":"new40","grade":"3","week":0,"score":35,"total":40,"taken_on":"2026-10-17"}]'::jsonb)<>3 then raise exception 'Quiz sizes 9, 15 and 40 should all save';end if;
 begin perform public.ewket_sync_checks(sid,'[{"check_id":"bad12","grade":"3","week":1,"score":5,"total":12,"taken_on":"2026-10-17"}]'::jsonb);raise exception 'Total 12 accepted';exception when check_violation then null;end;
 if public.ewket_sync_progress(sid,'[{"lesson_id":"3-math","best_score":4,"best_total":5,"last_score":4,"last_total":5,"last_date":"2026-10-17","attempts":1}]'::jsonb)<>1 then raise exception 'Parent sync broken';end if;
 code:=public.ewket_create_device_code(sid);
 if code !~ '^[A-HJ-NP-Z2-9]{4}-[A-HJ-NP-Z2-9]{4}$' then raise exception 'Bad code format: %',code;end if;
 perform set_config('test.code',code,true);
 if public.ewket_student_devices(sid)<>'[]'::jsonb then raise exception 'No devices yet';end if;
end;$$;
reset role;

-- Parent B cannot make codes for, list, or unlink Parent A's child.
select set_config('request.jwt.claims','{"sub":"22222222-2222-4222-8222-222222222222","session_id":"bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb","aal":"aal2","role":"authenticated"}',true);
set local role authenticated;
do $$begin
 begin perform public.ewket_create_device_code(current_setting('test.sid')::uuid);raise exception 'Other family made a code';exception when raise_exception then if sqlerrm<>'Student not found' then raise;end if;end;
 begin perform public.ewket_student_devices(current_setting('test.sid')::uuid);raise exception 'Other family listed devices';exception when raise_exception then if sqlerrm<>'Student not found' then raise;end if;end;
end;$$;
reset role;

-- A signed-out device: a wrong code fails, the right code works once, and the key can only write.
select set_config('request.jwt.claims','{"role":"anon"}',true);
set local role anon;
do $$declare r jsonb;k text;
begin
 r:=public.ewket_claim_device_code('ZZZZ-ZZZZ');
 if r->>'error' is null then raise exception 'Wrong code accepted';end if;
 r:=public.ewket_claim_device_code(lower(current_setting('test.code')));
 if r->>'error' is not null or length(r->>'device_key')<>64 or r->>'student_id'<>current_setting('test.ew') or r->>'grade'<>'3' or r ? 'real_name' or r ? 'nickname' then raise exception 'Right code failed: %',r;end if;
 k:=r->>'device_key';perform set_config('test.key',k,true);
 if public.ewket_claim_device_code(current_setting('test.code'))->>'error' is null then raise exception 'Code worked twice';end if;
 r:=public.ewket_device_sync(k,'[{"lesson_id":"3-reading","best_score":5,"best_total":5,"last_score":5,"last_total":5,"last_date":"2026-10-17","attempts":2,"mastered_on":"2026-10-17"}]'::jsonb,'[{"check_id":"dev1","grade":"3","week":3,"score":14,"total":15,"taken_on":"2026-10-17"}]'::jsonb);
 if (r->>'lessons')::int<>1 or (r->>'checks')::int<>1 then raise exception 'Device sync counts wrong: %',r;end if;
 begin perform public.ewket_device_sync('not-a-real-key','[]'::jsonb,'[]'::jsonb);raise exception 'Fake key accepted';exception when insufficient_privilege then null;end;
 begin perform public.ewket_student_progress(current_setting('test.sid')::uuid);raise exception 'Device read progress';exception when insufficient_privilege then null;end;
 begin perform public.ewket_create_device_code(current_setting('test.sid')::uuid);raise exception 'Anonymous made a code';exception when insufficient_privilege then null;end;
 begin perform count(*) from ewket_private.device_links;raise exception 'Anonymous read device table';exception when insufficient_privilege then null;end;
end;$$;
reset role;

-- Parent A sees the device's saved work and the linked device, then unlinks it.
select set_config('request.jwt.claims','{"sub":"11111111-1111-4111-8111-111111111111","session_id":"aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa","aal":"aal1","role":"authenticated"}',true);
set local role authenticated;
do $$declare d jsonb;p jsonb;
begin
 p:=public.ewket_student_progress(current_setting('test.sid')::uuid);
 if not exists(select 1 from jsonb_array_elements(p) e where e->>'lesson_id'='3-reading' and e->>'mastered_on'='2026-10-17') then raise exception 'Device progress missing: %',p;end if;
 if jsonb_array_length(public.ewket_student_checks(current_setting('test.sid')::uuid))<>4 then raise exception 'Device check missing';end if;
 d:=public.ewket_student_devices(current_setting('test.sid')::uuid);
 if jsonb_array_length(d)<>1 or d->0->>'last_used_at' is null then raise exception 'Device list wrong: %',d;end if;
 perform public.ewket_unlink_device(current_setting('test.sid')::uuid,(d->0->>'id')::uuid);
 if public.ewket_student_devices(current_setting('test.sid')::uuid)<>'[]'::jsonb then raise exception 'Unlink failed';end if;
end;$$;
reset role;

-- The unlinked device can no longer save.
select set_config('request.jwt.claims','{"role":"anon"}',true);
set local role anon;
do $$begin
 begin perform public.ewket_device_sync(current_setting('test.key'),'[]'::jsonb,'[]'::jsonb);raise exception 'Unlinked device still saves';exception when insufficient_privilege then null;end;
end;$$;
reset role;
rollback;
select (select count(*) from auth.users where email like 'parent-_@example.invalid') as test_users_left;
