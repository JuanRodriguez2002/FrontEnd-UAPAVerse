"use client";

import { Text } from "@react-three/drei";
import { getRoomBannerLabels, PLAYER_MAX_X } from "@/features/metaverso/data/stands";
import { ENV } from "@/features/metaverso/lib/envTheme";
import { useUapaStore } from "@/features/metaverso/store/useUapaStore";

const BANNER_Y = 4.35;
const PILLAR_H = 5.2;
const BEAM_H = 0.78;
const BEAM_D = 0.32;

export function RoomEntranceBanner() {
  const currentRoomName = useUapaStore((s) => s.currentRoomName);
  const currentRoomColor = useUapaStore((s) => s.currentRoomColor);
  const currentRoomIndex = useUapaStore((s) => s.currentRoomIndex);
  const entranceBannerZ = useUapaStore((s) => s.entranceBannerZ);
  const standsInitialized = useUapaStore((s) => s.standsInitialized);
  const isInLobby = useUapaStore((s) => s.isInLobby);

  if (
    !standsInitialized ||
    isInLobby ||
    currentRoomIndex < 0 ||
    entranceBannerZ === null
  ) {
    return null;
  }

  const halfW = PLAYER_MAX_X + 1;
  const { salaLabel, title } = getRoomBannerLabels(
    currentRoomName,
    currentRoomIndex
  );

  return (
    <group position={[0, 0, entranceBannerZ]}>
      {[-1, 1].map((side) => (
        <mesh key={side} position={[side * halfW, PILLAR_H / 2, 0]}>
          <boxGeometry args={[0.38, PILLAR_H, 0.38]} />
          <meshBasicMaterial color="#080c18" />
        </mesh>
      ))}

      <mesh position={[0, BANNER_Y, 0]}>
        <boxGeometry args={[halfW * 2, BEAM_H, BEAM_D]} />
        <meshBasicMaterial color={currentRoomColor} toneMapped={false} />
      </mesh>

      <mesh position={[0, BANNER_Y - BEAM_H / 2 + 0.03, BEAM_D / 2 + 0.01]}>
        <boxGeometry args={[halfW * 2 - 0.2, 0.06, 0.04]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.22} />
      </mesh>

      <mesh position={[0, BANNER_Y + BEAM_H / 2 - 0.03, BEAM_D / 2 + 0.01]}>
        <boxGeometry args={[halfW * 2 - 0.2, 0.04, 0.03]} />
        <meshBasicMaterial
          color={ENV.tertiary}
          transparent
          opacity={0.35}
          toneMapped={false}
        />
      </mesh>

      <Text
        position={[-halfW + 1.35, BANNER_Y + 0.08, BEAM_D / 2 + 0.02]}
        font={ENV.fontLabel}
        fontSize={0.11}
        color={ENV.tertiary}
        anchorX="left"
        anchorY="middle"
        letterSpacing={0.04}
        material-toneMapped={false}
      >
        {salaLabel}
      </Text>

      <Text
        position={[0, BANNER_Y - 0.02, BEAM_D / 2 + 0.02]}
        font={ENV.fontHeadline}
        fontSize={0.19}
        color={ENV.tertiary}
        anchorX="center"
        anchorY="middle"
        maxWidth={halfW * 1.55}
        textAlign="center"
        letterSpacing={0.02}
        material-toneMapped={false}
      >
        {title}
      </Text>
    </group>
  );
}
