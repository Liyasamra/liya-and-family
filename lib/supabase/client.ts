import { createBrowserClient } from "@supabase/ssr";

/**
 * Browser-side Supabase client — safe to import from "use client"
 * components. Uses the anon key only; every table it can reach is
 * still gated by the RLS policies in supabase/migrations/0005_*.sql.
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
