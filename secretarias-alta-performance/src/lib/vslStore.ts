"use client";

import { useSyncExternalStore } from "react";

/**
 * Estado global mínimo: o restante da página foi liberado?
 * Persistido em localStorage para quem já assistiu não precisar esperar de novo.
 */
const KEY = "vsl_unlocked_v1";
let unlocked = false;
let initialized = false;
const listeners = new Set<() => void>();

function init() {
  if (initialized || typeof window === "undefined") return;
  initialized = true;
  try {
    if (localStorage.getItem(KEY) === "1") unlocked = true;
    if (new URLSearchParams(window.location.search).get("full") === "1") unlocked = true;
  } catch {
    /* sem storage */
  }
}

export function unlockPage() {
  if (unlocked) return;
  unlocked = true;
  try {
    localStorage.setItem(KEY, "1");
  } catch {
    /* sem storage */
  }
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
