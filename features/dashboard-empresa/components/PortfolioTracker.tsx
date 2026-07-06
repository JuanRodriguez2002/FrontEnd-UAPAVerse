"use client";

import { CheckCircle2, ChevronsUp, Trash2 } from "lucide-react";
import { usePortfolioProjects } from "@/features/dashboard-empresa/hooks/usePortfolioProjects";

export function PortfolioTracker() {
  const { projects, activeProjectId, setActiveProjectId, advanceProject, removeProject } = usePortfolioProjects();

  return (
    <section className="glass-panel rounded-[24px] p-5">
      <div className="mb-5">
        <p className="section-eyebrow">Portafolio</p>
        <h2 className="mt-1 text-2xl font-black text-white">Proyectos seguidos</h2>
      </div>

      <div className="space-y-3">
        {projects.map((project) => (
          <article
            key={project.id}
            className={`rounded-2xl border p-4 transition ${
              project.id === activeProjectId
                ? "border-sky-300/50 bg-sky-300/10 shadow-glow"
                : "border-sky-300/15 bg-white/[0.03] hover:border-sky-300/30 hover:bg-white/[0.055]"
            }`}
          >
            <button onClick={() => setActiveProjectId(project.id)} className="w-full text-left">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-bold text-white">{project.name}</h3>
                  <p className="mt-1 text-xs text-slate-400">{project.nextAction}</p>
                </div>
                <span className="rounded-full border border-violet-300/20 bg-violet-300/10 px-2 py-1 text-[10px] font-semibold uppercase text-violet-100">
                  {project.phase}
                </span>
              </div>
              <div className="mt-4">
                <div className="mb-2 flex justify-between text-xs text-slate-400">
                  <span>Probabilidad de acuerdo</span>
                  <span>{project.probability}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-white/[0.08]">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-cyan-300 via-sky-400 to-violet-500"
                    style={{ width: `${project.probability}%` }}
                  />
                </div>
              </div>
            </button>

            <div className="mt-4 flex items-center justify-between gap-2">
              <p className="flex items-center gap-1 text-xs text-slate-400">
                <CheckCircle2 className="h-3.5 w-3.5 text-cyan-300" />
                Actualizado: {project.updatedAt}
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => advanceProject(project.id)}
                  className="grid h-9 w-9 place-items-center rounded-xl border border-sky-300/20 text-sky-100 transition hover:border-sky-300/40 hover:bg-sky-300/10"
                  aria-label="Avanzar proyecto"
                >
                  <ChevronsUp className="h-4 w-4" />
                </button>
                <button
                  onClick={() => removeProject(project.id)}
                  className="grid h-9 w-9 place-items-center rounded-xl border border-pink-300/20 text-pink-200 transition hover:border-pink-300/40 hover:bg-pink-300/10"
                  aria-label="Eliminar proyecto"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}