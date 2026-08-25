import RequestAccessForm from "./form";

export default async function RequestAccessPage({
  params,
}: {
  params: Promise<{ profileId: string }>;
}) {
  const { profileId } = await params;
  return (
    <main className="flex flex-1 items-center justify-center px-4 py-16">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-lg shadow-lavender-soft/40">
        <h1 className="text-2xl text-ink mb-1">Request access</h1>
        <p className="text-sm text-ink-soft mb-6">
          The profile&apos;s administrator will review this request — you&apos;ll be notified of their
          decision, but not shown any private content until it&apos;s approved.
        </p>
        <RequestAccessForm profileId={profileId} />
      </div>
    </main>
  );
}
