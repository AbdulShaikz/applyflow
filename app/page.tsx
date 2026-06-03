import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      <section className="mx-auto flex min-h-screen max-w-6xl flex-col px-6 py-8">

        <header className="flex items-center justify-between border-b border-zinc-800 pb-6">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">ApplyFlow</h1>
            <p className="text-sm text-zinc-400">Job search, organized.</p>
          </div>
          <div className="flex gap-3">
            <Link
              href="/login"
              className="rounded-lg border border-zinc-700 px-4 py-2 text-sm hover:bg-zinc-900 transition-colors"
            >
              Sign in
            </Link>
            <Link
              href="/register"
              className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-zinc-900 hover:bg-zinc-200 transition-colors"
            >
              Get started
            </Link>
          </div>
        </header>

        <div className="grid flex-1 items-center gap-12 py-16 md:grid-cols-2">
          <div>
            <p className="mb-4 inline-flex rounded-full border border-zinc-800 px-3 py-1 text-xs text-zinc-400">
              Built for serious job seekers
            </p>
            <h2 className="max-w-xl text-3xl md:text-5xl font-semibold tracking-tight leading-tight">
              Stop losing track of where you applied.
            </h2>
            <p className="mt-6 max-w-lg text-zinc-400 leading-relaxed">
              ApplyFlow gives you one place to track every application,
              monitor interview stages, and follow up at the right time.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link
                href="/register"
                className="rounded-lg bg-white px-5 py-2.5 text-sm font-medium text-zinc-900 hover:bg-zinc-200 transition-colors text-center"
              >
                Start for free
              </Link>
              <Link
                href="/login"
                className="rounded-lg border border-zinc-700 px-5 py-2.5 text-sm text-zinc-300 hover:bg-zinc-900 transition-colors text-center"
              >
                Sign in
              </Link>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
              <p className="text-sm text-zinc-400">Total Applications</p>
              <p className="mt-2 text-3xl font-semibold">24</p>
              <p className="mt-1 text-xs text-zinc-500">Across all stages</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
                <p className="text-sm text-zinc-400">Interviews</p>
                <p className="mt-2 text-3xl font-semibold">6</p>
              </div>
              <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
                <p className="text-sm text-zinc-400">Offers</p>
                <p className="mt-2 text-3xl font-semibold">2</p>
              </div>
            </div>
          </div>
        </div>

        <footer className="border-t border-zinc-800 pt-6 pb-2">
          <p className="text-xs text-zinc-600 text-center">
            ApplyFlow — Built with Next.js, Prisma, and PostgreSQL
          </p>
        </footer>

      </section>
    </main>
  );
}