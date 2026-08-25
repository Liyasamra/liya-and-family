import { createClient } from "@/lib/supabase/server";
import DecisionButtons from "./decision-buttons";

export default async function AdminAccessRequestsPage() {
  const supabase = await createClient();

  // RLS already restricts this to requests for profiles the current
  // user administers (or their own applications) — no extra filtering
  // needed here, which is the whole point of putting the rule in the
  // database instead of the page.
  type PendingRequestRow = {
    id: string;
    reason: string;
    profiles: { display_name: string } | null;
    roles: { label: string } | null;
    applicant: { display_name: string | null; email: string } | null;
  };

  const { data: requestsData } = await supabase
    .from("access_requests")
    .select(
      "id, reason, status, created_at, profiles(display_name), roles!access_requests_requested_role_id_fkey(label), applicant:users!access_requests_applicant_user_id_fkey(display_name, email)"
    )
    .eq("status", "pending")
    .order("created_at", { ascending: true });

  const requests = (requestsData ?? []) as unknown as PendingRequestRow[];

  return (
    <main className="flex-1 px-6 py-12">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-2xl text-ink mb-1">Pending access requests</h1>
        <p className="text-sm text-ink-soft mb-6">
          Approve, partially approve, reject, or ask for more information.
        </p>

        {!requests || requests.length === 0 ? (
          <p className="rounded-2xl bg-white p-6 text-sm text-ink-soft shadow-sm shadow-lavender-soft/40">
            No pending requests right now.
          </p>
        ) : (
          <ul className="flex flex-col gap-4">
            {requests.map((r) => (
              <li key={r.id} className="rounded-2xl bg-white p-5 shadow-sm shadow-lavender-soft/40">
                <div className="mb-2 flex items-center justify-between">
                  <span className="font-semibold text-ink">
                    {r.applicant?.display_name ?? r.applicant?.email}
                  </span>
                  <span className="text-xs text-ink-soft">
                    wants <strong>{r.roles?.label}</strong> on {r.profiles?.display_name}
                  </span>
                </div>
                <p className="mb-3 text-sm text-ink-soft">{r.reason}</p>
                <DecisionButtons requestId={r.id} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
