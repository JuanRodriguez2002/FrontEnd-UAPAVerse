"use client";

import { memo, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { StandProject } from "@/features/metaverso/data/stands";
import { BOOTH_WIDTH, BOOTH_DEPTH, BOOTH_HEIGHT } from "@/features/metaverso/data/stands";
import { Text, Html } from "@react-three/drei";
import { useUapaStore } from "@/features/metaverso/store/useUapaStore";
import { isPlayerInsideBooth } from "@/features/metaverso/data/stands";
import { StandHostAvatar } from "./StandHostAvatar";
import { StandExteriorSign } from "./StandExteriorSign";
import {
  BOOTH_CEILING,
  BOOTH_FLOOR,
  BOOTH_HEADER,
  BOOTH_WALL,
  BoothNeon,
  BoothSurface,
  LIGHT_PANEL,
  SCREEN_BG,
  tintHex,
} from "./standMaterials";

interface StandProps {
  stand: StandProject;
}

const W = BOOTH_WIDTH;
const D = BOOTH_DEPTH;
const H = BOOTH_HEIGHT;

const FLOOR_Y = 0.05;
const FLOOR_H = 0.1;
const FLOOR_TOP = FLOOR_Y + FLOOR_H / 2;
const WALL_BASE = FLOOR_TOP;
const CEILING_H = 0.04;
const CEILING_Y = WALL_BASE + H + CEILING_H / 2;
const HEADER_H = 0.12;
const HEADER_Y = WALL_BASE + H - HEADER_H / 2 - 0.04;
const PILLAR_H = H - HEADER_H - 0.12;
const PILLAR_Y = WALL_BASE + PILLAR_H / 2;

const BACK_Z = -D + 0.3;
const INFO_W = W - 0.9;
const INFO_H = H - 1.15;
const INFO_Y = WALL_BASE + H / 2 - 0.15;

const LEFT_WALL_X = -W / 2 + 0.28;
const VIDEO_CENTER_Z = -D / 2 + 0.5;
const VIDEO_W = D - 0.5;
const VIDEO_H = H - 0.45;
const VIDEO_Y = WALL_BASE + H / 2;

const DEMO_PANEL_W = D - 0.55;
const DEMO_PANEL_H = H - 0.45;
const DEMO_Y = WALL_BASE + H / 2;
const DEMO_CENTER_Z = -D / 2 + 0.5;

function GlowingTitle({
  text,
  color,
  active,
  position,
  fontSize,
  outlineWidth = 0.02,
}: {
  text: string;
  color: string;
  active: boolean;
  position: [number, number, number];
  fontSize: number;
  outlineWidth?: number;
}) {
  const textRef = useRef<THREE.Object3D & { color?: string }>(null);
  const base = useMemo(() => new THREE.Color(color), [color]);
  const bright = useMemo(() => {
    const c = new THREE.Color(color);
    c.lerp(new THREE.Color("#ffffff"), 0.55);
    return c;
  }, [color]);
  const glow = useRef(0);
  const tmp = useMemo(() => new THREE.Color(), []);

  useFrame((_, dt) => {
    glow.current = THREE.MathUtils.lerp(glow.current, active ? 1 : 0, dt * 6);
    if (!textRef.current) return;
    tmp.copy(base).lerp(bright, glow.current);
    textRef.current.color = `#${tmp.getHexString()}`;
  });

  return (
    <Text
      ref={textRef}
      position={position}
      fontSize={fontSize}
      color={color}
      anchorX="center"
      anchorY="middle"
      outlineWidth={outlineWidth}
      outlineColor="#000022"
    >
      {text}
    </Text>
  );
}

function StandInner({ stand }: StandProps) {
  const playerPosition = useUapaStore((s) => s.playerPosition);
  const isModalOpen = useUapaStore((s) => s.isModalOpen);
  const highlightedStand = useUapaStore((s) => s.highlightedStand);

  const [px, , pz] = playerPosition;
  const inside = isPlayerInsideBooth(stand, px, pz);
  const showInteractiveHtml = inside && !isModalOpen;
  const isHighlighted = highlightedStand?.id === stand.id;

  const floorMatRef = useRef<THREE.MeshBasicMaterial>(null);
  const glow = useRef(0);

  const floorTint = useMemo(
    () => tintHex(BOOTH_FLOOR, stand.color, 0.12),
    [stand.color]
  );
  const floorTintHot = useMemo(
    () => tintHex(BOOTH_FLOOR, stand.color, 0.38),
    [stand.color]
  );
  const headerTint = useMemo(
    () => tintHex(BOOTH_HEADER, stand.color, 0.22),
    [stand.color]
  );
  const infoTint = useMemo(
    () => tintHex(BOOTH_HEADER, stand.color, 0.14),
    [stand.color]
  );

  const baseFloorColor = useMemo(() => new THREE.Color(floorTint), [floorTint]);
  const hotFloorColor = useMemo(() => new THREE.Color(floorTintHot), [floorTintHot]);

  useFrame((_, dt) => {
    const target = isHighlighted ? 1 : 0;
    glow.current = THREE.MathUtils.lerp(glow.current, target, dt * 6);
    if (floorMatRef.current) {
      floorMatRef.current.color.copy(baseFloorColor).lerp(hotFloorColor, glow.current);
    }
  });

  return (
    <group position={stand.position} rotation={[0, stand.rotation, 0]}>
      <mesh position={[0, FLOOR_Y, -D / 2 + 0.5]}>
        <boxGeometry args={[W + 0.5, FLOOR_H, D + 0.2]} />
        <meshBasicMaterial ref={floorMatRef} color={floorTint} />
      </mesh>

      <mesh position={[0, FLOOR_TOP + 0.009, 0.18]}>
        <boxGeometry args={[W + 0.06, 0.018, 0.04]} />
        <BoothNeon color={stand.color} />
      </mesh>

      <mesh position={[0, WALL_BASE + H / 2, -D + 0.15]}>
        <boxGeometry args={[W, H, 0.2]} />
        <BoothSurface color={BOOTH_WALL} />
      </mesh>
      <mesh position={[-W / 2 + 0.1, WALL_BASE + H / 2, -D / 2 + 0.5]}>
        <boxGeometry args={[0.2, H, D - 0.4]} />
        <BoothSurface color={BOOTH_WALL} />
      </mesh>
      <mesh position={[W / 2 - 0.1, WALL_BASE + H / 2, -D / 2 + 0.5]}>
        <boxGeometry args={[0.2, H, D - 0.4]} />
        <BoothSurface color={BOOTH_WALL} />
      </mesh>

      <mesh position={[0, CEILING_Y, -D / 2 + 0.5]}>
        <boxGeometry args={[W - 0.28, CEILING_H, D - 0.48]} />
        <BoothSurface color={BOOTH_CEILING} />
      </mesh>

      <mesh position={[0, CEILING_Y + CEILING_H / 2 + 0.01, -D + 0.24]}>
        <boxGeometry args={[W - 0.1, 0.02, 0.02]} />
        <BoothNeon color={stand.color} />
      </mesh>

      <mesh position={[0, HEADER_Y, 0.16]}>
        <boxGeometry args={[W, HEADER_H, 0.14]} />
        <BoothSurface color={headerTint} />
      </mesh>
      <mesh position={[0, HEADER_Y - HEADER_H / 2 - 0.009, 0.23]}>
        <boxGeometry args={[W + 0.04, 0.018, 0.02]} />
        <BoothNeon color={stand.color} />
      </mesh>

      {[-W / 2 + 0.1, W / 2 - 0.1].map((x) => (
        <mesh key={x} position={[x, PILLAR_Y, 0.14]}>
          <boxGeometry args={[0.1, PILLAR_H, 0.1]} />
          <BoothNeon color={stand.color} />
        </mesh>
      ))}

      <GlowingTitle
        text={stand.title}
        color={stand.color}
        active={isHighlighted}
        position={[0, WALL_BASE + H + 0.45, 0.35]}
        fontSize={0.34}
      />
      <Text
        position={[0, WALL_BASE + H + 0.12, 0.35]}
        fontSize={0.14}
        color="#e8f4ff"
        anchorX="center"
        anchorY="middle"
      >
        {stand.career}
      </Text>

      <mesh position={[0, CEILING_Y - CEILING_H / 2 - 0.02, -D / 2 + 0.5]}>
        <boxGeometry args={[W - 1.2, 0.025, 0.38]} />
        <BoothNeon color={LIGHT_PANEL} />
      </mesh>

      {/* Título central en pared trasera */}
      <mesh position={[0, WALL_BASE + H - 0.65, BACK_Z]}>
        <boxGeometry args={[W - 1.4, 0.45, 0.04]} />
        <BoothNeon color={stand.color} />
      </mesh>
      <Text
        position={[0, WALL_BASE + H - 0.65, BACK_Z + 0.03]}
        fontSize={0.17}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        maxWidth={W - 1.8}
        textAlign="center"
      >
        {stand.title}
      </Text>

      {/* Video — pared izquierda completa */}
      <mesh position={[LEFT_WALL_X - 0.03, VIDEO_Y, VIDEO_CENTER_Z]}>
        <boxGeometry args={[0.06, VIDEO_H, VIDEO_W]} />
        <BoothSurface color={SCREEN_BG} />
      </mesh>
      <mesh
        position={[LEFT_WALL_X + 0.02, VIDEO_Y, VIDEO_CENTER_Z]}
        rotation={[0, Math.PI / 2, 0]}
      >
        <planeGeometry args={[VIDEO_W - 0.08, VIDEO_H - 0.1]} />
        <BoothSurface color={BOOTH_WALL} />
      </mesh>
      <Text
        position={[LEFT_WALL_X + 0.05, VIDEO_Y + VIDEO_H / 2 - 0.12, VIDEO_CENTER_Z]}
        rotation={[0, Math.PI / 2, 0]}
        fontSize={0.1}
        color="#e8f4ff"
        anchorX="center"
        anchorY="middle"
      >
        VIDEO
      </Text>

      {showInteractiveHtml && (
        <Html
          transform
          occlude
          position={[LEFT_WALL_X + 0.06, VIDEO_Y, VIDEO_CENTER_Z]}
          rotation={[0, Math.PI / 2, 0]}
          distanceFactor={3.35}
          zIndexRange={[1, 10]}
          style={{ pointerEvents: "auto" }}
        >
          <div
            className="overflow-hidden rounded-sm border border-[#1a2848] bg-black"
            style={{ width: 400, height: 278 }}
          >
            <iframe
              src={stand.videoUrl}
              title={`Video ${stand.title}`}
              className="h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </Html>
      )}

      {/* Descripción breve — pared trasera (ancho completo bajo el título) */}
      <mesh position={[0, INFO_Y, BACK_Z - 0.03]}>
        <boxGeometry args={[INFO_W, INFO_H, 0.06]} />
        <BoothSurface color={infoTint} />
      </mesh>
      <mesh position={[0, INFO_Y + INFO_H / 2 - 0.1, BACK_Z + 0.02]}>
        <boxGeometry args={[INFO_W - 0.2, 0.05, 0.02]} />
        <BoothNeon color={stand.color} />
      </mesh>
      <Text
        position={[0, INFO_Y + INFO_H / 2 - 0.1, BACK_Z + 0.04]}
        fontSize={0.085}
        color={stand.color}
        anchorX="center"
        anchorY="middle"
      >
        INFORMACIÓN
      </Text>
      <Text
        position={[0, INFO_Y + 0.2, BACK_Z + 0.04]}
        fontSize={0.08}
        color="#e8f4ff"
        anchorX="center"
        anchorY="middle"
        maxWidth={INFO_W - 0.5}
        textAlign="center"
        lineHeight={1.35}
      >
        {stand.shortDescription}
      </Text>
      <Text
        position={[0, INFO_Y - INFO_H / 2 + 0.28, BACK_Z + 0.04]}
        fontSize={0.07}
        color="#00d4ff"
        anchorX="center"
        anchorY="middle"
        maxWidth={INFO_W - 0.4}
        textAlign="center"
      >
        {stand.organization}
      </Text>

      {/* Demo — pared lateral derecha */}
      <mesh position={[W / 2 - 0.28, DEMO_Y, DEMO_CENTER_Z]}>
        <boxGeometry args={[0.06, DEMO_PANEL_H, DEMO_PANEL_W]} />
        <BoothSurface color={SCREEN_BG} />
      </mesh>
      <mesh
        position={[W / 2 - 0.34, DEMO_Y, DEMO_CENTER_Z]}
        rotation={[0, -Math.PI / 2, 0]}
      >
        <planeGeometry args={[DEMO_PANEL_W - 0.08, DEMO_PANEL_H - 0.1]} />
        <BoothSurface color={BOOTH_WALL} />
      </mesh>

      {showInteractiveHtml && (
        <Html
          transform
          occlude
          position={[W / 2 - 0.38, DEMO_Y, DEMO_CENTER_Z]}
          rotation={[0, -Math.PI / 2, 0]}
          distanceFactor={3.35}
          zIndexRange={[1, 10]}
          style={{ pointerEvents: "auto" }}
        >
          <a
            href={stand.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center rounded-sm border border-[#1a2848] bg-[#030014]/95 text-center transition hover:bg-[#0a1428]"
            style={{ width: 400, height: 278 }}
            onClick={(e) => e.stopPropagation()}
          >
            <span className="mb-2 text-xs uppercase tracking-wider text-[#e8f4ff]/60">
              Demo
            </span>
            <span className="px-4 text-lg font-semibold leading-tight text-white">
              Probar demo
            </span>
          </a>
        </Html>
      )}

      {!showInteractiveHtml && (
        <Text
          position={[W / 2 - 0.45, DEMO_Y, DEMO_CENTER_Z]}
          rotation={[0, -Math.PI / 2, 0]}
          fontSize={0.11}
          color="#e8f4ff"
          anchorX="center"
          anchorY="middle"
          maxWidth={2.2}
          textAlign="center"
        >
          DEMO{"\n"}Probar demo
        </Text>
      )}

      <StandHostAvatar stand={stand} floorBase={WALL_BASE} />
      <StandExteriorSign stand={stand} floorBase={WALL_BASE} />
    </group>
  );
}

export const Stand = memo(StandInner);
