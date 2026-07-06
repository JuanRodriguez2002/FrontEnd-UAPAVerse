"use client";

import { ArrowUpRight, BookmarkCheck, Heart, SignalHigh } from "lucide-react";
import type { Stand } from "@/features/dashboard-empresa/types/investors";

type FavoriteStandsPanelProps = {
  stands: Stand[];
};

export function FavoriteStandsPanel({ stands }: FavoriteStandsPanelProps) {
  return (
    <section className="glass-panel rounded-[24px] p-5">
      <div className="mb-5 flex items-center justify-between gap-3">
        <div>
          <p className="section-eyebrow">Mis Favoritos</p>
          <h2 className="mt-1 text-2xl font-black text-white">Stands guardados</h2>
        </div>
        <button className="rounded-full border border-sky-300/25 px-3 py-2 text-xs font-semibold text-sky-100 transition hover:border-sky-300/[0.45] hover:bg-sky-300/10">
          Ver todos
        </button>
      </div>

      <div className="space-y-3">
        {stands.map((stand) => (
          <article key={stand.id} className="soft-card overflow-hidden rounded-[20px] transition hover:-translate-y-0.5">
            <div className={`h-24 bg-gradient-to-br ${stand.gradient} relative`}>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_20%,rgba(255,255,255,0.2),transparent_18%),linear-gradient(135deg,rgba(255,255,255,0.12),rgba(0,0,0,0.18))]" />
              <div className="absolute left-3 top-3 rounded-full bg-black/30 px-2 py-1 text-[10px] font-semibold uppercase text-cyan-100 ring-1 ring-white/15">
                {stand.sector}
              </div>
              <Heart className="absolute right-3 top-3 h-5 w-5 fill-pink-400 text-pink-300" />
            </div>
            <div className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-bold text-white">{stand.name}</h3>
                  <p className="mt-1 text-xs text-slate-400">{stand.owner}</p>
                </div>
                <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-2 py-1 text-xs font-semibold text-cyan-100">
                  {stand.matchScore}%
                </span>
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-300">{stand.description}</p>
              <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-slate-300">
                <div className="rounded-xl border border-white/[0.06] bg-white/[0.045] p-3">
                  <BookmarkCheck className="mb-2 h-4 w-4 text-sky-300" />
                  {stand.status}
                </div>
                <div className="rounded-xl border border-white/[0.06] bg-white/[0.045] p-3">
                  <SignalHigh className="mb-2 h-4 w-4 text-violet-300" />
                  {stand.traction}
                </div>
              </div>
              <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-sky-300/20 py-2.5 text-sm font-semibold text-sky-100 transition hover:border-sky-300/40 hover:bg-sky-300/10">
                Abrir stand
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}