begin;
do $$
declare a uuid; b uuid; s text;
begin
 insert into ewket_private.student_ids default values returning id,student_id into a,s;
 if s<>'EW001' then raise exception 'Expected EW001, got %',s;end if;
 insert into ewket_private.student_ids default values returning id,student_id into b,s;
 if s<>'EW002' then raise exception 'Expected EW002';end if;
 begin update ewket_private.student_ids set number=50 where id=a;raise exception 'ID change accepted';exception when raise_exception then if sqlerrm<>'Student IDs are immutable' then raise;end if;end;
 begin delete from ewket_private.student_ids where id=a;raise exception 'ID deletion accepted';exception when raise_exception then if sqlerrm<>'Retire a student ID; never delete or reuse it' then raise;end if;end;
 begin insert into ewket_private.student_ids(number) values(1);raise exception 'Manual ID accepted';exception when raise_exception then if sqlerrm<>'Student numbers are allocated automatically' then raise;end if;end;
 begin insert into ewket_private.student_registration(student_uuid,parent_user_id,real_name,nickname,grade,age_years) values(a,gen_random_uuid(),'Fictional child','   ','1',6);raise exception 'Blank nickname accepted';exception when check_violation then null;end;
 update ewket_private.student_ids set retired_at=now() where id=a;
 begin update ewket_private.student_ids set retired_at=null where id=a;raise exception 'Retired ID reactivated';exception when raise_exception then if sqlerrm<>'Retired IDs cannot be reactivated' then raise;end if;end;
 if has_schema_privilege('anon','ewket_private','usage') or has_schema_privilege('authenticated','ewket_private','usage') or has_table_privilege('authenticated','ewket_private.student_registration','select') then raise exception 'Unexpected client access';end if;
end;$$;
rollback;
select next_number as first_real_registration_number,(select count(*) from ewket_private.student_ids) as issued_ids,(select count(*) from ewket_private.student_registration) as stored_children from ewket_private.id_counter;
