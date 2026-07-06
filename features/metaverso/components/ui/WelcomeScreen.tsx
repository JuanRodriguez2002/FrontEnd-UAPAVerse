"use client";

import { motion } from "framer-motion";
import { useUapaStore } from "@/features/metaverso/store/useUapaStore";

export function WelcomeScreen() {
  const appPhase = useUapaStore((s) => s.appPhase);
  const enterLobby = useUapaStore((s) => s.enterLobby);
  const isLoading = useUapaStore((s) => s.isLoading);
  const catalogLoaded = useUapaStore((s) => s.catalogLoaded);

  if (appPhase !== "welcome") return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-[#030014]/95 p-6 backdrop-blur-md"
    >
      <div className="glass-panel max-w-lg rounded-2xl px-8 py-10 text-center">
        <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-2xl border border-[#00d4ff]/40 bg-[#061020] shadow-[0_0_40px_rgba(0,212,255,0.15)]">
          <svg viewBox="0 0 64 64" className="h-14 w-14" aria-hidden>
            <circle cx="32" cy="32" r="28" fill="none" stroke="#00d4ff" strokeWidth="2" />
            <path
              d="M20 38 L32 18 L44 38 Z"
              fill="none"
              stroke="#7b68ee"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <circle cx="32" cy="34" r="4" fill="#00d4ff" />
          </svg>
        </div>

        <h1 className="neon-text mb-2 text-3xl font-bold tracking-wide text-[#00d4ff]">
          UAPAVERSE
        </h1>
        <p className="mb-1 text-sm font-medium text-[#e8f4ff]/80">
          Metaverso de la Feria Tecnológica UAPA
        </p>

        <p className="mx-auto mb-8 mt-5 max-w-md text-sm leading-relaxed text-[#e8f4ff]/65">
          Un espacio virtual donde puedes recorrer salas temáticas, visitar stands de
          proyectos universitarios, ver videos, probar demos y conversar con asistentes
          de inteligencia artificial. Ideal para conocer la innovación de la UAPA de
          forma inmersiva.
        </p>

        <button
          type="button"
          disabled={!catalogLoaded || isLoading}
          onClick={() => void enterLobby()}
          className="w-full cursor-pointer rounded-xl border border-[#00d4ff]/50 bg-[#00d4ff]/15 py-3.5 text-sm font-bold uppercase tracking-wider text-[#00d4ff] transition hover:bg-[#00d4ff]/25 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {isLoading || !catalogLoaded ? "Preparando entorno..." : "Iniciar UAPAVERSE"}
        </button>
      </div>
    </motion.div>
  );
}
