import { STAND_TEMPLATES, type StandTemplate } from "@/features/metaverso/data/standTemplates";
import { STANDS_PER_ROOM } from "@/features/metaverso/data/stands";

export const DEFAULT_TOTAL_STANDS = 100;

const ROOM_THEMES = [
  "Innovación Digital",
  "Inteligencia Artificial",
  "Ciberseguridad",
  "Desarrollo Web",
  "Cloud & DevOps",
  "IoT y Robótica",
  "Educación Virtual",
  "Emprendimiento Tech",
  "Data Science",
  "Experiencia de Usuario",
];

const ROOM_COLORS = [
  "#00d4ff",
  "#7b68ee",
  "#00ffaa",
  "#ff6b9d",
  "#ffd700",
  "#ff8c42",
  "#4ecdc4",
  "#a78bfa",
  "#38bdf8",
  "#f472b6",
];

export function getRoomName(roomIndex: number): string {
  const theme = ROOM_THEMES[roomIndex % ROOM_THEMES.length];
  return `Sala ${roomIndex + 1} — ${theme}`;
}

export function getRoomColor(roomIndex: number): string {
  return ROOM_COLORS[roomIndex % ROOM_COLORS.length];
}

/** Expande plantillas base hasta N stands (simula catálogo grande de API) */
export function getAllStandTemplates(total = DEFAULT_TOTAL_STANDS): StandTemplate[] {
  const base = STAND_TEMPLATES;
  const result: StandTemplate[] = [];

  for (let i = 0; i < total; i++) {
    const tpl = base[i % base.length];
    const edition = Math.floor(i / base.length);

    result.push({
      ...tpl,
      id: edition === 0 ? tpl.id : `${tpl.id}-e${edition + 1}`,
      title:
        edition === 0
          ? tpl.title
          : `${tpl.title} · Vol. ${edition + 1}`,
      shortDescription:
        edition === 0
          ? tpl.shortDescription
          : `${tpl.shortDescription} (Edición ampliada ${edition + 1})`,
      color: ROOM_COLORS[i % ROOM_COLORS.length],
    });
  }

  return result;
}

export function getRoomCount(totalStands = DEFAULT_TOTAL_STANDS): number {
  return Math.ceil(totalStands / STANDS_PER_ROOM);
}

export function getRoomTemplates(
  roomIndex: number,
  totalStands = DEFAULT_TOTAL_STANDS
): StandTemplate[] {
  const all = getAllStandTemplates(totalStands);
  return sliceRoomTemplates(all, roomIndex);
}

export function sliceRoomTemplates(
  templates: StandTemplate[],
  roomIndex: number
): StandTemplate[] {
  const start = roomIndex * STANDS_PER_ROOM;
  return templates.slice(start, start + STANDS_PER_ROOM);
}

export function getRoomCountFromTemplates(templates: StandTemplate[]): number {
  if (!templates.length) return 0;
  return Math.ceil(templates.length / STANDS_PER_ROOM);
}

export function getRoomNameFromTemplates(
  roomIndex: number,
  templates: StandTemplate[]
): string {
  const first = sliceRoomTemplates(templates, roomIndex)[0];
  const category = first?.categoryName?.trim();
  if (category) {
    return `Sala ${roomIndex + 1} — ${category}`;
  }
  return getRoomName(roomIndex);
}
