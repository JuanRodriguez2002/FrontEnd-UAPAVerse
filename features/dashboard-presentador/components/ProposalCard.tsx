"use client";

import { useState } from "react";
import { Check, Clock, X } from "lucide-react";
import type { Proposal, ProposalStatus } from "@/features/dashboard-presentador/types/proposal";

type ProposalCardProps = {
  proposal: Proposal;
  onUpdateStatus: (id: string, status: ProposalStatus) => Promise<void>;
};

const SECTOR_COLORS: Record<string, string> = {
  Fintech: "bg-[#77f6c6]/10 text-[#77f6c6] border-[#77f6c6]/20",
  Software: "bg-primary/10 text-primary border-primary/20",
  Banca: "bg-secondary/10 text-secondary border-secondary/20",
  Logística: "bg-[#ffb86b]/10 text-[#ffc27d] border-[#ffb86b]/20",
};

const STATUS_BADGE: Record<ProposalStatus, { label: string; classes: string }> = {
  aceptado: { label: "Aceptada", classes: "bg-[#77f6c6]/10 text-[#77f6c6] border-[#77f6c6]/20" },
  rechazado: { label: "Rechazada", classes: "bg-error/10 text-error border-error/20" },
  pendiente: { label: "Pendiente", classes: "bg-[#ffb86b]/10 text-[#ffc27d] border-[#ffb86b]/20" },
};

export function ProposalCard({ proposal, onUpdateStatus }: ProposalCardProps) {
  const [confirming, setConfirming] = useState<ProposalStatus | null>(null);
  const [busy, setBusy] = useState(false);

  const sectorClass = SECTOR_COLORS[proposal.sector] ?? "bg-white/10 text-white border-white/10";
  const badge = STATUS_BADGE[proposal.status];

  async function handleConfirm() {
    if (!confirming) return;
    setBusy(true);
    try {
      await onUpdateStatus(proposal.id, confirming);
    } finally {
      setBusy(false);
      setConfirming(null);
    }
  }

  return (
    <article className="group rounded-2xl border border-white/10 bg-[#0e1a4f]/60 p-5 shadow-[0_8px_30px_rgba(0,4,35,0.22),inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-xl transition duration-200 hover:border-primary/20">
      <div className="flex items-start gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary-container to-secondary-container font-space text-sm font-bold text-white shadow-primary-glow">
          {proposal.iniciales}
        </div>

        <div className="min-w-0 flex-1">
          <div className="mb-1 flex flex-wrap items-center gap-2">
            <span className="font-sora text-sm font-bold text-neon-white">{proposal.empresa}</span>
            <span className={`rounded-full border px-2 py-0.5 font-space text-[10px] font-bold ${sectorClass}`}>
              {proposal.sector}
            </span>
            <span className="ml-auto flex items-center gap-1 font-space text-[10px] text-[#657394]">
              <Clock className="h-3 w-3" />
              {proposal.fecha}
            </span>
          </div>

          <p className="mb-1 text-sm font-semibold text-[#c5d0e8]">{proposal.titulo}</p>
          <p className="mb-4 text-xs leading-relaxed text-[#8f9bb8]">{proposal.mensaje}</p>

          {proposal.status !== "pendiente" ? (
            <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-space text-[11px] font-bold ${badge.classes}`}>
              {proposal.status === "aceptado" ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
              {badge.label}
            </span>
          ) : confirming ? (
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-xs text-[#8f9bb8]">
                ¿Confirmar{" "}
                <span className={confirming === "aceptado" ? "text-[#77f6c6]" : "text-error"}>
                  {confirming === "aceptado" ? "aceptar" : "rechazar"}
                </span>
                ?
              </p>
              <button
                onClick={handleConfirm}
                disabled={busy}
                className="rounded-lg bg-primary/20 px-3 py-1 text-xs font-bold text-primary transition hover:bg-primary/30 disabled:opacity-50"
              >
                {busy ? "Guardando..." : "Confirmar"}
              </button>
              <button
                onClick={() => setConfirming(null)}
                disabled={busy}
                className="rounded-lg bg-white/5 px-3 py-1 text-xs font-bold text-[#8f9bb8] transition hover:bg-white/10"
              >
                Cancelar
              </button>
            </div>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={() => setConfirming("aceptado")}
                className="flex items-center gap-1.5 rounded-lg border border-[#77f6c6]/20 bg-[#77f6c6]/10 px-3 py-1.5 text-xs font-bold text-[#77f6c6] transition hover:bg-[#77f6c6]/20"
              >
                <Check className="h-3.5 w-3.5" />
                Aceptar
              </button>
              <button
                onClick={() => setConfirming("rechazado")}
                className="flex items-center gap-1.5 rounded-lg border border-error/20 bg-error/10 px-3 py-1.5 text-xs font-bold text-error transition hover:bg-error/20"
              >
                <X className="h-3.5 w-3.5" />
                Rechazar
              </button>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
