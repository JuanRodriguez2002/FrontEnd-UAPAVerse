"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";
import {
  LOBBY_CORRIDOR_CENTER_Z,
  LOBBY_CORRIDOR_END_Z,
  LOBBY_CORRIDOR_HALF_W,
  LOBBY_CORRIDOR_LENGTH,
  LOBBY_DOOR_OPENING_HALF,
  LOBBY_SPAWN_Z,
} from "@/features/metaverso/data/lobby";
import { ENV } from "@/features/metaverso/lib/envTheme";
import { LobbyCorridorArrows } from "./LobbyCorridorArrows";

export function LobbyHall() {
  const hw = LOBBY_CORRIDOR_HALF_W;
  const len = LOBBY_CORRIDOR_LENGTH;
  const endZ = LOBBY_CORRIDOR_END_Z;
  const openHalf = LOBBY_DOOR_OPENING_HALF;
  const sideSegW = hw - openHalf;
  const sideSegX = openHalf + sideSegW / 2;

  const entranceGlowRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!entranceGlowRef.current) return;
    const mat = entranceGlowRef.current.material as THREE.MeshBasicMaterial;
    mat.opacity = 0.35 + Math.sin(state.clock.elapsedTime * 1.8) * 0.12;
  });

  return (
    <group>
      {/* Suelo */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, LOBBY_CORRIDOR_CENTER_Z]}>
        <planeGeometry args={[hw * 2 + 0.4, len + 4]} />
        <meshBasicMaterial color={ENV.neutralFloor} />
      </mesh>

      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0.008, LOBBY_CORRIDOR_CENTER_Z]}
      >
        <planeGeometry args={[1.1, len - 2]} />
        <meshBasicMaterial color={ENV.neutralLight} transparent opacity={0.45} />
      </mesh>

      <LobbyCorridorArrows />

      {/* Paredes laterales */}
      {[-1, 1].map((side) => (
        <mesh
          key={side}
          position={[side * hw, 2.85, LOBBY_CORRIDOR_CENTER_Z]}
        >
          <boxGeometry args={[0.22, 5.7, len + 2]} />
          <meshBasicMaterial color={ENV.neutral} />
        </mesh>
      ))}

      {/* Líneas neón en el techo del pasillo */}
      {[-1, 1].map((side) => (
        <mesh
          key={`trim-${side}`}
          position={[side * (hw - 0.15), 5.35, LOBBY_CORRIDOR_CENTER_Z]}
        >
          <boxGeometry args={[0.03, 0.03, len - 4]} />
          <meshBasicMaterial
            color={side < 0 ? ENV.primary : ENV.secondary}
            toneMapped={false}
          />
        </mesh>
      ))}

      {/* Techo */}
      <mesh position={[0, 5.55, LOBBY_CORRIDOR_CENTER_Z]}>
        <boxGeometry args={[hw * 2 + 0.5, 0.18, len + 2]} />
        <meshBasicMaterial color={ENV.neutral} />
      </mesh>

      {/* Muro de entrada (spawn) */}
      <mesh position={[0, 2.85, LOBBY_SPAWN_Z + 1.2]}>
        <boxGeometry args={[hw * 2 + 0.5, 5.7, 0.22]} />
        <meshBasicMaterial color={ENV.neutral} />
      </mesh>
      <mesh ref={entranceGlowRef} position={[0, 3.6, LOBBY_SPAWN_Z + 1.05]}>
        <planeGeometry args={[hw * 1.6, 0.9]} />
        <meshBasicMaterial
          color={ENV.primary}
          transparent
          opacity={0.4}
          toneMapped={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      <Text
        position={[0, 3.65, LOBBY_SPAWN_Z + 1.02]}
        font={ENV.fontHeadline}
        fontSize={0.22}
        color={ENV.tertiary}
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.015}
        outlineColor={ENV.primary}
        material-toneMapped={false}
      >
        LOBBY UAPAVERSE
      </Text>
      <Text
        position={[0, 3.25, LOBBY_SPAWN_Z + 1.02]}
        font={ENV.fontBody}
        fontSize={0.08}
        color="#c8d8f0"
        anchorX="center"
        anchorY="middle"
        material-toneMapped={false}
      >
        Sigue las flechas hacia las salas
      </Text>

      {/* Muro final — solo abertura central para una puerta */}
      <mesh position={[-sideSegX, 2.85, endZ - 0.12]}>
        <boxGeometry args={[sideSegW * 2, 5.7, 0.28]} />
        <meshBasicMaterial color={ENV.neutral} />
      </mesh>
      <mesh position={[sideSegX, 2.85, endZ - 0.12]}>
        <boxGeometry args={[sideSegW * 2, 5.7, 0.28]} />
        <meshBasicMaterial color={ENV.neutral} />
      </mesh>
      <mesh position={[0, 4.75, endZ - 0.12]}>
        <boxGeometry args={[openHalf * 2 + 0.1, 1.15, 0.28]} />
        <meshBasicMaterial color={ENV.neutral} />
      </mesh>
    </group>
  );
}
