import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-zinc-950 text-zinc-100">
      <section className="relative mx-auto flex min-h-screen max-w-7xl flex-col px-5 py-6 sm:px-8 lg:px-10">
        <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-0 z-0 h-128 w-3xl -translate-x-1/2 rounded-full bg-indigo-500/10 blur-3xl" />

        <header className="relative z-10 flex items-center justify-between border-b border-white/10 pb-5">
          <Link href="/" aria-label="ApplyFlow home" className="group min-w-0 shrink">
            <h1 className="whitespace-nowrap text-lg font-semibold tracking-tight sm:text-2xl">ApplyFlow<span className="text-indigo-400">.</span></h1>
            <p className="text-xs text-zinc-500 transition-colors group-hover:text-zinc-400 sm:text-sm">Job search, organized.</p>
          </Link>
          <div className="flex shrink-0 items-center gap-1 sm:gap-3">
            <Link
              href="/login"
              className="whitespace-nowrap rounded-lg px-2.5 py-2 text-xs text-zinc-300 transition-colors hover:bg-white/5 hover:text-white sm:px-4 sm:text-sm"
            >
              Sign in
            </Link>
            <Link
              href="/register"
              className="whitespace-nowrap rounded-lg bg-white px-2.5 py-2 text-xs font-medium text-zinc-950 shadow-lg shadow-white/5 transition-all hover:bg-zinc-200 hover:shadow-white/10 sm:px-4 sm:text-sm"
            >
              Get started
            </Link>
          </div>
        </header>

        <div className="relative z-10 grid flex-1 items-center gap-14 py-8 sm:py-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
          <div className="max-w-2xl">
            <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-400/20 bg-indigo-400/10 px-3 py-1.5 text-xs font-medium text-indigo-300">
              <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
              Built for serious job seekers
            </p>
            <h2 className="max-w-xl text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
              Your next opportunity, <span className="text-zinc-500">under control.</span>
            </h2>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-zinc-400 sm:text-lg">
              ApplyFlow gives you one place to track every application,
              monitor interview stages, and follow up at the right time.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/register"
                className="rounded-lg bg-white px-5 py-3 text-center text-sm font-medium text-zinc-900 shadow-xl shadow-white/5 transition-all hover:-translate-y-0.5 hover:bg-zinc-200"
              >
                Start for free
              </Link>
              <Link
                href="/login"
                className="rounded-lg border border-white/10 bg-white/3 px-5 py-3 text-center text-sm text-zinc-300 transition-colors hover:bg-white/[0.07] hover:text-white"
              >
                Sign in
              </Link>
            </div>
          </div>

          <div className="relative rounded-3xl border border-white/10 bg-white/3.5 p-3 shadow-2xl shadow-indigo-950/30 backdrop-blur-sm sm:p-4">
            <div className="rounded-2xl border border-white/10 bg-zinc-900/90 p-5 sm:p-6">
              <div className="mb-7 flex items-center justify-between">
                <div><p className="text-sm font-medium text-zinc-200">Overview</p><p className="mt-1 text-xs text-zinc-500">Your job search at a glance</p></div>
                <span className="rounded-md bg-emerald-400/10 px-2 py-1 text-[11px] font-medium text-emerald-400">This month</span>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/3 p-5">
                <p className="text-sm text-zinc-400">Total applications</p>
                <div className="mt-2 flex items-end justify-between"><p className="text-4xl font-semibold tracking-tight">24</p><span className="text-xs text-emerald-400">↑ 18% <span className="text-zinc-500">vs last month</span></span></div>
                <div className="mt-5 flex h-12 items-end gap-1.5">
                  {[35, 52, 42, 68, 55, 78, 64, 92, 74, 100, 82, 96].map((height, index) => <span key={index} className={`flex-1 rounded-t-sm ${index === 9 ? "bg-indigo-400" : "bg-indigo-400/25"}`} style={{ height: `${height}%` }} />)}
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="rounded-xl border border-white/10 bg-white/3 p-4"><p className="text-xs text-zinc-500">Interviews</p><p className="mt-2 text-2xl font-semibold">6</p><p className="mt-1 text-xs text-zinc-500">Active stages</p></div>
                <div className="rounded-xl border border-white/10 bg-white/3 p-4"><p className="text-xs text-zinc-500">Offers</p><p className="mt-2 text-2xl font-semibold">2</p><p className="mt-1 text-xs text-zinc-500">Keep going</p></div>
              </div>
            </div>
          </div>
        </div>

        <footer className="relative z-10 border-t border-white/10 pb-2 pt-5">
          <p className="text-center text-xs text-zinc-600">
            ApplyFlow &ndash; Built with Next.js, Prisma, and PostgreSQL
          </p>
        </footer>

      </section>
    </main>
  );
}