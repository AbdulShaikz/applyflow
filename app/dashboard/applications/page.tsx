"use client";

import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const jobStatuses = ["Applied", "Interview", "Rejected", "Offer", "Follow-up"] as const;

const applicationSchema = z.object({
  company: z.string().min(2, "Company name is required"),
  role: z.string().min(2, "Role is required"),
  location: z.string().min(2, "Location is required"),
  status: z.enum(jobStatuses, {
    message: "Select a valid status",
  }),
  appliedOn: z.string().min(1, "Applied date is required"),
  notes: z.string().optional(),
});

type ApplicationFormValues = z.infer<typeof applicationSchema>;

type JobStatus = (typeof jobStatuses)[number];

type Application = ApplicationFormValues & {
  id: number;
};

const initialApplications: Application[] = [
  {
    id: 1,
    company: "Stripe",
    role: "Frontend Engineer",
    status: "Interview",
    location: "Remote",
    appliedOn: "2026-05-18",
    notes: "Initial recruiter screening done.",
  },
  {
    id: 2,
    company: "Notion",
    role: "Full-Stack Engineer",
    status: "Applied",
    location: "Remote",
    appliedOn: "2026-05-21",
    notes: "Applied through careers page.",
  },
  {
    id: 3,
    company: "Linear",
    role: "Backend Engineer",
    status: "Follow-up",
    location: "Remote",
    appliedOn: "2026-05-24",
    notes: "Sent follow-up email.",
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
  const [applications, setApplications] = useState<Application[]>(initialApplications);
  const [showForm, setShowForm] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ApplicationFormValues>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      company: "",
      role: "",
      location: "",
      status: "Applied",
      appliedOn: "",
      notes: "",
    },
  });

  const stats = useMemo(() => {
    return {
      total: applications.length,
      interview: applications.filter((a) => a.status === "Interview").length,
      followUp: applications.filter((a) => a.status === "Follow-up").length,
      offer: applications.filter((a) => a.status === "Offer").length,
    };
  }, [applications]);

  const onSubmit = (data: ApplicationFormValues) => {
    const newApplication: Application = {
      id: Date.now(),
      ...data,
      notes: data.notes || "",
    };

    setApplications((prev) => [newApplication, ...prev]);
    reset();
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Applications</h1>
          <p className="mt-1 text-sm text-zinc-400">
            Track every job application in one place.
          </p>
        </div>

        <button
          onClick={() => setShowForm((prev) => !prev)}
          className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-zinc-900 transition hover:bg-zinc-200"
        >
          {showForm ? "Close Form" : "+ Add Application"}
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

      {showForm && (
        <section className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
          <h2 className="text-lg font-medium">Add New Application</h2>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-5 grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm text-zinc-300">Company</label>
              <input
                {...register("company")}
                className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-2 text-white outline-none focus:border-white"
                placeholder="Google"
              />
              {errors.company && (
                <p className="mt-1 text-sm text-red-400">{errors.company.message}</p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm text-zinc-300">Role</label>
              <input
                {...register("role")}
                className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-2 text-white outline-none focus:border-white"
                placeholder="Software Engineer"
              />
              {errors.role && (
                <p className="mt-1 text-sm text-red-400">{errors.role.message}</p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm text-zinc-300">Location</label>
              <input
                {...register("location")}
                className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-2 text-white outline-none focus:border-white"
                placeholder="Remote"
              />
              {errors.location && (
                <p className="mt-1 text-sm text-red-400">{errors.location.message}</p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm text-zinc-300">Status</label>
              <select
                {...register("status")}
                className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-2 text-white outline-none focus:border-white"
              >
                {jobStatuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
              {errors.status && (
                <p className="mt-1 text-sm text-red-400">{errors.status.message}</p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm text-zinc-300">Applied On</label>
              <input
                type="date"
                {...register("appliedOn")}
                className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-2 text-white outline-none focus:border-white"
              />
              {errors.appliedOn && (
                <p className="mt-1 text-sm text-red-400">{errors.appliedOn.message}</p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm text-zinc-300">Notes</label>
              <textarea
                {...register("notes")}
                rows={4}
                className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-2 text-white outline-none focus:border-white"
                placeholder="Recruiter contact, interview notes, follow-up details..."
              />
            </div>

            <div className="md:col-span-2 flex gap-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-zinc-900 transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? "Saving..." : "Save Application"}
              </button>
              <button
                type="button"
                onClick={() => {
                  reset();
                  setShowForm(false);
                }}
                className="rounded-lg border border-zinc-700 px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-800"
              >
                Cancel
              </button>
            </div>
          </form>
        </section>
      )}

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
                  Notes
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
                  <td className="px-5 py-4 text-sm text-zinc-400">
                    {app.notes || "-"}
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