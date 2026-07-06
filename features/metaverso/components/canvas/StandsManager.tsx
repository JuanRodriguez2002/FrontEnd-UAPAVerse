"use client";

import { useMemo } from "react";
import { getStandDistance } from "@/features/metaverso/data/stands";
import { useUapaStore } from "@/features/metaverso/store/useUapaStore";
import { Stand } from "./Stand";

/** Solo culling por distancia — sin degradar calidad visual (siempre Stand completo) */
const RENDER_DIST = 55;

export function StandsManager() {
  const playerPosition = useUapaStore((s) => s.playerPosition);
  const currentRoomStands = useUapaStore((s) => s.currentRoomStands);
  const isRoomTransitioning = useUapaStore((s) => s.isRoomTransitioning);
  const [px, , pz] = playerPosition;

  const visible = useMemo(() => {
    if (isRoomTransitioning) return [];
    return currentRoomStands
      .filter((stand) => getStandDistance(px, pz, stand) < RENDER_DIST)
      .sort(
        (a, b) =>
          getStandDistance(px, pz, a) - getStandDistance(px, pz, b)
      );
  }, [px, pz, currentRoomStands, isRoomTransitioning]);

  return (
    <>
      {visible.map((stand) => (
        <Stand key={stand.id} stand={stand} />
      ))}
    </>
  );
}
