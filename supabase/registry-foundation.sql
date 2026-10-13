begin;
create schema ewket_private;
revoke all on schema ewket_private from public,anon,authenticated,service_role;
alter default privileges in schema ewket_private revoke all on tables from public,anon,authenticated,service_role;
alter default privileges in schema ewket_private revoke execute on functions from public,anon,authenticated,service_role;
create table ewket_private.id_counter(singleton boolean primary key default true check(singleton), next_number bigint not null check(next_number>0));
insert into ewket_private.id_counter values(true,1);
create table ewket_private.student_ids(
 id uuid primary key default gen_random_uuid(),
 number bigint not null unique check(number>0),
 student_id text generated always as ('EW'||case when number<1000 then lpad(number::text,3,'0') else number::text end) stored unique,
 created_at timestamptz not null default now(),
 retired_at timestamptz
);
create function ewket_private.assign_student_number() returns trigger language plpgsql security invoker set search_path='' as $$
begin
 if new.number is not null then raise exception 'Student numbers are allocated automatically';end if;
 update ewket_private.id_counter set next_number=next_number+1 where singleton returning next_number-1 into new.number;
 if new.number is null then raise exception 'Student counter unavailable';end if;
 return new;
end;$$;
create trigger allocate_number before insert on ewket_private.student_ids for each row execute function ewket_private.assign_student_number();
create function ewket_private.protect_student_id() returns trigger language plpgsql security invoker set search_path='' as $$
begin
 if tg_op='DELETE' then raise exception 'Retire a student ID; never delete or reuse it';end if;
 if new.id is distinct from old.id or new.number is distinct from old.number or new.created_at is distinct from old.created_at then raise exception 'Student IDs are immutable';end if;
 if old.retired_at is not null and new.retired_at is distinct from old.retired_at then raise exception 'Retired IDs cannot be reactivated';end if;
 return new;
end;$$;
create trigger immutable_id before update or delete on ewket_private.student_ids for each row execute function ewket_private.protect_student_id();
create table ewket_private.student_registration(
 student_uuid uuid primary key references ewket_private.student_ids(id),
 parent_user_id uuid not null references auth.users(id),
 real_name text not null check(length(btrim(real_name)) between 1 and 120),
 nickname text not null check(length(btrim(nickname)) between 1 and 24),
 grade text not null check(grade in ('pre','k','1','2','3','4','5','6')),
 age_years integer not null check(age_years between 2 and 18),
 age_recorded_at date not null default current_date,
 created_at timestamptz not null default now(),
 updated_at timestamptz not null default now()
);
create index student_registration_parent_idx on ewket_private.student_registration(parent_user_id);
alter table ewket_private.id_counter enable row level security;
alter table ewket_private.student_ids enable row level security;
alter table ewket_private.student_registration enable row level security;
revoke all on all tables in schema ewket_private from public,anon,authenticated,service_role;
revoke all on all functions in schema ewket_private from public,anon,authenticated,service_role;
comment on schema ewket_private is 'Closed registry foundation. No application access until authenticated workflows and consent controls are tested.';
commit;
