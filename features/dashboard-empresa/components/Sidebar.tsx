"use client";

import { BarChart3, BriefcaseBusiness, HelpCircle, Heart, LogOut, MessageSquare, Rocket, Settings } from "lucide-react";

const navItems = [
  { label: "Favoritos", icon: Heart, active: true },
  { label: "Portafolio", icon: BriefcaseBusiness },
  { label: "Mensajes", icon: MessageSquare },
  { label: "Reportes", icon: BarChart3 },
  { label: "Ajustes", icon: Settings }
];

export function Sidebar() {
  return (
    <aside className="glass-panel sticky top-4 hidden h-[calc(100vh-2rem)] w-64 shrink-0 rounded-[24px] p-4 lg:flex lg:flex-col">
      <div className="mb-8">
        <div className="flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-sky-300/20 to-violet-400/20 text-sky-100 ring-1 ring-sky-200/30">
            <Rocket className="h-5 w-5" />
          </div>
          <div>
            <p className="text-lg font-black leading-none text-white">Investor Hub</p>
            <p className="mt-1 text-[10px] uppercase tracking-[0.22em] text-slate-400">UAPA VERSE</p>
          </div>
        </div>
      </div>

      <nav className="space-y-2">
        {navItems.map((item) => (
          <button
            key={item.label}
            className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition ${
              item.active
                ? "bg-sky-300/[0.14] text-white shadow-glow ring-1 ring-sky-300/20"
                : "text-slate-400 hover:bg-white/[0.055] hover:text-white"
            }`}
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </button>
        ))}
      </nav>

      <div className="mt-auto space-y-2 border-t border-sky-300/10 pt-4">
        <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-400 transition hover:bg-white/[0.055] hover:text-white">
          <HelpCircle className="h-4 w-4" />
          Ayuda
        </button>
        <button className="flex w-full items-center gap-3 rounded-xl border border-sky-300/15 px-3 py-2.5 text-sm text-slate-400 transition hover:border-sky-300/30 hover:bg-sky-300/10 hover:text-white">
          <LogOut className="h-4 w-4" />
          Salir
        </button>
      </div>
    </aside>
  );
}