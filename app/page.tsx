export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      <section className="mx-auto flex min-h-screen max-w-6xl flex-col px-6 py-8">
        <header className="flex items-center justify-between border-b border-zinc-800 pb-6">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">ApplyFlow</h1>
            <p className="text-sm text-zinc-400">Track applications, interviews, and follow-ups.</p>
          </div>
          <div className="flex gap-3">
            <button className="rounded-lg border border-zinc-700 px-4 py-2 text-sm hover:bg-zinc-900 cursor-pointer">
              Sign in
            </button>
            <button className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-zinc-900 hover:bg-zinc-200 cursor-pointer">
              Get started
            </button>
          </div>
        </header>
        <div className="grid flex-1 items-center gap-12 py-16 md:grid-cols-2">
          <div>
            <p className="mb-4 inline-flex rounded-full border border-zinc-800 px-3 py-1 text-xs text-zinc-400">Built for serious job seekers</p>
            <h2 className="max-w-xl text-5xl font-semibold tracking-tight">A simple SaaS to manage every job applications in one place.</h2>
            <p className="mt-6 max-w-lg text-zinc-400">Organize your applications, track interview stages, and stay on top of follow-ups with a clean, modern workflow.</p>
          </div>
          <div className="grid gap-4">
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
              <p className="text-sm text-zinc-400">Applications</p>
              <p className="mt-2 text-3xl font-semibold">24</p>
            </div>
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
              <p className="text-sm text-zinc-400">Interviews</p>
              <p className="mt-2 text-3xl font-semibold">6</p>
            </div>
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
              <p className="text-sm text-zinc-400">Follow-ups-due</p>
              <p className="mt-2 text-3xl font-semibold">3</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}