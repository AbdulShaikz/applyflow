export default function ApplicationsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Applications</h1>
          <p className="mt-1 text-sm text-zinc-400">
            Track every job application in one place.
          </p>
        </div>
        <button className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-zinc-900 hover:bg-zinc-200">
          + Add Application
        </button>
      </div>
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 text-sm text-zinc-400">
        No applications yet. Add your first one.
      </div>
    </div>
  );
}