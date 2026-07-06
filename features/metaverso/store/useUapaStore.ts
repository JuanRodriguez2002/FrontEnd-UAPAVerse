import { create } from "zustand";
import { METAVERSO_API } from "@/features/metaverso/lib/config";
import type { StandProject } from "@/features/metaverso/data/stands";
import { SPAWN_POSITION, getHostPlayerTeleport, getRoomLayout } from "@/features/metaverso/data/stands";
import { LOBBY_LOOK_AT, LOBBY_SPAWN } from "@/features/metaverso/data/lobby";
import { releasePointerLock } from "@/features/metaverso/utils/pointerLock";

export type AppPhase = "welcome" | "lobby" | "fair";

export const TUTORIAL_STORAGE_KEY = "uapaverse-tutorial-v2";

export interface RoomMeta {
  index: number;
  name: string;
  color: string;
  standCount: number;
  categoryId?: number;
  description?: string;
}

interface FairCatalogResponse {
  totalStands: number;
  standsPerRoom: number;
  roomCount: number;
  rooms: RoomMeta[];
}

interface RoomDataResponse {
  roomIndex: number;
  name: string;
  color: string;
  stands: StandProject[];
  spawnPosition: [number, number, number];
  spawnLookAt: [number, number, number];
  entranceBannerZ: number;
  exitPortalZ: number;
  lobbyReturnPortalZ: number;
}

interface UapaState {
  appPhase: AppPhase;
  isInLobby: boolean;
  catalogLoaded: boolean;
  nearbyLobbyRoom: number | null;
  lobbyDoorIndex: number;

  selectedStand: StandProject | null;
  nearbyStand: StandProject | null;
  isModalOpen: boolean;
  isLoading: boolean;
  isTourMode: boolean;
  tourIndex: number;
  playerPosition: [number, number, number];
  isSpeaking: boolean;
  isListening: boolean;
  assistantMessage: string;

  roomsMeta: RoomMeta[];
  roomCount: number;
  totalStands: number;
  currentRoomIndex: number;
  currentRoomStands: StandProject[];
  currentRoomName: string;
  currentRoomColor: string;
  roomCache: Record<number, StandProject[]>;
  spawnPosition: [number, number, number];
  spawnLookAt: [number, number, number];
  entranceBannerZ: number | null;
  exitPortalZ: number;
  lobbyReturnPortalZ: number;
  isLobbyReturnOpen: boolean;
  lobbyReturnCanAutoOpen: boolean;
  isRoomPortalOpen: boolean;
  roomPortalManual: boolean;
  exitPortalCanAutoOpen: boolean;
  isRoomTransitioning: boolean;
  roomTransitionKey: number;
  transitioningToIndex: number | null;
  standsInitialized: boolean;

  nearbyHostStand: StandProject | null;
  highlightedStand: StandProject | null;
  isAIModalOpen: boolean;
  aiModalStand: StandProject | null;
  isTutorialOpen: boolean;
  playerTeleportSeq: number;
  playerTeleport: {
    position: [number, number, number];
    lookAt: [number, number, number];
  } | null;

  setSelectedStand: (stand: StandProject | null) => void;
  setNearbyStand: (stand: StandProject | null) => void;
  setNearbyHostStand: (stand: StandProject | null) => void;
  setHighlightedStand: (stand: StandProject | null) => void;
  openModal: (stand: StandProject) => void;
  closeModal: () => void;
  openAIModal: (
    stand: StandProject,
    options?: { teleportToHost?: boolean }
  ) => void;
  closeAIModal: () => void;
  setTutorialOpen: (open: boolean) => void;
  completeTutorial: () => void;
  setLoading: (loading: boolean) => void;
  setPlayerPosition: (pos: [number, number, number]) => void;
  setSpeaking: (speaking: boolean) => void;
  setListening: (listening: boolean) => void;
  setAssistantMessage: (message: string) => void;
  setRoomPortalOpen: (open: boolean, manual?: boolean) => void;
  setLobbyReturnOpen: (open: boolean, manual?: boolean) => void;
  returnToLobby: () => Promise<void>;
  setNearbyLobbyRoom: (index: number | null) => void;
  lobbyPrevDoor: () => void;
  lobbyNextDoor: () => void;
  loadCatalog: () => Promise<void>;
  enterLobby: () => Promise<void>;
  enterFairFromLobby: (index: number) => Promise<void>;
  loadRoom: (index: number) => Promise<StandProject[]>;
  goToRoom: (index: number) => Promise<void>;
  prefetchRoom: (index: number) => void;
  startTour: (fromIndex?: number) => void;
  stopTour: () => void;
  nextTourStand: () => void;
  prevTourStand: () => void;
  goToTourStand: (index: number) => void;
}

