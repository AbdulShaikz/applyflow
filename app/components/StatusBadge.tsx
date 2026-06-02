import { Badge } from "@/components/ui/badge";

type Status = string;

const statusConfig: Record<string, string> = {
  APPLIED: "bg-sky-500/10 text-sky-300 border-sky-500/20",
  PHONE_SCREEN: "bg-violet-500/10 text-violet-300 border-violet-500/20",
  INTERVIEW: "bg-amber-500/10 text-amber-300 border-amber-500/20",
  OFFER: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
  REJECTED: "bg-red-500/10 text-red-300 border-red-500/20",
  FOLLOW_UP: "bg-orange-500/10 text-orange-300 border-orange-500/20",
  WITHDRAWN: "bg-zinc-500/10 text-zinc-400 border-zinc-500/20",
};

const statusLabel: Record<string, string> = {
  APPLIED: "Applied",
  PHONE_SCREEN: "Phone Screen",
  INTERVIEW: "Interview",
  OFFER: "Offer",
  REJECTED: "Rejected",
  FOLLOW_UP: "Follow Up",
  WITHDRAWN: "Withdrawn",
};

export default function StatusBadge({ status }: { status: Status }) {
  return (
    <Badge
      className={`border ${statusConfig[status] ?? "bg-zinc-500/10 text-zinc-400 border-zinc-500/20"}`}
      variant="outline"
    >
      {statusLabel[status] ?? status}
    </Badge>
  );
}