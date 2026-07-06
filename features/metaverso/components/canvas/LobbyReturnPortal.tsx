"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useUapaStore } from "@/features/metaverso/store/useUapaStore";
import { ENV } from "@/features/metaverso/lib/envTheme";
import { CorridorDoubleDoor } from "./CorridorDoubleDoor";

const OPEN_START = 6.5;
const OPEN_END = 1.4;

export function LobbyReturnPortal() {
  const openRef = useRef(0);

  const lobbyReturnPortalZ = useUapaStore((s) => s.lobbyReturnPortalZ);
  const currentRoomColor = useUapaStore((s) => s.currentRoomColor);
  const standsInitialized = useUapaStore((s) => s.standsInitialized);
  const isInLobby = useUapaStore((s) => s.isInLobby);
  const setLobbyReturnOpen = useUapaStore((s) => s.setLobbyReturnOpen);

  useFrame((_, dt) => {
    if (!standsInitialized || isInLobby) return;

    const [, , pz] = useUapaStore.getState().playerPosition;
    const portalZ = useUapaStore.getState().lobbyReturnPortalZ;
    const isOpen = useUapaStore.getState().isLobbyReturnOpen;
    const dist = portalZ - pz;
    const proximity = THREE.MathUtils.clamp(
      1 - (dist - OPEN_END) / (OPEN_START - OPEN_END),
      0,
      1
    );
    const target = isOpen ? 1 : proximity;
    openRef.current = THREE.MathUtils.lerp(openRef.current, target, dt * 5);
  });

  if (!standsInitialized || isInLobby) return null;

  const color = currentRoomColor || ENV.primary;

  return (
    <group position={[0, 0, lobbyReturnPortalZ]} rotation={[0, Math.PI, 0]}>
      <CorridorDoubleDoor
        color={color}
        title="LOBBY"
        subtitle="Acércate — vuelve al lobby de UAPAVERSE"
        openAmountRef={openRef}
        onClick={(e) => {
          e.stopPropagation();
          setLobbyReturnOpen(true, true);
        }}
      />
    </group>
  );
}
