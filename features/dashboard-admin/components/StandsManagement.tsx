"use client";

import { Check, Eye, Pencil, Store, Trash2 } from "lucide-react";
import type {
  AdminDashboardContent,
  AdminStand,
} from "@/features/dashboard-admin/services/adminDashboardService";

type StandsManagementProps = {
  content: AdminDashboardContent["stands"];
  stands: AdminStand[];
  loading: boolean;
  onViewDetails: (stand: AdminStand) => void;
  onRequestApprove: (stand: AdminStand) => void;
  onRequestEdit: (stand: AdminStand) => void;
  onRequestDelete: (stand: AdminStand) => void;
};

const accentClasses = {
  blue: "from-primary-container/60 to-primary/5 border-primary/20 text-primary",
  purple: "from-secondary-container/60 to-secondary/5 border-secondary/20 text-secondary",
  cyan: "from-[#21b6d7]/60 to-[#79ddff]/5 border-[#79ddff]/20 text-[#79ddff]",
};

const statusClasses = {
  Activo: "text-[#77f6c6] bg-[#77f6c6]/10",
  Pendiente: "text-[#ffca80] bg-[#ffca80]/10",
  Revisión: "text-secondary bg-secondary/10",
};

export function StandsManagement({
  content,
  stands,
  loading,
  onViewDetails,
  onRequestApprove,
  onRequestEdit,
  onRequestDelete,
}: StandsManagementProps) {
  return (
    <section
      id={content.sectionId}
      className="rounded-2xl border border-white/10 bg-[#0e1a4f]/55 p-5 shadow-[0_18px_60px_rgba(0,4,35,0.3),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl sm:p-6"
    >
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-secondary/15 bg-secondary/10 text-secondary">
            <Store className="h-4.5 w-4.5" />
          </span>
          <div>
            <h2 className="font-sora text-base font-bold text-neon-white">{content.title}</h2>
            <p className="mt-0.5 text-[10px] text-[#8190b0]">{content.description}</p>
          </div>
        </div>
        <button className="rounded-lg border border-secondary/20 bg-secondary/10 px-3 py-2 font-space text-[9px] font-bold uppercase tracking-wider text-secondary transition hover:bg-secondary/20">
          {content.exploreLabel}
        </button>
      </div>

      <div className="space-y-3">
        {loading
          ? Array.from({ length: content.loadingRows }).map((_, index) => <div key={index} className="h-24 animate-pulse rounded-xl bg-white/5" />)
          : stands.map((stand) => (
              <article
                key={stand.id}
                className="group rounded-xl border border-white/[0.08] bg-white/[0.025] p-3.5 transition hover:border-white/15 hover:bg-white/[0.045]"
              >
                <div className="flex items-center gap-3">
                  <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border bg-gradient-to-br ${accentClasses[stand.accent]}`}>
                    <Store className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="truncate text-xs font-bold text-[#e9edff]">{stand.name}</h3>
                      <span className={`rounded-full px-2 py-0.5 text-[8px] font-bold ${statusClasses[stand.status]}`}>
                        {stand.status}
                      </span>
                    </div>
                    <p className="mt-1 truncate text-[10px] text-[#7f8dab]">{stand.company}</p>
                    <p className="mt-1 font-space text-[8px] uppercase tracking-wider text-[#5f6e90]">
                      {stand.category} · {stand.visits.toLocaleString("en-US")} {content.visitsLabel}
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-1">
                    {stand.status === content.approvalStatus && (
                      <button
                        onClick={() => onRequestApprove(stand)}
                        title={content.actionLabels.approve}
                        className="rounded-lg p-2 text-[#77f6c6] transition hover:bg-[#77f6c6]/10"
                      >
                        <Check className="h-3.5 w-3.5" />
                      </button>
                    )}
                    <button onClick={() => onViewDetails(stand)} title={content.actionLabels.view} className="rounded-lg p-2 text-[#8190b0] transition hover:bg-primary/10 hover:text-primary">
                      <Eye className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={() => onRequestEdit(stand)}
                      title={content.actionLabels.edit}
                      className="rounded-lg p-2 text-[#8190b0] transition hover:bg-secondary/10 hover:text-secondary"
                    >
                      <Pencil className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={() => onRequestDelete(stand)}
                      title={content.actionLabels.delete}
                      className="rounded-lg p-2 text-[#8190b0] transition hover:bg-error/10 hover:text-error"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
      </div>
    </section>
  );
}
