"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AlertTriangle, Edit2, Plus, RefreshCw, Trash2 } from "lucide-react";
import { usePresenterDashboard } from "@/features/dashboard-presentador/components/hooks/usePresenterDashboard";
import type { Stand } from "@/features/dashboard-presentador/types/stand";

const STATUS_LABEL: Record<Stand["status"], string> = {
  activo: "ACTIVO",
  borrador: "BORRADOR",
  revision: "REVISIÓN",
};

const STATUS_CLASS: Record<Stand["status"], string> = {
  activo: "bg-[#77f6c6]/10 text-[#77f6c6] border-[#77f6c6]/20",
  borrador: "bg-[#ffb86b]/10 text-[#ffc27d] border-[#ffb86b]/20",
  revision: "bg-secondary/10 text-secondary border-secondary/20",
};

export function MisStandsPage() {
  const { stands, loading, error, refresh, onDeleteStand } = usePresenterDashboard();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const router = useRouter();

  async function handleRefresh() {
    setRefreshing(true);
    await refresh();
    setRefreshing(false);
  }

  async function handleDelete(id: string) {
    setDeletingId(id);
    try { await onDeleteStand(id); } finally { setDeletingId(null); }
  }

  return (
    <div className="space-y-6">
      {error && (
        <div className="flex items-center gap-3 rounded-2xl border border-error/20 bg-error/10 px-5 py-4 text-sm text-error">
          <AlertTriangle className="h-4 w-4 shrink-0" />
          {error}
          <button onClick={handleRefresh} className="ml-auto flex items-center gap-1.5 text-xs font-bold hover:underline">
            <RefreshCw className={`h-3.5 w-3.5 ${refreshing ? "animate-spin" : ""}`} />
            Reintentar
          </button>
        </div>
      )}

      <div className="flex items-center justify-between">
        <p className="text-sm text-[#8f9bb8]">
          {stands.length} stand{stands.length !== 1 ? "s" : ""} registrado{stands.length !== 1 ? "s" : ""}
        </p>
        <button
          onClick={() => router.push("/dashboard-presentador/crear-stand")}
          className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary-container to-[#2563eb] px-4 py-2 text-sm font-bold text-white shadow-primary-glow transition hover:shadow-primary-glow-hover"
        >
          <Plus className="h-4 w-4" />
          Crear stand
        </button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {[1, 2, 3].map((i) => <div key={i} className="h-52 animate-pulse rounded-2xl bg-white/5" />)}
        </div>
      ) : stands.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-white/10 py-16 text-center">
          <p className="font-sora text-base font-bold text-neon-white">Sin stands aún</p>
          <p className="text-sm text-[#8f9bb8]">Crea tu primer stand virtual para aparecer en la feria.</p>
          <button
            onClick={() => router.push("/dashboard-presentador/crear-stand")}
            className="mt-2 flex items-center gap-2 rounded-xl bg-primary/10 px-4 py-2 text-sm font-bold text-primary transition hover:bg-primary/20"
          >
            <Plus className="h-4 w-4" />
            Nuevo stand
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {stands.map((stand) => (
            <article
              key={stand.id}
              className="group overflow-hidden rounded-2xl border border-white/10 bg-[#0e1a4f]/60 shadow-[0_8px_30px_rgba(0,4,35,0.22),inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-xl transition hover:border-primary/20"
            >
              <div
                className="relative h-24 w-full"
                style={{ background: `linear-gradient(135deg, ${stand.colorAcento}50, ${stand.colorAcento}10)` }}
              >
                <span className={`absolute right-3 top-3 rounded-full border px-2.5 py-0.5 font-space text-[10px] font-bold ${STATUS_CLASS[stand.status]}`}>
                  {STATUS_LABEL[stand.status]}
                </span>
                <div className="absolute bottom-3 left-3 flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 backdrop-blur font-space text-xs font-bold text-white">
                  {stand.nombre.slice(0, 2).toUpperCase()}
                </div>
              </div>

              <div className="p-4">
                <p className="font-sora text-sm font-bold text-neon-white">{stand.nombre}</p>
                <p className="mt-0.5 font-space text-[10px] text-[#8f9bb8]">{stand.categoria}</p>
                <p className="mt-2 line-clamp-2 text-xs text-[#657394]">{stand.descripcion}</p>

                <div className="mt-3 flex gap-4 border-t border-white/5 pt-3">
                  <div>
                    <p className="font-space text-[9px] uppercase tracking-wider text-[#657394]">Visitas</p>
                    <p className="font-sora text-sm font-bold text-neon-white">{stand.visitas.toLocaleString("en-US")}</p>
                  </div>
                  <div>
                    <p className="font-space text-[9px] uppercase tracking-wider text-[#657394]">Empresas</p>
                    <p className="font-sora text-sm font-bold text-neon-white">{stand.empresasInteresadas}</p>
                  </div>
                </div>

                <div className="mt-3 flex gap-2">
                  <button
                    onClick={() => router.push(`/dashboard-presentador/crear-stand?id=${stand.id}`)}
                    className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-white/10 bg-white/5 py-2 text-xs font-bold text-[#9ca9c6] transition hover:bg-white/10 hover:text-neon-white"
                  >
                    <Edit2 className="h-3.5 w-3.5" />
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(stand.id)}
                    disabled={deletingId === stand.id}
                    className="flex items-center justify-center rounded-lg border border-error/20 bg-error/5 p-2 text-error transition hover:bg-error/10 disabled:opacity-50"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </article>
          ))}

          <button
            onClick={() => router.push("/dashboard-presentador/crear-stand")}
            className="flex min-h-[13rem] flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-white/10 bg-transparent transition hover:border-primary/30 hover:bg-primary/5"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-primary">
              <Plus className="h-5 w-5" />
            </span>
            <div className="text-center">
              <p className="text-sm font-bold text-neon-white">Crear nuevo stand</p>
              <p className="mt-1 text-xs text-[#657394]">Añade otra tecnología a tu portfolio</p>
            </div>
          </button>
        </div>
      )}
    </div>
  );
}
