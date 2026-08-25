"use client";

import { useActionState } from "react";
import Link from "next/link";
import { signIn } from "@/app/actions/auth";

const initialState = { ok: true as const };

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(
    async (_prev: typeof initialState | { ok: false; error: string }, formData: FormData) => {
      return await signIn(formData);
    },
    initialState
  );

  return (
    <main className="flex flex-1 items-center justify-center px-4 py-16">
      <div className="w-full max-w-sm rounded-3xl bg-white p-8 shadow-lg shadow-lavender-soft/40">
        <h1 className="text-2xl text-ink mb-1">Welcome back</h1>
        <p className="text-sm text-ink-soft mb-6">Sign in to Liya&apos;s World.</p>

        <form action={formAction} className="flex flex-col gap-4">
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
              autoComplete="current-password"
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
            {pending ? "Signing in…" : "Sign in"}
          </button>
        </form>

        <div className="mt-5 flex justify-between text-sm text-ink-soft">
          <Link href="/reset-password" className="hover:text-lavender">
            Forgot password?
          </Link>
          <Link href="/signup" className="hover:text-lavender">
            Create an account
          </Link>
        </div>
      </div>
    </main>
  );
}
