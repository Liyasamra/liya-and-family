"use server";

import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import {
  signUpSchema,
  signInSchema,
  requestPasswordResetSchema,
  updatePasswordSchema,
  mfaChallengeSchema,
} from "@/lib/validation/auth";

type ActionResult = { ok: true } | { ok: false; error: string };

/** Records a login attempt for the Recent Activity / Security Alerts
 * features. Fire-and-forget-ish, but awaited so failures don't crash
 * the auth flow — logging must never block a real login. */
async function logLoginEvent(opts: {
  userId: string | null;
  emailAttempted: string;
  success: boolean;
  mfaUsed: boolean;
  failureReason?: string;
}) {
  try {
    const supabase = await createClient();
    const h = await headers();
    await supabase.from("login_events").insert({
      user_id: opts.userId,
      email_attempted: opts.emailAttempted,
      success: opts.success,
      mfa_used: opts.mfaUsed,
      failure_reason: opts.failureReason ?? null,
      // Real deployments should populate ip_approx from a coarse
      // geo-IP lookup done in the platform layer (e.g. Vercel's
      // request geo headers), not the raw IP itself.
      ip_approx: h.get("x-vercel-ip-country") ?? null,
    });
  } catch {
    // Never let telemetry failure break auth.
  }
}

export async function signUp(formData: FormData): Promise<ActionResult> {
  const parsed = signUpSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    displayName: formData.get("displayName"),
  });
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid input." };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signUp({
    email: parsed.data.email,
    password: parsed.data.password,
    options: {
      data: { display_name: parsed.data.displayName },
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
    },
  });

  if (error) return { ok: false, error: error.message };
  return { ok: true };
}

export async function signIn(formData: FormData): Promise<ActionResult> {
  const parsed = signInSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid input." };
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email: parsed.data.email,
    password: parsed.data.password,
  });

  await logLoginEvent({
    userId: data?.user?.id ?? null,
    emailAttempted: parsed.data.email,
    success: !error,
    mfaUsed: false,
    failureReason: error?.message,
  });

  // Note on brute-force protection: Supabase Auth applies its own
  // server-side rate limiting and temporary lockouts to
  // signInWithPassword itself — this app layers login_events +
  // security_alerts on top for visibility, it does not reimplement
  // rate limiting client-side (a client-side counter would not be
  // real protection, exactly per the "no fake security controls" rule).
  if (error) return { ok: false, error: "Incorrect email or password." };

  redirect("/dashboard");
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}

/** "Log out of all devices" — revokes every refresh token for this
 * user, not just the current session's cookie. */
export async function signOutAllDevices() {
  const supabase = await createClient();
  await supabase.auth.signOut({ scope: "global" });
  redirect("/login");
}

export async function requestPasswordReset(formData: FormData): Promise<ActionResult> {
  const parsed = requestPasswordResetSchema.safeParse({ email: formData.get("email") });
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid input." };
  }

  const supabase = await createClient();
  await supabase.auth.resetPasswordForEmail(parsed.data.email, {
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/update-password`,
  });

  // Always return success, whether or not the email exists — an
  // account-enumeration leak here would defeat the point of the flow.
  return { ok: true };
}

export async function updatePassword(formData: FormData): Promise<ActionResult> {
  const parsed = updatePasswordSchema.safeParse({
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid input." };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.updateUser({ password: parsed.data.password });
  if (error) return { ok: false, error: error.message };

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user) {
    await supabase.from("security_alerts").insert({
      user_id: user.id,
      type: "password_reset",
      detail: { source: "self_service_reset" },
    });
  }

  redirect("/dashboard");
}

// ---------- MFA (mandatory for Platform Owner / Profile Admin) ----------

export async function enrollMfaFactor() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.mfa.enroll({ factorType: "totp" });
  if (error) return { ok: false as const, error: error.message };
  return {
    ok: true as const,
    factorId: data.id,
    qrCodeSvg: data.totp.qr_code,
    secret: data.totp.secret,
  };
}

export async function verifyMfaEnrollment(formData: FormData): Promise<ActionResult> {
  const parsed = mfaChallengeSchema.safeParse({
    factorId: formData.get("factorId"),
    code: formData.get("code"),
  });
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid code." };
  }

  const supabase = await createClient();
  const { data: challenge, error: challengeError } = await supabase.auth.mfa.challenge({
    factorId: parsed.data.factorId,
  });
  if (challengeError) return { ok: false, error: challengeError.message };

  const { error: verifyError } = await supabase.auth.mfa.verify({
    factorId: parsed.data.factorId,
    challengeId: challenge.id,
    code: parsed.data.code,
  });
  if (verifyError) return { ok: false, error: "That code didn't verify — try again." };

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user) {
    await supabase.from("users").update({ mfa_enrolled: true }).eq("id", user.id);
  }

  redirect("/dashboard");
}

export async function challengeMfa(formData: FormData): Promise<ActionResult> {
  const parsed = mfaChallengeSchema.safeParse({
    factorId: formData.get("factorId"),
    code: formData.get("code"),
  });
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid code." };
  }

  const supabase = await createClient();
  const { data: challenge, error: challengeError } = await supabase.auth.mfa.challenge({
    factorId: parsed.data.factorId,
  });
  if (challengeError) return { ok: false, error: challengeError.message };

  const { error: verifyError } = await supabase.auth.mfa.verify({
    factorId: parsed.data.factorId,
    challengeId: challenge.id,
    code: parsed.data.code,
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (verifyError) {
    if (user) {
      await supabase.from("security_alerts").insert({
        user_id: user.id,
        type: "mfa_failure",
        detail: {},
      });
    }
    return { ok: false, error: "That code didn't verify — try again." };
  }

  await logLoginEvent({
    userId: user?.id ?? null,
    emailAttempted: user?.email ?? "",
    success: true,
    mfaUsed: true,
  });

  redirect("/dashboard");
}
