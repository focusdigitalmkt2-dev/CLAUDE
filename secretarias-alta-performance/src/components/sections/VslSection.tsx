"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Pause, Play, Volume2, VolumeX } from "lucide-react";
import { cn } from "@/lib/cn";
import { vsl } from "@/lib/config";
import { unlockPage, useVslUnlocked } from "@/lib/vslStore";
import { trackCTA } from "@/lib/analytics";

/* ---------- Tipos mínimos da IFrame API do YouTube ---------- */
interface YTPlayer {
  playVideo(): void;
  pauseVideo(): void;
  mute(): void;
  unMute(): void;
  setVolume(v: number): void;
  seekTo(s: number, allowSeekAhead: boolean): void;
  getCurrentTime(): number;
  getDuration(): number;
  getPlayerState(): number;
  destroy(): void;
}
interface YTNamespace {
  Player: new (
    el: HTMLElement,
    opts: {
      videoId: string;
      host?: string;
      playerVars?: Record<string, string | number>;
      events?: {
        onReady?: (e: { target: YTPlayer }) => void;
        onStateChange?: (e: { data: number; target: YTPlayer }) => void;
        onError?: () => void;
      };
    },
  ) => YTPlayer;
  PlayerState: { PLAYING: number; PAUSED: number; ENDED: number; BUFFERING: number };
}
declare global {
  interface Window {
    YT?: YTNamespace;
    onYouTubeIframeAPIReady?: () => void;
  }
}

let apiPromise: Promise<YTNamespace> | null = null;
function loadYouTubeApi(): Promise<YTNamespace> {
  if (typeof window === "undefined") return new Promise(() => {});
  if (window.YT?.Player) return Promise.resolve(window.YT);
  if (apiPromise) return apiPromise;
  apiPromise = new Promise((resolve) => {
    const prev = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      prev?.();
      resolve(window.YT!);
    };
    const s = document.createElement("script");
    s.src = "https://www.youtube.com/iframe_api";
    s.async = true;
    document.head.appendChild(s);
  });
  return apiPromise;
}

const fmt = (s: number) => {
  const m = Math.floor(s / 60);
  const r = Math.floor(s % 60);
  return `${m}:${String(r).padStart(2, "0")}`;
};

/**
 * VSL: autoplay sem som, libera o áudio no primeiro toque, barra de progresso
 * própria e libera o restante da página após `vsl.unlockAtSeconds`.
 */
