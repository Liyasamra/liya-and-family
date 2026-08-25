import { createClient } from "@/lib/supabase/server";

/**
 * Thin wrappers around the Postgres helper functions defined in
 * supabase/migrations/0005_rls_policies.sql. These are for UI
 * decisions ONLY (show/hide a button, pick which page to render) —
 * the real enforcement is the RLS policy on the table itself, which
 * runs even if a page forgets to call any of these. That split is
 * deliberate: "hiding a link is not security," the database is.
 */

export async function isPlatformOwner(): Promise<boolean> {
  const supabase = await createClient();
  const { data, error } = await supabase.rpc("auth_is_platform_owner");
  if (error) return false;
  return !!data;
}

export async function isProfileAdmin(profileId: string): Promise<boolean> {
  const supabase = await createClient();
  const { data, error } = await supabase.rpc("auth_is_profile_admin", { p_profile_id: profileId });
  if (error) return false;
  return !!data;
}

export async function hasPermission(
  profileId: string,
  moduleKey: string,
  action: string
): Promise<boolean> {
  const supabase = await createClient();
  const { data, error } = await supabase.rpc("auth_has_permission", {
    p_profile_id: profileId,
    p_module: moduleKey,
    p_action: action,
  });
  if (error) return false;
  return !!data;
}

export async function getCurrentUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

export type MyProfileRow = {
  profile_id: string;
  profiles: { id: string; display_name: string; template: string; status: string } | null;
  roles: { key: string; label: string } | null;
};

/** Every profile the current user belongs to, with their role on each. */
export async function getMyProfiles(): Promise<MyProfileRow[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("profile_members")
    .select("profile_id, profiles(id, display_name, template, status), roles(key, label)")
    .is("deleted_at", null);
  if (error) return [];
  return (data ?? []) as unknown as MyProfileRow[];
}
