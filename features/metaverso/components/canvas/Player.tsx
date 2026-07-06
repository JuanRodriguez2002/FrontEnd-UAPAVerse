"use client";

import { useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import {
  INTERACTION_DISTANCE,
  PLAYER_MAX_X,
  WALKABLE_HALF_Z,
  isPlayerInsideBooth,
  getDistanceToStand,
  getHostWorldPosition,
  HOST_INTERACTION_DISTANCE,
  getAimedStand,
  getTourCameraForStand,
} from "@/features/metaverso/data/stands";
import { resolveCollisions } from "@/features/metaverso/utils/collisions";
import { resolveLobbyCollisions, isNearLobbyCarousel } from "@/features/metaverso/data/lobby";
import { useUapaStore } from "@/features/metaverso/store/useUapaStore";
import { SafePointerLockControls } from "./SafePointerLockControls";
import { releasePointerLock } from "@/features/metaverso/utils/pointerLock";

const MOVE_SPEED = 4;
const EYE_HEIGHT = 1.6;
const WALK_BOB_AMOUNT = 0.042;
const WALK_BOB_SPEED = 9.5;
const keys = { w: false, a: false, s: false, d: false };

export function Player() {
  const { camera } = useThree();
  const velocity = useRef(new THREE.Vector3());
  const direction = useRef(new THREE.Vector3());
  const tourTarget = useRef(new THREE.Vector3());
  const tourLookAt = useRef(new THREE.Vector3());
  const dummyObj = useRef(new THREE.Object3D());
  const initialized = useRef(false);
  const walkPhase = useRef(0);

  const setPlayerPosition = useUapaStore((s) => s.setPlayerPosition);
  const setNearbyStand = useUapaStore((s) => s.setNearbyStand);
  const setNearbyHostStand = useUapaStore((s) => s.setNearbyHostStand);
  const setHighlightedStand = useUapaStore((s) => s.setHighlightedStand);
  const openModal = useUapaStore((s) => s.openModal);
  const openAIModal = useUapaStore((s) => s.openAIModal);
  const isRoomPortalOpen = useUapaStore((s) => s.isRoomPortalOpen);
  const isLobbyReturnOpen = useUapaStore((s) => s.isLobbyReturnOpen);
  const lobbyReturnCanAutoOpen = useUapaStore((s) => s.lobbyReturnCanAutoOpen);
  const lobbyReturnPortalZ = useUapaStore((s) => s.lobbyReturnPortalZ);
  const setLobbyReturnOpen = useUapaStore((s) => s.setLobbyReturnOpen);
  const exitPortalCanAutoOpen = useUapaStore((s) => s.exitPortalCanAutoOpen);
  const setRoomPortalOpen = useUapaStore((s) => s.setRoomPortalOpen);
  const prefetchRoom = useUapaStore((s) => s.prefetchRoom);
  const isModalOpen = useUapaStore((s) => s.isModalOpen);
  const isAIModalOpen = useUapaStore((s) => s.isAIModalOpen);
  const isTutorialOpen = useUapaStore((s) => s.isTutorialOpen);
  const isTourMode = useUapaStore((s) => s.isTourMode);
  const tourIndex = useUapaStore((s) => s.tourIndex);
  const nearbyStand = useUapaStore((s) => s.nearbyStand);
  const nearbyHostStand = useUapaStore((s) => s.nearbyHostStand);
  const currentRoomStands = useUapaStore((s) => s.currentRoomStands);
  const spawnPosition = useUapaStore((s) => s.spawnPosition);
  const spawnLookAt = useUapaStore((s) => s.spawnLookAt);
  const exitPortalZ = useUapaStore((s) => s.exitPortalZ);
  const roomTransitionKey = useUapaStore((s) => s.roomTransitionKey);
  const isRoomTransitioning = useUapaStore((s) => s.isRoomTransitioning);
  const currentRoomIndex = useUapaStore((s) => s.currentRoomIndex);
  const roomCount = useUapaStore((s) => s.roomCount);
  const standsInitialized = useUapaStore((s) => s.standsInitialized);
  const playerTeleportSeq = useUapaStore((s) => s.playerTeleportSeq);
  const isInLobby = useUapaStore((s) => s.isInLobby);
  const nearbyLobbyRoom = useUapaStore((s) => s.nearbyLobbyRoom);
  const setNearbyLobbyRoom = useUapaStore((s) => s.setNearbyLobbyRoom);
  const enterFairFromLobby = useUapaStore((s) => s.enterFairFromLobby);

  const pointerLockEnabled =
    standsInitialized &&
    !isModalOpen &&
    !isAIModalOpen &&
    !isTourMode &&
    !isRoomTransitioning &&
    !isRoomPortalOpen &&
    !isLobbyReturnOpen &&
    !isTutorialOpen;

  useEffect(() => {
    if (
      isModalOpen ||
      isAIModalOpen ||
      isRoomPortalOpen ||
      isLobbyReturnOpen ||
      isTutorialOpen
    ) {
      keys.w = false;
      keys.a = false;
      keys.s = false;
      keys.d = false;
      releasePointerLock();
    }
  }, [isModalOpen, isAIModalOpen, isRoomPortalOpen, isLobbyReturnOpen, isTutorialOpen]);

  useEffect(() => {
    if (!standsInitialized) return;
    if (!initialized.current) {
      camera.position.set(...spawnPosition);
      camera.lookAt(new THREE.Vector3(...spawnLookAt));
      initialized.current = true;
    }
  }, [camera, spawnPosition, spawnLookAt, standsInitialized]);

  useEffect(() => {
    if (!standsInitialized) return;
    camera.position.set(...spawnPosition);
    camera.lookAt(new THREE.Vector3(...spawnLookAt));
  }, [roomTransitionKey, camera, spawnPosition, spawnLookAt, standsInitialized]);

  useEffect(() => {
    if (!standsInitialized || playerTeleportSeq === 0) return;
    const teleport = useUapaStore.getState().playerTeleport;
    if (!teleport) return;

    camera.position.set(...teleport.position);
    camera.lookAt(new THREE.Vector3(...teleport.lookAt));
    setPlayerPosition(teleport.position);
    useUapaStore.setState({ playerTeleport: null });
  }, [playerTeleportSeq, camera, standsInitialized, setPlayerPosition]);

  useEffect(() => {
    if (isTourMode && currentRoomStands[tourIndex]) {
      setNearbyStand(currentRoomStands[tourIndex]);
    }
  }, [isTourMode, tourIndex, setNearbyStand, currentRoomStands]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (
        isRoomPortalOpen ||
        isLobbyReturnOpen ||
        isRoomTransitioning ||
        isTutorialOpen
      )
        return;

      if (isAIModalOpen) return;

      if (isModalOpen) {
        if (e.key.toLowerCase() === "t") {
          const stand = useUapaStore.getState().selectedStand;
          if (stand) openAIModal(stand, { teleportToHost: true });
        }
        return;
      }

      if (isInLobby) {
        const key = e.key.toLowerCase();
        if (key in keys) (keys as Record<string, boolean>)[key] = true;
        if (e.key.toLowerCase() === "e" && nearbyLobbyRoom !== null) {
          void enterFairFromLobby(nearbyLobbyRoom);
        }
        return;
      }

      const key = e.key.toLowerCase();
      if (!isTourMode) {
        if (key in keys) (keys as Record<string, boolean>)[key] = true;
      }

      const activeStand = isTourMode
        ? currentRoomStands[tourIndex]
        : nearbyStand;

      if (e.key.toLowerCase() === "e" && activeStand) {
        openModal(activeStand);
      }

      if (e.key.toLowerCase() === "t" && nearbyHostStand) {
        openAIModal(nearbyHostStand);
      }

      if (e.key.toLowerCase() === "m" && !isTourMode) {
        setRoomPortalOpen(true, true);
      }
    };

    const onKeyUp = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      if (key in keys) (keys as Record<string, boolean>)[key] = false;
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, [
    nearbyStand,
    nearbyHostStand,
    isModalOpen,
    isAIModalOpen,
    isTourMode,
    tourIndex,
    openModal,
    openAIModal,
    currentRoomStands,
    isRoomPortalOpen,
    isLobbyReturnOpen,
    isRoomTransitioning,
    isTutorialOpen,
    setRoomPortalOpen,
    isInLobby,
    nearbyLobbyRoom,
    enterFairFromLobby,
  ]);

  useFrame((state, delta) => {
    if (
      isModalOpen ||
      isAIModalOpen ||
      isRoomTransitioning ||
      !standsInitialized ||
      isTutorialOpen
    ) {
      return;
    }

    if (isTourMode) {
      const stand = currentRoomStands[tourIndex];
      if (!stand) return;
      const tour = getTourCameraForStand(stand);
      tourTarget.current.set(...tour.viewPosition);
      tourLookAt.current.set(...tour.lookAt);
      camera.position.lerp(tourTarget.current, 0.15);
      dummyObj.current.position.copy(camera.position);
      dummyObj.current.lookAt(tourLookAt.current);
      camera.quaternion.slerp(dummyObj.current.quaternion, 0.15);
      setPlayerPosition([
        camera.position.x,
        camera.position.y,
        camera.position.z,
      ]);
      return;
    }

    if (isRoomPortalOpen || isLobbyReturnOpen) return;

    if (isInLobby) {
      direction.current.set(0, 0, 0);

      if (keys.w) direction.current.z -= 1;
      if (keys.s) direction.current.z += 1;
      if (keys.a) direction.current.x -= 1;
      if (keys.d) direction.current.x += 1;

      const isMoving = direction.current.length() > 0;

      if (isMoving) {
        direction.current.normalize();
        direction.current.applyQuaternion(camera.quaternion);
        direction.current.y = 0;
        direction.current.normalize();
        velocity.current.copy(
          direction.current.multiplyScalar(MOVE_SPEED * delta)
        );
        camera.position.add(velocity.current);
        walkPhase.current += delta * WALK_BOB_SPEED;
      } else {
        walkPhase.current = THREE.MathUtils.lerp(walkPhase.current, 0, delta * 6);
      }

      const bob = isMoving ? Math.sin(walkPhase.current) * WALK_BOB_AMOUNT : 0;
      camera.position.y = EYE_HEIGHT + bob;
      const [lx, lz] = resolveLobbyCollisions(
        camera.position.x,
        camera.position.z
      );
      camera.position.x = lx;
      camera.position.z = lz;

      const pos = camera.position;
      setPlayerPosition([pos.x, pos.y, pos.z]);

      const { lobbyDoorIndex, nearbyLobbyRoom: currentNearby } =
        useUapaStore.getState();
      if (isNearLobbyCarousel(pos.x, pos.z)) {
        if (currentNearby !== lobbyDoorIndex) {
          setNearbyLobbyRoom(lobbyDoorIndex);
        }
      } else if (currentNearby !== null) {
        setNearbyLobbyRoom(null);
      }

      setNearbyStand(null);
      setNearbyHostStand(null);
      setHighlightedStand(null);
      return;
    }

    direction.current.set(0, 0, 0);

    if (keys.w) direction.current.z -= 1;
    if (keys.s) direction.current.z += 1;
    if (keys.a) direction.current.x -= 1;
    if (keys.d) direction.current.x += 1;

    const isMoving = direction.current.length() > 0;

    if (isMoving) {
      direction.current.normalize();
      direction.current.applyQuaternion(camera.quaternion);
      direction.current.y = 0;
      direction.current.normalize();
      velocity.current.copy(
        direction.current.multiplyScalar(MOVE_SPEED * delta)
      );
      camera.position.add(velocity.current);
      walkPhase.current += delta * WALK_BOB_SPEED;
    } else {
      walkPhase.current = THREE.MathUtils.lerp(walkPhase.current, 0, delta * 6);
    }

    const bob = isMoving ? Math.sin(walkPhase.current) * WALK_BOB_AMOUNT : 0;
    camera.position.y = EYE_HEIGHT + bob;

    camera.position.x = THREE.MathUtils.clamp(
      camera.position.x,
      -PLAYER_MAX_X,
      PLAYER_MAX_X
    );
    camera.position.z = THREE.MathUtils.clamp(
      camera.position.z,
      -WALKABLE_HALF_Z,
      WALKABLE_HALF_Z
    );

    const [resolvedX, resolvedZ] = resolveCollisions(
      camera.position.x,
      camera.position.z,
      currentRoomStands
    );
    camera.position.x = resolvedX;
    camera.position.z = resolvedZ;

    camera.position.x = THREE.MathUtils.clamp(
      camera.position.x,
      -PLAYER_MAX_X,
      PLAYER_MAX_X
    );
    camera.position.z = THREE.MathUtils.clamp(
      camera.position.z,
      -WALKABLE_HALF_Z,
      WALKABLE_HALF_Z
    );

    const pos = camera.position;
    setPlayerPosition([pos.x, pos.y, pos.z]);

    const PORTAL_TRIGGER_Z = exitPortalZ + 1.5;
    const PORTAL_REARM_Z = exitPortalZ + 4;

    if (pos.z > PORTAL_REARM_Z && !exitPortalCanAutoOpen) {
      useUapaStore.setState({ exitPortalCanAutoOpen: true });
    } else if (
      pos.z <= PORTAL_TRIGGER_Z &&
      roomCount > 1 &&
      exitPortalCanAutoOpen &&
      !isRoomPortalOpen
    ) {
      setRoomPortalOpen(true, false);
      prefetchRoom(currentRoomIndex + 1);
    }

    const LOBBY_RETURN_TRIGGER = lobbyReturnPortalZ - 1.5;
    const LOBBY_RETURN_REARM = lobbyReturnPortalZ - 4;

    if (pos.z < LOBBY_RETURN_REARM && !lobbyReturnCanAutoOpen) {
      useUapaStore.setState({ lobbyReturnCanAutoOpen: true });
    } else if (
      pos.z >= LOBBY_RETURN_TRIGGER &&
      lobbyReturnCanAutoOpen &&
      !isLobbyReturnOpen
    ) {
      setLobbyReturnOpen(true, false);
    }

    let closest = null;
    let closestScore = Infinity;

    for (const stand of currentRoomStands) {
      const inside = isPlayerInsideBooth(stand, pos.x, pos.z);
      const dist = getDistanceToStand(stand, pos.x, pos.y, pos.z);
      const score = inside ? 0 : dist;

      if (score < closestScore) {
        closestScore = score;
        closest = stand;
      }
    }

    const insideClosest =
      closest && isPlayerInsideBooth(closest, pos.x, pos.z);
    const nearEntrance =
      closest &&
      getDistanceToStand(closest, pos.x, pos.y, pos.z) < INTERACTION_DISTANCE;

    if (insideClosest || nearEntrance) {
      setNearbyStand(closest);
    } else {
      setNearbyStand(null);
    }

    const aimed = getAimedStand(camera, currentRoomStands);
    const canHighlight =
      aimed &&
      (isPlayerInsideBooth(aimed, pos.x, pos.z) ||
        getDistanceToStand(aimed, pos.x, pos.y, pos.z) < INTERACTION_DISTANCE);
    setHighlightedStand(canHighlight ? aimed : null);

    let closestHost = null;
    let closestHostDist = Infinity;

    for (const stand of currentRoomStands) {
      const [hx, , hz] = getHostWorldPosition(stand);
      const dx = pos.x - hx;
      const dz = pos.z - hz;
      const dist = Math.sqrt(dx * dx + dz * dz);
      if (dist < HOST_INTERACTION_DISTANCE && dist < closestHostDist) {
        closestHostDist = dist;
        closestHost = stand;
      }
    }

    setNearbyHostStand(closestHost);
  });

  return <SafePointerLockControls enabled={pointerLockEnabled} />;
}
