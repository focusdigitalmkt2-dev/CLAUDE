"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Pause, Play, Volume2, VolumeX } from "lucide-react";
import { cn } from "@/lib/cn";
import { vsl } from "@/lib/config";
import { unlockPage, useVslUnlocked } from "@/lib/vslStore";
import { trackVideoStart, trackVideoUnlock, trackVideoUnmute } from "@/lib/analytics";

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
  unloadModule(name: string): void;
  setOption(module: string, option: string, value: unknown): void;
}
interface YTNamespace {
  Player: new (
    el: HTMLElement,
    opts: {
      videoId: string;
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

/** Desliga a legenda automática do YouTube (o vídeo já tem legenda embutida). */
function disableCaptions(p: YTPlayer) {
  try {
    p.unloadModule("captions");
    p.unloadModule("cc");
    p.setOption("captions", "track", {});
    p.setOption("cc", "track", {});
  } catch {
    /* ignore */
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
 * VSL: capa imediata, autoplay sem som, som liberado no toque DENTRO do player
 * (é o toque no player que dá ao YouTube a permissão de tocar com áudio no celular),
 * barra de progresso própria e liberação do restante da página por tempo de vídeo.
 */
export function VslSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<YTPlayer | null>(null);
  const playingRef = useRef(false);
  const startedRef = useRef(false);
  const mutedRef = useRef(true);
  const nativeRef = useRef(false);
  const unlockedRef = useRef(false);
  const readyRef = useRef(false);

  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [time, setTime] = useState({ cur: 0, dur: 0 });
  const [failed, setFailed] = useState(false);
  const [nativeControls, setNativeControls] = useState(false);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);
  const unlocked = useVslUnlocked();

  const setMutedState = (v: boolean) => {
    mutedRef.current = v;
    setMuted(v);
  };

  /** Cria (ou recria) o player. */
  const createPlayer = useCallback((opts: { native: boolean; muted: boolean; start?: number }) => {
    const container = containerRef.current;
    if (!container) return;
    try {
      playerRef.current?.destroy();
    } catch {
      /* ignore */
    }
    playerRef.current = null;
    nativeRef.current = opts.native;
    container.innerHTML = "";
    const mount = document.createElement("div");
    container.appendChild(mount);

    loadYouTubeApi().then((YT) => {
      if (!mount.isConnected) return;
      new YT.Player(mount, {
        videoId: vsl.youtubeId,
        playerVars: {
          autoplay: 1,
          mute: opts.muted ? 1 : 0,
          controls: opts.native ? 1 : 0,
          rel: 0,
          modestbranding: 1,
          playsinline: 1,
          disablekb: opts.native ? 0 : 1,
          fs: opts.native ? 1 : 0,
          iv_load_policy: 3,
          cc_load_policy: 0,
          start: opts.start ?? 0,
          origin: window.location.origin,
        },
        events: {
          onReady: (e) => {
            playerRef.current = e.target;
            readyRef.current = true;
            setReady(true);
            disableCaptions(e.target);
            if (opts.muted) e.target.mute();
            else {
              e.target.unMute();
              e.target.setVolume(100);
            }
            e.target.playVideo();
            window.setTimeout(() => {
              if (!playingRef.current) setAutoplayBlocked(true);
            }, 2500);
          },
          onStateChange: (e) => {
            const st = e.data;
            const isPlaying = st === YT.PlayerState.PLAYING;
            playingRef.current = isPlaying;
            setPlaying(isPlaying);
            if (isPlaying) {
              setAutoplayBlocked(false);
              disableCaptions(e.target);
              if (!startedRef.current) trackVideoStart();
            }
            if (isPlaying || st === YT.PlayerState.BUFFERING) startedRef.current = true;
            if (st === YT.PlayerState.ENDED) unlockPage();
          },
          onError: () => setFailed(true),
        },
      });
    });
  }, []);

  useEffect(() => {
    createPlayer({ native: false, muted: true });
    return () => {
      try {
        playerRef.current?.destroy();
      } catch {
        /* ignore */
      }
      playerRef.current = null;
    };
  }, [createPlayer]);

  /** Liga o som (chamado logo após um toque dentro do player). */
  const enableSound = useCallback(() => {
    const p = playerRef.current;
    if (!p || !mutedRef.current) return;
    p.playVideo();
    p.unMute();
    p.setVolume(100);
    if (vsl.restartOnUnmute && (p.getCurrentTime?.() || 0) > 1) p.seekTo(0, true);
    setMutedState(false);
    trackVideoUnmute();
    // Plano B: se não estiver tocando em 2 s, troca para os controles nativos do YouTube
    window.setTimeout(() => {
      if (!playingRef.current && !nativeRef.current) {
        setNativeControls(true);
        createPlayer({ native: true, muted: false, start: Math.floor(p.getCurrentTime?.() || 0) });

      }
    }, 2000);
  }, [createPlayer]);

  /**
   * Detecta o toque dentro do iframe do YouTube: quando o usuário toca no player,
   * o foco da janela vai para o iframe e a janela dispara "blur".
   */
  useEffect(() => {
    const onBlur = () => {
      window.setTimeout(() => {
        const ifr = containerRef.current?.querySelector("iframe");
        if (!ifr || document.activeElement !== ifr) return;
        if (mutedRef.current && !nativeRef.current) enableSound();
        // devolve o foco à página para detectar o próximo toque
        window.setTimeout(() => window.focus(), 100);
      }, 0);
    };
    window.addEventListener("blur", onBlur);
    return () => window.removeEventListener("blur", onBlur);
  }, [enableSound]);

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
      const byEnd = dur > 0 && cur >= dur - 1;
      if ((byTime || byEnd) && !unlockedRef.current) {
        unlockedRef.current = true;
        unlockPage();
        trackVideoUnlock();
      }
    }, 250);
    return () => window.clearInterval(id);
  }, []);

  // Proteção apenas para falha real: o player do YouTube não carregou
  // (rede bloqueada) ou deu erro. Autoplay bloqueado NÃO libera: exige o toque.
  useEffect(() => {
    const id = window.setTimeout(() => {
      if (!readyRef.current) unlockPage();
    }, vsl.fallbackSeconds * 1000);
    return () => window.clearTimeout(id);
  }, []);
  useEffect(() => {
    if (failed) unlockPage();
  }, [failed]);

  const togglePlay = () => {
    const p = playerRef.current;
    if (!p) return;
    if (playing) p.pauseVideo();
    else p.playVideo();
  };

  const toggleMute = () => {
    const p = playerRef.current;
    if (!p) return;
    if (mutedRef.current) {
      p.unMute();
      p.setVolume(100);
      p.playVideo();
      setMutedState(false);
    } else {
      p.mute();
      setMutedState(true);
    }
  };

  const showHint = !nativeControls && !failed && (muted || autoplayBlocked);

  return (
    <section id="vsl" aria-label="Vídeo de apresentação" className="enter relative scroll-mt-20 bg-black pb-12 sm:pb-16" style={{ "--d": "0.1s" } as React.CSSProperties}>
      <div className="container-x">
        <div className="mx-auto max-w-4xl">
          <div className="border-gradient-gold relative overflow-clip rounded-2xl bg-graphite-2 shadow-card">
            {/* Player */}
            <div className="relative aspect-video w-full bg-black">
              {/* Capa imediata: aparece antes de o YouTube carregar */}
              {!playing && !nativeControls && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={`https://i.ytimg.com/vi/${vsl.youtubeId}/sddefault.jpg`}
                  alt=""
                  aria-hidden
                  fetchPriority="high"
                  decoding="async"
                  className="pointer-events-none absolute inset-0 size-full object-cover"
                />
              )}

              {/* iframe do YouTube — recebe os toques diretamente */}
              <div
                ref={containerRef}
                className="absolute inset-0 size-full [&_iframe]:absolute [&_iframe]:inset-0 [&_iframe]:size-full"
              />

              {/* Dica visual (não bloqueia o toque, que vai para o player) */}
              {showHint && (
                <div aria-hidden className="pointer-events-none absolute inset-0 flex items-center justify-center">
                  <span className="flex flex-col items-center gap-3">
                    <span className="ring-pulse relative flex size-20 items-center justify-center rounded-full bg-gold text-black shadow-gold sm:size-24">
                      {autoplayBlocked || !ready ? (
                        <Play className="ml-1 size-9 fill-current sm:size-10" />
                      ) : (
                        <VolumeX className="size-9 sm:size-10" />
                      )}
                    </span>
                    <span className="rounded-full bg-black/80 px-4 py-2 font-display text-sm font-extrabold uppercase tracking-wide text-paper backdrop-blur sm:text-base">
                      {autoplayBlocked || !ready ? "Toque para assistir" : "Toque no vídeo para ativar o som"}
                    </span>
                  </span>
                </div>
              )}
            </div>

            {/* Barra de progresso / temporizador */}
            <div className="flex items-center gap-3 px-4 py-3 sm:px-5">
              <button
                type="button"
                onClick={togglePlay}
                aria-label={playing ? "Pausar" : "Reproduzir"}
                className={cn("flex size-9 shrink-0 items-center justify-center rounded-full bg-gold text-black", nativeControls && "hidden")}
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
                onClick={toggleMute}
                aria-label={muted ? "Ativar som" : "Silenciar"}
                className={cn(
                  "flex size-9 shrink-0 items-center justify-center rounded-full border",
                  muted ? "border-gold text-gold" : "border-line-strong text-paper",
                  nativeControls && "hidden",
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
