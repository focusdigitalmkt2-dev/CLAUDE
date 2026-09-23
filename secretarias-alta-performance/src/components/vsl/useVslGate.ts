"use client";

import { useCallback, useRef, useState } from "react";
import { vsl } from "@/lib/config";
import { unlockPage } from "@/lib/vslStore";
import { trackVideoStart, trackVideoUnlock } from "@/lib/analytics";

export const fmtTime = (s: number) => {
  const m = Math.floor(s / 60);
  const r = Math.floor(s % 60);
  return `${m}:${String(r).padStart(2, "0")}`;
};

/**
 * Regra comum aos dois players: barra de progresso, temporizador e liberação
 * do restante da página quando o vídeo atinge vsl.unlockAtSeconds (ou termina).
 */
export function useVslGate() {
  const unlockedRef = useRef(false);
  const startedRef = useRef(false);
  const [progress, setProgress] = useState(0);
  const [time, setTime] = useState({ cur: 0, dur: 0 });

  /** Chame a cada atualização de tempo do vídeo. */
  const report = useCallback((cur: number, dur: number) => {
    setTime({ cur, dur });
    setProgress(dur > 0 ? Math.min(100, (cur / dur) * 100) : 0);
    const byTime = vsl.unlockAtSeconds > 0 && cur >= vsl.unlockAtSeconds;
    const byEnd = dur > 0 && cur >= dur - 1;
    if ((byTime || byEnd) && !unlockedRef.current) {
      unlockedRef.current = true;
      unlockPage();
      trackVideoUnlock();
    }
  }, []);

  /** Primeira reprodução (evento ViewContent). */
  const markStarted = useCallback(() => {
    if (startedRef.current) return;
    startedRef.current = true;
    trackVideoStart();
  }, []);

  /** Libera a página sem passar pelo tempo (fim do vídeo, erro, player bloqueado). */
  const finish = useCallback(() => {
    if (unlockedRef.current) return;
    unlockedRef.current = true;
    unlockPage();
  }, []);

  return { progress, time, report, markStarted, finish };
}
