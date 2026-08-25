"use client";

import { useActionState } from "react";
import { updatePassword } from "@/app/actions/auth";

const initialState = { ok: true as const };

export default function UpdatePasswordPage() {
  const [state, formAction, pending] = useActionState(
    async (_prev: typeof initialState | { ok: false; error: string }, formData: FormData) => {
      return await updatePassword(formData);
    },
    initialState
  );

  return (
    <main className="flex flex-1 items-center justify-center px-4 py-16">
      <div className="w-full max-w-sm rounded-3xl bg-white p-8 shadow-lg shadow-lavender-soft/40">
        <h1 className="text-2xl text-ink mb-1">Choose a new password</h1>
        <p className="text-sm text-ink-soft mb-6">You followed a valid reset link — set a new password below.</p>

        <form action={formAction} className="flex flex-col gap-4">
          <label className="flex flex-col gap-1 text-sm font-medium text-ink">
            New password
            <input
              name="password"
              type="password"
              required
              autoComplete="new-password"
              className="rounded-xl border border-lavender-soft bg-cream px-3 py-2 outline-none focus:border-lavender"
            />
          </label>
          <label className="flex flex-col gap-1 text-sm font-medium text-ink">
            Confirm new password
            <input
              name="confirmPassword"
              type="password"
              required
              autoComplete="new-password"
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
            {pending ? "Saving…" : "Save new password"}
          </button>
        </form>
      </div>
    </main>
  );
}
