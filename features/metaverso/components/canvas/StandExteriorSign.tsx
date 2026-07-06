"use client";

import { useMemo } from "react";
import { Text } from "@react-three/drei";
import type { StandProject } from "@/features/metaverso/data/stands";
import { getExteriorSignLocalOffset } from "@/features/metaverso/data/stands";
import { BoothNeon, BoothSurface, tintHex } from "./standMaterials";

interface StandExteriorSignProps {
  stand: StandProject;
  floorBase?: number;
}

/** Letrero compacto afuera del stand, opuesto al avatar IA */
export function StandExteriorSign({
  stand,
  floorBase = 0.1,
}: StandExteriorSignProps) {
  const offset = useMemo(() => getExteriorSignLocalOffset(stand), [stand]);
  const panelTint = useMemo(
    () => tintHex("#0a1628", stand.color, 0.18),
    [stand.color]
  );

  const panelW = 1.68;
  const panelH = 1.3;
  const panelY = 0.78;
  const neonY = panelY + panelH / 2 + 0.03;

  return (
    <group position={[offset.x, floorBase, offset.z]}>
      <mesh position={[0, 0.07, 0]}>
        <cylinderGeometry args={[0.09, 0.11, 0.14, 10]} />
        <BoothSurface color="#0a1428" />
      </mesh>

      <mesh position={[0, panelY, 0.04]}>
        <boxGeometry args={[panelW, panelH, 0.07]} />
        <BoothSurface color={panelTint} />
      </mesh>
      <mesh position={[0, neonY, 0.08]}>
        <boxGeometry args={[panelW + 0.08, 0.05, 0.04]} />
        <BoothNeon color={stand.color} />
      </mesh>

      <Text
        position={[0, panelY + 0.22, 0.1]}
        fontSize={0.108}
        color="#e8f4ff"
        anchorX="center"
        anchorY="middle"
        maxWidth={panelW - 0.18}
        textAlign="center"
        lineHeight={1.3}
      >
        {stand.title}
      </Text>
      <Text
        position={[0, panelY - 0.28, 0.1]}
        fontSize={0.087}
        color={stand.color}
        anchorX="center"
        anchorY="middle"
        maxWidth={panelW - 0.22}
        textAlign="center"
      >
        {stand.categoryName || stand.career}
      </Text>
    </group>
  );
}
