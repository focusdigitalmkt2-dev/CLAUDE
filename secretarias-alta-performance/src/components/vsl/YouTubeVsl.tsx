"use client";

import { useEffect, useRef, useState } from "react";
import { Play, Volume2 } from "lucide-react";
import { vsl } from "@/lib/config";
import { trackVideoUnmute } from "@/lib/analytics";
import { VslFrame } from "./VslFrame";
import { useVslGate } from "./useVslGate";

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
  destroy(): void;
  unloadModule(name: string): void;
  setOption(module: string, option: string, value: unknown): void;
}
interface YTNamespace {
  Player: new (
    el: HTMLElement,
    opts: {
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
  apiPromise = new Promise<YTNamespace>((resolve) => {
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

const EMBED_PARAMS = new URLSearchParams({
  enablejsapi: "1",
  playsinline: "1",
  controls: "1",
  rel: "0",
  modestbranding: "1",
  iv_load_policy: "3",
  cc_load_policy: "0",
  fs: "1",
  color: "white",
}).toString();

/**
 * Player do YouTube, pensado para celular e para o navegador interno do Instagram/Facebook:
 * - o iframe vem pronto no HTML (começa a carregar junto com a página, sem esperar JS);
 * - o toque vai direto no botão ▶ do próprio YouTube, que toca COM som (é o único
 *   toque que todo celular aceita para liberar áudio);
 * - a IFrame API só lê o tempo do vídeo para a barra de progresso e a liberação da página;
 * - no computador, começa sozinho sem som e um clique ativa o áudio.
 */
export function YouTubeVsl() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const playerRef = useRef<YTPlayer | null>(null);
  const readyRef = useRef(false);
  const playingRef = useRef(false);
  const mutedAutoRef = useRef(false);

  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [needsSound, setNeedsSound] = useState(false);
  const gate = useVslGate();
  const { report, markStarted, finish } = gate;

  const src = `https://www.youtube.com/embed/${vsl.youtubeId}?${EMBED_PARAMS}`;

  // Liga a API ao iframe já existente
  useEffect(() => {
    const el = iframeRef.current;
    if (!el) return;
    let cancelled = false;
    loadYouTubeApi().then((YT) => {
      if (cancelled || !el.isConnected) return;
      playerRef.current = new YT.Player(el, {
        events: {
          onReady: (e) => {
            playerRef.current = e.target;
            readyRef.current = true;
            disableCaptions(e.target);
            // Computador (mouse): autoplay sem som + clique para ativar o áudio.
            // Celular: nada automático; o toque no ▶ do YouTube já toca com som.
            const desktop = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
            if (desktop) {
              mutedAutoRef.current = true;
              e.target.mute();
              e.target.playVideo();
            }
          },
          onStateChange: (e) => {
            const st = e.data;
            const isPlaying = st === YT.PlayerState.PLAYING;
            playingRef.current = isPlaying;
            setPlaying(isPlaying);
            if (isPlaying) {
              disableCaptions(e.target);
              markStarted();
              if (mutedAutoRef.current) setNeedsSound(true);
            }
            if (st === YT.PlayerState.ENDED) finish();
          },
          onError: () => finish(),
        },
      });
    });
    return () => {
      cancelled = true;
      try {
        playerRef.current?.destroy();
      } catch {
        /* ignore */
      }
      playerRef.current = null;
    };
  }, [markStarted, finish]);

  // Progresso + liberação por tempo
  useEffect(() => {
    const id = window.setInterval(() => {
      const p = playerRef.current;
      if (!readyRef.current || !p || typeof p.getCurrentTime !== "function") return;
      report(p.getCurrentTime() || 0, p.getDuration() || 0);
    }, 250);
    return () => window.clearInterval(id);
  }, [report]);

  // Proteção: se o player do YouTube nunca ficar pronto (rede bloqueada), libera a página.
  useEffect(() => {
    const id = window.setTimeout(() => {
      if (!readyRef.current) finish();
    }, vsl.fallbackSeconds * 1000);
    return () => window.clearTimeout(id);
  }, [finish]);

  const enableSound = () => {
    const p = playerRef.current;
    mutedAutoRef.current = false;
    setNeedsSound(false);
    if (!p) return;
    p.unMute();
    p.setVolume(100);
    if (vsl.restartOnUnmute && (p.getCurrentTime?.() || 0) > 1) p.seekTo(0, true);
    p.playVideo();
    trackVideoUnmute();
  };

  const showTapHint = !playing && gate.time.cur < 1;

  return (
    <VslFrame
      progress={gate.progress}
      time={gate.time}
      note={
        showTapHint ? (
          <span className="flex items-center justify-center gap-2 font-display text-sm font-extrabold uppercase tracking-wide text-gold">
            <Play className="size-4 fill-current" aria-hidden />
            Toque no vídeo para assistir
          </span>
        ) : null
      }
    >
      {/* Capa imediata, só até o YouTube desenhar o player (não bloqueia toques) */}
      {!iframeLoaded && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={vsl.posterSrc}
          onError={(e) => {
            const img = e.currentTarget;
            if (!img.src.includes("ytimg.com")) img.src = `https://i.ytimg.com/vi/${vsl.youtubeId}/sddefault.jpg`;
          }}
          alt=""
          aria-hidden
          fetchPriority="high"
          decoding="async"
          className="pointer-events-none absolute inset-0 z-10 size-full object-cover"
        />
      )}

      <iframe
        ref={iframeRef}
        src={src}
        title="Vídeo de apresentação"
        loading="eager"
        allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
        allowFullScreen
        referrerPolicy="strict-origin-when-cross-origin"
        onLoad={() => setIframeLoaded(true)}
        className="absolute inset-0 size-full border-0"
      />

      {/* Computador: tocando sem som → um clique ativa o áudio */}
      {needsSound && (
        <button
          type="button"
          onClick={enableSound}
          className="absolute inset-0 z-20 flex items-center justify-center bg-black/25"
          aria-label="Ativar som"
        >
          <span className="flex items-center gap-3 rounded-full bg-gold px-6 py-3 font-display text-base font-extrabold uppercase tracking-wide text-black shadow-gold">
            <Volume2 className="size-6" aria-hidden />
            Clique para ativar o som
          </span>
        </button>
      )}
    </VslFrame>
  );
}
