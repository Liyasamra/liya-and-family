"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { isProfileAdmin } from "@/lib/permissions";
import { accessRequestSchema, decideAccessRequestSchema } from "@/lib/validation/auth";

type ActionResult = { ok: true } | { ok: false; error: string };

const RATE_LIMIT_WINDOW_HOURS = 24;
const RATE_LIMIT_MAX_REQUESTS = 5;

export async function createAccessRequest(formData: FormData): Promise<ActionResult> {
  const parsed = accessRequestSchema.safeParse({
    profileId: formData.get("profileId"),
    requestedRoleKey: formData.get("requestedRoleKey"),
    reason: formData.get("reason"),
    agreedToTerms: formData.get("agreedToTerms") === "on",
  });
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid input." };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, error: "You must be signed in to request access." };

  // Rate limit: block a flood of requests from one applicant, across
  // any profile, in the trailing window.
  const since = new Date(Date.now() - RATE_LIMIT_WINDOW_HOURS * 3600 * 1000).toISOString();
  const { count } = await supabase
    .from("access_requests")
    .select("id", { count: "exact", head: true })
    .eq("applicant_user_id", user.id)
    .gte("created_at", since);
  if ((count ?? 0) >= RATE_LIMIT_MAX_REQUESTS) {
    return {
      ok: false,
      error: `You've submitted several requests recently — please wait before submitting another.`,
    };
  }

  const { data: role } = await supabase
    .from("roles")
    .select("id")
    .eq("key", parsed.data.requestedRoleKey)
    .single();
  if (!role) return { ok: false, error: "Unknown role requested." };

  const { error } = await supabase.from("access_requests").insert({
    profile_id: parsed.data.profileId,
    applicant_user_id: user.id,
    requested_role_id: role.id,
    reason: parsed.data.reason,
  });

  if (error) {
    // The DB's partial unique index (one pending request per
    // profile+applicant) is the real duplicate guard — this just
    // turns its violation into a friendly message.
    if (error.code === "23505") {
      return { ok: false, error: "You already have a pending request for this profile." };
    }
    return { ok: false, error: "Could not submit your request — try again." };
  }

  // Notify every admin of this profile.
  const { data: admins } = await supabase
    .from("profile_members")
    .select("user_id, roles!inner(key)")
    .eq("profile_id", parsed.data.profileId)
    .eq("roles.key", "profile_admin")
    .is("deleted_at", null);

  if (admins && admins.length > 0) {
    await supabase.from("notifications").insert(
      admins.map((a: { user_id: string }) => ({
        user_id: a.user_id,
        type: "access_request_pending",
        payload: { profileId: parsed.data.profileId, applicantId: user.id },
      }))
    );
  }

  return { ok: true };
}

export async function decideAccessRequest(formData: FormData): Promise<ActionResult> {
  const parsed = decideAccessRequestSchema.safeParse({
    requestId: formData.get("requestId"),
    decision: formData.get("decision"),
    decisionNote: formData.get("decisionNote") || undefined,
    expiresAt: formData.get("expiresAt") || undefined,
  });
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid input." };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, error: "You must be signed in." };

  const { data: request } = await supabase
    .from("access_requests")
    .select("id, profile_id, applicant_user_id, requested_role_id, status")
    .eq("id", parsed.data.requestId)
    .single();
  if (!request) return { ok: false, error: "Request not found." };
  if (request.status !== "pending") return { ok: false, error: "This request was already decided." };

  // Defense in depth — RLS on access_requests already blocks a
  // non-admin from reaching this row's update policy at all.
  if (!(await isProfileAdmin(request.profile_id))) {
    return { ok: false, error: "You don't have permission to decide requests for this profile." };
  }

  const { error: updateError } = await supabase
    .from("access_requests")
    .update({
      status: parsed.data.decision,
      decided_by: user.id,
      decided_at: new Date().toISOString(),
      decision_note: parsed.data.decisionNote ?? null,
      expires_at: parsed.data.expiresAt ?? null,
    })
    .eq("id", parsed.data.requestId);

  if (updateError) return { ok: false, error: "Could not save the decision." };

  if (parsed.data.decision === "approved" || parsed.data.decision === "partial") {
    const { error: memberError } = await supabase.from("profile_members").upsert(
      {
        profile_id: request.profile_id,
        user_id: request.applicant_user_id,
        role_id: request.requested_role_id,
        invited_by: user.id,
      },
      { onConflict: "profile_id,user_id" }
    );
    if (memberError) return { ok: false, error: "Approved, but could not grant membership — try again." };
  }

  await supabase.from("audit_logs").insert({
    actor_user_id: user.id,
    profile_id: request.profile_id,
    action: `access_request.${parsed.data.decision}`,
    target_table: "access_requests",
    target_id: request.id,
  });

  await supabase.from("notifications").insert({
    user_id: request.applicant_user_id,
    type: "access_request_decided",
    // Deliberately no private profile content in this payload — only
    // the decision itself, per "notify the applicant of the decision
    // without revealing private profile information."
    payload: { profileId: request.profile_id, decision: parsed.data.decision },
  });

  revalidatePath("/admin/access-requests");
  return { ok: true };
}
