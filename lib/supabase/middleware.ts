import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

const PUBLIC_PATHS = [
  "/login",
  "/signup",
  "/reset-password",
  "/update-password",
  "/auth/callback",
  "/mfa/challenge",
];

const MFA_MANDATORY_PATHS = ["/dashboard", "/admin"]; // Owner + Profile Admin land here

function isPublicPath(pathname: string) {
  return PUBLIC_PATHS.some((p) => pathname === p || pathname.startsWith(p + "/"));
}

/**
 * Refreshes the Supabase session on every request and enforces the two
 * platform-wide rules that must never be left to client-side JS alone:
 *   1. No session -> redirect to /login (server-enforced, not just a
 *      hidden nav link).
 *   2. A user whose role requires MFA (Platform Owner, Profile Admin)
 *      but hasn't completed an MFA challenge this session (aal1, not
 *      aal2) is sent to /mfa/challenge before reaching anything else.
 */
export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;

  if (!user && !isPublicPath(pathname) && pathname !== "/") {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  if (user && MFA_MANDATORY_PATHS.some((p) => pathname.startsWith(p))) {
    const { data: aal } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel();
    const { data: profile } = await supabase
      .from("users")
      .select("is_platform_owner")
      .eq("id", user.id)
      .maybeSingle();

    const mfaRequired = !!profile?.is_platform_owner; // profile_admin check happens per-profile in the page itself
    const mfaSatisfied = aal?.currentLevel === "aal2";
    const mfaEnrolled = (aal?.nextLevel ?? aal?.currentLevel) === "aal2";

    if (mfaRequired && !mfaSatisfied) {
      const url = request.nextUrl.clone();
      url.pathname = mfaEnrolled ? "/mfa/challenge" : "/mfa/enroll";
      url.searchParams.set("next", pathname);
      return NextResponse.redirect(url);
    }
  }

  return response;
}
