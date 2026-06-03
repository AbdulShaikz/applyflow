import Link from "next/link";
import { auth, signOut } from "@/lib/auth";
import { redirect } from "next/navigation";
import MobileNav from "../components/MobileNav";
import NavLinks from "../components/NavLinks";

const navItems = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/dashboard/applications", label: "Applications" },
];

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session) redirect("/login");

  return (
    <div className="flex min-h-screen bg-zinc-950 text-zinc-100">
      <aside className="hidden w-64 flex-col border-r border-zinc-800 px-5 py-6 md:flex">
        <h2 className="text-xl font-semibold">ApplyFlow</h2>
        <p className="mt-1 text-sm text-zinc-400">Job Tracking</p>
        <NavLinks />
        <form
          action={async () => {
            "use server";
            await signOut({ redirectTo: "/login" });
          }}
        >
          <button
            type="submit"
            className="w-full rounded-lg px-3 py-2 text-left text-sm text-zinc-400 hover:bg-zinc-900 hover:text-white cursor-pointer"
          >
            Sign out
          </button>
        </form>
      </aside>

      <div className="flex flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-zinc-800 px-6 py-4">
          <div className="flex items-center gap-3">
            <MobileNav />
            <span className="text-sm font-semibold md:hidden">ApplyFlow</span>
          </div>
          <div className="rounded-full border border-zinc-700 px-3 py-1 text-sm text-zinc-300">
            {session.user?.name ?? session.user?.email}
          </div>
        </header>
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}