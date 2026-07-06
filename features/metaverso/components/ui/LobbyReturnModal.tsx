"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useUapaStore } from "@/features/metaverso/store/useUapaStore";

export function LobbyReturnModal() {
  const isLobbyReturnOpen = useUapaStore((s) => s.isLobbyReturnOpen);
  const isRoomTransitioning = useUapaStore((s) => s.isRoomTransitioning);
  const isModalOpen = useUapaStore((s) => s.isModalOpen);
  const isAIModalOpen = useUapaStore((s) => s.isAIModalOpen);
  const setLobbyReturnOpen = useUapaStore((s) => s.setLobbyReturnOpen);
  const returnToLobby = useUapaStore((s) => s.returnToLobby);

  if (
    !isLobbyReturnOpen ||
    isModalOpen ||
    isAIModalOpen ||
    isRoomTransitioning
  ) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="pointer-events-auto fixed inset-0 z-40 flex items-center justify-center bg-[#030014]/75 backdrop-blur-sm"
        onClick={() => setLobbyReturnOpen(false)}
      >
        <motion.div
          initial={{ scale: 0.92, y: 24 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.95, y: 12 }}
          transition={{ type: "spring", damping: 22, stiffness: 280 }}
          className="glass-panel mx-4 w-full max-w-md rounded-2xl p-6"
          onClick={(e) => e.stopPropagation()}
        >
          <p className="text-[10px] uppercase tracking-widest text-[#1292e2]/70">
            Salir de la sala
          </p>
          <h2 className="neon-text mt-1 text-xl font-bold text-[#1292e2]">
            ¿Volver al lobby?
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[#e8f4ff]/70">
            Regresarás al lobby de UAPAVERSE para elegir otra sala temática.
          </p>

          <div className="mt-6 flex gap-3">
            <button
              type="button"
              onClick={() => setLobbyReturnOpen(false)}
              className="flex-1 rounded-xl border border-[#e8f4ff]/20 py-3 text-sm text-[#e8f4ff]/75 transition hover:border-[#e8f4ff]/40"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={() => void returnToLobby()}
              className="flex-1 rounded-xl border border-[#1292e2]/50 bg-[#1292e2]/15 py-3 text-sm font-semibold text-[#1292e2] transition hover:bg-[#1292e2]/25"
            >
              Sí, volver al lobby
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
