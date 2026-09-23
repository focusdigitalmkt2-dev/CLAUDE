"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play, Volume2, VolumeX } from "lucide-react";
import { cn } from "@/lib/cn";
import { vsl } from "@/lib/config";
import { trackVideoUnmute } from "@/lib/analytics";
import { VslFrame } from "./VslFrame";
import { useVslGate } from "./useVslGate";

/**
 * Player nativo (<video>) com o MP4 servido pelo próprio site:
 * - começa sozinho sem som onde o navegador permite; onde não permite, mostra "Toque para assistir";
 * - o toque no vídeo liga o som (é um gesto na própria página, aceito por todo celular);
 * - sem controles nativos: não dá para pular a parte que libera a página;
 * - barra de progresso, temporizador e liberação por tempo iguais ao player do YouTube.
 */
export function NativeVsl({ onUnavailable }: { onUnavailable?: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const maxPlayedRef = useRef(0);

  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [started, setStarted] = useState(false); // já tocou alguma vez (com ou sem som)
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);
  const gate = useVslGate();
  const { report, markStarted, finish } = gate;

  const unavailable = onUnavailable ?? finish;

  // Tenta o autoplay sem som. Se o arquivo já falhou antes da hidratação
  // (o evento "error" disparou antes de o React escutar), detecta aqui.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (v.error || v.networkState === HTMLMediaElement.NETWORK_NO_SOURCE) {
      unavailable();
      return;
    }
    v.muted = true;
    const p = v.play();
    if (p && typeof p.catch === "function") {
      p.catch((e: unknown) => {
        if (e instanceof DOMException && e.name === "NotSupportedError") unavailable();
        else setAutoplayBlocked(true);
      });
    }
  }, [unavailable]);

  // Proteção: sem metadados do arquivo em 15 s → troca para o YouTube (ou libera a página)
  useEffect(() => {
    const id = window.setTimeout(() => {
      const v = videoRef.current;
      if (!v || v.readyState === 0) unavailable();
    }, 15000);
    return () => window.clearTimeout(id);
  }, [unavailable]);

  const soundOn = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = false;
    v.volume = 1;
    if (vsl.restartOnUnmute && v.currentTime > 1) v.currentTime = 0;
    maxPlayedRef.current = 0;
    setMuted(false);
    setAutoplayBlocked(false);
    v.play().catch(() => {});
    trackVideoUnmute();
  };

  /** Toque no vídeo: primeiro liga o som; depois alterna play/pause. */
  const onTap = () => {
    const v = videoRef.current;
    if (!v) return;
    if (muted) return soundOn();
    if (v.paused) v.play().catch(() => {});
    else v.pause();
  };

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    if (muted) return soundOn();
    v.muted = true;
    setMuted(true);
  };

  const showOverlay = muted || autoplayBlocked;
  const label = autoplayBlocked && !started ? "Toque para assistir" : "Toque para ativar o som";

  return (
    <VslFrame
      progress={gate.progress}
      time={gate.time}
      left={
        <button
          type="button"
          onClick={onTap}
          aria-label={playing ? "Pausar" : "Reproduzir"}
          className="flex size-9 shrink-0 items-center justify-center rounded-full bg-gold text-black"
        >
          {playing ? <Pause className="size-4 fill-current" aria-hidden /> : <Play className="ml-0.5 size-4 fill-current" aria-hidden />}
        </button>
      }
      right={
        <button
          type="button"
          onClick={toggleMute}
          aria-label={muted ? "Ativar som" : "Silenciar"}
          className={cn(
            "flex size-9 shrink-0 items-center justify-center rounded-full border",
            muted ? "border-gold text-gold" : "border-line-strong text-paper",
          )}
        >
          {muted ? <VolumeX className="size-4" aria-hidden /> : <Volume2 className="size-4" aria-hidden />}
        </button>
      }
    >
      <video
        ref={videoRef}
        src={vsl.mp4Url}
        poster={vsl.posterSrc}
        playsInline
        muted
        preload="auto"
        disablePictureInPicture
        controlsList="nodownload noplaybackrate"
        onClick={onTap}
        onPlay={() => {
          setPlaying(true);
          setStarted(true);
          setAutoplayBlocked(false);
          markStarted();
        }}
        onPause={() => setPlaying(false)}
        onEnded={() => finish()}
        // MP4 ausente/corrompido (ex.: ainda não enviado para a hospedagem): cai para o YouTube
        onError={() => unavailable()}
        onTimeUpdate={(e) => {
          const v = e.currentTarget;
          if (v.currentTime > maxPlayedRef.current) maxPlayedRef.current = v.currentTime;
          report(v.currentTime, v.duration || 0);
        }}
        onSeeking={(e) => {
          // não deixa pular para frente: a página só libera assistindo
          const v = e.currentTarget;
          if (v.currentTime > maxPlayedRef.current + 1) v.currentTime = maxPlayedRef.current;
        }}
        className="absolute inset-0 size-full cursor-pointer object-cover"
      />

      {showOverlay && (
        <button
          type="button"
          onClick={onTap}
          aria-label={label}
          className="absolute inset-0 z-10 flex items-center justify-center"
        >
          <span className="flex flex-col items-center gap-3">
            <span className="ring-pulse relative flex size-20 items-center justify-center rounded-full bg-gold text-black shadow-gold sm:size-24">
              {autoplayBlocked && !started ? (
                <Play className="ml-1 size-9 fill-current sm:size-10" />
              ) : (
                <VolumeX className="size-9 sm:size-10" />
              )}
            </span>
            <span className="rounded-full bg-black/80 px-4 py-2 font-display text-sm font-extrabold uppercase tracking-wide text-paper backdrop-blur sm:text-base">
              {label}
            </span>
          </span>
        </button>
      )}
    </VslFrame>
  );
}
