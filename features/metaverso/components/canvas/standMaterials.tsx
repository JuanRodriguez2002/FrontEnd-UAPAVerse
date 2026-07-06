import * as THREE from "three";
import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";

/** Mezcla fija de color — no depende de luces ni ángulo de cámara */
export function tintHex(base: string, accent: string, amount: number): string {
  const c = new THREE.Color(base);
  c.lerp(new THREE.Color(accent), amount);
  return `#${c.getHexString()}`;
}

export const BOOTH_WALL = "#050d1a";
export const BOOTH_CEILING = "#0a1428";
export const BOOTH_FLOOR = "#0c2040";
export const BOOTH_PLATFORM = "#081428";
export const BOOTH_HEADER = "#0a1628";
export const SCREEN_BG = "#001a33";
export const SCREEN_FACE = "#002244";
export const SCREEN_GLOW = "#00d4ff";
export const LIGHT_PANEL = "#e8f4ff";

/** Acento neón — color constante desde cualquier ángulo */
export function BoothNeon({ color }: { color: string }) {
  return <meshBasicMaterial color={color} toneMapped={false} />;
}

/** Superficie oscura fija */
export function BoothSurface({ color }: { color: string }) {
  return <meshBasicMaterial color={color} />;
}

/** Neón con transición suave al hover del stand */
export function GlowNeonBox({
  color,
  active,
  position,
  size,
  rotation,
}: {
  color: string;
  active: boolean;
  position: [number, number, number];
  size: [number, number, number];
  rotation?: [number, number, number];
}) {
  const matRef = useRef<THREE.MeshBasicMaterial>(null);
  const base = useMemo(() => new THREE.Color(color), [color]);
  const bright = useMemo(() => {
    const c = new THREE.Color(color);
    c.lerp(new THREE.Color("#ffffff"), 0.45);
    return c;
  }, [color]);
  const glow = useRef(0);

  useFrame((_, dt) => {
    glow.current = THREE.MathUtils.lerp(glow.current, active ? 1 : 0, dt * 6);
    if (matRef.current) {
      matRef.current.color.copy(base).lerp(bright, glow.current);
    }
  });

  return (
    <mesh position={position} rotation={rotation}>
      <boxGeometry args={size} />
      <meshBasicMaterial ref={matRef} color={color} toneMapped={false} />
    </mesh>
  );
}

export function GlowNeonPlane({
  color,
  active,
  position,
  size,
  rotation,
}: {
  color: string;
  active: boolean;
  position: [number, number, number];
  size: [number, number];
  rotation?: [number, number, number];
}) {
  const matRef = useRef<THREE.MeshBasicMaterial>(null);
  const base = useMemo(() => new THREE.Color(color), [color]);
  const bright = useMemo(() => {
    const c = new THREE.Color(color);
    c.lerp(new THREE.Color("#ffffff"), 0.35);
    return c;
  }, [color]);
  const glow = useRef(0);

  useFrame((_, dt) => {
    glow.current = THREE.MathUtils.lerp(glow.current, active ? 1 : 0, dt * 6);
    if (matRef.current) {
      matRef.current.color.copy(base).lerp(bright, glow.current);
    }
  });

  return (
    <mesh position={position} rotation={rotation}>
      <planeGeometry args={size} />
      <meshBasicMaterial ref={matRef} color={color} toneMapped={false} />
    </mesh>
  );
}
