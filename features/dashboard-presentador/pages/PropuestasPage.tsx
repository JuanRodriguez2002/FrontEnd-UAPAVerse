"use client";

import { useEffect, useState } from "react";
import { ProposalCard } from "@/features/dashboard-presentador/components/ProposalCard";
import { fetchProposals, respondToProposal } from "@/features/dashboard-presentador/actions/presenterActions";
import type { Proposal, ProposalStatus } from "@/features/dashboard-presentador/types/proposal";

type Tab = "todas" | "pendiente" | "aceptado" | "rechazado";
const TABS: { id: Tab; label: string }[] = [
  { id: "todas", label: "Todas" },
  { id: "pendiente", label: "Pendientes" },
  { id: "aceptado", label: "Aceptadas" },
  { id: "rechazado", label: "Rechazadas" },
];

export function PropuestasPage() {
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<Tab>("todas");

  useEffect(() => {
    fetchProposals().then((p) => { setProposals(p); setLoading(false); });
  }, []);

  async function handleUpdate(id: string, status: ProposalStatus) {
    const updated = await respondToProposal(id, status);
    setProposals((prev) => prev.map((p) => (p.id === id ? updated : p)));
  }

  const filtered = tab === "todas" ? proposals : proposals.filter((p) => p.status === tab);

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-2">
        {TABS.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
              tab === id
                ? "border border-primary/30 bg-primary/20 text-primary"
                : "border border-white/10 bg-white/5 text-[#9ca9c6] hover:bg-white/10 hover:text-neon-white"
            }`}
          >
            {label}
            {id === "pendiente" && (
              <span className="ml-2 rounded-full bg-secondary/20 px-1.5 py-0.5 font-space text-[10px] text-secondary">
                {proposals.filter((p) => p.status === "pendiente").length}
              </span>
            )}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => <div key={i} className="h-28 animate-pulse rounded-2xl bg-white/5" />)}
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-white/10 py-14 text-center">
          <p className="font-sora text-base font-bold text-neon-white">Sin propuestas</p>
          <p className="text-sm text-[#8f9bb8]">No hay propuestas en esta categoría.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((proposal) => (
            <ProposalCard key={proposal.id} proposal={proposal} onUpdateStatus={handleUpdate} />
          ))}
        </div>
      )}
    </div>
  );
}
