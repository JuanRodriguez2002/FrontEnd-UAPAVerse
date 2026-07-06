"use client";

import { useMemo } from "react";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import { LOBBY_CAROUSEL_Z } from "@/features/metaverso/data/lobby";

interface Logo3DPanelProps {
  url: string;
  width: number;
  position: [number, number, number];
  rotation?: [number, number, number];
}

function Logo3DPanel({
  url,
  width,
  position,
  rotation = [0, 0, 0],
}: Logo3DPanelProps) {
  const texture = useTexture(url);
  texture.colorSpace = THREE.SRGBColorSpace;

  const height = useMemo(() => {
    const img = texture.image as HTMLImageElement | undefined;
    if (!img?.width || !img?.height) return width * 0.35;
    return width * (img.height / img.width);
  }, [texture, width]);

  const depth = 0.07;

  return (
    <group position={position} rotation={rotation}>
      <mesh position={[0, 0, -depth / 2 - 0.01]}>
        <boxGeometry args={[width + 0.14, height + 0.14, depth]} />
        <meshBasicMaterial color="#030818" />
      </mesh>

      <mesh position={[0, 0, -depth / 2 + 0.008]}>
        <boxGeometry args={[width + 0.06, height + 0.06, depth * 0.55]} />
        <meshBasicMaterial color="#0a1838" />
      </mesh>

      <mesh position={[0, 0, depth / 2]}>
        <planeGeometry args={[width, height]} />
        <meshBasicMaterial
          map={texture}
          transparent
          toneMapped={false}
          depthWrite={false}
        />
      </mesh>

      <mesh position={[0, -height / 2 - 0.04, depth / 2 - 0.01]}>
        <boxGeometry args={[width * 0.5, 0.025, 0.02]} />
        <meshBasicMaterial
          color="#1292e2"
          transparent
          opacity={0.5}
          toneMapped={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}

export function LobbyDoorLogos() {
  const z = LOBBY_CAROUSEL_Z + 0.22;

  return (
    <group>
      <Logo3DPanel
        url="/logos/uapaverse.png"
        width={0.95}
        position={[-1.42, 2.05, z]}
      />
      <Logo3DPanel
        url="/logos/cadesoft.png"
        width={0.88}
        position={[1.42, 2.05, z]}
      />
    </group>
  );
}
