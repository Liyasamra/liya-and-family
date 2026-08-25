"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { requestPasswordReset } from "@/app/actions/auth";

const initialState = { ok: true as const };

export default function ResetPasswordPage() {
  const [sent, setSent] = useState(false);
  const [state, formAction, pending] = useActionState(
    async (_prev: typeof initialState | { ok: false; error: string }, formData: FormData) => {
      const result = await requestPasswordReset(formData);
      if (result.ok) setSent(true);
      return result;
    },
    initialState
  );

  return (
    <main className="flex flex-1 items-center justify-center px-4 py-16">
      <div className="w-full max-w-sm rounded-3xl bg-white p-8 shadow-lg shadow-lavender-soft/40">
        <h1 className="text-2xl text-ink mb-1">Reset your password</h1>
        {sent ? (
          <p className="text-sm text-ink-soft">
            If that email has an account, a reset link is on its way. Check your inbox.
          </p>
        ) : (
          <>
            <p className="text-sm text-ink-soft mb-6">
              We&apos;ll send a link to reset your password.
            </p>
            <form action={formAction} className="flex flex-col gap-4">
              <label className="flex flex-col gap-1 text-sm font-medium text-ink">
                Email
                <input
                  name="email"
                  type="email"
                  required
                  className="rounded-xl border border-lavender-soft bg-cream px-3 py-2 outline-none focus:border-lavender"
                />
              </label>
              {!state.ok && (
                <p className="text-sm text-red-ink bg-red-soft rounded-lg px-3 py-2">{state.error}</p>
              )}
              <button
                type="submit"
                disabled={pending}
                className="mt-2 rounded-full bg-lavender px-4 py-2 font-semibold text-white transition hover:brightness-95 disabled:opacity-60"
              >
                {pending ? "Sending…" : "Send reset link"}
              </button>
            </form>
          </>
        )}
        <p className="mt-5 text-sm">
          <Link href="/login" className="text-lavender font-medium hover:underline">
            Back to sign in
          </Link>
        </p>
      </div>
    </main>
  );
}
