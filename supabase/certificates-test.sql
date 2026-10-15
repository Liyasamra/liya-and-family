-- Two-family allow/deny test for names, recognition consent and certificate lookup.
-- Uses fictional accounts inside one transaction and rolls everything back.
-- Expected result: the final SELECT shows 0 test users, 0 children and registration_open = false.
begin;
insert into auth.users(id,email,email_confirmed_at,is_anonymous) values('11111111-1111-4111-8111-111111111111','parent-a@example.invalid',now(),false),('22222222-2222-4222-8222-222222222222','parent-b@example.invalid',now(),false);
insert into auth.sessions(id,user_id,created_at,updated_at) values('aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa','11111111-1111-4111-8111-111111111111',now(),now()),('bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb','22222222-2222-4222-8222-222222222222',now(),now());
update ewket_private.portal_settings set registration_open=true where singleton;

-- Parent A registers a child, sees the name, turns recognition on.
select set_config('request.jwt.claims','{"sub":"11111111-1111-4111-8111-111111111111","session_id":"aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa","aal":"aal1","role":"authenticated"}',true);
set local role authenticated;
do $$declare a jsonb;sid uuid;
begin
 a:=public.ewket_register_student(gen_random_uuid(),'Fictional Child A','Fox','1',6,true);
 sid:=(a->>'student_uuid')::uuid;
 if public.ewket_my_students()->0->>'real_name'<>'Fictional Child A' then raise exception 'Parent cannot see own child name';end if;
 if (public.ewket_my_students()->0->>'public_recognition_consent')::boolean then raise exception 'Recognition should default to off';end if;
 perform public.ewket_set_recognition_consent(sid,true);
 if not (public.ewket_my_students()->0->>'public_recognition_consent')::boolean then raise exception 'Recognition consent not saved';end if;
 begin perform public.ewket_admin_student_name(a->>'student_id');raise exception 'Parent used certificate lookup';exception when insufficient_privilege then null;end;
 perform set_config('test.sid',sid::text,true);
 perform set_config('test.code',a->>'student_id',true);
end;$$;
reset role;

-- Parent B cannot see or change Parent A's child, even with an aal2 session.
select set_config('request.jwt.claims','{"sub":"22222222-2222-4222-8222-222222222222","session_id":"bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb","aal":"aal2","role":"authenticated"}',true);
set local role authenticated;
do $$begin
 if public.ewket_my_students()<>'[]'::jsonb then raise exception 'Cross-family leak';end if;
 begin perform public.ewket_set_recognition_consent(current_setting('test.sid')::uuid,false);raise exception 'Other family changed consent';exception when raise_exception then if sqlerrm<>'Student not found' then raise;end if;end;
 begin perform public.ewket_admin_student_name(current_setting('test.code'));raise exception 'Non-admin read a name';exception when insufficient_privilege then null;end;
end;$$;
reset role;

-- Admin without MFA is refused; admin with MFA can look up one name and the view is audited.
insert into ewket_private.administrators values('22222222-2222-4222-8222-222222222222');
select set_config('request.jwt.claims','{"sub":"22222222-2222-4222-8222-222222222222","session_id":"bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb","aal":"aal1","role":"authenticated"}',true);
set local role authenticated;
do $$begin begin perform public.ewket_admin_student_name(current_setting('test.code'));raise exception 'Admin without MFA read a name';exception when insufficient_privilege then null;end;end;$$;
reset role;
select set_config('request.jwt.claims','{"sub":"22222222-2222-4222-8222-222222222222","session_id":"bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb","aal":"aal2","role":"authenticated"}',true);
set local role authenticated;
do $$declare r jsonb;
begin
 r:=public.ewket_admin_student_name(lower(current_setting('test.code')));
 if r->>'real_name'<>'Fictional Child A' or not (r->>'public_recognition_consent')::boolean then raise exception 'Certificate lookup wrong';end if;
 if public.ewket_admin_students()->0 ? 'real_name' then raise exception 'Admin list exposes names';end if;
 begin perform public.ewket_admin_student_name('EW999999');raise exception 'Missing student returned';exception when raise_exception then if sqlerrm<>'Student not found' then raise;end if;end;
end;$$;
reset role;
do $$begin if not exists(select 1 from ewket_private.registry_audit where action='name_viewed_for_certificate' and student_uuid=current_setting('test.sid')::uuid) then raise exception 'Name view not audited';end if;end;$$;

-- Anonymous visitors get nothing.
set local role anon;
do $$begin
 begin perform public.ewket_admin_student_name('EW001');raise exception 'Anonymous name lookup';exception when insufficient_privilege then null;end;
 begin perform public.ewket_set_recognition_consent(gen_random_uuid(),true);raise exception 'Anonymous consent change';exception when insufficient_privilege then null;end;
end;$$;
reset role;
rollback;
select (select count(*) from auth.users where email like '%@example.invalid') as test_users_left,(select count(*) from ewket_private.student_registration) as stored_children,(select registration_open from ewket_private.portal_settings) as registration_open,'ALL CHECKS PASSED' as result;
