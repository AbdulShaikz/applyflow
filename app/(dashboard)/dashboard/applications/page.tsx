"use client";

import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import AddApplicationForm from "@/app/components/AddApplicationForm";
import { Trash2 } from "lucide-react";
import StatusBadge from "@/app/components/StatusBadge";

type Application = {
  id: string;
  company: string;
  role: string;
  location: string;
  status: string;
  appliedOn: string;
  notes: string | null;
};

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  async function fetchApplications() {
    const res = await fetch("/api/applications");
    const data = await res.json();
    setApplications(data);
    setLoading(false);
  }

  async function deleteApplication(id: string) {
    await fetch(`/api/applications/${id}`, { method: "DELETE" });
    fetchApplications();
  }

  useEffect(() => {
    fetchApplications();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Applications</h1>
          <p className="mt-1 text-sm text-zinc-400">
            Track every job application in one place.
          </p>
        </div>
        <button
          onClick={() => setOpen(true)}
          className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-zinc-900 hover:bg-zinc-200"
        >
          + Add Application
        </button>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent 
          className="bg-zinc-900 border-zinc-800 text-zinc-100 sm:max-w-lg max-h-[90vh] overflow-y-auto"
          onInteractOutside={(e) => e.preventDefault()}
        >
          <DialogHeader>
            <DialogTitle>Add Application</DialogTitle>
          </DialogHeader>
          <AddApplicationForm
            onSuccess={() => {
              setOpen(false);
              fetchApplications();
            }}
          />
        </DialogContent>
      </Dialog>

      {loading ? (
        <p className="text-sm text-zinc-400">Loading...</p>
      ) : applications.length === 0 ? (
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 text-sm text-zinc-400">
          No applications yet. Add your first one.
        </div>
      ) : (
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900">
          <table className="min-w-full divide-y divide-zinc-800">
            <thead className="bg-zinc-950/60">
              <tr>
                {["Company", "Role", "Status", "Location", "Applied On",""].map((h) => (
                  <th key={h} className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-400">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {applications.map((app) => (
                <tr key={app.id} className="hover:bg-zinc-800/40">
                  <td className="px-5 py-4 text-sm font-medium text-white">{app.company}</td>
                  <td className="px-5 py-4 text-sm text-zinc-300">{app.role}</td>
                  <td className="px-5 py-4 text-sm text-zinc-300">
                    <StatusBadge status={app.status} />
                  </td>
                  <td className="px-5 py-4 text-sm text-zinc-300">{app.location}</td>
                  <td className="px-5 py-4 text-sm text-zinc-300">
                    {new Date(app.appliedOn).toLocaleDateString()}
                  </td>
                  <td className="px-5 py-4 text-sm">
                    <button
                      onClick={() => deleteApplication(app.id)}
                      className="text-zinc-500 hover:text-red-400 cursor-pointer transition-colors"
                      title="Delete application"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}