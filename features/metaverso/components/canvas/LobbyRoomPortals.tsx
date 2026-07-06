"use client";

import { useEffect, useRef, type MutableRefObject, type ReactNode } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";
import { useUapaStore } from "@/features/metaverso/store/useUapaStore";
import {
  LOBBY_CAROUSEL_SPACING,
  LOBBY_CAROUSEL_Z,
  getRoomLabel,
} from "@/features/metaverso/data/lobby";
import { ENV } from "@/features/metaverso/lib/envTheme";

const DOOR_W = 1.52;
const DOOR_H = 2.55;
const PANEL_W = DOOR_W / 2 - 0.05;
const FRAME_T = 0.08;
const OPEN_ANGLE = Math.PI / 2.15;

const SIGN_W = 1.48;
const SIGN_H = 0.54;

const _activeColor = new THREE.Color(ENV.primary);
const _secondaryColor = new THREE.Color(ENV.secondary);
const _neutralColor = new THREE.Color(ENV.neutral);
const _roomColor = new THREE.Color();
const _lerpColor = new THREE.Color();

function PortalSign3D({
  label,
  roomIndex,
  color,
  slideRef,
}: {
  label: string;
  roomIndex: number;
  color: string;
  slideRef: MutableRefObject<number>;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const bgRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const accentRef = useRef<THREE.Mesh>(null);
  const activeRef = useRef(0);

  _roomColor.set(color);

  useFrame((state, delta) => {
    const isNear = useUapaStore.getState().nearbyLobbyRoom !== null;
    const dist = Math.abs(roomIndex - slideRef.current);
    const target = isNear && dist < 0.42 ? 1 : 0;
    activeRef.current = THREE.MathUtils.lerp(activeRef.current, target, delta * 7);
    const t = activeRef.current;

    if (groupRef.current) {
      const bob = t > 0.5 ? Math.sin(state.clock.elapsedTime * 3.2) * 0.018 : 0;
      const scale = 1 + t * 0.05;
      groupRef.current.position.y = DOOR_H + 0.38 + bob;
      groupRef.current.scale.setScalar(scale);
    }

    if (bgRef.current) {
      const mat = bgRef.current.material as THREE.MeshBasicMaterial;
      if (mat?.color) {
        _lerpColor.lerpColors(_neutralColor, _activeColor, Math.min(t * 0.8, 1));
        mat.color.copy(_lerpColor);
        mat.opacity = 0.88 + t * 0.1;
      }
    }

    if (glowRef.current) {
      const mat = glowRef.current.material as THREE.MeshBasicMaterial;
      if (mat?.color) {
        mat.color.lerpColors(_roomColor, _secondaryColor, t);
        mat.opacity = 0.15 + t * 0.45;
      }
    }

    if (accentRef.current) {
      const mat = accentRef.current.material as THREE.MeshBasicMaterial;
      if (mat?.color) {
        mat.color.lerpColors(_roomColor, _secondaryColor, t);
      }
    }
  });

  return (
    <group ref={groupRef} position={[0, DOOR_H + 0.38, 0.14]}>
      <mesh ref={glowRef} position={[0, 0, -0.03]}>
        <planeGeometry args={[SIGN_W + 0.12, SIGN_H + 0.1]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.15}
          toneMapped={false}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      <mesh ref={bgRef} position={[0, 0, 0]}>
        <planeGeometry args={[SIGN_W, SIGN_H]} />
        <meshBasicMaterial color={ENV.neutral} transparent opacity={0.9} />
      </mesh>

      <mesh ref={accentRef} position={[0, SIGN_H / 2 - 0.02, 0.002]}>
        <planeGeometry args={[SIGN_W, 0.03]} />
        <meshBasicMaterial color={color} toneMapped={false} />
      </mesh>

      <mesh position={[0, 0, 0.003]}>
        <planeGeometry args={[SIGN_W - 0.06, SIGN_H - 0.06]} />
        <meshBasicMaterial
          color={ENV.neutral}
          transparent
          opacity={0.35}
          depthWrite={false}
        />
      </mesh>

      <Text
        font={ENV.fontLabel}
        fontSize={0.075}
        color={color}
        anchorX="center"
        anchorY="middle"
        position={[0, 0.13, 0.01]}
        outlineWidth={0.012}
        outlineColor={ENV.neutral}
        material-toneMapped={false}
      >
        {`SALA ${roomIndex + 1}`}
      </Text>

      <Text
        font={ENV.fontHeadline}
        fontSize={0.105}
        color={ENV.tertiary}
        anchorX="center"
        anchorY="middle"
        position={[0, -0.05, 0.01]}
        maxWidth={SIGN_W - 0.14}
        textAlign="center"
        lineHeight={1.15}
        outlineWidth={0.018}
        outlineColor={ENV.neutral}
        material-toneMapped={false}
      >
        {label}
      </Text>
    </group>
  );
}

function LobbyDoor({
  roomIndex,
  color,
  label,
  slideRef,
}: {
  roomIndex: number;
  color: string;
  label: string;
  slideRef: MutableRefObject<number>;
}) {
  const leftRef = useRef<THREE.Group>(null);
  const rightRef = useRef<THREE.Group>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const openRef = useRef(0);

  useFrame((state, delta) => {
    const isNear = useUapaStore.getState().nearbyLobbyRoom !== null;
    const dist = Math.abs(roomIndex - slideRef.current);
    const target = isNear && dist < 0.42 ? 1 : 0;
    openRef.current = THREE.MathUtils.lerp(openRef.current, target, delta * 5.5);

    const angle = openRef.current * OPEN_ANGLE;
    if (leftRef.current) leftRef.current.rotation.y = angle;
    if (rightRef.current) rightRef.current.rotation.y = -angle;

    if (glowRef.current) {
      const mat = glowRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity =
        0.1 +
        openRef.current * 0.35 +
        Math.sin(state.clock.elapsedTime * 2.8) * 0.05 * openRef.current;
    }
  });

  const h = DOOR_H;
  const w = DOOR_W;

  return (
    <group>
      <mesh position={[0, 0.03, 0.08]}>
        <boxGeometry args={[w + 0.28, 0.06, 0.22]} />
        <meshBasicMaterial color="#0a1428" />
      </mesh>
      <mesh position={[0, 0.04, 0.14]}>
        <boxGeometry args={[w + 0.06, 0.02, 0.05]} />
        <meshBasicMaterial color={color} toneMapped={false} />
      </mesh>

      <mesh position={[-w / 2 - FRAME_T / 2, h / 2, 0]}>
        <boxGeometry args={[FRAME_T, h + FRAME_T, 0.18]} />
        <meshBasicMaterial color="#0c1a30" />
      </mesh>
      <mesh position={[w / 2 + FRAME_T / 2, h / 2, 0]}>
        <boxGeometry args={[FRAME_T, h + FRAME_T, 0.18]} />
        <meshBasicMaterial color="#0c1a30" />
      </mesh>
      <mesh position={[0, h + FRAME_T / 2, 0]}>
        <boxGeometry args={[w + FRAME_T * 2, FRAME_T, 0.18]} />
        <meshBasicMaterial color="#0c1a30" />
      </mesh>

      <mesh ref={glowRef} position={[0, h / 2, -0.08]}>
        <planeGeometry args={[w - 0.15, h - 0.15]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.12}
          toneMapped={false}
        />
      </mesh>

      <group ref={leftRef} position={[-w / 2, 0, 0.08]}>
        <mesh position={[PANEL_W / 2, h / 2, 0]}>
          <boxGeometry args={[PANEL_W, h - 0.06, 0.08]} />
          <meshBasicMaterial color={color} toneMapped={false} />
        </mesh>
      </group>

      <group ref={rightRef} position={[w / 2, 0, 0.08]}>
        <mesh position={[-PANEL_W / 2, h / 2, 0]}>
          <boxGeometry args={[PANEL_W, h - 0.06, 0.08]} />
          <meshBasicMaterial color={color} toneMapped={false} />
        </mesh>
      </group>

      <PortalSign3D
        label={label}
        roomIndex={roomIndex}
        color={color}
        slideRef={slideRef}
      />
    </group>
  );
}

function CarouselDoorSlot({
  roomIndex,
  slideRef,
  children,
}: {
  roomIndex: number;
  slideRef: MutableRefObject<number>;
  children: ReactNode;
}) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!groupRef.current) return;
    groupRef.current.position.set(roomIndex * LOBBY_CAROUSEL_SPACING, 0, 0);
    const dist = Math.abs(roomIndex - slideRef.current);
    const scale = dist < 0.35 ? 1 : 0.94;
    groupRef.current.scale.setScalar(scale);
  });

  return <group ref={groupRef}>{children}</group>;
}

