"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useUapaStore } from "@/features/metaverso/store/useUapaStore";

const PAGE_SIZE = 8;

export function RoomPortal() {
  const isRoomPortalOpen = useUapaStore((s) => s.isRoomPortalOpen);
  const isRoomTransitioning = useUapaStore((s) => s.isRoomTransitioning);
  const isModalOpen = useUapaStore((s) => s.isModalOpen);
  const roomsMeta = useUapaStore((s) => s.roomsMeta);
  const currentRoomIndex = useUapaStore((s) => s.currentRoomIndex);
  const roomCount = useUapaStore((s) => s.roomCount);
  const totalStands = useUapaStore((s) => s.totalStands);
  const goToRoom = useUapaStore((s) => s.goToRoom);
  const setRoomPortalOpen = useUapaStore((s) => s.setRoomPortalOpen);
  const prefetchRoom = useUapaStore((s) => s.prefetchRoom);

  const [page, setPage] = useState(0);

  const pageCount = Math.ceil(roomCount / PAGE_SIZE);

  const visibleRooms = useMemo(() => {
    const start = page * PAGE_SIZE;
    return roomsMeta.slice(start, start + PAGE_SIZE);
  }, [roomsMeta, page]);

  useEffect(() => {
    if (isRoomPortalOpen) {
      const roomPage = Math.floor(currentRoomIndex / PAGE_SIZE);
      setPage(roomPage);
      prefetchRoom(currentRoomIndex + 1);
      prefetchRoom(currentRoomIndex - 1);
    }
  }, [isRoomPortalOpen, currentRoomIndex, prefetchRoom]);

  if (!isRoomPortalOpen || isModalOpen || isRoomTransitioning) return null;

  const handleSelect = (index: number) => {
    if (index !== currentRoomIndex) {
      void goToRoom(index);
    } else {
      setRoomPortalOpen(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="pointer-events-auto fixed inset-0 z-40 flex items-center justify-center bg-[#030014]/75 backdrop-blur-sm"
        onClick={() => setRoomPortalOpen(false)}
      >
        <motion.div
          initial={{ scale: 0.92, y: 24 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.95, y: 12 }}
          transition={{ type: "spring", damping: 22, stiffness: 280 }}
          className="glass-panel mx-4 w-full max-w-2xl rounded-2xl p-6"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="mb-5 flex items-start justify-between gap-4">
            <div>
              <p className="text-[10px] uppercase tracking-widest text-[#00d4ff]/60">
                Navegación entre salas
              </p>
              <h2 className="neon-text text-xl font-bold text-[#00d4ff]">
                Elige tu próxima sala
              </h2>
              <p className="mt-1 text-sm text-[#e8f4ff]/60">
                {roomCount} salas · {totalStands} stands en total
              </p>
            </div>
            <button
              onClick={() => setRoomPortalOpen(false)}
              className="rounded-lg border border-[#e8f4ff]/20 px-3 py-1.5 text-sm text-[#e8f4ff]/70 transition hover:border-[#00d4ff]/40 hover:text-[#00d4ff]"
            >
              ✕
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {visibleRooms.map((room) => {
              const isCurrent = room.index === currentRoomIndex;
              return (
                <button
                  key={room.index}
                  onClick={() => handleSelect(room.index)}
                  onMouseEnter={() => prefetchRoom(room.index)}
                  className={`group relative overflow-hidden rounded-xl border p-4 text-left transition ${
                    isCurrent
                      ? "border-[#00d4ff] bg-[#00d4ff]/15"
                      : "border-[#00d4ff]/20 bg-[#061020]/80 hover:border-[#00d4ff]/50 hover:bg-[#00d4ff]/8"
                  }`}
                >
                  <div
                    className="absolute inset-x-0 top-0 h-1"
                    style={{ backgroundColor: room.color }}
                  />
                  <p className="text-[10px] font-medium text-[#e8f4ff]/50">
                    Sala {room.index + 1}
                  </p>
                  <p className="mt-1 text-xs font-semibold leading-tight text-[#e8f4ff]">
                    {room.name.replace(/^Sala \d+ — /, "")}
                  </p>
                  <p className="mt-2 text-[10px] text-[#e8f4ff]/40">
                    {room.standCount} stands
                  </p>
                  {isCurrent && (
                    <span className="mt-2 inline-block rounded-full bg-[#00d4ff]/20 px-2 py-0.5 text-[9px] text-[#00d4ff]">
                      Estás aquí
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {pageCount > 1 && (
            <div className="mt-5 flex items-center justify-between">
              <button
                onClick={() => setPage((p) => Math.max(0, p - 1))}
                disabled={page === 0}
                className="rounded-lg border border-[#00d4ff]/30 px-4 py-2 text-sm text-[#00d4ff] transition hover:bg-[#00d4ff]/10 disabled:opacity-30"
              >
                ← Anterior
              </button>
              <span className="text-xs text-[#e8f4ff]/50">
                Página {page + 1} / {pageCount}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(pageCount - 1, p + 1))}
                disabled={page >= pageCount - 1}
                className="rounded-lg border border-[#00d4ff]/30 px-4 py-2 text-sm text-[#00d4ff] transition hover:bg-[#00d4ff]/10 disabled:opacity-30"
              >
                Siguiente →
              </button>
            </div>
          )}

          <p className="mt-4 text-center text-[10px] text-[#e8f4ff]/40">
            También puedes abrir este menú con{" "}
            <kbd className="text-[#00d4ff]">M</kbd> en cualquier momento
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
