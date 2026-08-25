"use client";

import { useState } from "react";
import { enrollMfaFactor, verifyMfaEnrollment } from "@/app/actions/auth";

export default function MfaEnrollPage() {
  const [factor, setFactor] = useState<{ factorId: string; qrCodeSvg: string; secret: string } | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);
  const [starting, setStarting] = useState(false);
  const [verifying, setVerifying] = useState(false);

  async function start() {
    setStarting(true);
    setError(null);
    const result = await enrollMfaFactor();
    setStarting(false);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    setFactor({ factorId: result.factorId, qrCodeSvg: result.qrCodeSvg, secret: result.secret });
  }

  async function verify(formData: FormData) {
    setVerifying(true);
    setError(null);
    const result = await verifyMfaEnrollment(formData);
    setVerifying(false);
    if (!result.ok) setError(result.error);
    // On success the action redirects to /dashboard itself.
  }

  return (
    <main className="flex flex-1 items-center justify-center px-4 py-16">
      <div className="w-full max-w-sm rounded-3xl bg-white p-8 shadow-lg shadow-lavender-soft/40">
        <h1 className="text-2xl text-ink mb-1">Set up two-factor login</h1>
        <p className="text-sm text-ink-soft mb-6">
          Required for Platform Owners and Profile Administrators — it&apos;s the single biggest thing
          protecting the family&apos;s data if your password is ever guessed or leaked elsewhere.
        </p>

        {!factor ? (
          <button
            onClick={start}
            disabled={starting}
            className="rounded-full bg-lavender px-4 py-2 font-semibold text-white transition hover:brightness-95 disabled:opacity-60"
          >
            {starting ? "Preparing…" : "Start setup"}
          </button>
        ) : (
          <>
            <p className="text-sm text-ink-soft mb-2">
              Scan this with any authenticator app (Google Authenticator, 1Password, Authy…):
            </p>
            <div
              className="mb-3 rounded-xl border border-lavender-soft bg-white p-3"
              // Supabase returns a trusted, self-generated QR SVG for this factor — safe to render.
              dangerouslySetInnerHTML={{ __html: factor.qrCodeSvg }}
            />
            <details className="mb-4 text-xs text-ink-soft">
              <summary className="cursor-pointer">Can&apos;t scan? Enter this code manually</summary>
              <code className="mt-1 block break-all rounded bg-cream px-2 py-1">{factor.secret}</code>
            </details>

            <form action={verify} className="flex flex-col gap-3">
              <input type="hidden" name="factorId" value={factor.factorId} />
              <label className="flex flex-col gap-1 text-sm font-medium text-ink">
                6-digit code from your app
                <input
                  name="code"
                  inputMode="numeric"
                  pattern="\d{6}"
                  maxLength={6}
                  required
                  className="rounded-xl border border-lavender-soft bg-cream px-3 py-2 tracking-[0.3em] outline-none focus:border-lavender"
                />
              </label>
              {error && <p className="text-sm text-red-ink bg-red-soft rounded-lg px-3 py-2">{error}</p>}
              <button
                type="submit"
                disabled={verifying}
                className="mt-1 rounded-full bg-lavender px-4 py-2 font-semibold text-white transition hover:brightness-95 disabled:opacity-60"
              >
                {verifying ? "Verifying…" : "Confirm and enable"}
              </button>
            </form>
          </>
        )}
      </div>
    </main>
  );
}
