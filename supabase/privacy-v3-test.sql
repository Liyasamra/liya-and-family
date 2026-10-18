begin;
-- Test for privacy-v3.sql with four fictional families. Everything is rolled back at the end.
-- Expected result: the last result shows test_users_left = 0.
insert into auth.users(id,email,email_confirmed_at,is_anonymous,created_at,last_sign_in_at) values
 ('11111111-1111-4111-8111-111111111111','parent-a@example.invalid',now(),false,now(),now()),
 ('22222222-2222-4222-8222-222222222222','parent-b@example.invalid',now(),false,now(),now()),
 ('33333333-3333-4333-8333-333333333333','parent-c@example.invalid',now(),false,now(),now()),
 ('44444444-4444-4444-8444-444444444444','parent-d@example.invalid',now(),false,now(),now());
insert into auth.sessions(id,user_id,created_at,updated_at) values
 ('aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa','11111111-1111-4111-8111-111111111111',now(),now()),
 ('bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb','22222222-2222-4222-8222-222222222222',now(),now()),
 ('cccccccc-cccc-4ccc-8ccc-cccccccccccc','33333333-3333-4333-8333-333333333333',now(),now()),
 ('dddddddd-dddd-4ddd-8ddd-dddddddddddd','44444444-4444-4444-8444-444444444444',now(),now());
update ewket_private.portal_settings set registration_open=true where singleton;

-- Each family registers one child (A registers two) and saves a lesson.
create temporary table t(k text primary key,v text);
grant all on t to authenticated,anon;
do $$
declare fam record; a jsonb;
begin
 for fam in select * from (values('a','11111111-1111-4111-8111-111111111111','aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa'),('b','22222222-2222-4222-8222-222222222222','bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb'),('c','33333333-3333-4333-8333-333333333333','cccccccc-cccc-4ccc-8ccc-cccccccccccc'),('d','44444444-4444-4444-8444-444444444444','dddddddd-dddd-4ddd-8ddd-dddddddddddd')) x(f,u,s) loop
  perform set_config('request.jwt.claims',json_build_object('sub',fam.u,'session_id',fam.s,'aal','aal1','role','authenticated')::text,true);
  execute 'set local role authenticated';
  a:=public.ewket_register_student(gen_random_uuid(),'Fictional Child '||fam.f,'Kid'||fam.f,'3',8,true);
  if not (public.ewket_notice_status()->>'accepted')::boolean then raise exception 'Registering should record notice v3 for %',fam.f;end if;
  perform public.ewket_sync_progress((a->>'student_uuid')::uuid,'[{"lesson_id":"3-math","best_score":5,"best_total":5,"last_score":5,"last_total":5,"last_date":"2026-10-18","attempts":1,"mastered_on":"2026-10-18"}]'::jsonb);
  execute 'reset role';
  insert into t values('sid_'||fam.f,a->>'student_uuid'),('ew_'||fam.f,a->>'student_id');
 end loop;
 perform set_config('request.jwt.claims','{"sub":"11111111-1111-4111-8111-111111111111","session_id":"aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa","aal":"aal1","role":"authenticated"}',true);
 execute 'set local role authenticated';
 a:=public.ewket_register_student(gen_random_uuid(),'Fictional Child a2','Kida2','1',6,true);
 execute 'reset role';
 insert into t values('sid_a2',a->>'student_uuid'),('ew_a2',a->>'student_id');
end;$$;

