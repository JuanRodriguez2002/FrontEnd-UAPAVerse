import type { StandProject } from "@/features/metaverso/data/stands";
import {
  BOOTH_WIDTH,
  BOOTH_DEPTH,
  PLAYER_MAX_X,
  WALKABLE_HALF_Z,
} from "@/features/metaverso/data/stands";

export const PLAYER_RADIUS = 0.35;

export interface CollisionBox {
  minX: number;
  maxX: number;
  minZ: number;
  maxZ: number;
}

const W = BOOTH_WIDTH;
const D = BOOTH_DEPTH;
const WALL_T = 0.22;

export function getBoothCollisionBoxes(stand: StandProject): CollisionBox[] {
  const [sx, , sz] = stand.position;
  const boxes: CollisionBox[] = [];

  if (stand.side === "left") {
    const backX = sx - D + WALL_T;
    boxes.push({
      minX: backX - WALL_T,
      maxX: backX + WALL_T,
      minZ: sz - W / 2,
      maxZ: sz + W / 2,
    });
    boxes.push({
      minX: sx - D + WALL_T,
      maxX: sx + WALL_T,
      minZ: sz + W / 2 - WALL_T,
      maxZ: sz + W / 2 + WALL_T,
    });
    boxes.push({
      minX: sx - D + WALL_T,
      maxX: sx + WALL_T,
      minZ: sz - W / 2 - WALL_T,
      maxZ: sz - W / 2 + WALL_T,
    });
    boxes.push({
      minX: sx - WALL_T,
      maxX: sx + WALL_T,
      minZ: sz + W / 2 - 0.35 - WALL_T,
      maxZ: sz + W / 2 - 0.35 + WALL_T,
    });
    boxes.push({
      minX: sx - WALL_T,
      maxX: sx + WALL_T,
      minZ: sz - W / 2 + 0.35 - WALL_T,
      maxZ: sz - W / 2 + 0.35 + WALL_T,
    });
  } else {
    const backX = sx + D - WALL_T;
    boxes.push({
      minX: backX - WALL_T,
      maxX: backX + WALL_T,
      minZ: sz - W / 2,
      maxZ: sz + W / 2,
    });
    boxes.push({
      minX: sx - WALL_T,
      maxX: sx + D - WALL_T,
      minZ: sz + W / 2 - WALL_T,
      maxZ: sz + W / 2 + WALL_T,
    });
    boxes.push({
      minX: sx - WALL_T,
      maxX: sx + D - WALL_T,
      minZ: sz - W / 2 - WALL_T,
      maxZ: sz - W / 2 + WALL_T,
    });
    boxes.push({
      minX: sx - WALL_T,
      maxX: sx + WALL_T,
      minZ: sz + W / 2 - 0.35 - WALL_T,
      maxZ: sz + W / 2 - 0.35 + WALL_T,
    });
    boxes.push({
      minX: sx - WALL_T,
      maxX: sx + WALL_T,
      minZ: sz - W / 2 + 0.35 - WALL_T,
      maxZ: sz - W / 2 + 0.35 + WALL_T,
    });
  }

  return boxes;
}

function getCorridorWallBoxes(): CollisionBox[] {
  const halfLen = WALKABLE_HALF_Z;
  return [
    {
      minX: -PLAYER_MAX_X - 0.5,
      maxX: -PLAYER_MAX_X,
      minZ: -halfLen,
      maxZ: halfLen,
    },
    {
      minX: PLAYER_MAX_X,
      maxX: PLAYER_MAX_X + 0.5,
      minZ: -halfLen,
      maxZ: halfLen,
    },
  ];
}

let cachedBoxes: CollisionBox[] | null = null;
let cachedKey = "";

function getAllCollisionBoxes(stands: StandProject[]): CollisionBox[] {
  const key = stands.map((s) => s.id).join(",");
  if (!cachedBoxes || cachedKey !== key) {
    cachedKey = key;
    cachedBoxes = [
      ...stands.flatMap(getBoothCollisionBoxes),
      ...getCorridorWallBoxes(),
    ];
  }
  return cachedBoxes;
}

function pushOutOfBox(
  px: number,
  pz: number,
  box: CollisionBox
): [number, number] {
  const closestX = Math.max(box.minX, Math.min(px, box.maxX));
  const closestZ = Math.max(box.minZ, Math.min(pz, box.maxZ));
  const dx = px - closestX;
  const dz = pz - closestZ;
  const distSq = dx * dx + dz * dz;

  if (distSq === 0) {
    const penL = px - box.minX;
    const penR = box.maxX - px;
    const penB = pz - box.minZ;
    const penT = box.maxZ - pz;
    const minPen = Math.min(penL, penR, penB, penT);
    if (minPen === penL) return [box.minX - PLAYER_RADIUS, pz];
    if (minPen === penR) return [box.maxX + PLAYER_RADIUS, pz];
    if (minPen === penB) return [px, box.minZ - PLAYER_RADIUS];
    return [px, box.maxZ + PLAYER_RADIUS];
  }

  if (distSq < PLAYER_RADIUS * PLAYER_RADIUS) {
    const dist = Math.sqrt(distSq);
    const overlap = PLAYER_RADIUS - dist;
    return [px + (dx / dist) * overlap, pz + (dz / dist) * overlap];
  }

  return [px, pz];
}

export function resolveCollisions(
  px: number,
  pz: number,
  stands: StandProject[]
): [number, number] {
  let x = px;
  let z = pz;
  const boxes = getAllCollisionBoxes(stands);

  for (let iter = 0; iter < 4; iter++) {
    for (const box of boxes) {
      [x, z] = pushOutOfBox(x, z, box);
    }
  }

  return [x, z];
}
