"use client";

import { LobbyHall } from "./LobbyEnvironment";
import { LobbyInfoBoards } from "./LobbyInfoBoards";
import { LobbyRoomPortals } from "./LobbyRoomPortals";
import { LobbyDoorLogos } from "./LobbyDoorLogos";
import { Player } from "./Player";

export function LobbyScene() {
  return (
    <>
      <LobbyHall />
      <LobbyInfoBoards />
      <LobbyRoomPortals />
      <LobbyDoorLogos />
      <Player />
    </>
  );
}