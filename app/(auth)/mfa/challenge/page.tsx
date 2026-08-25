"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { challengeMfa } from "@/app/actions/auth";

export default function MfaChallengePage() {
  const [factorId, setFactorId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [verifying, setVerifying] = useState(false);

  useEffect(() => {
    (async () => {
      const supabase = createClient();
      const { data, error } = await supabase.auth.mfa.listFactors();
      if (error) {
        setError(error.message);
        return;
      }
      const totp = data.totp[0];
      if (totp) setFactorId(totp.id);
    })();
  }, []);

  async function verify(formData: FormData) {
    setVerifying(true);
    setError(null);
    const result = await challengeMfa(formData);
    setVerifying(false);
    if (!result.ok) setError(result.error);
  }

  return (
    <main className="flex flex-1 items-center justify-center px-4 py-16">
      <div className="w-full max-w-sm rounded-3xl bg-white p-8 shadow-lg shadow-lavender-soft/40">
        <h1 className="text-2xl text-ink mb-1">Enter your 6-digit code</h1>
        <p className="text-sm text-ink-soft mb-6">
          From your authenticator app, to finish signing in.
        </p>

        {!factorId ? (
          <p className="text-sm text-ink-soft">Loading…</p>
        ) : (
          <form action={verify} className="flex flex-col gap-3">
            <input type="hidden" name="factorId" value={factorId} />
            <input
              name="code"
              inputMode="numeric"
              pattern="\d{6}"
              maxLength={6}
              required
              autoFocus
              className="rounded-xl border border-lavender-soft bg-cream px-3 py-2 text-center text-lg tracking-[0.3em] outline-none focus:border-lavender"
            />
            {error && <p className="text-sm text-red-ink bg-red-soft rounded-lg px-3 py-2">{error}</p>}
            <button
              type="submit"
              disabled={verifying}
              className="mt-1 rounded-full bg-lavender px-4 py-2 font-semibold text-white transition hover:brightness-95 disabled:opacity-60"
            >
              {verifying ? "Verifying…" : "Verify"}
            </button>
          </form>
        )}
      </div>
    </main>
  );
}
