"use client";

import { useState } from "react";
import { ArrowRight, CalendarClock, Heart, Sparkles, Store } from "lucide-react";

const favoriteStands = [
  {
    name: "Neural Labs",
    category: "Inteligencia Artificial",
    description: "Explora soluciones de visión artificial y automatización para equipos modernos.",
  },
  {
    name: "EcoSphere",
    category: "Sostenibilidad",
    description: "Descubre experiencias inmersivas para negocios con impacto ambiental positivo.",
  },
  {
    name: "CloudForge",
    category: "Cloud",
    description: "Una mirada rápida a herramientas para escalar equipos de forma segura.",
  },
];

const visitedHistory = [
  {
    name: "Quantum Studio",
    category: "Innovación",
    date: "12 Jun 2026",
    description: "Presentó conceptos de diseño y procesos creativos aplicados a experiencias digitales.",
  },
  {
    name: "Apex Robotics",
    category: "Robótica",
    date: "10 Jun 2026",
    description: "Mostró una demo interactiva con automatización para laboratorios y producción.",
  },
  {
    name: "Nova Health",
    category: "Salud",
    date: "08 Jun 2026",
    description: "Exploró herramientas para la atención médica más conectada y accesible.",
  },
];

export function Intereses() {
  const [showHistoryPanel, setShowHistoryPanel] = useState(false);
  const [showFavoritesPanel, setShowFavoritesPanel] = useState(false);

  return (
    <div className="space-y-6">
      <section className="rounded-[28px] border border-white/10 bg-gradient-to-br from-[#132a69] via-[#0a163e] to-[#060d2a] p-6 shadow-[0_20px_70px_rgba(2,8,23,0.35)] sm:p-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-primary">
              <Sparkles className="h-3.5 w-3.5" />
              Mis intereses
            </div>
            <h2 className="mt-4 text-2xl font-semibold text-white sm:text-3xl">
              Stands que te han gustado
            </h2>
            <p className="mt-3 max-w-2xl text-sm text-[#8f9bb8]">
              Aquí tienes los stands que marcaste como favoritos para volver a ellos cuando quieras.
            </p>
          </div>

          <button
            onClick={() => setShowFavoritesPanel((prev) => !prev)}
            className="inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold text-[#9ca9c6] transition hover:bg-cyan-300/10 hover:text-cyan-300"
          >
            {showFavoritesPanel ? "Ocultar" : "Ver más"}
            <ArrowRight className={`h-4 w-4 transition ${showFavoritesPanel ? "rotate-90" : ""}`} />
          </button>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {favoriteStands.map((stand) => (
            <article key={stand.name} className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-white">{stand.name}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.2em] text-primary">{stand.category}</p>
                </div>
                <div className="rounded-full border border-white/10 bg-primary/10 p-2 text-primary">
                  <Heart className="h-4 w-4" />
                </div>
              </div>
              <p className="mt-3 text-sm text-[#8f9bb8]">{stand.description}</p>
              <div className="mt-4 flex items-center gap-2 text-sm text-[#9ca9c6]">
                <Store className="h-4 w-4" />
                Stand destacado
              </div>
            </article>
          ))}
        </div>

        {showFavoritesPanel && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#000837]/80 px-4 py-6 backdrop-blur-sm">
            <div className="w-full max-w-4xl rounded-[28px] border border-white/10 bg-[#07133b] p-5 shadow-[0_20px_80px_rgba(2,8,23,0.45)] sm:p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">Favoritos completos</p>
                  <h3 className="mt-2 text-xl font-semibold text-white">Stands que te han gustado</h3>
                  <p className="mt-2 text-sm text-[#8f9bb8]">Revisa todos tus favoritos con filtros por rango de tiempo o categorías.</p>
                </div>
                <button
                  onClick={() => setShowFavoritesPanel(false)}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-[#9ca9c6] transition hover:text-white"
                >
                  Cerrar
                </button>
              </div>

              <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                  <div className="flex flex-1 flex-col gap-3 sm:flex-row">
                    <label className="flex-1">
                      <span className="mb-1 block text-xs font-semibold uppercase tracking-[0.2em] text-[#8f9bb8]">Desde</span>
                      <input
                        type="date"
                        defaultValue="2026-06-01"
                        className="w-full rounded-xl border border-white/10 bg-[#07133b] px-3 py-2 text-sm text-white outline-none"
                      />
                    </label>
                    <label className="flex-1">
                      <span className="mb-1 block text-xs font-semibold uppercase tracking-[0.2em] text-[#8f9bb8]">Hasta</span>
                      <input
                        type="date"
                        defaultValue="2026-06-30"
                        className="w-full rounded-xl border border-white/10 bg-[#07133b] px-3 py-2 text-sm text-white outline-none"
                      />
                    </label>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {['Últimos 30 días', 'Última semana', 'Todo el récord'].map((option) => (
                      <button
                        key={option}
                        className="rounded-full border border-white/10 bg-[#07133b] px-3 py-2 text-sm text-[#9ca9c6] transition hover:border-primary/30 hover:text-white"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-5 grid gap-3 md:grid-cols-2">
                {favoriteStands.map((stand) => (
                  <article key={stand.name} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold text-white">{stand.name}</p>
                        <p className="mt-1 text-xs uppercase tracking-[0.2em] text-primary">{stand.category}</p>
                      </div>
                      <div className="rounded-full border border-white/10 bg-primary/10 p-2 text-primary">
                        <Heart className="h-4 w-4" />
                      </div>
                    </div>
                    <p className="mt-3 text-sm text-[#8f9bb8]">{stand.description}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        )}
      </section>

      <section className="rounded-[28px] border border-white/10 bg-gradient-to-br from-[#132a69] via-[#0a163e] to-[#060d2a] p-6 shadow-[0_20px_70px_rgba(2,8,23,0.35)] sm:p-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-primary">
              <CalendarClock className="h-3.5 w-3.5" />
              Historial
            </div>
            <h2 className="mt-4 text-2xl font-semibold text-white sm:text-3xl">
              Stands que has visitado
            </h2>
            <p className="mt-3 max-w-2xl text-sm text-[#8f9bb8]">
              Revisa los stands que ya exploraste, con su categoría, fecha de visita y una breve descripción.
            </p>
          </div>

          <button
            onClick={() => setShowHistoryPanel((prev) => !prev)}
            className="inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold text-[#9ca9c6] transition hover:bg-cyan-300/10 hover:text-cyan-300"
          >
            {showHistoryPanel ? "Ocultar" : "Ver más"}
            <ArrowRight className={`h-4 w-4 transition ${showHistoryPanel ? "rotate-90" : ""}`} />
          </button>
        </div>

        <div className="mt-6 space-y-3">
          {visitedHistory.map((stand) => (
            <article key={stand.name} className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div>
                  <p className="text-sm font-semibold text-white">{stand.name}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.2em] text-primary">{stand.category}</p>
                  <p className="mt-3 text-sm text-[#8f9bb8]">{stand.description}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 px-3 py-1 text-sm text-[#9ca9c6] ">
                  {stand.date}
                </div>
              </div>
            </article>
          ))}
        </div>

        {showHistoryPanel && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#000837]/80 px-4 py-6 backdrop-blur-sm">
            <div className="w-full max-w-4xl rounded-[28px] border border-white/10 bg-[#07133b] p-5 shadow-[0_20px_80px_rgba(2,8,23,0.45)] sm:p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">Historial completo</p>
                  <h3 className="mt-2 text-xl font-semibold text-white">Stands visitados</h3>
                  <p className="mt-2 text-sm text-[#8f9bb8]">Consulta todo tu recorrido por la feria y filtra por franja de tiempo.</p>
                </div>
                <button
                  onClick={() => setShowHistoryPanel(false)}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-[#9ca9c6] transition hover:text-white"
                >
                  Cerrar
                </button>
              </div>

              <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                  <div className="flex flex-1 flex-col gap-3 sm:flex-row">
                    <label className="flex-1">
                      <span className="mb-1 block text-xs font-semibold uppercase tracking-[0.2em] text-[#8f9bb8]">Desde</span>
                      <input
                        type="date"
                        defaultValue="2026-06-01"
                        className="w-full rounded-xl border border-white/10 bg-[#07133b] px-3 py-2 text-sm text-white outline-none"
                      />
                    </label>
                    <label className="flex-1">
                      <span className="mb-1 block text-xs font-semibold uppercase tracking-[0.2em] text-[#8f9bb8]">Hasta</span>
                      <input
                        type="date"
                        defaultValue="2026-06-30"
                        className="w-full rounded-xl border border-white/10 bg-[#07133b] px-3 py-2 text-sm text-white outline-none"
                      />
                    </label>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {['Últimos 30 días', 'Última semana', 'Todo el récord'].map((option) => (
                      <button
                        key={option}
                        className="rounded-full border border-white/10 bg-[#07133b] px-3 py-2 text-sm text-[#9ca9c6] transition hover:border-primary/30 hover:text-white"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-5 grid gap-3">
                {visitedHistory.map((stand) => (
                  <article key={stand.name} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                      <div>
                        <p className="text-sm font-semibold text-white">{stand.name}</p>
                        <p className="mt-1 text-xs uppercase tracking-[0.2em] text-primary">{stand.category}</p>
                        <p className="mt-3 text-sm text-[#8f9bb8]">{stand.description}</p>
                      </div>
                      <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-[#9ca9c6]">
                        {stand.date}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