-- Family B has not agreed to version 3 yet (like families who registered before today): saving and linking wait.
delete from ewket_private.notice_acceptance where parent_user_id='22222222-2222-4222-8222-222222222222';
select set_config('request.jwt.claims','{"sub":"22222222-2222-4222-8222-222222222222","session_id":"bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb","aal":"aal1","role":"authenticated"}',true);
set local role authenticated;
do $$declare sid uuid:=(select v from t where k='sid_b')::uuid; s jsonb;
begin
 if (public.ewket_notice_status()->>'accepted')::boolean then raise exception 'B should not have agreed yet';end if;
 begin perform public.ewket_sync_progress(sid,'[]'::jsonb);raise exception 'Saved before agreeing';exception when raise_exception then if sqlerrm not like 'Please review and agree%' then raise;end if;end;
 begin perform public.ewket_create_device_code(sid);raise exception 'Linked before agreeing';exception when raise_exception then if sqlerrm not like 'Please review and agree%' then raise;end if;end;
 begin perform public.ewket_accept_notice('parent-notice-v2');raise exception 'Old version accepted';exception when raise_exception then if sqlerrm not like 'Please reload%' then raise;end if;end;
 s:=public.ewket_accept_notice('parent-notice-v3');
 if not (s->>'accepted')::boolean then raise exception 'Agreeing failed: %',s;end if;
 perform public.ewket_sync_progress(sid,'[]'::jsonb);
 insert into t values('code_b',public.ewket_create_device_code(sid));
end;$$;
reset role;

-- Family B's device is linked; if B's agreement were missing the device keeps its key but cannot save.
select set_config('request.jwt.claims','{"role":"anon"}',true);
set local role anon;
do $$declare r jsonb;begin r:=public.ewket_claim_device_code((select v from t where k='code_b'));if r->>'device_key' is null then raise exception 'Link failed: %',r;end if;insert into t values('key_b',r->>'device_key');end;$$;
reset role;
delete from ewket_private.notice_acceptance where parent_user_id='22222222-2222-4222-8222-222222222222';
set local role anon;
do $$begin
 begin perform public.ewket_device_sync((select v from t where k='key_b'),'[]'::jsonb,'[]'::jsonb);raise exception 'Device saved before agreeing';
 exception when insufficient_privilege then raise exception 'Device was treated as unlinked'; when raise_exception then if sqlerrm not like 'Please review and agree%' then raise;end if;end;
end;$$;
reset role;
insert into ewket_private.notice_acceptance(parent_user_id,version) values('22222222-2222-4222-8222-222222222222','parent-notice-v3');

-- Family B cannot delete Family A's child or account data.
select set_config('request.jwt.claims','{"sub":"22222222-2222-4222-8222-222222222222","session_id":"bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb","aal":"aal1","role":"authenticated"}',true);
set local role authenticated;
do $$begin
 begin perform public.ewket_delete_student((select v from t where k='sid_a')::uuid,(select v from t where k='ew_a'));raise exception 'Other family deleted a child';exception when raise_exception then if sqlerrm<>'Student not found' then raise;end if;end;
 begin perform public.ewket_delete_my_account('parent-a@example.invalid');raise exception 'Wrong email accepted';exception when raise_exception then if sqlerrm not like 'Type your email%' then raise;end if;end;
end;$$;
reset role;

-- Family A deletes one child: name, progress and links are gone, the EW number is retired, the other child stays.
select set_config('request.jwt.claims','{"sub":"11111111-1111-4111-8111-111111111111","session_id":"aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa","aal":"aal1","role":"authenticated"}',true);
set local role authenticated;
do $$declare sid uuid:=(select v from t where k='sid_a')::uuid; ew text:=(select v from t where k='ew_a'); r jsonb;
begin
 begin perform public.ewket_delete_student(sid,'EW999999');raise exception 'Wrong confirmation accepted';exception when raise_exception then if sqlerrm not like 'Type the student number%' then raise;end if;end;
 r:=public.ewket_delete_student(sid,lower(ew));
 if r->>'deleted'<>ew then raise exception 'Delete result wrong: %',r;end if;
 if jsonb_array_length(public.ewket_my_students())<>1 then raise exception 'Other child should remain';end if;
 begin perform public.ewket_student_progress(sid);raise exception 'Deleted child still readable';exception when raise_exception then if sqlerrm<>'Student not found' then raise;end if;end;
