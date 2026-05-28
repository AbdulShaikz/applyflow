import Link from "next/link";

const navItems = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/dashboard/applications", label: "Applications" },
  { href: "/dashboard/interviews", label: "Interviews" },
  { href: "/dashboard/settings", label: "Settings" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="flex min-h-screen">
        <aside className="hidden w-64 border-r border-zinc-800 px-5 py-6 md:block">
          <h2 className="text-xl font-semibold">ApplyFlow</h2>
          <p className="mt-1 text-sm text-zinc-400">Job Tracking SaaS</p>
          <nav className="mt-8 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block rounded-lg px-3 py-2 text-sm text-zinc-300 hover:bg-zinc-900 hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>

        <div className="flex-1">
          <header className="flex items-center justify-between border-b border-zinc-800 px-6 py-4">
            <div>
              <h1 className="text-lg font-medium">Dashboard</h1>
              <p className="text-sm text-zinc-400">
                Track applications, interviews and follow-ups.
              </p>
            </div>
            <div className="rounded-full border border-zinc-700 px-3 py-1 text-sm text-zinc-300">
              Abdul Shaik
            </div>
          </header>
          <main className="p-6">{children}</main>
        </div>
      </div>
    </div>
  );
}