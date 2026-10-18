-- Turns on the daily clean-up from privacy-v3.sql (owner request, 2026-10-18). Run once, after privacy-v3.sql.
-- Uses Supabase's pg_cron extension. If this fails with "extension pg_cron is not available",
-- open Database > Extensions in Supabase, turn on pg_cron, then run this again.
create extension if not exists pg_cron;
select cron.schedule('ewket-retention','23 7 * * *',$$select ewket_private.purge_expired()$$);
-- Check it is scheduled (one row named ewket-retention):
select jobname,schedule,active from cron.job where jobname='ewket-retention';
-- To see recent runs later:  select status,return_message,start_time from cron.job_run_details order by start_time desc limit 5;
-- To stop it:                select cron.unschedule('ewket-retention');
