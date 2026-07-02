"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AlertTriangle, Edit2, Plus, RefreshCw, Trash2 } from "lucide-react";
import { usePresenterDashboard } from "@/features/dashboard-presentador/components/hooks/usePresenterDashboard";

// Ajustamos el estatus según lo que devuelve tu API (PENDIENTE, etc.)
const STATUS_LABEL: Record<string, string> = {
  PENDIENTE: "PENDIENTE",
  APROBADO: "ACTIVO",
  RECHAZADO: "RECHAZADO",
};

const STATUS_CLASS: Record<string, string> = {
  PENDIENTE: "bg-secondary/10 text-secondary border-secondary/20",
  APROBADO: "bg-[#77f6c6]/10 text-[#77f6c6] border-[#77f6c6]/20",
  RECHAZADO: "bg-error/10 text-error border-error/20",
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
      {/* ... (Tu bloque de error se mantiene igual) ... */}

      <div className="flex items-center justify-between">
        <p className="text-sm text-[#8f9bb8]">
          {stands.length} proyecto{stands.length !== 1 ? "s" : ""} registrado{stands.length !== 1 ? "s" : ""}
        </p>
        {/* ... (Tu botón de crear igual) ... */}
      </div>

      {loading ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {[1, 2, 3].map((i) => <div key={i} className="h-52 animate-pulse rounded-2xl bg-white/5" />)}
        </div>
      ) : stands.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-white/10 py-16 text-center">
            {/* ... (Tu estado vacío igual) ... */}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {stands.map((stand: any) => (
            <article
              key={stand.id}
              className="group overflow-hidden rounded-2xl border border-white/10 bg-[#0e1a4f]/60 shadow-[0_8px_30px_rgba(0,4,35,0.22),inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-xl transition hover:border-primary/20"
            >
              <div className="relative h-24 w-full bg-[#1e2a5f]">
                {/* Status mapeado a API */}
                <span className={`absolute right-3 top-3 rounded-full border px-2.5 py-0.5 font-space text-[10px] font-bold ${STATUS_CLASS[stand.estado_proyecto] || "bg-gray-500/10"}`}>
                  {STATUS_LABEL[stand.estado_proyecto] || "DESCONOCIDO"}
                </span>
                
                {/* FIX: Uso de name_proyecto con fallback seguro */}
                <div className="absolute bottom-3 left-3 flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 backdrop-blur font-space text-xs font-bold text-white">
                  {(stand.name_proyecto || "ST").slice(0, 2).toUpperCase()}
                </div>
              </div>

              <div className="p-4">
                <p className="font-sora text-sm font-bold text-neon-white">{stand.name_proyecto}</p>
                <p className="mt-0.5 font-space text-[10px] text-[#8f9bb8]">
                  {stand.category?.name_categoria || "Sin categoría"}
                </p>
                <p className="mt-2 line-clamp-2 text-xs text-[#657394]">{stand.descripcion_proyecto}</p>

                <div className="mt-3 flex gap-4 border-t border-white/5 pt-3">
                   {/* NOTA: Si tu API no devuelve visitas, ajusta estos campos */}
                   <p className="text-[10px] text-[#657394]">Creado: {new Date(stand.created_at).toLocaleDateString()}</p>
                </div>

                <div className="mt-3 flex gap-2">
                  <button
                    onClick={() => router.push(`/dashboard-presentador/crear-stand?id=${stand.id}`)}
                    className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-white/10 bg-white/5 py-2 text-xs font-bold text-[#9ca9c6] transition hover:bg-white/10"
                  >
                    <Edit2 className="h-3.5 w-3.5" /> Editar
                  </button>
                  <button
                    onClick={() => handleDelete(stand.id.toString())}
                    disabled={deletingId === stand.id.toString()}
                    className="flex items-center justify-center rounded-lg border border-error/20 bg-error/5 p-2 text-error transition hover:bg-error/10"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}