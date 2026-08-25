"use client";

import { useState, useTransition } from "react";
import { decideAccessRequest } from "@/app/actions/access-requests";

const DECISIONS = [
  { key: "approved", label: "Approve", cls: "bg-mint text-ink" },
  { key: "partial", label: "Partial", cls: "bg-gold text-white" },
  { key: "info_requested", label: "Ask for more info", cls: "bg-sky text-ink" },
  { key: "rejected", label: "Reject", cls: "bg-red-soft text-red-ink" },
] as const;

export default function DecisionButtons({ requestId }: { requestId: string }) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState<string | null>(null);

  function decide(decision: string) {
    setError(null);
    startTransition(async () => {
      const formData = new FormData();
      formData.set("requestId", requestId);
      formData.set("decision", decision);
      const result = await decideAccessRequest(formData);
      if (!result.ok) setError(result.error);
      else setDone(decision);
    });
  }

  if (done) {
    return <p className="text-sm text-ink-soft">Decision recorded: {done.replace("_", " ")}.</p>;
  }

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {DECISIONS.map((d) => (
          <button
            key={d.key}
            disabled={pending}
            onClick={() => decide(d.key)}
            className={`rounded-full px-3 py-1.5 text-xs font-semibold disabled:opacity-60 ${d.cls}`}
          >
            {d.label}
          </button>
        ))}
      </div>
      {error && <p className="mt-2 text-xs text-red-ink">{error}</p>}
    </div>
  );
}
