"use client";

import { motion } from "framer-motion";
import { useUapaStore } from "@/features/metaverso/store/useUapaStore";
import { getRoomLabel } from "@/features/metaverso/data/lobby";

export function LobbyDoorSlider() {
  const isInLobby = useUapaStore((s) => s.isInLobby);
  const isModalOpen = useUapaStore((s) => s.isModalOpen);
  const isAIModalOpen = useUapaStore((s) => s.isAIModalOpen);
  const isTutorialOpen = useUapaStore((s) => s.isTutorialOpen);
  const roomCount = useUapaStore((s) => s.roomCount);
  const lobbyDoorIndex = useUapaStore((s) => s.lobbyDoorIndex);
  const nearbyLobbyRoom = useUapaStore((s) => s.nearbyLobbyRoom);
  const roomsMeta = useUapaStore((s) => s.roomsMeta);
  const lobbyPrevDoor = useUapaStore((s) => s.lobbyPrevDoor);
  const lobbyNextDoor = useUapaStore((s) => s.lobbyNextDoor);

  if (
    !isInLobby ||
    isModalOpen ||
    isAIModalOpen ||
    isTutorialOpen ||
    roomCount <= 1 ||
    nearbyLobbyRoom === null
  ) {
    return null;
  }

  const room = roomsMeta[lobbyDoorIndex];
  const label = room
    ? getRoomLabel(room)
    : `Sala ${lobbyDoorIndex + 1}`;

  return (
    <div
      className="pointer-events-none fixed bottom-6 left-1/2 z-20 -translate-x-1/2"
      data-ui-interactive
    >
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.45 }}
        className="pointer-events-auto"
      >
      <div className="glass-panel flex items-center gap-4 rounded-2xl px-5 py-3">
        <button
          type="button"
          aria-label="Sala anterior"
          onClick={lobbyPrevDoor}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#1292e2]/40 text-lg text-[#1292e2] transition hover:border-[#1292e2]/70 hover:bg-[#1292e2]/10"
        >
          ‹
        </button>

        <div className="min-w-[220px] text-center">
          <p className="text-[10px] uppercase tracking-wider text-[#e8f4ff]/50">
            Sala {lobbyDoorIndex + 1} de {roomCount}
          </p>
          <p className="mt-0.5 text-sm font-semibold text-[#e8f4ff]">{label}</p>
          <p className="mt-1 text-[10px] text-[#e8f4ff]/45">
            Usa ◀ ▶ para explorar · <kbd className="text-[#1292e2]">E</kbd> para
            entrar
          </p>
        </div>

        <button
          type="button"
          aria-label="Sala siguiente"
          onClick={lobbyNextDoor}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#1292e2]/40 text-lg text-[#1292e2] transition hover:border-[#1292e2]/70 hover:bg-[#1292e2]/10"
        >
          ›
        </button>
      </div>
      </motion.div>
    </div>
  );
}