const TRANSITION_MS = 900;
const DEFAULT_LAYOUT = getRoomLayout();

async function fetchCatalog(): Promise<FairCatalogResponse> {
  const res = await fetch(METAVERSO_API.stands);
  if (!res.ok) throw new Error("No se pudo cargar el catálogo");
  return res.json();
}

async function fetchRoom(index: number): Promise<RoomDataResponse> {
  const res = await fetch(`${METAVERSO_API.stands}?room=${index}`);
  if (!res.ok) throw new Error(`No se pudo cargar la sala ${index}`);
  return res.json();
}

export const useUapaStore = create<UapaState>((set, get) => ({
  appPhase: "welcome",
  isInLobby: false,
  catalogLoaded: false,
  nearbyLobbyRoom: null,
  lobbyDoorIndex: 0,

  selectedStand: null,
  nearbyStand: null,
  isModalOpen: false,
  isLoading: true,
  isTourMode: false,
  tourIndex: 0,
  playerPosition: [...SPAWN_POSITION] as [number, number, number],
  isSpeaking: false,
  isListening: false,
  assistantMessage: "",

  roomsMeta: [],
  roomCount: 0,
  totalStands: 0,
  currentRoomIndex: 0,
  currentRoomStands: [],
  currentRoomName: "",
  currentRoomColor: "#00d4ff",
  roomCache: {},
  spawnPosition: [...SPAWN_POSITION] as [number, number, number],
  spawnLookAt: [0, 1.6, 0] as [number, number, number],
  entranceBannerZ: null,
  exitPortalZ: -16,
  lobbyReturnPortalZ: DEFAULT_LAYOUT.lobbyReturnPortalZ,
  isLobbyReturnOpen: false,
  lobbyReturnCanAutoOpen: true,
  isRoomPortalOpen: false,
  roomPortalManual: false,
  exitPortalCanAutoOpen: true,
  isRoomTransitioning: false,
  roomTransitionKey: 0,
  transitioningToIndex: null,
  standsInitialized: false,

  nearbyHostStand: null,
  highlightedStand: null,
  isAIModalOpen: false,
  aiModalStand: null,
  isTutorialOpen: false,
  playerTeleportSeq: 0,
  playerTeleport: null,

  setSelectedStand: (stand) => set({ selectedStand: stand }),
  setNearbyStand: (stand) => set({ nearbyStand: stand }),
  setNearbyHostStand: (stand) => set({ nearbyHostStand: stand }),
  setHighlightedStand: (stand) => set({ highlightedStand: stand }),
  openModal: (stand) => {
    releasePointerLock();
    set({ selectedStand: stand, isModalOpen: true, assistantMessage: "" });
  },
  closeModal: () => {
    set({ isModalOpen: false, isSpeaking: false, isListening: false });
  },
  openAIModal: (stand, options) => {
    releasePointerLock();
    const teleport = options?.teleportToHost
      ? getHostPlayerTeleport(stand)
      : null;

    set((state) => ({
      aiModalStand: stand,
      selectedStand: stand,
      isAIModalOpen: true,
      isModalOpen: false,
      assistantMessage: "",
      isSpeaking: false,
      isListening: false,
      nearbyHostStand: teleport ? stand : state.nearbyHostStand,
      playerPosition: teleport ? teleport.position : state.playerPosition,
      playerTeleport: teleport,
      playerTeleportSeq: teleport ? state.playerTeleportSeq + 1 : state.playerTeleportSeq,
    }));
  },
  closeAIModal: () => {
    set({
      isAIModalOpen: false,
      isSpeaking: false,
      isListening: false,
    });
  },
  setTutorialOpen: (open) => set({ isTutorialOpen: open }),
  completeTutorial: () => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem(TUTORIAL_STORAGE_KEY, "1");
    }
    set({ isTutorialOpen: false });
  },
  setLoading: (loading) => set({ isLoading: loading }),
  setPlayerPosition: (pos) => set({ playerPosition: pos }),
  setSpeaking: (speaking) => set({ isSpeaking: speaking }),
  setListening: (listening) => set({ isListening: listening }),
  setAssistantMessage: (message) => set({ assistantMessage: message }),
  setNearbyLobbyRoom: (index) => set({ nearbyLobbyRoom: index }),

  lobbyPrevDoor: () => {
    const { lobbyDoorIndex, roomCount, nearbyLobbyRoom } = get();
    if (roomCount <= 1) return;
    const next = (lobbyDoorIndex - 1 + roomCount) % roomCount;
    set({
      lobbyDoorIndex: next,
      ...(nearbyLobbyRoom !== null ? { nearbyLobbyRoom: next } : {}),
    });
  },

  lobbyNextDoor: () => {
    const { lobbyDoorIndex, roomCount, nearbyLobbyRoom } = get();
    if (roomCount <= 1) return;
    const next = (lobbyDoorIndex + 1) % roomCount;
    set({
      lobbyDoorIndex: next,
      ...(nearbyLobbyRoom !== null ? { nearbyLobbyRoom: next } : {}),
    });
  },

  setRoomPortalOpen: (open, manual = false) => {
    if (!open) {
      const [, , pz] = get().playerPosition;
      const inZone = pz <= get().exitPortalZ + 1.5;
      set({
        isRoomPortalOpen: false,
        roomPortalManual: false,
        exitPortalCanAutoOpen:
          !manual && inZone ? false : get().exitPortalCanAutoOpen,
      });
      return;
    }
    set({
      isRoomPortalOpen: true,
      roomPortalManual: manual,
    });
  },

  setLobbyReturnOpen: (open, manual = false) => {
    if (!open) {
      const [, , pz] = get().playerPosition;
      const inZone = pz >= get().lobbyReturnPortalZ - 1.5;
      set({
        isLobbyReturnOpen: false,
        lobbyReturnCanAutoOpen:
          !manual && inZone ? false : get().lobbyReturnCanAutoOpen,
      });
      return;
    }
    releasePointerLock();
    set({ isLobbyReturnOpen: true });
  },

  returnToLobby: async () => {
    set({
      isLobbyReturnOpen: false,
      isRoomTransitioning: true,
      isRoomPortalOpen: false,
      isTourMode: false,
    });

    if (document.pointerLockElement) {
      document.exitPointerLock();
    }

    await new Promise((r) => setTimeout(r, TRANSITION_MS));

    set({
      appPhase: "lobby",
      isInLobby: true,
      isRoomTransitioning: false,
      currentRoomIndex: -1,
      currentRoomStands: [],
      currentRoomName: "Lobby UAPAVERSE",
      currentRoomColor: "#00d4ff",
      spawnPosition: [...LOBBY_SPAWN] as [number, number, number],
      spawnLookAt: [...LOBBY_LOOK_AT] as [number, number, number],
      entranceBannerZ: null,
      playerPosition: [...LOBBY_SPAWN] as [number, number, number],
      nearbyLobbyRoom: null,
      lobbyDoorIndex: 0,
      nearbyStand: null,
      nearbyHostStand: null,
      highlightedStand: null,
      lobbyReturnCanAutoOpen: true,
      roomTransitionKey: get().roomTransitionKey + 1,
    });
  },

  loadRoom: async (index) => {
    const { roomCache } = get();
    if (roomCache[index]) return roomCache[index];

    const data = await fetchRoom(index);
    const cache = { ...get().roomCache, [index]: data.stands };
    set({ roomCache: cache });
    return data.stands;
  },

  prefetchRoom: (index) => {
    const { roomCount, roomCache, loadRoom } = get();
    if (index < 0 || index >= roomCount || roomCache[index]) return;
    void loadRoom(index);
  },

  loadCatalog: async () => {
    if (get().catalogLoaded) return;
    set({ isLoading: true });
    try {
      const catalog = await fetchCatalog();
      set({
        roomsMeta: catalog.rooms,
        roomCount: catalog.roomCount,
        totalStands: catalog.totalStands,
        catalogLoaded: true,
      });
    } catch (err) {
      console.error(err);
    } finally {
      set({ isLoading: false });
    }
  },

  enterLobby: async () => {
    const state = get();
    if (!state.catalogLoaded) {
      await get().loadCatalog();
    }

    set({
      appPhase: "lobby",
      isInLobby: true,
      standsInitialized: true,
      currentRoomIndex: -1,
      currentRoomStands: [],
      currentRoomName: "Lobby UAPAVERSE",
      currentRoomColor: "#00d4ff",
      spawnPosition: [...LOBBY_SPAWN] as [number, number, number],
      spawnLookAt: [...LOBBY_LOOK_AT] as [number, number, number],
      entranceBannerZ: null,
      playerPosition: [...LOBBY_SPAWN] as [number, number, number],
      nearbyLobbyRoom: null,
      lobbyDoorIndex: 0,
      nearbyStand: null,
      nearbyHostStand: null,
      highlightedStand: null,
      isTourMode: false,
      isRoomPortalOpen: false,
      isLobbyReturnOpen: false,
      roomTransitionKey: get().roomTransitionKey + 1,
      isTutorialOpen:
        typeof window !== "undefined" &&
        !sessionStorage.getItem(TUTORIAL_STORAGE_KEY),
    });
  },

  enterFairFromLobby: async (index) => {
    await get().goToRoom(index);
  },

  goToRoom: async (index) => {
    const state = get();
    if (
      (!state.isInLobby && index === state.currentRoomIndex) ||
      index < 0 ||
      index >= state.roomCount ||
      state.isRoomTransitioning
    ) {
      return;
    }

    set({
      isRoomTransitioning: true,
      isRoomPortalOpen: false,
      isLobbyReturnOpen: false,
      isTourMode: false,
      isInLobby: false,
      appPhase: "fair",
      nearbyStand: null,
      nearbyHostStand: null,
      nearbyLobbyRoom: null,
      highlightedStand: null,
      transitioningToIndex: index,
    });

    if (document.pointerLockElement) {
      document.exitPointerLock();
    }

    await new Promise((r) => setTimeout(r, TRANSITION_MS));

    try {
      const data = await fetchRoom(index);
      const cache = { ...get().roomCache, [index]: data.stands };

      set({
        currentRoomIndex: index,
        currentRoomStands: data.stands,
        currentRoomName: data.name,
        currentRoomColor: data.color,
        roomCache: cache,
        spawnPosition: data.spawnPosition,
        spawnLookAt: data.spawnLookAt,
        entranceBannerZ: data.entranceBannerZ,
        exitPortalZ: data.exitPortalZ,
        lobbyReturnPortalZ: data.lobbyReturnPortalZ,
        playerPosition: [...data.spawnPosition],
        tourIndex: 0,
        exitPortalCanAutoOpen: true,
        lobbyReturnCanAutoOpen: true,
        roomTransitionKey: get().roomTransitionKey + 1,
        transitioningToIndex: null,
      });

      get().prefetchRoom(index + 1);
      get().prefetchRoom(index - 1);
    } catch (err) {
      console.error(err);
    } finally {
      set({ isRoomTransitioning: false, transitioningToIndex: null });
    }
  },

  startTour: (fromIndex) => {
    const { nearbyStand, currentRoomStands } = get();
    let index = fromIndex ?? 0;
    if (fromIndex === undefined && nearbyStand) {
      index = currentRoomStands.findIndex((s) => s.id === nearbyStand.id);
      if (index < 0) index = 0;
    }
    set({
      isTourMode: true,
      tourIndex: index,
      nearbyStand: currentRoomStands[index] ?? null,
      isRoomPortalOpen: false,
      isLobbyReturnOpen: false,
    });
  },

  stopTour: () => set({ isTourMode: false, nearbyStand: null }),

  nextTourStand: () => {
    const { tourIndex, currentRoomStands } = get();
    const next = Math.min(tourIndex + 1, currentRoomStands.length - 1);
    set({
      tourIndex: next,
      nearbyStand: currentRoomStands[next] ?? null,
    });
  },

  prevTourStand: () => {
    const { tourIndex, currentRoomStands } = get();
    const prev = Math.max(tourIndex - 1, 0);
    set({
      tourIndex: prev,
      nearbyStand: currentRoomStands[prev] ?? null,
    });
  },

  goToTourStand: (index) => {
    const { currentRoomStands } = get();
    const clamped = Math.max(0, Math.min(index, currentRoomStands.length - 1));
    set({
      tourIndex: clamped,
      nearbyStand: currentRoomStands[clamped] ?? null,
    });
  },
}));
