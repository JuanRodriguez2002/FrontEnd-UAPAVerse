"use client";

import dynamic from "next/dynamic";
import { HUD } from "@/features/metaverso/components/ui/HUD";
import { StandModal } from "@/features/metaverso/components/ui/StandModal";
import { TourControls } from "@/features/metaverso/components/ui/TourControls";
import { FairMap } from "@/features/metaverso/components/ui/FairMap";
import { LoadingScreen } from "@/features/metaverso/components/ui/LoadingScreen";
import { FairBootstrap } from "@/features/metaverso/components/ui/FairBootstrap";
import { RoomPortal } from "@/features/metaverso/components/ui/RoomPortal";
import { RoomTransitionOverlay } from "@/features/metaverso/components/ui/RoomTransitionOverlay";
import { TutorialOverlay } from "@/features/metaverso/components/ui/TutorialOverlay";
import { AIModal } from "@/features/metaverso/components/ui/AIModal";
import { WelcomeScreen } from "@/features/metaverso/components/ui/WelcomeScreen";
import { LobbyReturnModal } from "@/features/metaverso/components/ui/LobbyReturnModal";
import { LobbyDoorSlider } from "@/features/metaverso/components/ui/LobbyDoorSlider";
import { useUapaStore } from "@/features/metaverso/store/useUapaStore";
import "@/features/metaverso/styles/metaverso.css";

const Experience = dynamic(
  () =>
    import("@/features/metaverso/components/canvas/Experience").then(
      (mod) => mod.Experience
    ),
  { ssr: false, loading: () => null }
);

export function MetaversoShell() {
  const appPhase = useUapaStore((s) => s.appPhase);
  const isInLobby = useUapaStore((s) => s.isInLobby);

  return (
    <>
      <FairBootstrap />
      {appPhase !== "welcome" && <Experience />}
      <WelcomeScreen />
      <HUD />
      {isInLobby && <LobbyDoorSlider />}
      {!isInLobby && <FairMap />}
      {!isInLobby && <TourControls />}
      {!isInLobby && <RoomPortal />}
      <LobbyReturnModal />
      <RoomTransitionOverlay />
      <TutorialOverlay />
      <AIModal />
      <StandModal />
      <LoadingScreen />
    </>
  );
}
