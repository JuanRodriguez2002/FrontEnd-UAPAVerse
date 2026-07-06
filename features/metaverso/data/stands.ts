import type { StandApiFields, StandTemplate } from "./standTemplates";
import * as THREE from "three";

export interface StandProject extends StandApiFields {
  id: string;
  title: string;
  organization: string;
  career: string;
  shortDescription: string;
  detailedDescription: string;
  features: string[];
  videoUrl: string;
  demoUrl: string;
  gallery: string[];
  color: string;
  position: [number, number, number];
  rotation: number;
  side: "left" | "right";
  viewPosition: [number, number, number];
  lookAt: [number, number, number];
  entranceWorld: [number, number, number];
  roomIndex?: number;
  globalIndex?: number;
}

export const BOOTH_WIDTH = 7;
export const BOOTH_DEPTH = 6;
export const BOOTH_HEIGHT = 3.8;

export const STANDS_PER_ROOM = 6;
export const STAND_GAP = 1.5;
export const CORRIDOR_SPACING = BOOTH_WIDTH + STAND_GAP;
export const STAND_X = 4;
export const CORRIDOR_WIDTH = 3.2;
export const SPAWN_DISTANCE_FROM_BANNER = 10;
export const LOBBY_RETURN_OFFSET_FROM_SPAWN = 2.5;
/** Separación entre el borde frontal de los stands y el banner de entrada (m) */
export const ENTRANCE_BANNER_GAP_FROM_STANDS = 2;
export const EXIT_PORTAL_MARGIN = 2.5;

export interface RoomLayout {
  standRows: number;
  firstStandZ: number;
  lastStandZ: number;
  corridorLength: number;
  walkableHalfZ: number;
  playerMaxX: number;
  spawnPosition: [number, number, number];
  spawnLookAt: [number, number, number];
  entranceBannerZ: number;
  exitPortalZ: number;
  lobbyReturnPortalZ: number;
}

export function getRoomLayout(standCount = STANDS_PER_ROOM): RoomLayout {
  const rows = Math.max(1, Math.ceil(standCount / 2));
  const rowsSpan = rows > 1 ? (rows - 1) * CORRIDOR_SPACING : 0;
  const firstStandZ = -rowsSpan / 2;
  const lastStandZ = firstStandZ + rowsSpan;
  const standEntranceEdgeZ = lastStandZ + BOOTH_WIDTH / 2;
  const entranceBannerZ =
    standEntranceEdgeZ + ENTRANCE_BANNER_GAP_FROM_STANDS;
  const spawnZ = entranceBannerZ + SPAWN_DISTANCE_FROM_BANNER;
  const entranceExtent = spawnZ + LOBBY_RETURN_OFFSET_FROM_SPAWN + 2;
  const backExtent =
    Math.abs(firstStandZ) + BOOTH_DEPTH + EXIT_PORTAL_MARGIN + 8;
  const corridorLength = entranceExtent + backExtent + 8;
  const walkableHalfZ = corridorLength / 2 - 2;
  const playerMaxX = STAND_X + BOOTH_DEPTH - 0.5;

  return {
    standRows: rows,
    firstStandZ,
    lastStandZ,
    corridorLength,
    walkableHalfZ,
    playerMaxX,
    spawnPosition: [0, 1.6, spawnZ],
    spawnLookAt: [0, 1.6, entranceBannerZ],
    entranceBannerZ,
    exitPortalZ: -walkableHalfZ + EXIT_PORTAL_MARGIN,
    lobbyReturnPortalZ: spawnZ + LOBBY_RETURN_OFFSET_FROM_SPAWN,
  };
}

const L = getRoomLayout();

export const FIRST_STAND_Z = L.firstStandZ;
export const LAST_STAND_Z = L.lastStandZ;
export const CORRIDOR_LENGTH = L.corridorLength;
export const WALKABLE_HALF_Z = L.walkableHalfZ;
export const PLAYER_MAX_X = L.playerMaxX;
export const SPAWN_POSITION = L.spawnPosition;
export const SPAWN_LOOK_AT = L.spawnLookAt;
export const EXIT_PORTAL_Z = L.exitPortalZ;

