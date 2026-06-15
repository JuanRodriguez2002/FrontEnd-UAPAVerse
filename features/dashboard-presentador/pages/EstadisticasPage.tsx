"use client";

import { useEffect, useState } from "react";
import { StatsPanel } from "@/features/dashboard-presentador/components/stats/StatsPanel";
import { fetchPresenterStats, fetchPresenterStands } from "@/features/dashboard-presentador/actions/presenterActions";
import type { PresenterStats } from "@/features/dashboard-presentador/services/standService";
import type { Stand } from "@/features/dashboard-presentador/types/stand";

export function EstadisticasPage() {
  const [stats, setStats] = useState<PresenterStats | null>(null);
  const [stands, setStands] = useState<Stand[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([fetchPresenterStats(), fetchPresenterStands()]).then(([s, st]) => {
      setStats(s);
      setStands(st);
      setLoading(false);
    });
  }, []);

  return (
    <div className="space-y-6">
      <StatsPanel stats={stats} loading={loading} />

      <div className="rounded-2xl border border-white/10 bg-[#0e1a4f]/60 p-6 backdrop-blur-xl">
        <h2 className="mb-5 font-sora text-base font-bold text-neon-white">Rendimiento por stand</h2>
        {loading ? (
          <div className="space-y-3">
            {[1, 2].map((i) => <div key={i} className="h-10 animate-pulse rounded-xl bg-white/5" />)}
          </div>
        ) : (
          <div className="space-y-3">
            {stands.map((stand) => {
              const max = Math.max(...stands.map((s) => s.visitas), 1);
              const pct = Math.round((stand.visitas / max) * 100);
              return (
                <div key={stand.id}>
                  <div className="mb-1.5 flex items-center justify-between text-xs">
                    <span className="font-semibold text-neon-white">{stand.nombre}</span>
                    <span className="text-[#8f9bb8]">{stand.visitas.toLocaleString("en-US")} visitas</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-primary-container to-[#2563eb] transition-all duration-700"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
