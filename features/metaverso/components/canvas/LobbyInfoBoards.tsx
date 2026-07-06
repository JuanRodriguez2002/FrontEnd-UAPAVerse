"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";
import {
  LOBBY_CORRIDOR_HALF_W,
  LOBBY_INFO_BOARDS,
  type LobbyInfoBoard,
} from "@/features/metaverso/data/lobby";
import { useUapaStore } from "@/features/metaverso/store/useUapaStore";
import { ENV } from "@/features/metaverso/lib/envTheme";

const SIGN_W = 2.65;
const SIGN_H = 1.75;

function CorridorInfoBoard({ board }: { board: LobbyInfoBoard }) {
  const groupRef = useRef<THREE.Group>(null);
  const accentLineRef = useRef<THREE.Mesh>(null);
  const revealRef = useRef(0);

  const accent =
    board.accent === "secondary" ? ENV.secondary : ENV.primary;
  const panelFill = board.accent === "secondary" ? "#12082a" : "#061838";
  const isLeft = board.side === "left";
  const depth = 0.1;
  const y = 1.45;
  const wallX = isLeft ? -LOBBY_CORRIDOR_HALF_W : LOBBY_CORRIDOR_HALF_W;
  const rotationY = isLeft ? Math.PI / 2 : -Math.PI / 2;

  useFrame((state, delta) => {
    const [, , pz] = useUapaStore.getState().playerPosition;
    const target =
      pz <= board.revealZ
        ? THREE.MathUtils.clamp((board.revealZ - pz) / 2.5, 0, 1)
        : 0;

    revealRef.current = THREE.MathUtils.lerp(revealRef.current, target, delta * 5);

    const protrude = revealRef.current * 0.62;
    const x = isLeft ? wallX + protrude : wallX - protrude;

    if (groupRef.current) {
      groupRef.current.position.set(x, 0, board.wallZ);
      groupRef.current.visible = revealRef.current > 0.02;
    }

    if (accentLineRef.current) {
      const mat = accentLineRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity =
        (0.45 + Math.sin(state.clock.elapsedTime * 2) * 0.1) *
        revealRef.current;
    }
  });

  return (
    <group ref={groupRef} rotation={[0, rotationY, 0]} visible={false}>
      <mesh position={[0, y, -0.02]}>
        <planeGeometry args={[SIGN_W + 0.15, SIGN_H + 0.12]} />
        <meshBasicMaterial
          color={accent}
          transparent
          opacity={0.05}
          toneMapped={false}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      <mesh position={[0, y, 0]}>
        <boxGeometry args={[SIGN_W, SIGN_H, depth]} />
        <meshBasicMaterial color={panelFill} />
      </mesh>

      <mesh position={[0, y, depth / 2 + 0.001]}>
        <planeGeometry args={[SIGN_W - 0.1, SIGN_H - 0.1]} />
        <meshBasicMaterial color={ENV.neutralLight} />
      </mesh>

      <mesh position={[0, y + SIGN_H / 2 - 0.09, depth / 2 + 0.004]}>
        <boxGeometry args={[SIGN_W - 0.12, 0.12, 0.014]} />
        <meshBasicMaterial color={accent} toneMapped={false} />
      </mesh>

      <mesh
        ref={accentLineRef}
        position={[0, y + SIGN_H / 2 - 0.16, depth / 2 + 0.006]}
      >
        <boxGeometry args={[SIGN_W * 0.5, 0.016, 0.01]} />
        <meshBasicMaterial
          color={accent}
          transparent
          opacity={0.5}
          toneMapped={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      <Text
        position={[0, y + 0.34, depth / 2 + 0.012]}
        font={ENV.fontHeadline}
        fontSize={0.12}
        color={ENV.tertiary}
        anchorX="center"
        anchorY="middle"
        maxWidth={SIGN_W - 0.3}
        textAlign="center"
        material-toneMapped={false}
      >
        {board.title}
      </Text>

      <Text
        position={[0, y - 0.1, depth / 2 + 0.012]}
        font={ENV.fontBody}
        fontSize={0.072}
        color="#c8d8f0"
        anchorX="center"
        anchorY="middle"
        maxWidth={SIGN_W - 0.38}
        textAlign="center"
        lineHeight={1.45}
        material-toneMapped={false}
      >
        {board.lines.join("\n")}
      </Text>
    </group>
  );
}

export function LobbyInfoBoards() {
  return (
    <>
      {LOBBY_INFO_BOARDS.map((board) => (
        <CorridorInfoBoard key={board.id} board={board} />
      ))}
    </>
  );
}
