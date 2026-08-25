"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { signUp } from "@/app/actions/auth";

const initialState = { ok: true as const };

export default function SignUpPage() {
  const [submitted, setSubmitted] = useState(false);
  const [state, formAction, pending] = useActionState(
    async (_prev: typeof initialState | { ok: false; error: string }, formData: FormData) => {
      const result = await signUp(formData);
      if (result.ok) setSubmitted(true);
      return result;
    },
    initialState
  );

  if (submitted) {
    return (
      <main className="flex flex-1 items-center justify-center px-4 py-16">
        <div className="w-full max-w-sm rounded-3xl bg-white p-8 text-center shadow-lg shadow-lavender-soft/40">
          <h1 className="text-2xl text-ink mb-2">Check your email</h1>
          <p className="text-sm text-ink-soft">
            We sent a verification link. Click it to activate your account, then come back and
            sign in.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="flex flex-1 items-center justify-center px-4 py-16">
      <div className="w-full max-w-sm rounded-3xl bg-white p-8 shadow-lg shadow-lavender-soft/40">
        <h1 className="text-2xl text-ink mb-1">Create an account</h1>
        <p className="text-sm text-ink-soft mb-6">
          For family, teachers, and tutors invited to Liya&apos;s World.
        </p>

        <form action={formAction} className="flex flex-col gap-4">
          <label className="flex flex-col gap-1 text-sm font-medium text-ink">
            Name
            <input
              name="displayName"
              required
              className="rounded-xl border border-lavender-soft bg-cream px-3 py-2 outline-none focus:border-lavender"
            />
          </label>
          <label className="flex flex-col gap-1 text-sm font-medium text-ink">
            Email
            <input
              name="email"
              type="email"
              required
              autoComplete="email"
              className="rounded-xl border border-lavender-soft bg-cream px-3 py-2 outline-none focus:border-lavender"
            />
          </label>
          <label className="flex flex-col gap-1 text-sm font-medium text-ink">
            Password
            <input
              name="password"
              type="password"
              required
              autoComplete="new-password"
              className="rounded-xl border border-lavender-soft bg-cream px-3 py-2 outline-none focus:border-lavender"
            />
            <span className="text-xs text-ink-soft">
              At least 12 characters, with upper, lower, a number, and a symbol.
            </span>
          </label>

          {!state.ok && (
            <p className="text-sm text-red-ink bg-red-soft rounded-lg px-3 py-2">{state.error}</p>
          )}

          <button
            type="submit"
            disabled={pending}
            className="mt-2 rounded-full bg-lavender px-4 py-2 font-semibold text-white transition hover:brightness-95 disabled:opacity-60"
          >
            {pending ? "Creating account…" : "Create account"}
          </button>
        </form>

        <p className="mt-5 text-sm text-ink-soft">
          Already have an account?{" "}
          <Link href="/login" className="text-lavender font-medium hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </main>
  );
}
