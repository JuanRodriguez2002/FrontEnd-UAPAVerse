"use client";

import { motion } from "framer-motion";
import { useUapaStore } from "@/features/metaverso/store/useUapaStore";

export function TourControls() {
  const isTourMode = useUapaStore((s) => s.isTourMode);
  const isModalOpen = useUapaStore((s) => s.isModalOpen);
  const tourIndex = useUapaStore((s) => s.tourIndex);
  const currentRoomStands = useUapaStore((s) => s.currentRoomStands);
  const currentRoomName = useUapaStore((s) => s.currentRoomName);
  const nextTourStand = useUapaStore((s) => s.nextTourStand);
  const prevTourStand = useUapaStore((s) => s.prevTourStand);
  const stopTour = useUapaStore((s) => s.stopTour);

  if (!isTourMode || isModalOpen) return null;

  const stand = currentRoomStands[tourIndex];
  if (!stand) return null;

  return (
    <div className="pointer-events-none fixed bottom-6 left-1/2 z-20 -translate-x-1/2">
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="pointer-events-auto"
      >
      <div className="glass-panel flex items-center gap-4 rounded-2xl px-5 py-3">
        <button
          onClick={prevTourStand}
          disabled={tourIndex === 0}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#00d4ff]/30 text-[#00d4ff] transition hover:bg-[#00d4ff]/10 disabled:opacity-30"
        >
          ‹
        </button>

        <div className="min-w-[200px] text-center">
          <p className="text-[10px] uppercase tracking-wider text-[#e8f4ff]/50">
            {currentRoomName} · Parada {tourIndex + 1} / {currentRoomStands.length}
          </p>
          <p className="text-xs text-[#00d4ff]/70">{stand.career}</p>
          <p className="text-sm font-semibold text-[#e8f4ff]">{stand.title}</p>
        </div>

        <button
          onClick={nextTourStand}
          disabled={tourIndex === currentRoomStands.length - 1}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#00d4ff]/30 text-[#00d4ff] transition hover:bg-[#00d4ff]/10 disabled:opacity-30"
        >
          ›
        </button>

        <div className="h-8 w-px bg-[#00d4ff]/20" />

        <button
          onClick={stopTour}
          className="rounded-lg border border-[#e8f4ff]/20 px-4 py-1.5 text-xs text-[#e8f4ff]/70 transition hover:border-[#00d4ff]/40 hover:text-[#00d4ff]"
        >
          Salir
        </button>
      </div>
      </motion.div>
    </div>
  );
}
