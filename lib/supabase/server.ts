import { createServerClient } from "@supabase/ssr";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

/**
 * Server-side Supabase client, for use inside Server Components,
 * Server Actions, and Route Handlers only. Never import this from a
 * "use client" file — it reads cookies() and uses the anon key, which
 * is safe here because RLS (see supabase/migrations/0005_*.sql) is
 * what actually enforces access, not this file.
 */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Called from a Server Component that can't set cookies —
            // safe to ignore as long as middleware.ts also refreshes
            // the session (it does).
          }
        },
      },
    }
  );
}

/**
 * A privileged client using the SERVICE ROLE key — bypasses RLS
 * entirely. Use only in trusted server-side code that has already
 * done its own authorization check (e.g. the one-time migration
 * import script, or a background job). NEVER expose this client, or
 * the key it uses, to anything that runs in the browser.
 */
export function createServiceRoleClient() {
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error(
      "SUPABASE_SERVICE_ROLE_KEY is not set. This client must never be constructed without it, and this key must never be exposed to the client bundle."
    );
  }
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );
}