export function LobbyRoomPortals() {
  const roomCount = useUapaStore((s) => s.roomCount);
  const roomsMeta = useUapaStore((s) => s.roomsMeta);
  const lobbyDoorIndex = useUapaStore((s) => s.lobbyDoorIndex);
  const roomTransitionKey = useUapaStore((s) => s.roomTransitionKey);

  const carouselRef = useRef<THREE.Group>(null);
  const slideRef = useRef(lobbyDoorIndex);

  useEffect(() => {
    slideRef.current = useUapaStore.getState().lobbyDoorIndex;
  }, [roomTransitionKey]);

  useFrame((_, dt) => {
    slideRef.current = THREE.MathUtils.lerp(
      slideRef.current,
      lobbyDoorIndex,
      dt * 4.5
    );

    if (carouselRef.current) {
      carouselRef.current.position.x =
        -slideRef.current * LOBBY_CAROUSEL_SPACING;
    }
  });

  if (roomCount <= 0) return null;

  return (
    <group ref={carouselRef} position={[0, 0, LOBBY_CAROUSEL_Z]}>
      {Array.from({ length: roomCount }, (_, i) => {
        const room = roomsMeta[i];
        const color = room?.color ?? "#00d4ff";
        const label = room ? getRoomLabel(room) : `Sala ${i + 1}`;

        return (
          <CarouselDoorSlot key={i} roomIndex={i} slideRef={slideRef}>
            <LobbyDoor
              roomIndex={i}
              color={color}
              label={label}
              slideRef={slideRef}
            />
          </CarouselDoorSlot>
        );
      })}
    </group>
  );
}
