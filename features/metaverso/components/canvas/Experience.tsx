"use client";

import { Suspense, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import { LOBBY_SPAWN } from "@/features/metaverso/data/lobby";
import { SPAWN_POSITION } from "@/features/metaverso/data/stands";
import { ENV } from "@/features/metaverso/lib/envTheme";
import { Player } from "./Player";
import { StandsManager } from "./StandsManager";
import { RoomExitPortal } from "./RoomExitPortal";
import { LobbyReturnPortal } from "./LobbyReturnPortal";
import { RoomEntranceBanner } from "./RoomEntranceBanner";
import { Corridor, StarField, GridLines } from "./Environment";
import { LobbyScene } from "./LobbyScene";
import { useUapaStore } from "@/features/metaverso/store/useUapaStore";

function LoadedSignal() {
  const setLoading = useUapaStore((s) => s.setLoading);
  useEffect(() => {
    setLoading(false);
  }, [setLoading]);
  return null;
}

function FairScene() {
  return (
    <>
      <StarField />
      <Corridor />
      <GridLines />
      <RoomEntranceBanner />
      <StandsManager />
      <LobbyReturnPortal />
      <RoomExitPortal />
      <Player />
    </>
  );
}

function Scene() {
  const isInLobby = useUapaStore((s) => s.isInLobby);

  return (
    <>
      <color attach="background" args={[ENV.neutral]} />
      <fog
        attach="fog"
        args={[ENV.neutral, isInLobby ? 12 : 25, isInLobby ? 42 : 70]}
      />

      <ambientLight intensity={0.42} color={ENV.tertiary} />
      <hemisphereLight
        args={[ENV.tertiary, ENV.neutral, 0.5]}
        position={[0, 20, 0]}
      />
      <directionalLight
        position={[0, 18, 8]}
        intensity={0.8}
        color={ENV.tertiary}
        castShadow={!isInLobby}
      />
      <directionalLight
        position={[0, 10, -20]}
        intensity={0.35}
        color={ENV.primary}
      />

      {isInLobby ? <LobbyScene /> : <FairScene />}

      <EffectComposer>
        <Bloom
          intensity={0.85}
          luminanceThreshold={0.38}
          luminanceSmoothing={0.9}
          mipmapBlur
        />
        <Vignette eskil={false} offset={0.15} darkness={0.42} />
      </EffectComposer>

      <LoadedSignal />
    </>
  );
}

export function Experience() {
  const isInLobby = useUapaStore((s) => s.isInLobby);
  const spawn = isInLobby ? LOBBY_SPAWN : SPAWN_POSITION;

  return (
    <Canvas
      shadows
      camera={{ position: spawn, fov: 75, near: 0.1, far: 100 }}
      gl={{ antialias: true, powerPreference: "high-performance" }}
      style={{ width: "100%", height: "100%" }}
    >
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
    </Canvas>
  );
}
