"use client";

import { useRef, type MutableRefObject } from "react";
import { useFrame, type ThreeEvent } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";
import { CORRIDOR_WIDTH } from "@/features/metaverso/data/stands";

const DOOR_W = CORRIDOR_WIDTH + 0.5;
const DOOR_H = 3.45;
const PANEL_W = DOOR_W / 2 - 0.08;
const FRAME_T = 0.18;
const OPEN_ANGLE = Math.PI / 2.15;

export interface CorridorDoubleDoorProps {
  color: string;
  title: string;
  subtitle: string;
  openAmountRef: MutableRefObject<number>;
  onClick?: (e: ThreeEvent<MouseEvent>) => void;
}

export function CorridorDoubleDoor({
  color,
  title,
  subtitle,
  openAmountRef,
  onClick,
}: CorridorDoubleDoorProps) {
  const leftDoorRef = useRef<THREE.Group>(null);
  const rightDoorRef = useRef<THREE.Group>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const open = openAmountRef.current;
    const angle = open * OPEN_ANGLE;
    if (leftDoorRef.current) leftDoorRef.current.rotation.y = angle;
    if (rightDoorRef.current) rightDoorRef.current.rotation.y = -angle;

    if (glowRef.current) {
      const mat = glowRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.15 + open * 0.55;
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 2.5) * 0.08 * open;
      glowRef.current.scale.set(1, 1 + open * 0.05, pulse);
    }
  });

  return (
    <group>
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

      <mesh position={[0, 0.04, 0.12]}>
        <boxGeometry args={[DOOR_W + 0.2, 0.08, 0.22]} />
        <meshBasicMaterial color={color} toneMapped={false} />
      </mesh>

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

      <group ref={leftDoorRef} position={[-DOOR_W / 2, 0, 0]}>
        <mesh position={[PANEL_W / 2, DOOR_H / 2, 0]}>
          <boxGeometry args={[PANEL_W, DOOR_H, 0.14]} />
          <meshBasicMaterial color="#0d1a30" />
        </mesh>
        <mesh position={[PANEL_W / 2, DOOR_H / 2, 0.08]}>
          <boxGeometry args={[PANEL_W - 0.2, DOOR_H - 0.25, 0.02]} />
          <meshBasicMaterial
            color={color}
            transparent
            opacity={0.35}
            toneMapped={false}
          />
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

      <group ref={rightDoorRef} position={[DOOR_W / 2, 0, 0]}>
        <mesh position={[-PANEL_W / 2, DOOR_H / 2, 0]}>
          <boxGeometry args={[PANEL_W, DOOR_H, 0.14]} />
          <meshBasicMaterial color="#0d1a30" />
        </mesh>
        <mesh position={[-PANEL_W / 2, DOOR_H / 2, 0.08]}>
          <boxGeometry args={[PANEL_W - 0.2, DOOR_H - 0.25, 0.02]} />
          <meshBasicMaterial
            color={color}
            transparent
            opacity={0.35}
            toneMapped={false}
          />
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

      <Text
        position={[0, DOOR_H + 0.55, 0.1]}
        fontSize={0.28}
        color={color}
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.02}
        outlineColor="#000022"
      >
        {title}
      </Text>
      <Text
        position={[0, DOOR_H + 0.22, 0.1]}
        fontSize={0.13}
        color="#e8f4ff"
        anchorX="center"
        anchorY="middle"
        maxWidth={DOOR_W + 1.2}
        textAlign="center"
      >
        {subtitle}
      </Text>

      {onClick && (
        <mesh position={[0, DOOR_H / 2, 0.4]} onClick={onClick}>
          <boxGeometry args={[DOOR_W + 0.5, DOOR_H + 0.5, 1.2]} />
          <meshBasicMaterial transparent opacity={0} />
        </mesh>
      )}
    </group>
  );
}
