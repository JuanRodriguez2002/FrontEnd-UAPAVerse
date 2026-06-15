"use client";

import { usePathname } from "next/navigation";
import { Bell, Menu, Sparkles } from "lucide-react";
import type { PresenterSection } from "@/features/dashboard-presentador/components/ui/PresenterSidebar";
import { SECTION_TO_PATH } from "@/features/dashboard-presentador/components/ui/PresenterSidebar";
import { useRealtimeNotifications } from "@/features/dashboard-presentador/components/hooks/useRealtimeNotifications";

const PATH_TO_SECTION: Record<string, PresenterSection> = Object.fromEntries(
  Object.entries(SECTION_TO_PATH).map(([k, v]) => [v, k as PresenterSection])
);

const SECTION_META: Record<PresenterSection, { eyebrow: string; title: string; description: string }> = {
  "mi-stand": {
    eyebrow: "Portal Expositor",
    title: "Publicar Stand Virtual",
    description: "Configura y despliega tu presencia en UAPA VERSE.",
  },
  "mis-stands": {
    eyebrow: "Portal Expositor",
    title: "Mis Stands",
    description: "Gestiona todos tus stands virtuales: crea, edita o elimina cada uno.",
  },
  estadisticas: {
    eyebrow: "Portal Expositor",
    title: "Estadísticas",
    description: "Métricas detalladas del rendimiento de tu stand.",
  },
  propuestas: {
    eyebrow: "Portal Expositor",
    title: "Propuestas",
    description: "Responde a las empresas interesadas en tu stand.",
  },
  mensajes: {
    eyebrow: "Portal Expositor",
    title: "Mensajes",
    description: "Comunícate con las empresas interesadas en tu proyecto.",
  },
  configuracion: {
    eyebrow: "Portal Expositor",
    title: "Configuration Central",
    description: "Manage your exhibitor presence, secure your terminal access, and fine-tune your neural notifications.",
  },
};

type PresenterHeaderProps = {
  onOpenMenu: () => void;
  presenterName: string;
};

export function PresenterHeader({ onOpenMenu, presenterName }: PresenterHeaderProps) {
  const pathname = usePathname();
  const section = PATH_TO_SECTION[pathname] ?? "mis-stands";
  const meta = SECTION_META[section];
  const { unreadCount, markAllRead } = useRealtimeNotifications();

  const initials = presenterName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <header className="flex flex-col gap-5 border-b border-white/10 px-5 py-5 sm:px-7 lg:flex-row lg:items-center lg:justify-between lg:px-10">
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMenu}
          className="rounded-xl border border-white/10 bg-white/5 p-2.5 text-primary lg:hidden"
          aria-label="Abrir menú"
        >
          <Menu className="h-5 w-5" />
        </button>
        <div>
          <div className="mb-1 flex items-center gap-2">
            <Sparkles className="h-3.5 w-3.5 text-secondary" />
            <span className="font-space text-[10px] font-bold uppercase tracking-[0.24em] text-secondary/80">
              {meta.eyebrow}
            </span>
          </div>
          <h1 className="font-sora text-2xl font-extrabold tracking-tight text-neon-white sm:text-3xl">
            {meta.title}
          </h1>
          <p className="mt-1 text-xs text-[#8f9bb8] sm:text-sm">{meta.description}</p>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        <button
          onClick={markAllRead}
          className="relative rounded-xl border border-white/10 bg-white/5 p-2.5 text-[#adbad5] transition hover:border-primary/30 hover:text-primary"
          aria-label="Notificaciones"
        >
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-secondary font-space text-[9px] font-bold text-[#000837] shadow-[0_0_8px_rgba(230,180,255,0.9)]">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </button>
        <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 py-1.5 pl-1.5 pr-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary-container to-secondary-container font-space text-xs font-bold text-white shadow-primary-glow">
            {initials}
          </div>
          <div className="hidden sm:block">
            <p className="text-xs font-bold text-neon-white">{presenterName}</p>
            <p className="font-space text-[9px] uppercase tracking-wider text-primary/60">Presentador</p>
          </div>
        </div>
      </div>
    </header>
  );
}
