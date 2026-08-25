"use client";

import { useActionState, useState } from "react";
import { createAccessRequest } from "@/app/actions/access-requests";

const initialState = { ok: true as const };

export default function RequestAccessForm({ profileId }: { profileId: string }) {
  const [submitted, setSubmitted] = useState(false);
  const [state, formAction, pending] = useActionState(
    async (_prev: typeof initialState | { ok: false; error: string }, formData: FormData) => {
      const result = await createAccessRequest(formData);
      if (result.ok) setSubmitted(true);
      return result;
    },
    initialState
  );

  if (submitted) {
    return (
      <p className="rounded-xl bg-mint-soft px-4 py-3 text-sm text-ink">
        Request sent. You&apos;ll get a notification once it&apos;s reviewed.
      </p>
    );
  }

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <input type="hidden" name="profileId" value={profileId} />

      <label className="flex flex-col gap-1 text-sm font-medium text-ink">
        What kind of access are you requesting?
        <select
          name="requestedRoleKey"
          required
          className="rounded-xl border border-lavender-soft bg-cream px-3 py-2 outline-none focus:border-lavender"
        >
          <option value="viewer">Viewer — see shared content only</option>
          <option value="contributor">Contributor — add photos, memories, achievements</option>
          <option value="teacher_tutor">Teacher / Tutor — view learning progress, add feedback</option>
        </select>
      </label>

      <label className="flex flex-col gap-1 text-sm font-medium text-ink">
        Why are you requesting access?
        <textarea
          name="reason"
          required
          rows={4}
          placeholder="Your relationship to the family and why you'd like access…"
          className="rounded-xl border border-lavender-soft bg-cream px-3 py-2 outline-none focus:border-lavender"
        />
      </label>

      <label className="flex items-start gap-2 text-xs text-ink-soft">
        <input type="checkbox" name="agreedToTerms" required className="mt-0.5" />
        I agree to the privacy and acceptable-use terms for this profile.
      </label>

      {!state.ok && <p className="text-sm text-red-ink bg-red-soft rounded-lg px-3 py-2">{state.error}</p>}

      <button
        type="submit"
        disabled={pending}
        className="mt-1 rounded-full bg-lavender px-4 py-2 font-semibold text-white transition hover:brightness-95 disabled:opacity-60"
      >
        {pending ? "Sending…" : "Send request"}
      </button>
    </form>
  );
}
