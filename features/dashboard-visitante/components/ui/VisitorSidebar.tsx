"use client";

import { Inbox, LogOut, Settings, Sparkles, Store, X } from "lucide-react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";

// esto define los tipos de secciones que puede tener el sidebar del visitante y mapea cada sección a su ruta correspondiente. Esto permite una navegación más fácil y organizada dentro del dashboard del visitante.
export type VisitorSection =
  | "Inicio"
  | "mis-intereses"
  | "mensajes"
  | "configuracion";

  // direcciones de las secciones del sidebar del visitante
  export const SECTION_TO_PATH: Record<VisitorSection, string> = {
    "Inicio":    "/dashboard-visitante",
    "mis-intereses": "/dashboard-visitante/intereses",
    "mensajes": "/dashboard-visitante/mensajes",
    "configuracion": "/dashboard-visitante/configuracion",
    
  };

  const PATH_TO_SECTION: Record<string, VisitorSection> = Object.fromEntries(
    Object.entries(SECTION_TO_PATH).map(([k, v]) => [v, k as VisitorSection])
  );

  // etiquetas y metadatos para cada sección del sidebar del visitante, incluyendo un título, una descripción y un subtítulo.
  const NAV: { id: VisitorSection; label: string; Icon: typeof Store }[] = [
  { id: "Inicio",    label: "Inicio",   Icon: Store },
  { id: "mis-intereses",      label: "Mis Intereses",   Icon: Sparkles },
  { id: "mensajes",      label: "Mensajes",      Icon: Inbox },
  { id: "configuracion", label: "Settings",      Icon: Settings },
];

type VisitorSidebarProps = {
  open: boolean;
  onClose: () => void;
};


export function VisitorSidebar({ open, onClose }: VisitorSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const active = PATH_TO_SECTION[pathname] ?? "Inicio";

  function navigate(id: VisitorSection) {
    router.push(SECTION_TO_PATH[id]);
    onClose();
  }
   return (
    <>
      {open && (
        <button
          aria-label="Cerrar menú"
          className="fixed inset-0 z-30 bg-[#000837]/80 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-white/10 bg-[#000837]/95 px-4 py-5 backdrop-blur-2xl transition-transform duration-300 lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-14 items-center justify-between px-2">
          <div className="flex items-center gap-3">
            <div className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl border border-primary/30 bg-primary/10 shadow-primary-glow">
              <Image
                src="/images/logo-uapaverse.PNG"
                alt="UAPAVerse logo"
                width={80}
                height={80}
                className="h-full w-full object-contain p-1"
                priority
              />
            </div>
            <div>
              <p className="font-sora text-sm font-extrabold tracking-[0.18em] text-neon-white">Exhibitor</p>
              <p className="font-space text-[10px] uppercase tracking-[0.24em] text-primary/70">Hub</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-primary/70 hover:bg-white/5 hover:text-white lg:hidden"
            aria-label="Cerrar sidebar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="my-5 h-px bg-gradient-to-r from-transparent via-primary/25 to-transparent" />

        <p className="mb-3 px-3 font-space text-[10px] font-bold uppercase tracking-[0.22em] text-outline">
          Navegación
        </p>

        <nav className="space-y-1.5">
          {NAV.map(({ id, label, Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => navigate(id)}
              className={`group relative flex w-full items-center gap-3 overflow-hidden rounded-xl px-3 py-3 text-left text-sm font-semibold transition-all ${
                active === id
                  ? "border border-primary/25 bg-gradient-to-r from-primary/20 to-secondary/10 text-neon-white shadow-primary-glow"
                  : "border border-transparent text-[#9ca9c6] hover:border-white/10 hover:bg-white/5 hover:text-neon-white"
              }`}
            >
              {active === id && (
                <span className="absolute inset-y-2 left-0 w-0.5 rounded-full bg-primary shadow-[0_0_10px_rgba(152,203,255,0.9)]" />
              )}
              <Icon className={`h-4 w-4 ${active === id ? "text-primary" : "text-[#7180a5] group-hover:text-primary"}`} />
              {label}
              {active === id && (
                <span className="ml-auto h-1.5 w-1.5 rounded-full bg-primary shadow-primary-glow" />
              )}
            </button>
          ))}
        </nav>

        <div className="mt-auto">
          <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-[#9ca9c6] transition hover:bg-error/10 hover:text-error">
            <LogOut className="h-4 w-4" />
            Cerrar sesión
          </button>
        </div>
      </aside>
    </>
  );
}

