"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CORRIDOR_WIDTH,
  PLAYER_MAX_X,
  BOOTH_WIDTH,
  BOOTH_DEPTH,
  FIRST_STAND_Z,
  LAST_STAND_Z,
  WALKABLE_HALF_Z,
} from "@/features/metaverso/data/stands";
import { useUapaStore } from "@/features/metaverso/store/useUapaStore";
import { isPointerLocked } from "@/features/metaverso/utils/pointerLock";

const MAP_W = 120;
const MAP_H = 130;
const PAD = 10;

function worldToMap(x: number, z: number, zMin: number, zMax: number) {
  const mx = PAD + ((x + PLAYER_MAX_X) / (PLAYER_MAX_X * 2)) * (MAP_W - PAD * 2);
  const mz = PAD + ((z - zMin) / (zMax - zMin)) * (MAP_H - PAD * 2);
  return { mx, mz };
}

export function FairMap() {
  const [hovered, setHovered] = useState(false);
  const [pinned, setPinned] = useState(false);
  const playerPosition = useUapaStore((s) => s.playerPosition);
  const nearbyStand = useUapaStore((s) => s.nearbyStand);
  const isModalOpen = useUapaStore((s) => s.isModalOpen);
  const isAIModalOpen = useUapaStore((s) => s.isAIModalOpen);
  const isTutorialOpen = useUapaStore((s) => s.isTutorialOpen);
  const currentRoomStands = useUapaStore((s) => s.currentRoomStands);
  const currentRoomIndex = useUapaStore((s) => s.currentRoomIndex);
  const roomCount = useUapaStore((s) => s.roomCount);

  const bounds = useMemo(() => {
    const zMin = Math.min(FIRST_STAND_Z, -WALKABLE_HALF_Z) - BOOTH_DEPTH / 2;
    const zMax = Math.max(LAST_STAND_Z, WALKABLE_HALF_Z) + BOOTH_DEPTH / 2;
    return { zMin, zMax };
  }, []);

  const [px, , pz] = playerPosition;
  const player = worldToMap(px, pz, bounds.zMin, bounds.zMax);

  const cursorFree =
    !isModalOpen &&
    !isAIModalOpen &&
    !isTutorialOpen &&
    !isPointerLocked();

  const expanded = pinned || (cursorFree && hovered);
  const displayW = expanded ? 200 : 72;
  const displayH = expanded ? 210 : 78;

  if (isModalOpen || isAIModalOpen || isTutorialOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: 12 }}
      animate={{ opacity: expanded ? 1 : 0.75, x: 0 }}
      className="pointer-events-auto fixed right-3 bottom-20 z-20"
      data-ui-interactive
      onMouseEnter={() => cursorFree && setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => cursorFree && setPinned((p) => !p)}
    >
      <motion.div
        animate={{ width: displayW, height: displayH }}
        transition={{ type: "spring", stiffness: 380, damping: 32 }}
        className="glass-panel relative overflow-hidden rounded-lg border border-[#00d4ff]/15"
      >
        {!expanded && (
          <div className="flex h-full flex-col items-center justify-center gap-1 px-1">
            <span className="text-[9px] font-medium text-[#00d4ff]/70">Mapa</span>
            <svg
              width={56}
              height={48}
              viewBox={`0 0 ${MAP_W} ${MAP_H}`}
              className="opacity-90"
            >
              <rect
                x={PAD}
                y={PAD}
                width={MAP_W - PAD * 2}
                height={MAP_H - PAD * 2}
                fill="#031530"
                stroke="#003366"
                strokeWidth={0.8}
                rx={2}
              />
              {currentRoomStands.map((stand) => {
                const [sx, , sz] = stand.position;
                const halfW = BOOTH_WIDTH / 2;
                const isLeft = stand.side === "left";
                const corner = worldToMap(
                  isLeft ? sx - BOOTH_DEPTH : sx,
                  sz - halfW,
                  bounds.zMin,
                  bounds.zMax
                );
                const opposite = worldToMap(
                  isLeft ? sx : sx + BOOTH_DEPTH,
                  sz + halfW,
                  bounds.zMin,
                  bounds.zMax
                );
                return (
                  <rect
                    key={stand.id}
                    x={Math.min(corner.mx, opposite.mx)}
                    y={Math.min(corner.mz, opposite.mz)}
                    width={Math.max(Math.abs(opposite.mx - corner.mx), 4)}
                    height={Math.max(Math.abs(opposite.mz - corner.mz), 5)}
                    fill={`${stand.color}33`}
                    stroke={stand.color}
                    strokeWidth={0.6}
                    rx={1}
                  />
                );
              })}
              <circle cx={player.mx} cy={player.mz} r={3} fill="#00d4ff" />
            </svg>
            <span className="text-[8px] text-[#e8f4ff]/40">
              {currentRoomIndex + 1}/{roomCount}
            </span>
          </div>
        )}

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex flex-col"
            >
              <div className="border-b border-[#00d4ff]/15 px-2 py-1">
                <p className="text-[9px] font-medium text-[#00d4ff]">
                  Sala {currentRoomIndex + 1}/{roomCount}
                </p>
              </div>
              <svg
                width="100%"
                height="100%"
                viewBox={`0 0 ${MAP_W} ${MAP_H}`}
                className="block flex-1 bg-[#020818]/60"
                preserveAspectRatio="xMidYMid meet"
              >
                <rect
                  x={PAD}
                  y={PAD}
                  width={MAP_W - PAD * 2}
                  height={MAP_H - PAD * 2}
                  fill="#031530"
                  stroke="#003366"
                  strokeWidth={1}
                  rx={3}
                />
                <rect
                  x={
                    worldToMap(-CORRIDOR_WIDTH / 2, 0, bounds.zMin, bounds.zMax).mx
                  }
                  y={PAD}
                  width={
                    worldToMap(CORRIDOR_WIDTH / 2, 0, bounds.zMin, bounds.zMax).mx -
                    worldToMap(-CORRIDOR_WIDTH / 2, 0, bounds.zMin, bounds.zMax).mx
                  }
                  height={MAP_H - PAD * 2}
                  fill="#0a2040"
                  opacity={0.55}
                />
                {currentRoomStands.map((stand) => {
                  const [sx, , sz] = stand.position;
                  const halfW = BOOTH_WIDTH / 2;
                  const isLeft = stand.side === "left";
                  const corner = worldToMap(
                    isLeft ? sx - BOOTH_DEPTH : sx,
                    sz - halfW,
                    bounds.zMin,
                    bounds.zMax
                  );
                  const opposite = worldToMap(
                    isLeft ? sx : sx + BOOTH_DEPTH,
                    sz + halfW,
                    bounds.zMin,
                    bounds.zMax
                  );
                  const isNear = nearbyStand?.id === stand.id;
                  return (
                    <rect
                      key={stand.id}
                      x={Math.min(corner.mx, opposite.mx)}
                      y={Math.min(corner.mz, opposite.mz)}
                      width={Math.max(Math.abs(opposite.mx - corner.mx), 6)}
                      height={Math.max(Math.abs(opposite.mz - corner.mz), 7)}
                      fill={isNear ? `${stand.color}55` : `${stand.color}22`}
                      stroke={stand.color}
                      strokeWidth={isNear ? 1.5 : 0.8}
                      rx={1.5}
                    />
                  );
                })}
                <circle
                  cx={player.mx}
                  cy={player.mz}
                  r={4}
                  fill="#00d4ff"
                  stroke="#fff"
                  strokeWidth={1}
                />
              </svg>
              {nearbyStand && (
                <p className="truncate border-t border-[#00d4ff]/10 px-2 py-1 text-[8px] text-[#00d4ff]/70">
                  {nearbyStand.title}
                </p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