export function getRoomBannerLabels(
  roomName: string,
  roomIndex: number
): { salaLabel: string; title: string } {
  const parts = roomName.split("—");
  const theme =
    parts[1]?.trim() || parts[0]?.trim() || `Sala ${roomIndex + 1}`;
  const numMatch = roomName.match(/Sala\s*(\d+)/i);
  const salaNum = numMatch ? numMatch[1] : String(roomIndex + 1).padStart(2, "0");
  return {
    salaLabel: `SALA ${salaNum}`,
    title: theme.toUpperCase(),
  };
}

function buildCorridorStand(
  index: number,
  data: Omit<
    StandProject,
    | "position"
    | "rotation"
    | "side"
    | "viewPosition"
    | "lookAt"
    | "entranceWorld"
    | "roomIndex"
    | "globalIndex"
  >,
  layout: RoomLayout,
  roomIndex: number,
  globalIndex: number
): StandProject {
  const side: "left" | "right" = index % 2 === 0 ? "left" : "right";
  const row = Math.floor(index / 2);
  const z = layout.firstStandZ + row * CORRIDOR_SPACING;
  const x = side === "left" ? -STAND_X : STAND_X;
  const rotation = side === "left" ? Math.PI / 2 : -Math.PI / 2;
  const entranceOffset = side === "left" ? TOUR_ENTRANCE_OFFSET : -TOUR_ENTRANCE_OFFSET;

  const tourCamera = getTourCameraForStand({ position: [x, 0, z], rotation });
  const viewPosition = tourCamera.viewPosition;
  const lookAt = tourCamera.lookAt;

  const spatial = {
    position: [x, 0, z] as [number, number, number],
    rotation,
    side,
    entranceWorld: [x + entranceOffset, 0, z] as [number, number, number],
    viewPosition,
    lookAt,
  };

  return {
    ...data,
    ...spatial,
    roomIndex,
    globalIndex,
  };
}

/** Construye los stands de una sala (máx. 6) con posiciones 3D */
export function buildRoomStands(
  templates: StandTemplate[],
  roomIndex: number,
  globalStartIndex = roomIndex * STANDS_PER_ROOM
): StandProject[] {
  const layout = getRoomLayout(templates.length);
  return templates.map((tpl, index) =>
    buildCorridorStand(index, tpl, layout, roomIndex, globalStartIndex + index)
  );
}

export const INTERACTION_DISTANCE = 4;
export const AIM_DOT_THRESHOLD = 0.82;
/**
 * Coordenadas locales del stand: +Z = entrada/pasillo, -Z = fondo con paneles.
 * Cámara en el pasillo mirando hacia el interior.
 */
const TOUR_ENTRANCE_LOCAL_Z = 0.35;
const TOUR_DISTANCE_FROM_STAND = 4.0;
const TOUR_CAM_LOCAL_Z = TOUR_ENTRANCE_LOCAL_Z + TOUR_DISTANCE_FROM_STAND;
const TOUR_CAM_LOCAL_Y = 1.6;
const TOUR_LOOK_LOCAL_Z = -BOOTH_DEPTH * 0.58;
const TOUR_LOOK_LOCAL_Y = 1.48;
const TOUR_ENTRANCE_OFFSET = 0.3;

function standLocalToWorld(
  standX: number,
  standZ: number,
  rotation: number,
  localX: number,
  localY: number,
  localZ: number
): [number, number, number] {
  const v = new THREE.Vector3(localX, localY, localZ).applyAxisAngle(
    new THREE.Vector3(0, 1, 0),
    rotation
  );
  return [standX + v.x, v.y, standZ + v.z];
}

/** Cámara del tour guiado — frente al stand, mirada rotada 180° al interior */
export function getTourCameraForStand(stand: {
  position: [number, number, number];
  rotation: number;
}): {
  viewPosition: [number, number, number];
  lookAt: [number, number, number];
} {
  const [sx, , sz] = stand.position;
  const viewPosition = standLocalToWorld(
    sx,
    sz,
    stand.rotation,
    0,
    TOUR_CAM_LOCAL_Y,
    TOUR_CAM_LOCAL_Z
  );
  const focus = standLocalToWorld(
    sx,
    sz,
    stand.rotation,
    0,
    TOUR_LOOK_LOCAL_Y,
    TOUR_LOOK_LOCAL_Z
  );

  return {
    viewPosition,
    lookAt: [
      2 * viewPosition[0] - focus[0],
      focus[1],
      2 * viewPosition[2] - focus[2],
    ],
  };
}