export function VslSection() {
  const mountRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<YTPlayer | null>(null);
  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [time, setTime] = useState({ cur: 0, dur: 0 });
  const [failed, setFailed] = useState(false);
  const unlocked = useVslUnlocked();
  const startedRef = useRef(false);

  // Cria o player
  useEffect(() => {
    let cancelled = false;
    let player: YTPlayer | null = null;
    loadYouTubeApi().then((YT) => {
      if (cancelled || !mountRef.current) return;
      player = new YT.Player(mountRef.current, {
        videoId: vsl.youtubeId,
        host: "https://www.youtube-nocookie.com",
        playerVars: {
          autoplay: 1,
          mute: 1,
          controls: 0,
          rel: 0,
          modestbranding: 1,
          playsinline: 1,
          disablekb: 1,
          fs: 0,
          iv_load_policy: 3,
          origin: window.location.origin,
        },
        events: {
          onReady: (e) => {
            playerRef.current = e.target;
            setReady(true);
            e.target.mute();
            e.target.playVideo();
          },
          onStateChange: (e) => {
            const st = e.data;
            const isPlaying = st === YT.PlayerState.PLAYING;
            setPlaying(isPlaying);
            if (isPlaying || st === YT.PlayerState.BUFFERING) startedRef.current = true;
            if (st === YT.PlayerState.ENDED) unlockPage();
          },
          onError: () => setFailed(true),
        },
      });
    });
    return () => {
      cancelled = true;
      try {
        player?.destroy();
      } catch {
        /* ignore */
      }
      playerRef.current = null;
    };
  }, []);

  // Progresso + liberação por tempo
  useEffect(() => {
    const id = window.setInterval(() => {
      const p = playerRef.current;
      if (!p || typeof p.getCurrentTime !== "function") return;
      const cur = p.getCurrentTime() || 0;
      const dur = p.getDuration() || 0;
      setTime({ cur, dur });
      setProgress(dur > 0 ? Math.min(100, (cur / dur) * 100) : 0);
      const byTime = vsl.unlockAtSeconds > 0 && cur >= vsl.unlockAtSeconds;
      const byEnd = dur > 0 && cur >= dur - 1; // segurança caso o evento ENDED não dispare
      if (byTime || byEnd) {
        unlockPage();
        trackCTA("vsl_unlock");
      }
    }, 250);
    return () => window.clearInterval(id);
  }, []);

  // Se o player não iniciar (bloqueio de rede, erro), não prende a página
  useEffect(() => {
    const id = window.setTimeout(() => {
      if (!startedRef.current) unlockPage(false); // só nesta visita, não persiste
    }, vsl.fallbackSeconds * 1000);
    return () => window.clearTimeout(id);
  }, []);
  useEffect(() => {
    if (failed) unlockPage(false);
  }, [failed]);

  const enableSound = useCallback(() => {
    const p = playerRef.current;
    if (!p) return;
    p.unMute();
    p.setVolume(100);
    if (vsl.restartOnUnmute) p.seekTo(0, true);
    p.playVideo();
    setMuted(false);
    trackCTA("vsl_unmute");
  }, []);

  const togglePlay = useCallback(() => {
    const p = playerRef.current;
    if (!p) return;
    if (muted) return enableSound();
    if (playing) p.pauseVideo();
    else p.playVideo();
  }, [muted, playing, enableSound]);

  return (
    <section id="vsl" aria-label="Vídeo de apresentação" className="enter relative scroll-mt-20 bg-black pb-12 sm:pb-16" style={{ "--d": "0.1s" } as React.CSSProperties}>
      <div className="container-x">
        <div className="mx-auto max-w-4xl">

          <div className="border-gradient-gold relative overflow-clip rounded-2xl bg-graphite-2 shadow-card">
            {/* Player */}
            <div className="relative aspect-video w-full bg-black">
              <div ref={mountRef} className="absolute inset-0 size-full" />

              {/* Camada de interação: primeiro toque libera o som; depois play/pause */}
              <button
                type="button"
                onClick={togglePlay}
                aria-label={muted ? "Ativar o som do vídeo" : playing ? "Pausar" : "Reproduzir"}
                className="absolute inset-0 flex items-center justify-center bg-transparent"
              >
                {muted && ready && !failed && (
                  <span className="flex flex-col items-center gap-3">
                    <span className="ring-pulse relative flex size-20 items-center justify-center rounded-full bg-gold text-black shadow-gold sm:size-24">
                      <VolumeX className="size-9 sm:size-10" aria-hidden />
                    </span>
                    <span className="rounded-full bg-black/80 px-4 py-2 font-display text-sm font-extrabold uppercase tracking-wide text-paper backdrop-blur sm:text-base">
                      Toque para ativar o som
                    </span>
                  </span>
                )}
                {!muted && !playing && (
                  <span className="flex size-20 items-center justify-center rounded-full bg-gold/90 text-black">
                    <Play className="ml-1 size-9 fill-current" aria-hidden />
                  </span>
                )}
              </button>
            </div>

            {/* Barra de progresso / temporizador */}
            <div className="flex items-center gap-3 px-4 py-3 sm:px-5">
              <button
                type="button"
                onClick={togglePlay}
                aria-label={playing ? "Pausar" : "Reproduzir"}
                className="flex size-9 shrink-0 items-center justify-center rounded-full bg-gold text-black"
              >
                {playing ? <Pause className="size-4 fill-current" aria-hidden /> : <Play className="ml-0.5 size-4 fill-current" aria-hidden />}
              </button>
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
                {fmt(time.cur)} / {time.dur ? fmt(time.dur) : "--:--"}
              </span>
              <button
                type="button"
                onClick={() => {
                  const p = playerRef.current;
                  if (!p) return;
                  if (muted) enableSound();
                  else {
                    p.mute();
                    setMuted(true);
                  }
                }}
                aria-label={muted ? "Ativar som" : "Silenciar"}
                className={cn(
                  "flex size-9 shrink-0 items-center justify-center rounded-full border",
                  muted ? "border-gold text-gold" : "border-line-strong text-paper",
                )}
              >
                {muted ? <VolumeX className="size-4" aria-hidden /> : <Volume2 className="size-4" aria-hidden />}
              </button>
            </div>
          </div>

          {!unlocked && (
            <p className="mt-4 text-center text-sm font-semibold text-muted">
              Continue assistindo para liberar sua inscrição e todas as informações do treinamento.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
