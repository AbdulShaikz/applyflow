export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <section>
        <h2 className="text-2xl font-semibold tracking-tight">Overview</h2>
        <p className="mt-2 text-zinc-400">
          A quick summary of your job search activity.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
          <p className="text-sm text-zinc-400">Applications</p>
          <p className="mt-2 text-3xl font-semibold">24</p>
        </div>
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
          <p className="text-sm text-zinc-400">Interviews</p>
          <p className="mt-2 text-3xl font-semibold">6</p>
        </div>
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
          <p className="text-sm text-zinc-400">Follow-ups due</p>
          <p className="mt-2 text-3xl font-semibold">3</p>
        </div>
      </section>
    </div>
  );
}