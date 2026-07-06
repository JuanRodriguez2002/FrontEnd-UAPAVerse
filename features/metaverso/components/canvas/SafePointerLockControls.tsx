"use client";

import { useEffect, useRef } from "react";
import { useThree } from "@react-three/fiber";
import { PointerLockControls as PointerLockControlsImpl } from "three-stdlib";
import {
  releasePointerLock,
  syncPointerLockControls,
} from "@/features/metaverso/utils/pointerLock";

const USER_UNLOCK_COOLDOWN_MS = 300;

function isInteractiveTarget(target: EventTarget | null): boolean {
  if (!(target instanceof Element)) return false;
  return !!target.closest(
    "button, a, input, textarea, select, label, [data-ui-interactive]"
  );
}

interface SafePointerLockControlsProps {
  enabled: boolean;
}

export function SafePointerLockControls({ enabled }: SafePointerLockControlsProps) {
  const { camera, gl } = useThree();
  const controlsRef = useRef<PointerLockControlsImpl | null>(null);
  const cooldownUntil = useRef(0);
  const enabledRef = useRef(enabled);
  const userUnlockedRef = useRef(false);

  enabledRef.current = enabled;

  useEffect(() => {
    const canvas = gl.domElement;
    const controls = new PointerLockControlsImpl(camera);
    controlsRef.current = controls;

    const onLock = () => {
      userUnlockedRef.current = false;
      cooldownUntil.current = 0;
      syncPointerLockControls(controls, canvas);
    };

    const onUnlock = () => {
      syncPointerLockControls(controls, canvas);
      if (enabledRef.current && userUnlockedRef.current) {
        cooldownUntil.current = Date.now() + USER_UNLOCK_COOLDOWN_MS;
      } else {
        cooldownUntil.current = 0;
      }
      userUnlockedRef.current = false;
    };

    const onPointerlockChange = () => {
      syncPointerLockControls(controls, canvas);
    };

    const onPointerlockError = (e: Event) => {
      e.stopImmediatePropagation();
      syncPointerLockControls(controls, canvas);
      cooldownUntil.current = Date.now() + USER_UNLOCK_COOLDOWN_MS;
    };

    controls.addEventListener("lock", onLock);
    controls.addEventListener("unlock", onUnlock);
    canvas.ownerDocument.addEventListener("pointerlockchange", onPointerlockChange);
    canvas.ownerDocument.addEventListener("pointerlockerror", onPointerlockError, true);

    return () => {
      controls.removeEventListener("lock", onLock);
      controls.removeEventListener("unlock", onUnlock);
      canvas.ownerDocument.removeEventListener("pointerlockchange", onPointerlockChange);
      canvas.ownerDocument.removeEventListener("pointerlockerror", onPointerlockError, true);
      controls.disconnect();
      releasePointerLock();
      controlsRef.current = null;
    };
  }, [camera, gl.domElement]);

  useEffect(() => {
    const controls = controlsRef.current;
    const canvas = gl.domElement;
    if (!controls) return;

    if (enabled) {
      controls.connect(canvas);
      syncPointerLockControls(controls, canvas);
      cooldownUntil.current = 0;
    } else {
      releasePointerLock();
      syncPointerLockControls(controls, canvas);
      controls.disconnect();
      cooldownUntil.current = 0;
    }
  }, [enabled, gl.domElement]);

  useEffect(() => {
    const canvas = gl.domElement;

    const requestLock = () => {
      if (!enabledRef.current) return;
      if (Date.now() < cooldownUntil.current) return;

      const controls = controlsRef.current;
      if (!controls) return;

      syncPointerLockControls(controls, canvas);
      if (document.pointerLockElement === canvas) return;

      try {
        controls.lock();
      } catch {
        /* ignorar */
      }
    };

    const onPointerDown = (e: PointerEvent) => {
      if (e.button !== 0) return;
      if (!enabledRef.current) return;
      if (isInteractiveTarget(e.target)) return;

      const target = e.target as Node;
      const hitCanvas = target === canvas || canvas.contains(target);
      if (!hitCanvas) return;

      requestLock();
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;

      const state = enabledRef.current;
      const locked = document.pointerLockElement === canvas;

      if (!state && !locked) return;

      if (locked) {
        userUnlockedRef.current = true;
        e.preventDefault();
        e.stopPropagation();
        releasePointerLock();
        const controls = controlsRef.current;
        if (controls) syncPointerLockControls(controls, canvas);
      }
    };

    window.addEventListener("pointerdown", onPointerDown, true);
    window.addEventListener("keydown", onKeyDown, true);
    return () => {
      window.removeEventListener("pointerdown", onPointerDown, true);
      window.removeEventListener("keydown", onKeyDown, true);
    };
  }, [gl.domElement]);

  return null;
}
