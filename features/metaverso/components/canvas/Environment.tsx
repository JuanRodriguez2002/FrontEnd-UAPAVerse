"use client";

import { useMemo, useRef } from "react";
import * as THREE from "three";
import { CORRIDOR_LENGTH, CORRIDOR_WIDTH, PLAYER_MAX_X } from "@/features/metaverso/data/stands";
import { ENV } from "@/features/metaverso/lib/envTheme";

export function StarField() {
  const count = 2000;
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 30;
      arr[i * 3 + 1] = 5 + Math.random() * 25;
      arr[i * 3 + 2] = (Math.random() - 0.5) * CORRIDOR_LENGTH;
    }
    return arr;
  }, [count]);

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.12}
        color={ENV.tertiary}
        transparent
        opacity={0.55}
        sizeAttenuation
      />
    </points>
  );
}

export function Corridor() {
  const len = CORRIDOR_LENGTH;
  const halfW = PLAYER_MAX_X + 1;

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[halfW * 2, len]} />
        <meshStandardMaterial
          color={ENV.neutralFloor}
          emissive={ENV.neutral}
          emissiveIntensity={0.35}
          metalness={0.7}
          roughness={0.25}
        />
      </mesh>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
        <planeGeometry args={[CORRIDOR_WIDTH, len]} />
        <meshStandardMaterial
          color={ENV.neutralLight}
          emissive={ENV.primary}
          emissiveIntensity={0.12}
          metalness={0.6}
          roughness={0.22}
        />
      </mesh>

      {[-halfW, halfW].map((x) => (
        <mesh key={x} position={[x, 2.5, 0]}>
          <boxGeometry args={[0.2, 5, len]} />
          <meshStandardMaterial
            color={ENV.neutral}
            emissive={ENV.neutral}
            emissiveIntensity={0.2}
          />
        </mesh>
      ))}

      <mesh position={[0, 5, 0]}>
        <boxGeometry args={[halfW * 2, 0.15, len]} />
        <meshStandardMaterial color={ENV.neutral} metalness={0.45} roughness={0.4} />
      </mesh>

      {[-halfW + 0.5, halfW - 0.5].map((x) => (
        <mesh key={x} position={[x, 4.85, 0]}>
          <boxGeometry args={[0.04, 0.04, len - 4]} />
          <meshStandardMaterial
            color={ENV.primary}
            emissive={ENV.primary}
            emissiveIntensity={1.8}
          />
        </mesh>
      ))}

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
        <planeGeometry args={[0.06, len - 4]} />
        <meshBasicMaterial color={ENV.secondary} transparent opacity={0.22} />
      </mesh>

      {Array.from({ length: 10 }, (_, i) => {
        const z = -len / 2 + 4 + i * 8;
        return (
          <group key={i} position={[0, 4.7, z]}>
            <mesh>
              <boxGeometry args={[1.4, 0.1, 0.35]} />
              <meshStandardMaterial
                color={ENV.tertiary}
                emissive={ENV.tertiary}
                emissiveIntensity={1.8}
              />
            </mesh>
            <pointLight color={ENV.tertiary} intensity={2.5} distance={14} />
            <pointLight
              color={ENV.primary}
              intensity={1}
              distance={10}
              position={[0, -1, 0]}
            />
          </group>
        );
      })}
    </group>
  );
}

export function GridLines() {
  return (
    <gridHelper
      args={[CORRIDOR_WIDTH, 20, ENV.primary, ENV.neutral]}
      position={[0, 0.03, 0]}
    />
  );
}
