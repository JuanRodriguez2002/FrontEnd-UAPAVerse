import {
  buildRoomStands,
  getRoomLayout,
  STANDS_PER_ROOM,
} from "@/features/metaverso/data/stands";
import {
  fetchCategoryRoomCatalog,
  getGlobalStandOffset,
} from "@/features/metaverso/services/category-rooms";

export async function getStandsCatalog(searchParams: URLSearchParams) {
  let rooms;

  try {
    rooms = await fetchCategoryRoomCatalog();
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "No se pudo cargar el catálogo de salas";
    return { error: message, status: 503 as const };
  }

  const roomCount = rooms.length;
  const totalStands = rooms.reduce((sum, room) => sum + room.standCount, 0);
  const roomParam = searchParams.get("room");

  if (!roomCount) {
    return {
      data: {
        totalStands: 0,
        standsPerRoom: STANDS_PER_ROOM,
        roomCount: 0,
        rooms: [],
        catalogSize: 0,
      },
    };
  }

  if (roomParam !== null) {
    const roomIndex = parseInt(roomParam, 10);
    if (Number.isNaN(roomIndex) || roomIndex < 0 || roomIndex >= roomCount) {
      return { error: "Sala no válida", status: 400 as const };
    }

    const room = rooms[roomIndex];
    const globalOffset = getGlobalStandOffset(rooms, roomIndex);
    const stands = buildRoomStands(
      room.templates,
      roomIndex,
      globalOffset
    );
    const layout = getRoomLayout(room.templates.length);

    return {
      data: {
        roomIndex,
        categoryId: room.categoryId,
        name: room.name,
        description: room.description,
        color: room.color,
        standCount: stands.length,
        standsPerRoom: STANDS_PER_ROOM,
        stands,
        layout,
        spawnPosition: layout.spawnPosition,
        spawnLookAt: layout.spawnLookAt,
        entranceBannerZ: layout.entranceBannerZ,
        exitPortalZ: layout.exitPortalZ,
        lobbyReturnPortalZ: layout.lobbyReturnPortalZ,
      },
    };
  }

  return {
    data: {
      totalStands,
      standsPerRoom: STANDS_PER_ROOM,
      roomCount,
      rooms: rooms.map((room) => ({
        index: room.index,
        categoryId: room.categoryId,
        name: room.name,
        description: room.description,
        color: room.color,
        standCount: room.standCount,
      })),
      catalogSize: totalStands,
    },
  };
}