const ENTRANCE_Z = 0.35;
/** Centrado junto al pilar lateral (pared del stand) */
const WALL_SLOT_X = BOOTH_WIDTH / 2 - 0.28;

export function getHostLocalOffset(_stand: StandProject): THREE.Vector3 {
  return new THREE.Vector3(-WALL_SLOT_X, 0, ENTRANCE_Z);
}

/** Letrero exterior — pared lateral opuesta al avatar */
export function getExteriorSignLocalOffset(_stand: StandProject): THREE.Vector3 {
  return new THREE.Vector3(WALL_SLOT_X, 0, ENTRANCE_Z);
}

/** Stand al que apunta la cámara (cerca + en el cono de mira) */
export function getAimedStand(
  camera: THREE.Camera,
  stands: StandProject[],
  maxDistance = INTERACTION_DISTANCE + 1.5
): StandProject | null {
  const forward = new THREE.Vector3();
  camera.getWorldDirection(forward);
  const origin = camera.position;

  let best: StandProject | null = null;
  let bestScore = -Infinity;

  for (const stand of stands) {
    const inside = isPlayerInsideBooth(stand, origin.x, origin.z);
    const [ex, , ez] = stand.entranceWorld;
    const target = new THREE.Vector3(ex, 1.55, ez);
    const toTarget = target.clone().sub(origin);
    const dist = toTarget.length();

    if (!inside && dist > maxDistance) continue;

    toTarget.normalize();
    const dot = forward.dot(toTarget);
    if (!inside && dot < AIM_DOT_THRESHOLD) continue;

    const score = dot * 2 - dist * 0.08;
    if (score > bestScore) {
      bestScore = score;
      best = stand;
    }
  }

  return best;
}

export function isPlayerInsideBooth(
  stand: StandProject,
  px: number,
  pz: number
): boolean {
  const halfW = BOOTH_WIDTH / 2 - 0.2;
  const [sx, , sz] = stand.position;

  if (stand.side === "left") {
    return (
      px <= sx + 0.5 &&
      px >= sx - BOOTH_DEPTH + 0.3 &&
      Math.abs(pz - sz) <= halfW
    );
  }
  return (
    px >= sx - 0.5 &&
    px <= sx + BOOTH_DEPTH - 0.3 &&
    Math.abs(pz - sz) <= halfW
  );
}

export function getDistanceToStand(
  stand: StandProject,
  px: number,
  py: number,
  pz: number
): number {
  const [ex, , ez] = stand.entranceWorld;
  const dx = px - ex;
  const dy = py - 1.6;
  const dz = pz - ez;
  return Math.sqrt(dx * dx + dy * dy + dz * dz);
}

export function getStandDistance(
  px: number,
  pz: number,
  stand: StandProject
): number {
  const dx = px - stand.position[0];
  const dz = pz - stand.position[2];
  return Math.sqrt(dx * dx + dz * dz);
}

export function getHostWorldPosition(
  stand: StandProject
): [number, number, number] {
  const offset = getHostLocalOffset(stand).applyAxisAngle(
    new THREE.Vector3(0, 1, 0),
    stand.rotation
  );
  return [
    stand.position[0] + offset.x,
    stand.position[1] + 1.05,
    stand.position[2] + offset.z,
  ];
}

/** Posición frente al avatar (pasillo) al salir del modal del stand */
export function getHostPlayerTeleport(stand: StandProject): {
  position: [number, number, number];
  lookAt: [number, number, number];
} {
  const hostLocal = getHostLocalOffset(stand);
  const playerLocal = hostLocal.clone().add(new THREE.Vector3(0, 0, 0.8));

  const hostRotated = hostLocal
    .clone()
    .applyAxisAngle(new THREE.Vector3(0, 1, 0), stand.rotation);
  const playerRotated = playerLocal.applyAxisAngle(
    new THREE.Vector3(0, 1, 0),
    stand.rotation
  );

  return {
    position: [
      stand.position[0] + playerRotated.x,
      1.6,
      stand.position[2] + playerRotated.z,
    ],
    lookAt: [
      stand.position[0] + hostRotated.x,
      1.45,
      stand.position[2] + hostRotated.z,
    ],
  };
}

/** ~1 m — solo activa al estar muy cerca del avatar */
export const HOST_INTERACTION_DISTANCE = 0.95;
