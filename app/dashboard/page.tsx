import Link from "next/link";
import { getCurrentUser, getMyProfiles, isPlatformOwner, type MyProfileRow } from "@/lib/permissions";
import { signOut, signOutAllDevices } from "@/app/actions/auth";

export default async function DashboardPage() {
  const [user, profiles, owner] = await Promise.all([
    getCurrentUser(),
    getMyProfiles(),
    isPlatformOwner(),
  ]);

  const canSeeAdminQueue =
    owner || profiles.some((p) => p.roles?.key === "profile_admin");

  return (
    <main className="flex-1 px-6 py-12">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl text-ink">Welcome{user?.email ? `, ${user.email}` : ""}</h1>
            <p className="text-sm text-ink-soft">Liya&apos;s World — Phase 2 foundation</p>
          </div>
          <div className="flex gap-3 text-sm">
            <form action={signOut}>
              <button className="rounded-full border border-lavender-soft px-4 py-1.5 text-ink hover:bg-lavender-soft">
                Sign out
              </button>
            </form>
          </div>
        </div>

        <section className="mb-8 rounded-2xl bg-white p-6 shadow-sm shadow-lavender-soft/40">
          <h2 className="text-lg text-ink mb-3">Your profiles</h2>
          {profiles.length === 0 ? (
            <p className="text-sm text-ink-soft">
              No profiles yet — a Platform Owner or Profile Admin needs to invite you, or create a
              profile if you&apos;re the Owner.
            </p>
          ) : (
            <ul className="flex flex-col gap-2">
              {profiles.map((p: MyProfileRow) => (
                <li
                  key={p.profile_id}
                  className="flex items-center justify-between rounded-xl bg-cream px-4 py-2.5"
                >
                  <span className="font-medium text-ink">{p.profiles?.display_name}</span>
                  <span className="text-xs text-ink-soft">{p.roles?.label}</span>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="mb-8 grid gap-3 sm:grid-cols-2">
          {canSeeAdminQueue && (
            <Link
              href="/admin/access-requests"
              className="rounded-2xl bg-white p-5 shadow-sm shadow-lavender-soft/40 hover:shadow-md"
            >
              <h3 className="font-semibold text-ink">Access requests</h3>
              <p className="text-xs text-ink-soft mt-1">Review pending requests to join a profile.</p>
            </Link>
          )}
          <form action={signOutAllDevices}>
            <button className="w-full rounded-2xl bg-white p-5 text-left shadow-sm shadow-lavender-soft/40 hover:shadow-md">
              <h3 className="font-semibold text-ink">Log out of all devices</h3>
              <p className="text-xs text-ink-soft mt-1">
                Revoke every active session for this account immediately.
              </p>
            </button>
          </form>
        </section>

        <p className="text-xs text-ink-soft">
          This is the Phase 2 foundation — auth, RLS, roles, and the access-request workflow are
          live. The full Learning Center, Homework, Reading, and Parent/Owner dashboards from
          Phase 3 build on top of this.
        </p>
      </div>
    </main>
  );
}
