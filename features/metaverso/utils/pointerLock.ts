import type { PointerLockControls as PointerLockControlsImpl } from "three-stdlib";

/** Libera el pointer lock de forma segura */
export function releasePointerLock(): void {
  if (typeof document === "undefined") return;
  if (document.pointerLockElement) {
    document.exitPointerLock();
  }
}

/** true si el cursor está capturado en el canvas dado */
export function isPointerLockedOn(canvas?: HTMLElement | null): boolean {
  if (typeof document === "undefined") return false;
  if (canvas) return document.pointerLockElement === canvas;
  return document.pointerLockElement !== null;
}

export function isPointerLocked(): boolean {
  return isPointerLockedOn();
}

/**
 * Sincroniza isLocked del control con el estado real del navegador.
 * Evita quedar atascado tras cerrar modales (isLocked=true sin lock real).
 */
export function syncPointerLockControls(
  controls: PointerLockControlsImpl,
  domElement: HTMLElement
): void {
  controls.isLocked = document.pointerLockElement === domElement;
}
