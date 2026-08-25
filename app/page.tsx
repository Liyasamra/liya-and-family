import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-6 py-24 text-center">
      <span className="mb-4 rounded-full bg-lavender-soft px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-ink">
        Phase 2 foundation
      </span>
      <h1 className="max-w-xl text-4xl leading-tight text-ink">Liya&apos;s World</h1>
      <p className="mt-3 max-w-md text-ink-soft">
        A private, secure family &amp; learning platform — real authentication, real
        authorization, nothing hidden behind a front-end PIN.
      </p>
      <div className="mt-8 flex gap-3">
        <Link
          href="/login"
          className="rounded-full bg-lavender px-6 py-2.5 font-semibold text-white transition hover:brightness-95"
        >
          Sign in
        </Link>
        <Link
          href="/signup"
          className="rounded-full border border-lavender px-6 py-2.5 font-semibold text-ink transition hover:bg-lavender-soft"
        >
          Create account
        </Link>
      </div>
    </main>
  );
}
