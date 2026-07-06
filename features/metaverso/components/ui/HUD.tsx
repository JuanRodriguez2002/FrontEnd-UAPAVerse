"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useUapaStore } from "@/features/metaverso/store/useUapaStore";
import { useMetaversoSession } from "@/features/metaverso/hooks/useMetaversoSession";
import { isPointerLocked } from "@/features/metaverso/utils/pointerLock";

export function HUD() {
  const router = useRouter();
  const { isLoggedIn, dashboardPath } = useMetaversoSession();
  const nearbyStand = useUapaStore((s) => s.nearbyStand);
  const nearbyHostStand = useUapaStore((s) => s.nearbyHostStand);
  const isAIModalOpen = useUapaStore((s) => s.isAIModalOpen);
  const isTutorialOpen = useUapaStore((s) => s.isTutorialOpen);
  const isTourMode = useUapaStore((s) => s.isTourMode);
  const openAIModal = useUapaStore((s) => s.openAIModal);
  const startTour = useUapaStore((s) => s.startTour);
  const setRoomPortalOpen = useUapaStore((s) => s.setRoomPortalOpen);
  const setTutorialOpen = useUapaStore((s) => s.setTutorialOpen);
  const currentRoomName = useUapaStore((s) => s.currentRoomName);
  const currentRoomIndex = useUapaStore((s) => s.currentRoomIndex);
  const roomCount = useUapaStore((s) => s.roomCount);
  const currentRoomStands = useUapaStore((s) => s.currentRoomStands);
  const isInLobby = useUapaStore((s) => s.isInLobby);
  const nearbyLobbyRoom = useUapaStore((s) => s.nearbyLobbyRoom);
  const roomsMeta = useUapaStore((s) => s.roomsMeta);
  const appPhase = useUapaStore((s) => s.appPhase);

  const [showClickHint, setShowClickHint] = useState(false);
  const [bannerHover, setBannerHover] = useState(false);
  const isModalOpen = useUapaStore((s) => s.isModalOpen);

  const isLobbyReturnOpen = useUapaStore((s) => s.isLobbyReturnOpen);
  const isRoomPortalOpen = useUapaStore((s) => s.isRoomPortalOpen);

  const roomShort = isInLobby
    ? "Lobby UAPAVERSE"
    : currentRoomName.split("—")[0]?.trim() || `Sala ${currentRoomIndex + 1}`;
  const roomTheme = isInLobby
    ? ""
    : currentRoomName.includes("—")
      ? currentRoomName.split("—")[1]?.trim()
      : "";

  const showCrosshair =
    appPhase !== "welcome" &&
    !isModalOpen &&
    !isAIModalOpen &&
    !isTourMode &&
    !isTutorialOpen &&
    !isRoomPortalOpen &&
    !isLobbyReturnOpen;
  const cursorUnlocked = showCrosshair && !isPointerLocked();
  const bannerExpanded = cursorUnlocked && bannerHover;
  const showInteract = nearbyStand && !isModalOpen && !isAIModalOpen;
  const showHostPrompt =
    nearbyHostStand && !isModalOpen && !isAIModalOpen && !isTutorialOpen;

  useEffect(() => {
    if (!showCrosshair) {
      setShowClickHint(false);
      return;
    }

    setShowClickHint(true);
    const timer = window.setTimeout(() => setShowClickHint(false), 4000);
    return () => window.clearTimeout(timer);
  }, [showCrosshair, isTutorialOpen, isModalOpen, isAIModalOpen]);

  useEffect(() => {
    if (!cursorUnlocked) setBannerHover(false);
  }, [cursorUnlocked]);

  return (
    <div className="pointer-events-none fixed inset-0 z-10">
      <div className="absolute top-3 left-1/2 -translate-x-1/2 flex justify-center">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.45 }}
      >
        <motion.div
          layout
          data-ui-interactive
          className={`pointer-events-auto glass-panel overflow-hidden text-center transition-shadow ${
            bannerExpanded ? "rounded-2xl px-6 py-2.5" : "rounded-full px-3.5 py-1"
          }`}
          onMouseEnter={() => cursorUnlocked && setBannerHover(true)}
          onMouseLeave={() => setBannerHover(false)}
        >
          <AnimatePresence mode="wait">
            {bannerExpanded ? (
              <motion.div
                key="full"
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.18 }}
              >
                <h1 className="neon-text text-sm font-bold tracking-widest text-[#00d4ff] sm:text-base">
                  UAPAVERSE
                </h1>
                <p className="text-[10px] text-[#e8f4ff]/65 sm:text-xs">
                  CADESOFT × UAPA — Universidad Abierta para Adultos
                </p>
                {isInLobby ? (
                  <p className="mt-0.5 text-[9px] text-[#00d4ff]/75 sm:text-[10px]">
                    Elige una puerta para entrar a una sala temática
                  </p>
                ) : (
                  roomCount > 0 && (
                    <p className="mt-0.5 text-[9px] text-[#00d4ff]/75 sm:text-[10px]">
                      {roomTheme || currentRoomName} · {currentRoomStands.length}{" "}
                      stands · {currentRoomIndex + 1}/{roomCount}
                    </p>
                  )
                )}
              </motion.div>
            ) : (
              <motion.p
                key="short"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-[11px] font-medium text-[#00d4ff] sm:text-xs"
              >
                {roomShort}
                {!isInLobby && roomCount > 1 && (
                  <span className="ml-1 text-[#e8f4ff]/40">
                    {currentRoomIndex + 1}/{roomCount}
                  </span>
                )}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
      </div>

      {!isModalOpen && !isTourMode && !isTutorialOpen && appPhase !== "welcome" && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8 }}
          className="pointer-events-auto absolute top-4 right-4 flex gap-2"
        >
          <button
            onClick={() => setTutorialOpen(true)}
            className="glass-panel flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm text-[#e8f4ff]/80 transition hover:border-[#00d4ff]/60 hover:text-[#00d4ff]"
            data-ui-interactive
          >
            ?
          </button>
          {!isInLobby && roomCount > 1 && (
            <button
              onClick={() => setRoomPortalOpen(true, true)}
              className="glass-panel flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium text-[#e8f4ff] transition hover:border-[#00d4ff]/60 hover:bg-[#00d4ff]/10"
              data-ui-interactive
            >
              <span className="text-base">◎</span>
              Salas
            </button>
          )}
          {!isInLobby && (
            <button
              onClick={() => startTour()}
              className="glass-panel flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium text-[#00d4ff] transition hover:border-[#00d4ff]/60 hover:bg-[#00d4ff]/10"
              data-ui-interactive
            >
              <span className="text-base">▶</span>
              Tour guiado
            </button>
          )}
          {isLoggedIn && dashboardPath && (
            <button
              onClick={() => router.push(dashboardPath)}
              className="glass-panel flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium text-[#e8f4ff] transition hover:border-[#00d4ff]/60 hover:bg-[#00d4ff]/10"
              data-ui-interactive
            >
              <span className="text-base">←</span>
              Volver al dashboard
            </button>
          )}
        </motion.div>
      )}

      <AnimatePresence>
        {showCrosshair && showClickHint && !isPointerLocked() && (
          <div className="pointer-events-none absolute top-14 left-1/2 -translate-x-1/2">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="rounded-full border border-[#00d4ff]/25 bg-[#030014]/70 px-4 py-1.5 text-[11px] text-[#e8f4ff]/60">
              Clic en el área 3D para seguir mirando · Esc para soltar el cursor
            </div>
          </motion.div>
          </div>
        )}
      </AnimatePresence>

      {showCrosshair && (
        <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="h-4 w-4 rounded-full border border-[#00d4ff]/50" />
          <div className="absolute top-1/2 left-1/2 h-px w-2 -translate-x-1/2 -translate-y-1/2 bg-[#00d4ff]/40" />
          <div className="absolute top-1/2 left-1/2 h-2 w-px -translate-x-1/2 -translate-y-1/2 bg-[#00d4ff]/40" />
        </div>
      )}

      {showHostPrompt && (
        <div className="pointer-events-none absolute bottom-44 left-1/2 -translate-x-1/2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="pointer-events-auto"
        >
          <button
            onClick={() => openAIModal(nearbyHostStand)}
            className="glass-panel flex max-w-sm items-center gap-3 rounded-xl px-5 py-3 text-left transition hover:border-[#00d4ff]/50"
            data-ui-interactive
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#7b68ee]/25 text-base">
              🤖
            </span>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-[#e8f4ff]/50">
                Asistente del stand
              </p>
              <p className="text-sm text-[#e8f4ff]">
                ¿Qué quieres saber sobre{" "}
                <span className="font-semibold text-[#00d4ff]">
                  {nearbyHostStand.title}
                </span>
                ?
              </p>
              <p className="mt-0.5 text-[10px] text-[#e8f4ff]/45">
                Pulsa <kbd className="text-[#00d4ff]">T</kbd> o haz clic aquí
              </p>
            </div>
          </button>
        </motion.div>
        </div>
      )}

      {isInLobby && nearbyLobbyRoom !== null && (
        <div className="pointer-events-none absolute bottom-36 left-1/2 -translate-x-1/2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="glass-panel flex items-center gap-3 rounded-xl px-5 py-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#00d4ff]/20 text-sm font-bold text-[#00d4ff]">
              E
            </span>
            <div className="text-left">
              <p className="text-[10px] uppercase tracking-wider text-[#e8f4ff]/50">
                Entrar a la sala
              </p>
              <p className="text-sm font-semibold text-[#e8f4ff]">
                {roomsMeta[nearbyLobbyRoom]?.name.split("—")[1]?.trim() ||
                  roomsMeta[nearbyLobbyRoom]?.name ||
                  `Sala ${nearbyLobbyRoom + 1}`}
              </p>
            </div>
          </div>
        </motion.div>
        </div>
      )}

      {showInteract && !isInLobby && (
        <div className="pointer-events-none absolute bottom-28 left-1/2 -translate-x-1/2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="glass-panel flex items-center gap-3 rounded-xl px-5 py-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#00d4ff]/20 text-sm font-bold text-[#00d4ff]">
              E
            </span>
            <div className="text-left">
              <p className="text-[10px] uppercase tracking-wider text-[#e8f4ff]/50">
                {isTourMode ? "Abrir detalle" : "Entrar / Explorar"}
              </p>
              <p className="text-sm font-semibold text-[#e8f4ff]">
                {nearbyStand.title}
              </p>
            </div>
          </div>
        </motion.div>
        </div>
      )}

      {!isModalOpen && !isTourMode && !isTutorialOpen && appPhase !== "welcome" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="pointer-events-none absolute bottom-3 left-3"
        >
          <div className="rounded-md border border-[#00d4ff]/10 bg-[#030014]/50 px-2.5 py-1.5 text-[10px] text-[#e8f4ff]/45">
            {isInLobby ? (
              <>
                <kbd className="text-[#00d4ff]/80">◀ ▶</kbd> salas ·{" "}
                <kbd className="text-[#00d4ff]/80">E</kbd> entrar ·{" "}
                <kbd className="text-[#00d4ff]/80">Esc</kbd>
              </>
            ) : (
              <>
                <kbd className="text-[#00d4ff]/80">WASD</kbd> ·{" "}
                <kbd className="text-[#00d4ff]/80">E</kbd> ·{" "}
                <kbd className="text-[#00d4ff]/80">T</kbd> ·{" "}
                <kbd className="text-[#00d4ff]/80">M</kbd> ·{" "}
                <kbd className="text-[#00d4ff]/80">Esc</kbd>
              </>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
}