end;$$;
reset role;
do $$declare sid uuid:=(select v from t where k='sid_a')::uuid;
begin
 if exists(select 1 from ewket_private.student_registration where student_uuid=sid) then raise exception 'Name and details not deleted';end if;
 if exists(select 1 from ewket_private.lesson_progress where student_uuid=sid) then raise exception 'Progress not deleted';end if;
 if (select retired_at from ewket_private.student_ids where id=sid) is null then raise exception 'EW number not retired';end if;
 if not exists(select 1 from ewket_private.registry_audit where student_uuid=sid and action='deleted_by_parent') then raise exception 'Deletion not recorded';end if;
end;$$;

-- An organizer account cannot be deleted by mistake; Family A deletes the whole account.
insert into ewket_private.administrators values('44444444-4444-4444-8444-444444444444');
select set_config('request.jwt.claims','{"sub":"44444444-4444-4444-8444-444444444444","session_id":"dddddddd-dddd-4ddd-8ddd-dddddddddddd","aal":"aal1","role":"authenticated"}',true);
set local role authenticated;
do $$begin begin perform public.ewket_delete_my_account('parent-d@example.invalid');raise exception 'Organizer account deleted';exception when raise_exception then if sqlerrm not like 'This account is an organizer%' then raise;end if;end;end;$$;
reset role;
delete from ewket_private.administrators where user_id='44444444-4444-4444-8444-444444444444';
select set_config('request.jwt.claims','{"sub":"11111111-1111-4111-8111-111111111111","session_id":"aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa","aal":"aal1","role":"authenticated"}',true);
set local role authenticated;
do $$declare r jsonb;begin r:=public.ewket_delete_my_account(' Parent-A@example.invalid ');if (r->>'children_deleted')::int<>1 then raise exception 'Account delete result wrong: %',r;end if;end;$$;
reset role;
do $$begin
 if exists(select 1 from auth.users where id='11111111-1111-4111-8111-111111111111') then raise exception 'Parent account not deleted';end if;
 if exists(select 1 from ewket_private.student_registration where parent_user_id='11111111-1111-4111-8111-111111111111') then raise exception 'Children not deleted with account';end if;
end;$$;

-- Retention: C has been away 25 months with no progress, so C is deleted. D signed in long ago but saved progress recently, so D stays.
update auth.users set last_sign_in_at=now()-interval '25 months',created_at=now()-interval '30 months' where id in('33333333-3333-4333-8333-333333333333','44444444-4444-4444-8444-444444444444');
update ewket_private.student_registration set created_at=now()-interval '30 months' where parent_user_id in('33333333-3333-4333-8333-333333333333','44444444-4444-4444-8444-444444444444');
update ewket_private.lesson_progress set updated_at=now()-interval '25 months' where student_uuid=(select v from t where k='sid_c')::uuid;
update ewket_private.practice_checks set saved_at=now()-interval '25 months' where student_uuid=(select v from t where k='sid_c')::uuid;
do $$declare r jsonb;begin
 r:=ewket_private.purge_expired();
 if (r->>'families_deleted')::int<>1 then raise exception 'Expected one inactive family: %',r;end if;
 if exists(select 1 from auth.users where id='33333333-3333-4333-8333-333333333333') then raise exception 'Inactive family not deleted';end if;
 if not exists(select 1 from auth.users where id='44444444-4444-4444-8444-444444444444') then raise exception 'Active family deleted';end if;
 if not exists(select 1 from ewket_private.registry_audit where student_uuid=(select v from t where k='sid_c')::uuid and action='deleted_inactive_24_months') then raise exception 'Inactive deletion not recorded';end if;
end;$$;

-- The website cannot run the clean-up or the internal steps.
set local role authenticated;
do $$begin
 begin perform ewket_private.purge_expired();raise exception 'Website ran the clean-up';exception when insufficient_privilege then null;end;
 begin perform ewket_private.erase_family('44444444-4444-4444-8444-444444444444','x',true);raise exception 'Website ran erase_family';exception when insufficient_privilege then null;end;
end;$$;
reset role;
rollback;
select (select count(*) from auth.users where email like 'parent-_@example.invalid') as test_users_left;
