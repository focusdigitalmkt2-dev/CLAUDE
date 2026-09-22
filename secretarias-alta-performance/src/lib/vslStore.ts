"use client";

import { useSyncExternalStore } from "react";

/**
 * Estado global mínimo: o restante da página foi liberado?
 * - Liberação real (tempo de vídeo ou fim do vídeo) é persistida em localStorage,
 *   para quem já assistiu não precisar esperar de novo.
 * - ?full=1 (teste) e a proteção de erro liberam só nesta visita, sem persistir.
 * - ?reset=1 apaga a liberação salva.
 */
const KEY = "vsl_unlocked_v2";
let unlocked = false;
let initialized = false;
const listeners = new Set<() => void>();

function init() {
  if (initialized || typeof window === "undefined") return;
  initialized = true;
  try {
    const params = new URLSearchParams(window.location.search);
    localStorage.removeItem("vsl_unlocked_v1"); // chave antiga
    if (params.get("reset") === "1") localStorage.removeItem(KEY);
    if (localStorage.getItem(KEY) === "1") unlocked = true;
    if (params.get("full") === "1") unlocked = true;
  } catch {
    /* sem storage */
  }
}

/** Libera a página. `persist` grava no navegador (só para liberação real). */
export function unlockPage(persist = true) {
  if (persist) {
    try {
      localStorage.setItem(KEY, "1");
    } catch {
      /* sem storage */
    }
  }
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
