"use client";

import { Fragment, useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import AddApplicationForm from "@/app/components/AddApplicationForm";
import { Pencil, Trash2 } from "lucide-react";
import StatusBadge from "@/app/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import Pagination from "@/app/components/Pagination";

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
  const [editingApplication, setEditingApplication] = useState<Application | null>(null);
  const [search, setSearch] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const LIMIT = 10;

  async function fetchApplications(pageNum = page) {
    setLoading(true);
    const params = new URLSearchParams({
      page: String(pageNum),
      limit: String(LIMIT),
      search: search,
      status: statusFilter,
    });

    const res = await fetch(`/api/applications?${params}`);
    const data = await res.json();
    setApplications(data.applications);
    setTotalPages(data.pagination.totalPages);
    setTotal(data.pagination.total);
    setLoading(false);
  }

  async function deleteApplication(id: string) {
    await fetch(`/api/applications/${id}`, { method: "DELETE" });
    setDeletingId(null);
    fetchApplications();
  }

  // const filtered = applications.filter((app) => {
  //   const matchesSearch =
  //     app.company.toLowerCase().includes(search.toLowerCase()) ||
  //     app.role.toLowerCase().includes(search.toLowerCase());
  //   const matchesStatus =
  //     statusFilter === "ALL" || app.status === statusFilter;
  //   return matchesSearch && matchesStatus;
  // });
  
  useEffect(() => {
    fetchApplications(page);
  }, [page, search, statusFilter]);

  function handlePageChange(newPage: number){
    setPage(newPage);
    setExpandedId(null);
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white">Applications</h1>
        <p className="mt-1 text-sm text-zinc-400">
          Track every job application in one place.
        </p>
      </div>

      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="w-full min-w-0 md:max-w-xs">
          <Input
            type="text"
            placeholder="Search by company or role..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="w-full min-w-0 bg-zinc-900/50 border-zinc-800 text-white placeholder:text-zinc-500 focus-visible:ring-zinc-700"
          />
        </div>
        <Button
          onClick={() => {
            setEditingApplication(null);
            setOpen(true);
          }}
          className="w-full md:w-auto cursor-pointer bg-white text-zinc-950 hover:bg-zinc-200 font-medium shrink-0 whitespace-nowrap"
        >
          + Add Application
        </Button>
      </div>

      <div className="flex flex-wrap gap-2 pb-1">
        {["ALL", "APPLIED", "PHONE_SCREEN", "INTERVIEW", "OFFER", "REJECTED", "FOLLOW_UP", "WITHDRAWN"].map((status) => (
          <button
            key={status}
            onClick={() => { setStatusFilter(status); setPage(1); }}
            className={`rounded-full px-3 py-1 text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
              statusFilter === status
                ? "bg-white text-zinc-900"
                : "border border-zinc-700 text-zinc-400 hover:border-zinc-500 hover:text-zinc-200"
            }`}
          >
            {status === "ALL" ? "All" : status.replace(/_/g, " ")}
          </button>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className="bg-zinc-900 border-zinc-800 text-zinc-100 sm:max-w-lg max-h-[90vh] overflow-y-auto"
          onInteractOutside={(e) => e.preventDefault()}
        >
          <DialogHeader>
            <DialogTitle>
              {editingApplication ? "Edit Application" : "Add Application"}
            </DialogTitle>
          </DialogHeader>
          <AddApplicationForm
            application={editingApplication ?? undefined}
            onSuccess={() => {
              setOpen(false);
              setEditingApplication(null);
              fetchApplications();
            }}
          />
        </DialogContent>
      </Dialog>

      {loading ? (
        <p className="text-sm text-zinc-400">Loading...</p>
      ) : applications.length === 0 ? (
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-12 text-center text-sm text-zinc-400">
          {search ? "No applications match your search." : "No applications yet. Add your first one."}
        </div>
      ) : (
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 overflow-hidden shadow-xl">
          <div className="md:hidden space-y-3 p-3 ">
            {applications.map((app) => (
              <div
                key={app.id}
                className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4 space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-semibold text-white">{app.company}</p>
                    <p className="text-sm text-zinc-400 mt-0.5">{app.role}</p>
                  </div>
                  <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => { setEditingApplication(app); setOpen(true); }}
                      className="h-8 w-8 text-zinc-400 hover:text-white cursor-pointer"
                      title="Edit application"
                    >
                      <Pencil className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setDeletingId(app.id)}
                      className="h-8 w-8 text-zinc-400 hover:text-red-400 cursor-pointer"
                      title="Delete application"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
                <StatusBadge status={app.status} />
                <div className="flex items-center justify-between text-xs text-zinc-500">
                  <span>{app.location}</span>
                  <span>{new Date(app.appliedOn).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}</span>
                </div>
                {app.notes && (
                  <p className="text-xs text-zinc-500 border-t border-zinc-800 pt-2">
                    {app.notes}
                  </p>
                )}
              </div>
            ))}
          </div>
          <div className="hidden md:block overflow-x-auto">
            <table className="min-w-full divide-y divide-zinc-800/80 backend-table">
              <thead className="bg-zinc-900/60">
                <tr>
                  {['Company', 'Role', 'Status', 'Location', 'Applied On'].map((h) => (
                    <th key={h} className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-zinc-400 whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                  <th className="px-5 py-3.5 text-right text-xs font-semibold uppercase tracking-wider text-zinc-400">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60 bg-zinc-900/10">
                {applications.map((app) => (
                  <Fragment key={app.id}>
                    <tr 
                      onClick={() => setExpandedId(expandedId === app.id ? null : app.id)}
                      className="hover:bg-zinc-800/30 transition-colors cursor-pointer"
                    >
                      <td className="px-5 py-3.5 text-sm font-medium text-white whitespace-nowrap">{app.company}</td>
                      <td className="px-5 py-3.5 text-sm text-zinc-300 whitespace-nowrap">{app.role}</td>
                      <td className="px-5 py-3.5 text-sm text-zinc-300 whitespace-nowrap">
                        <StatusBadge status={app.status} />
                      </td>
                      <td className="px-5 py-3.5 text-sm text-zinc-300 whitespace-nowrap">{app.location}</td>
                      <td className="px-5 py-3.5 text-sm text-zinc-300 whitespace-nowrap">
                        {new Date(app.appliedOn).toLocaleDateString(undefined, {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </td>
                      <td className="px-5 py-3.5 text-sm whitespace-nowrap" onClick={(e) => {e.stopPropagation()}}>
                        <div className="flex items-center justify-end gap-1.5">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => { setEditingApplication(app); setOpen(true); }}
                            className="h-8 w-8 text-zinc-400 hover:text-white hover:bg-zinc-800/60 cursor-pointer transition-colors"
                            title="Edit application"
                          >
                            <Pencil className="h-3.5 w-3.5" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setDeletingId(app.id)}
                            className="h-8 w-8 text-zinc-400 hover:text-red-400 hover:bg-red-950/20 cursor-pointer transition-colors"
                            title="Delete application"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                    {expandedId === app.id && (
                      <tr>
                        <td colSpan={6} className="px-5 py-3 bg-zinc-900/60 text-sm text-zinc-400">
                          {app.notes ? app.notes : "No notes added."}
                        </td>
                      </tr>
                    )}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination
            page={page}
            totalPages={totalPages}
            total={total}
            limit={LIMIT}
            onPageChange={handlePageChange}
          />
        </div>
      )}
      <AlertDialog open={!!deletingId} onOpenChange={() => setDeletingId(null)}>
        <AlertDialogContent className="bg-zinc-900 border-zinc-800 text-zinc-100">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete application?</AlertDialogTitle>
            <AlertDialogDescription className="text-zinc-400">
              This cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-transparent border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deletingId && deleteApplication(deletingId)}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}