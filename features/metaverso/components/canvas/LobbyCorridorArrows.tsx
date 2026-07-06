"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import {
  LOBBY_CORRIDOR_END_Z,
  LOBBY_SPAWN_Z,
} from "@/features/metaverso/data/lobby";
import { ENV } from "@/features/metaverso/lib/envTheme";

const ARROW_SPACING = 2.8;
const ARROW_COUNT = Math.floor(
  (LOBBY_SPAWN_Z - LOBBY_CORRIDOR_END_Z - 4) / ARROW_SPACING
);

function FloorArrow({ z, index }: { z: number; index: number }) {
  const glowRef = useRef<THREE.Mesh>(null);
  const chevronRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const phase = state.clock.elapsedTime * 2.2 + index * 0.55;
    const pulse = 0.55 + Math.sin(phase) * 0.35;

    if (glowRef.current) {
      const mat = glowRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = pulse * 0.5;
    }

    if (chevronRef.current) {
      chevronRef.current.position.y = 0.02 + Math.sin(phase) * 0.008;
    }
  });

  const s = 0.38;

  return (
    <group position={[0, 0, z]}>
      <mesh
        ref={glowRef}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0.015, 0]}
      >
        <planeGeometry args={[s * 2.2, s * 1.4]} />
        <meshBasicMaterial
          color={ENV.primary}
          transparent
          opacity={0.35}
          toneMapped={false}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      <group ref={chevronRef} rotation={[-Math.PI / 2, 0, Math.PI]}>
        <mesh position={[0, 0, s * 0.35]}>
          <boxGeometry args={[s * 1.4, 0.04, 0.06]} />
          <meshBasicMaterial color={ENV.primary} toneMapped={false} />
        </mesh>
        <mesh position={[-s * 0.42, 0, -s * 0.12]} rotation={[0, 0, Math.PI / 4]}>
          <boxGeometry args={[s * 0.55, 0.04, 0.06]} />
          <meshBasicMaterial color={ENV.primary} toneMapped={false} />
        </mesh>
        <mesh position={[s * 0.42, 0, -s * 0.12]} rotation={[0, 0, -Math.PI / 4]}>
          <boxGeometry args={[s * 0.55, 0.04, 0.06]} />
          <meshBasicMaterial color={ENV.primary} toneMapped={false} />
        </mesh>
      </group>
    </group>
  );
}

export function LobbyCorridorArrows() {
  const arrows = Array.from({ length: ARROW_COUNT }, (_, i) => {
    const t = (i + 1) / (ARROW_COUNT + 1);
    const z = THREE.MathUtils.lerp(LOBBY_SPAWN_Z - 2, LOBBY_CORRIDOR_END_Z + 3, 1 - t);
    return z;
  });

  return (
    <group>
      {arrows.map((z, i) => (
        <FloorArrow key={i} z={z} index={i} />
      ))}
    </group>
  );
}
