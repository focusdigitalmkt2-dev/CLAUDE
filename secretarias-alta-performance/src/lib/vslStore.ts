"use client";

import { useSyncExternalStore } from "react";

/**
 * Estado global mínimo: o restante da página foi liberado?
 * A liberação NÃO é guardada entre visitas: toda abertura da página começa
 * bloqueada até o tempo de vídeo configurado. ?full=1 libera para testes.
 */
let unlocked = false;
let initialized = false;
const listeners = new Set<() => void>();

function init() {
  if (initialized || typeof window === "undefined") return;
  initialized = true;
  try {
    localStorage.removeItem("vsl_unlocked_v1");
    localStorage.removeItem("vsl_unlocked_v2");
    if (new URLSearchParams(window.location.search).get("full") === "1") unlocked = true;
  } catch {
    /* sem storage */
  }
}

export function unlockPage() {
  if (unlocked) return;
  unlocked = true;
  listeners.forEach((l) => l());
}

function subscribe(cb: () => void) {
  init();
  listeners.add(cb);
  return () => listeners.delete(cb);
}

const getSnapshot = () => {
  init();
  return unlocked;
};
const getServerSnapshot = () => false;

/** true quando o restante da página deve ser exibido. */
export function useVslUnlocked() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
