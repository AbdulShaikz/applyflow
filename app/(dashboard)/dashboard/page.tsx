import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import StatusBadge from "@/app/components/StatusBadge";

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const applications = await prisma.application.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
  });

  const total = applications.length;
  const interviews = applications.filter((a) => a.status === "INTERVIEW").length;
  const offers = applications.filter((a) => a.status === "OFFER").length;
  const rejected = applications.filter((a) => a.status === "REJECTED").length;
  const responseRate = total > 0 ? Math.round((interviews / total) * 100) : 0;
  const recent = applications.slice(0, 5);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Overview</h2>
        <p className="mt-1 text-sm text-zinc-400">
          A quick summary of your job search activity.
        </p>
      </div>

      <div className="grid gap-4 grid-cols-2 md:grid-cols-5">
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
          <p className="text-sm text-zinc-400">Total Applied</p>
          <p className="mt-2 text-3xl font-semibold">{total}</p>
        </div>
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
          <p className="text-sm text-zinc-400">Interviews</p>
          <p className="mt-2 text-3xl font-semibold">{interviews}</p>
        </div>
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
          <p className="text-sm text-zinc-400">Offers</p>
          <p className="mt-2 text-3xl font-semibold">{offers}</p>
        </div>
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
          <p className="text-sm text-zinc-400">Rejected</p>
          <p className="mt-2 text-3xl font-semibold">{rejected}</p>
        </div>
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
          <p className="text-sm text-zinc-400">Response Rate</p>
          <p className="mt-2 text-3xl font-semibold">{responseRate}%</p>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold tracking-tight">Recent Applications</h3>
        <p className="mt-1 text-sm text-zinc-400">Your last 5 applications.</p>
      </div>

      {recent.length === 0 ? (
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-12 text-center text-sm text-zinc-400">
          No applications yet. Head to Applications to add your first one.
        </div>
      ) : (
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 overflow-hidden shadow-xl">
          
          <div className="md:hidden space-y-3 p-3">
            {recent.map((app) => (
              <div
                key={app.id}
                className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4 space-y-3"
              >
                <div>
                  <p className="text-sm font-semibold text-white">{app.company}</p>
                  <p className="text-sm text-zinc-400 mt-0.5">{app.role}</p>
                </div>
                <StatusBadge status={app.status} />
                <div className="flex items-center justify-between text-xs text-zinc-500">
                  <span>{app.location}</span>
                  <span>
                    {new Date(app.appliedOn).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="hidden md:block overflow-x-auto">
            <table className="min-w-full divide-y divide-zinc-800/80">
              <thead className="bg-zinc-900/60">
                <tr>
                  {["Company", "Role", "Status", "Location", "Applied On"].map((h) => (
                    <th
                      key={h}
                      className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-zinc-400 whitespace-nowrap"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60 bg-zinc-900/10">
                {recent.map((app) => (
                  <tr key={app.id} className="hover:bg-zinc-800/30 transition-colors">
                    <td className="px-5 py-3.5 text-sm font-medium text-white whitespace-nowrap">
                      {app.company}
                    </td>
                    <td className="px-5 py-3.5 text-sm text-zinc-300 whitespace-nowrap">
                      {app.role}
                    </td>
                    <td className="px-5 py-3.5 text-sm text-zinc-300 whitespace-nowrap">
                      <StatusBadge status={app.status} />
                    </td>
                    <td className="px-5 py-3.5 text-sm text-zinc-300 whitespace-nowrap">
                      {app.location}
                    </td>
                    <td className="px-5 py-3.5 text-sm text-zinc-300 whitespace-nowrap">
                      {new Date(app.appliedOn).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
        </div>
      )}
    </div>
  );
}