"use client";

import type { ReactNode } from "react";
import { fmtTime } from "./useVslGate";

/** Moldura dourada + barra de progresso/temporizador, comum aos dois players. */
export function VslFrame({
  children,
  progress,
  time,
  note,
  left,
  right,
}: {
  children: ReactNode;
  progress: number;
  time: { cur: number; dur: number };
  /** Linha de aviso acima da barra (ex.: "Toque no vídeo para assistir"). */
  note?: ReactNode;
  left?: ReactNode;
  right?: ReactNode;
}) {
  return (
    <div className="border-gradient-gold relative overflow-clip rounded-2xl bg-graphite-2 shadow-card">
      <div className="relative aspect-video w-full bg-black">{children}</div>

      {note && <div className="px-4 pt-3 sm:px-5">{note}</div>}
      <div className="flex items-center gap-3 px-4 py-3 sm:px-5">
        {left}
        <div
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(progress)}
          className="relative h-2 flex-1 overflow-clip rounded-full bg-graphite-3"
        >
          <div
            className="absolute inset-y-0 left-0 rounded-full bg-gold transition-[width] duration-300 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="w-[6.5rem] shrink-0 text-right font-display text-xs font-bold tabular-nums text-muted sm:text-sm">
          {fmtTime(time.cur)} / {time.dur ? fmtTime(time.dur) : "--:--"}
        </span>
        {right}
      </div>
    </div>
  );
}
