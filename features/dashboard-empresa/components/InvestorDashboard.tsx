"use client";

import { Bell, Building2, CalendarClock, Heart, MessageSquare, Radar, Search, Settings } from "lucide-react";
import { conversations, favoriteStands } from "@/features/dashboard-empresa/services/mockData";
import { FavoriteStandsPanel } from "@/features/dashboard-empresa/components/FavoriteStandsPanel";
import { MessagingPanel } from "@/features/dashboard-empresa/components/MessagingPanel";
import { PortfolioTracker } from "@/features/dashboard-empresa/components/PortfolioTracker";
import { QuickRequestForm } from "@/features/dashboard-empresa/components/QuickRequestForm";
import { Sidebar } from "@/features/dashboard-empresa/components/Sidebar";

const stats = [
  { label: "Stands guardados", value: "18", icon: Heart },
  { label: "Reuniones pendientes", value: "06", icon: CalendarClock },
  { label: "Mensajes nuevos", value: "09", icon: MessageSquare }
];

export function InvestorDashboard() {
  return (
    <main className="min-h-screen overflow-hidden px-4 py-4 text-slate-100 sm:px-6 lg:px-8">
      <div className="pointer-events-none fixed inset-0 bg-[linear-gradient(rgba(80,130,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(80,130,255,0.045)_1px,transparent_1px)] bg-[size:88px_88px] opacity-60" />
      <div className="pointer-events-none fixed inset-x-0 top-0 h-40 bg-gradient-to-b from-cyan-300/[0.08] to-transparent" />

      <section className="relative mx-auto flex max-w-[1540px] gap-5">
        <Sidebar />

        <div className="flex min-w-0 flex-1 flex-col gap-5">
          <header className="glass-panel flex flex-col gap-5 rounded-[24px] px-6 py-5 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-sky-300/25 bg-sky-300/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-sky-100">
                <Radar className="h-3.5 w-3.5" />
                Modulo del inversionista
              </div>
              <h1 className="text-3xl font-black tracking-normal text-white sm:text-4xl">
                Dashboard Empresa
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300">
                Sigue proyectos de alto potencial, conversa con expositores y solicita reuniones o cotizaciones sin salir de la feria virtual.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <label className="professional-input flex min-w-0 items-center gap-2 rounded-full px-4 py-3 text-sm text-slate-300 sm:min-w-80">
                <Search className="h-4 w-4 text-sky-300" />
                <input
                  className="w-full bg-transparent text-slate-100 outline-none placeholder:text-slate-500"
                  placeholder="Buscar stand o sector..."
                />
              </label>
              <button className="soft-card grid h-11 w-11 place-items-center rounded-full text-sky-200 transition hover:-translate-y-0.5 hover:text-white">
                <Bell className="h-4 w-4" />
              </button>
              <button className="soft-card grid h-11 w-11 place-items-center rounded-full text-sky-200 transition hover:-translate-y-0.5 hover:text-white">
                <Settings className="h-4 w-4" />
              </button>
            </div>
          </header>

          <div className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr] xl:grid-cols-[1.05fr_1.25fr_0.95fr]">
            <section className="flex flex-col gap-5">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                {stats.map((stat) => (
                  <article key={stat.label} className="soft-card rounded-[20px] p-4 transition hover:-translate-y-0.5">
                    <div className="mb-3 flex items-center justify-between">
                      <div className="grid h-8 w-8 place-items-center rounded-xl bg-sky-300/10 text-sky-200 ring-1 ring-sky-300/20">
                        <stat.icon className="h-4 w-4" />
                      </div>
                      <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-2 py-1 text-[10px] font-semibold uppercase text-cyan-100">
                        live
                      </span>
                    </div>
                    <p className="text-2xl font-black text-white">{stat.value}</p>
                    <p className="text-xs text-slate-400">{stat.label}</p>
                  </article>
                ))}
              </div>
              <FavoriteStandsPanel stands={favoriteStands} />
            </section>

            <MessagingPanel conversations={conversations} />

            <section className="flex flex-col gap-5 lg:col-span-2 xl:col-span-1">
              <QuickRequestForm stands={favoriteStands} />
              <PortfolioTracker />
            </section>
          </div>
        </div>
      </section>

      <button className="neon-button fixed bottom-5 right-5 grid h-12 w-12 place-items-center rounded-full text-white shadow-violet">
        <Building2 className="h-5 w-5" />
      </button>
    </main>
  );
}