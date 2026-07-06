import type { RoomMeta } from "@/features/metaverso/store/useUapaStore";

/** Pasillo del lobby — el jugador camina de +Z hacia -Z */
export const LOBBY_CORRIDOR_HALF_W = 2.75;
export const LOBBY_CORRIDOR_LENGTH = 38;
export const LOBBY_SPAWN_Z = 17;
export const LOBBY_CORRIDOR_END_Z = -17;
export const LOBBY_CORRIDOR_CENTER_Z =
  (LOBBY_SPAWN_Z + LOBBY_CORRIDOR_END_Z) / 2;

export const LOBBY_SPAWN: [number, number, number] = [0, 1.6, LOBBY_SPAWN_Z];
export const LOBBY_LOOK_AT: [number, number, number] = [0, 1.6, 8];

/** Puertas al fondo del pasillo */
export const LOBBY_CAROUSEL_Z = LOBBY_CORRIDOR_END_Z + 0.35;
export const LOBBY_CAROUSEL_SPACING = 7.2;
export const LOBBY_CAROUSEL_TRIGGER = 3.5;
export const LOBBY_DOOR_OPENING_HALF = 1.15;

/** Compat con colisiones antiguas */
export const LOBBY_HALF_W = LOBBY_CORRIDOR_HALF_W;
export const LOBBY_HALF_Z = LOBBY_CORRIDOR_LENGTH / 2;

export interface LobbyInfoBoard {
  id: string;
  side: "left" | "right";
  wallZ: number;
  revealZ: number;
  title: string;
  lines: string[];
  accent?: "primary" | "secondary";
}

export const LOBBY_INFO_BOARDS: LobbyInfoBoard[] = [
  {
    id: "welcome",
    side: "left",
    wallZ: 11,
    revealZ: 15,
    accent: "primary",
    title: "Bienvenido a UAPAVERSE",
    lines: [
      "Feria tecnológica virtual de la UAPA.",
      "Camina por el pasillo hacia las salas.",
    ],
  },
  {
    id: "controls",
    side: "right",
    wallZ: 8,
    revealZ: 12,
    accent: "primary",
    title: "Controles",
    lines: [
      "WASD — moverte · Mouse — mirar",
      "Sigue las flechas del suelo.",
    ],
  },
  {
    id: "doors",
    side: "left",
    wallZ: 2,
    revealZ: 6,
    accent: "secondary",
    title: "Salas temáticas",
    lines: [
      "Al final del pasillo elige",
      "una puerta con el carrusel.",
    ],
  },
  {
    id: "carousel-nav",
    side: "right",
    wallZ: -3,
    revealZ: 1,
    accent: "secondary",
    title: "Navegar salas",
    lines: [
      "Botón ◀ ▶ cambia de sala.",
      "Solo verás una puerta a la vez.",
    ],
  },
  {
    id: "carousel-enter",
    side: "left",
    wallZ: -8,
    revealZ: -4,
    accent: "primary",
    title: "Entrar a una sala",
    lines: [
      "Acércate a menos de 3,5 m.",
      "Pulsa E para comenzar.",
    ],
  },
];

export function isNearLobbyCarousel(px: number, pz: number): boolean {
  const dx = px;
  const dz = pz - LOBBY_CAROUSEL_Z;
  return Math.hypot(dx, dz) <= LOBBY_CAROUSEL_TRIGGER;
}

export function resolveLobbyCollisions(px: number, pz: number): [number, number] {
  const margin = 0.35;
  const x = Math.max(
    -LOBBY_CORRIDOR_HALF_W + margin,
    Math.min(LOBBY_CORRIDOR_HALF_W - margin, px)
  );
  const z = Math.max(
    LOBBY_CORRIDOR_END_Z + margin,
    Math.min(LOBBY_SPAWN_Z - margin, pz)
  );
  return [x, z];
}

export function getRoomLabel(room: RoomMeta): string {
  const parts = room.name.split("—");
  return parts[1]?.trim() || parts[0]?.trim() || `Sala ${room.index + 1}`;
}
