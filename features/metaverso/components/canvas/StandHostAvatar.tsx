"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Html, Text } from "@react-three/drei";
import * as THREE from "three";
import type { StandProject } from "@/features/metaverso/data/stands";
import { getHostLocalOffset } from "@/features/metaverso/data/stands";
import { useUapaStore } from "@/features/metaverso/store/useUapaStore";
import { BoothNeon, BoothSurface } from "./standMaterials";

interface StandHostAvatarProps {
  stand: StandProject;
  floorBase?: number;
}

/** Avatar humanoide — esquina de la entrada del stand, fuera del interior */
export function StandHostAvatar({ stand, floorBase = 0 }: StandHostAvatarProps) {
  const bodyRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Group>(null);
  const haloRef = useRef<THREE.Mesh>(null);
  const visorMatRef = useRef<THREE.MeshBasicMaterial>(null);

  const nearbyHostStand = useUapaStore((s) => s.nearbyHostStand);
  const playerPosition = useUapaStore((s) => s.playerPosition);
  const isModalOpen = useUapaStore((s) => s.isModalOpen);
  const isAIModalOpen = useUapaStore((s) => s.isAIModalOpen);

  const hostOffset = useMemo(() => getHostLocalOffset(stand), [stand]);
  const color = stand.color;
  const accentBright = useMemo(() => {
    const c = new THREE.Color(color);
    c.lerp(new THREE.Color("#ffffff"), 0.35);
    return c;
  }, [color]);
  const baseAccent = useMemo(() => new THREE.Color(color), [color]);
  const glow = useRef(0);

  const isActive =
    nearbyHostStand?.id === stand.id && !isModalOpen && !isAIModalOpen;

  useFrame((state, dt) => {
    const target = isActive ? 1 : 0;
    glow.current = THREE.MathUtils.lerp(glow.current, target, dt * 5);

    const t = state.clock.elapsedTime;
    if (ringRef.current) {
      ringRef.current.rotation.y = t * (0.8 + glow.current * 0.6);
    }
    if (haloRef.current) {
      haloRef.current.rotation.x = Math.PI / 2;
      haloRef.current.rotation.z = t * 0.4;
    }
    if (bodyRef.current) {
      bodyRef.current.position.y = Math.sin(t * 2) * 0.025;
      if (isActive) {
        bodyRef.current.lookAt(
          playerPosition[0],
          bodyRef.current.getWorldPosition(new THREE.Vector3()).y,
          playerPosition[2]
        );
      } else {
        bodyRef.current.rotation.y = THREE.MathUtils.lerp(
          bodyRef.current.rotation.y,
          0,
          dt * 4
        );
      }
    }
    if (visorMatRef.current) {
      visorMatRef.current.color.copy(baseAccent).lerp(accentBright, glow.current);
    }
  });

  return (
    <group position={[hostOffset.x, floorBase, hostOffset.z]}>
      {/* Base / pedestal */}
      <mesh position={[0, 0.04, 0]}>
        <cylinderGeometry args={[0.42, 0.48, 0.08, 20]} />
        <BoothSurface color="#0a1428" />
      </mesh>
      <mesh position={[0, 0.09, 0]}>
        <cylinderGeometry args={[0.36, 0.36, 0.02, 20]} />
        <BoothNeon color={color} />
      </mesh>

      <group ref={ringRef} position={[0, 0.12, 0]}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.5, 0.018, 10, 40]} />
          <meshBasicMaterial
            color={color}
            transparent
            opacity={0.75}
            toneMapped={false}
          />
        </mesh>
      </group>

      <group ref={bodyRef}>
        {/* Piernas */}
        {[-0.11, 0.11].map((x) => (
          <mesh key={x} position={[x, 0.32, 0]}>
            <capsuleGeometry args={[0.07, 0.28, 6, 10]} />
            <BoothSurface color="#141e38" />
          </mesh>
        ))}

        {/* Cadera */}
        <mesh position={[0, 0.52, 0]}>
          <boxGeometry args={[0.28, 0.12, 0.16]} />
          <BoothSurface color="#1a2544" />
        </mesh>

        {/* Torso */}
        <mesh position={[0, 0.82, 0]}>
          <capsuleGeometry args={[0.18, 0.42, 8, 14]} />
          <BoothSurface color="#1e2d50" />
        </mesh>

        {/* Núcleo pecho */}
        <mesh position={[0, 0.86, 0.12]}>
          <boxGeometry args={[0.14, 0.2, 0.05]} />
          <BoothNeon color={color} />
        </mesh>

        {/* Hombros */}
        {[-0.24, 0.24].map((x) => (
          <mesh key={x} position={[x, 1.02, 0]}>
            <sphereGeometry args={[0.09, 12, 12]} />
            <BoothSurface color="#243560" />
          </mesh>
        ))}

        {/* Brazos */}
        {[-0.24, 0.24].map((x) => (
          <mesh
            key={`arm-${x}`}
            position={[x, 0.78, 0.04]}
            rotation={[0.35, 0, x < 0 ? 0.25 : -0.25]}
          >
            <capsuleGeometry args={[0.055, 0.26, 6, 10]} />
            <BoothSurface color="#1a2848" />
          </mesh>
        ))}

        {/* Cuello */}
        <mesh position={[0, 1.14, 0]}>
          <cylinderGeometry args={[0.07, 0.08, 0.1, 12]} />
          <BoothSurface color="#2a3a62" />
        </mesh>

        {/* Cabeza */}
        <mesh position={[0, 1.34, 0]}>
          <sphereGeometry args={[0.2, 16, 16]} />
          <BoothSurface color="#e8f0ff" />
        </mesh>

        {/* Visor */}
        <mesh position={[0, 1.34, 0.14]}>
          <boxGeometry args={[0.28, 0.1, 0.06]} />
          <meshBasicMaterial ref={visorMatRef} color={color} toneMapped={false} />
        </mesh>

        {/* Antenas / orejas */}
        {[-0.14, 0.14].map((x) => (
          <mesh key={`ear-${x}`} position={[x, 1.38, 0]}>
            <sphereGeometry args={[0.04, 8, 8]} />
            <BoothNeon color={color} />
          </mesh>
        ))}

        {/* Halo holográfico */}
        <mesh ref={haloRef} position={[0, 1.34, -0.02]}>
          <torusGeometry args={[0.28, 0.008, 8, 32]} />
          <meshBasicMaterial
            color={color}
            transparent
            opacity={0.55}
            toneMapped={false}
          />
        </mesh>
      </group>

      <Text
        position={[0, 1.72, 0]}
        fontSize={0.11}
        color={color}
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.015}
        outlineColor="#000022"
      >
        Asistente IA
      </Text>

      {isActive && (
        <Html
          position={[0, 2.05, 0]}
          center
          distanceFactor={6}
          zIndexRange={[5, 15]}
          style={{ pointerEvents: "none", userSelect: "none" }}
        >
          <div className="w-52 rounded-xl border border-[#00d4ff]/40 bg-[#030014]/95 px-3 py-2.5 text-center shadow-lg shadow-[#00d4ff]/10">
            <p className="text-[10px] uppercase tracking-wider text-[#00d4ff]/70">
              Puesto directo
            </p>
            <p className="mt-1 text-xs leading-snug text-[#e8f4ff]">
              ¿Qué quieres saber sobre{" "}
              <span className="font-semibold text-[#00d4ff]">{stand.title}</span>?
            </p>
            <p className="mt-2 text-[10px] text-[#e8f4ff]/50">
              Pulsa <kbd className="text-[#00d4ff]">T</kbd> para hablar con la IA
            </p>
          </div>
        </Html>
      )}
    </group>
  );
}
