"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type Application = {
  id: string;
  company: string;
  role: string;
  location: string;
  status: string;
  appliedOn: string;
  notes: string | null;
};

const schema = z.object({
  company: z.string().min(1, "Company is required"),
  role: z.string().min(1, "Role is required"),
  location: z.string().min(1, "Location is required"),
  status: z.string().min(1, "Status is required"),
  appliedOn: z.string().min(1, "Date is required"),
  notes: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export default function AddApplicationForm({
  onSuccess,
  application,
}: {
  onSuccess: () => void;
  application?: Application;
}) {
  const isEditing  = !!application;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      company: application?.company ?? "",
      role: application?.role ?? "",
      location: application?.location ?? "",
      status: application?.status ?? "APPLIED",
      appliedOn: application?.appliedOn
        ? new Date(application.appliedOn).toISOString().split("T")[0]
        : "",
      notes: application?.notes ?? "",
    },
  });

  async function onSubmit(data: FormData) {
    const url = isEditing
      ? `/api/applications/${application.id}`
      : "/api/applications";
    const method = isEditing ? "PATCH" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      reset();
      onSuccess();
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="mb-1.5 block text-sm text-zinc-300">Company</label>
        <input
          {...register("company")}
          placeholder="e.g. Stripe"
          className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-white placeholder:text-zinc-500 focus:border-zinc-500 focus:outline-none"
        />
        {errors.company && <p className="mt-1 text-xs text-red-400">{errors.company.message}</p>}
      </div>

      <div>
        <label className="mb-1.5 block text-sm text-zinc-300">Role</label>
        <input
          {...register("role")}
          placeholder="e.g. Frontend Engineer"
          className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-white placeholder:text-zinc-500 focus:border-zinc-500 focus:outline-none"
        />
        {errors.role && <p className="mt-1 text-xs text-red-400">{errors.role.message}</p>}
      </div>

      <div>
        <label className="mb-1.5 block text-sm text-zinc-300">Location</label>
        <input
          {...register("location")}
          placeholder="e.g. Remote"
          className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-white placeholder:text-zinc-500 focus:border-zinc-500 focus:outline-none"
        />
        {errors.location && <p className="mt-1 text-xs text-red-400">{errors.location.message}</p>}
      </div>

      <div>
        <label className="mb-1.5 block text-sm text-zinc-300">Status</label>
        <select
          {...register("status")}
          className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-white focus:border-zinc-500 focus:outline-none"
        >
          <option value="APPLIED">Applied</option>
          <option value="PHONE_SCREEN">Phone Screen</option>
          <option value="INTERVIEW">Interview</option>
          <option value="OFFER">Offer</option>
          <option value="REJECTED">Rejected</option>
          <option value="FOLLOW_UP">Follow Up</option>
          <option value="WITHDRAWN">Withdrawn</option>
        </select>
        {errors.status && <p className="mt-1 text-xs text-red-400">{errors.status.message}</p>}
      </div>

      <div>
        <label className="mb-1.5 block text-sm text-zinc-300">Applied On</label>
        <input
          {...register("appliedOn")}
          type="date"
          className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-white focus:border-zinc-500 focus:outline-none scheme-dark"
        />
        {errors.appliedOn && <p className="mt-1 text-xs text-red-400">{errors.appliedOn.message}</p>}
      </div>

      <div>
        <label className="mb-1.5 block text-sm text-zinc-300">Notes</label>
        <textarea
          {...register("notes")}
          placeholder="Any notes about this application..."
          rows={3}
          className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-white placeholder:text-zinc-500 focus:border-zinc-500 focus:outline-none"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-lg bg-white py-2 text-sm font-medium text-zinc-900 hover:bg-zinc-200 disabled:opacity-50 cursor-pointer"
      >
        {isSubmitting ? "Saving..." : isEditing ? "Save Changes" : "Add Application"}
      </button>
    </form>
  );
}