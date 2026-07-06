"use client";

import { motion } from "framer-motion";
import { useUapaStore } from "@/features/metaverso/store/useUapaStore";

export function LoadingScreen() {
  const isLoading = useUapaStore((s) => s.isLoading);
  const standsInitialized = useUapaStore((s) => s.standsInitialized);
  const appPhase = useUapaStore((s) => s.appPhase);
  const catalogLoaded = useUapaStore((s) => s.catalogLoaded);

  if (appPhase === "welcome" && catalogLoaded) return null;
  if (!isLoading && standsInitialized && appPhase !== "welcome") return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#030014]"
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        className="mb-6 h-16 w-16 rounded-full border-2 border-[#00d4ff]/20 border-t-[#00d4ff]"
      />
      <h2 className="neon-text mb-2 text-2xl font-bold text-[#00d4ff]">
        UAPAVERSE
      </h2>
      <p className="text-sm text-[#e8f4ff]/50">
        {appPhase === "welcome"
          ? "Preparando UAPAVERSE..."
          : "Cargando salas y stands..."}
      </p>
    </motion.div>
  );
}
