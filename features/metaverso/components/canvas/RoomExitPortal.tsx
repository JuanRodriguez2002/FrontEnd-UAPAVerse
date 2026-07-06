"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";
import { CORRIDOR_WIDTH } from "@/features/metaverso/data/stands";
import { useUapaStore } from "@/features/metaverso/store/useUapaStore";

const DOOR_W = CORRIDOR_WIDTH + 0.5;
const DOOR_H = 3.45;
const PANEL_W = DOOR_W / 2 - 0.08;
const FRAME_T = 0.18;
const OPEN_ANGLE = Math.PI / 2.15;
const OPEN_START = 6.5;
const OPEN_END = 1.4;

export function RoomExitPortal() {
  const leftDoorRef = useRef<THREE.Group>(null);
  const rightDoorRef = useRef<THREE.Group>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const openRef = useRef(0);

  const roomCount = useUapaStore((s) => s.roomCount);
  const exitPortalZ = useUapaStore((s) => s.exitPortalZ);
  const currentRoomColor = useUapaStore((s) => s.currentRoomColor);
  const standsInitialized = useUapaStore((s) => s.standsInitialized);
  const playerPosition = useUapaStore((s) => s.playerPosition);
  const isRoomPortalOpen = useUapaStore((s) => s.isRoomPortalOpen);
  const setRoomPortalOpen = useUapaStore((s) => s.setRoomPortalOpen);

  useFrame((state, dt) => {
    const [, , pz] = playerPosition;
    const dist = pz - exitPortalZ;
    const proximity = THREE.MathUtils.clamp(
      1 - (dist - OPEN_END) / (OPEN_START - OPEN_END),
      0,
      1
    );
    const target = isRoomPortalOpen ? 1 : proximity;

    openRef.current = THREE.MathUtils.lerp(openRef.current, target, dt * 5);

    const angle = openRef.current * OPEN_ANGLE;
    if (leftDoorRef.current) leftDoorRef.current.rotation.y = angle;
    if (rightDoorRef.current) rightDoorRef.current.rotation.y = -angle;

    if (glowRef.current) {
      const mat = glowRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.15 + openRef.current * 0.55;
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 2.5) * 0.08 * openRef.current;
      glowRef.current.scale.set(1, 1 + openRef.current * 0.05, pulse);
    }
  });

  if (!standsInitialized || roomCount <= 1) return null;

  const z = exitPortalZ;
  const color = currentRoomColor;

  return (
    <group position={[0, 0, z]}>
      {/* Marco de la puerta */}
      <mesh position={[-DOOR_W / 2 - FRAME_T / 2, DOOR_H / 2, 0]}>
        <boxGeometry args={[FRAME_T, DOOR_H + FRAME_T, 0.35]} />
        <meshBasicMaterial color="#0a1428" />
      </mesh>
      <mesh position={[DOOR_W / 2 + FRAME_T / 2, DOOR_H / 2, 0]}>
        <boxGeometry args={[FRAME_T, DOOR_H + FRAME_T, 0.35]} />
        <meshBasicMaterial color="#0a1428" />
      </mesh>
      <mesh position={[0, DOOR_H + FRAME_T / 2, 0]}>
        <boxGeometry args={[DOOR_W + FRAME_T * 2, FRAME_T, 0.35]} />
        <meshBasicMaterial color="#0a1428" />
      </mesh>

      {/* Umbral luminoso */}
      <mesh position={[0, 0.04, 0.12]}>
        <boxGeometry args={[DOOR_W + 0.2, 0.08, 0.22]} />
        <meshBasicMaterial color={color} toneMapped={false} />
      </mesh>

      {/* Interior del portal — visible al abrir */}
      <mesh ref={glowRef} position={[0, DOOR_H / 2, -0.25]}>
        <planeGeometry args={[DOOR_W - 0.3, DOOR_H - 0.2]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.2}
          toneMapped={false}
        />
      </mesh>
      <mesh position={[0, DOOR_H / 2, -0.35]}>
        <planeGeometry args={[DOOR_W - 0.8, DOOR_H - 0.6]} />
        <meshBasicMaterial color="#061020" />
      </mesh>

      {/* Hoja izquierda */}
      <group ref={leftDoorRef} position={[-DOOR_W / 2, 0, 0]}>
        <mesh position={[PANEL_W / 2, DOOR_H / 2, 0]}>
          <boxGeometry args={[PANEL_W, DOOR_H, 0.14]} />
          <meshBasicMaterial color="#0d1a30" />
        </mesh>
        <mesh position={[PANEL_W / 2, DOOR_H / 2, 0.08]}>
          <boxGeometry args={[PANEL_W - 0.2, DOOR_H - 0.25, 0.02]} />
          <meshBasicMaterial color={color} transparent opacity={0.35} toneMapped={false} />
        </mesh>
        <mesh position={[PANEL_W - 0.18, DOOR_H / 2, 0.1]}>
          <boxGeometry args={[0.06, 0.35, 0.06]} />
          <meshBasicMaterial color={color} toneMapped={false} />
        </mesh>
        <mesh position={[0.06, DOOR_H / 2, 0.02]}>
          <cylinderGeometry args={[0.05, 0.05, DOOR_H, 8]} />
          <meshBasicMaterial color="#1a2848" />
        </mesh>
      </group>

      {/* Hoja derecha */}
      <group ref={rightDoorRef} position={[DOOR_W / 2, 0, 0]}>
        <mesh position={[-PANEL_W / 2, DOOR_H / 2, 0]}>
          <boxGeometry args={[PANEL_W, DOOR_H, 0.14]} />
          <meshBasicMaterial color="#0d1a30" />
        </mesh>
        <mesh position={[-PANEL_W / 2, DOOR_H / 2, 0.08]}>
          <boxGeometry args={[PANEL_W - 0.2, DOOR_H - 0.25, 0.02]} />
          <meshBasicMaterial color={color} transparent opacity={0.35} toneMapped={false} />
        </mesh>
        <mesh position={[-PANEL_W + 0.18, DOOR_H / 2, 0.1]}>
          <boxGeometry args={[0.06, 0.35, 0.06]} />
          <meshBasicMaterial color={color} toneMapped={false} />
        </mesh>
        <mesh position={[-0.06, DOOR_H / 2, 0.02]}>
          <cylinderGeometry args={[0.05, 0.05, DOOR_H, 8]} />
          <meshBasicMaterial color="#1a2848" />
        </mesh>
      </group>

      {/* Letrero — solo visible con la puerta abierta */}
      <Text
        position={[0, DOOR_H + 0.55, 0.1]}
        fontSize={0.28}
        color={color}
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.02}
        outlineColor="#000022"
      >
        SALAS
      </Text>
      <Text
        position={[0, DOOR_H + 0.22, 0.1]}
        fontSize={0.13}
        color="#e8f4ff"
        anchorX="center"
        anchorY="middle"
      >
        Acércate — la puerta se abre hacia más salas
      </Text>

      {/* Zona de interacción */}
      <mesh
        position={[0, DOOR_H / 2, 0.4]}
        onClick={(e) => {
          e.stopPropagation();
          setRoomPortalOpen(true, true);
        }}
      >
        <boxGeometry args={[DOOR_W + 0.5, DOOR_H + 0.5, 1.2]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>
    </group>
  );
}
