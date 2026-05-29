"use client";

import { useMemo, useState } from "react";

type JobStatus = "Applied" | "Interview" | "Rejected" | "Offer" | "Follow-up";

type Application = {
  id: number;
  company: string;
  role: string;
  status: JobStatus;
  location: string;
  appliedOn: string;
};

const initialApplications: Application[] = [
  {
    id: 1,
    company: "Stripe",
    role: "Frontend Engineer",
    status: "Interview",
    location: "Remote",
    appliedOn: "2026-05-18",
  },
  {
    id: 2,
    company: "Notion",
    role: "Full-Stack Engineer",
    status: "Applied",
    location: "Remote",
    appliedOn: "2026-05-21",
  },
  {
    id: 3,
    company: "Linear",
    role: "Backend Engineer",
    status: "Follow-up",
    location: "Remote",
    appliedOn: "2026-05-24",
  },
];

const statusStyles: Record<JobStatus, string> = {
  Applied: "bg-sky-500/10 text-sky-300 border-sky-500/20",
  Interview: "bg-amber-500/10 text-amber-300 border-amber-500/20",
  Rejected: "bg-red-500/10 text-red-300 border-red-500/20",
  Offer: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
  "Follow-up": "bg-violet-500/10 text-violet-300 border-violet-500/20",
};

export default function ApplicationsPage() {
  const [applications] = useState<Application[]>(initialApplications);

  const stats = useMemo(() => {
    return {
      total: applications.length,
      interview: applications.filter((a) => a.status === "Interview").length,
      followUp: applications.filter((a) => a.status === "Follow-up").length,
      offer: applications.filter((a) => a.status === "Offer").length,
    };
  }, [applications]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Applications</h1>
          <p className="mt-1 text-sm text-zinc-400">
            Track every job application in one place.
          </p>
        </div>

        <button className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-zinc-900 transition hover:bg-zinc-200">
          + Add Application
        </button>
      </div>

      <section className="grid gap-4 md:grid-cols-4">
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
          <p className="text-sm text-zinc-400">Total</p>
          <p className="mt-2 text-3xl font-semibold">{stats.total}</p>
        </div>
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
          <p className="text-sm text-zinc-400">Interviews</p>
          <p className="mt-2 text-3xl font-semibold">{stats.interview}</p>
        </div>
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
          <p className="text-sm text-zinc-400">Follow-ups</p>
          <p className="mt-2 text-3xl font-semibold">{stats.followUp}</p>
        </div>
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
          <p className="text-sm text-zinc-400">Offers</p>
          <p className="mt-2 text-3xl font-semibold">{stats.offer}</p>
        </div>
      </section>

      <section className="rounded-2xl border border-zinc-800 bg-zinc-900">
        <div className="border-b border-zinc-800 px-5 py-4">
          <h2 className="text-base font-medium">Recent Applications</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-zinc-800">
            <thead className="bg-zinc-950/60">
              <tr>
                <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-400">
                  Company
                </th>
                <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-400">
                  Role
                </th>
                <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-400">
                  Status
                </th>
                <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-400">
                  Location
                </th>
                <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-400">
                  Applied On
                </th>
                <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-400">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {applications.map((app) => (
                <tr key={app.id} className="hover:bg-zinc-800/40">
                  <td className="px-5 py-4 text-sm font-medium text-white">
                    {app.company}
                  </td>
                  <td className="px-5 py-4 text-sm text-zinc-300">{app.role}</td>
                  <td className="px-5 py-4 text-sm">
                    <span
                      className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-medium ${statusStyles[app.status]}`}
                    >
                      {app.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-sm text-zinc-300">{app.location}</td>
                  <td className="px-5 py-4 text-sm text-zinc-300">{app.appliedOn}</td>
                  <td className="px-5 py-4 text-sm">
                    <button className="text-zinc-400 transition hover:text-white">
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}