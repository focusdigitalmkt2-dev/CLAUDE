"use client";

import { useState } from "react";
import { vsl } from "@/lib/config";
import { useVslUnlocked } from "@/lib/vslStore";
import { NativeVsl } from "@/components/vsl/NativeVsl";
import { YouTubeVsl } from "@/components/vsl/YouTubeVsl";

/**
 * VSL logo abaixo da headline. Usa o player nativo quando há um MP4 configurado
 * (vsl.mp4Url) e o YouTube como padrão. O restante da página é liberado pelo
 * tempo de vídeo (vsl.unlockAtSeconds) — ver useVslGate.
 * Se o MP4 não carregar (arquivo ainda não enviado), volta para o YouTube.
 */
export function VslSection() {
  const unlocked = useVslUnlocked();
  const [mp4Failed, setMp4Failed] = useState(false);
  const useNative = Boolean(vsl.mp4Url) && !mp4Failed;

  return (
    <section id="vsl" aria-label="Vídeo de apresentação" className="relative scroll-mt-20 bg-black pb-12 sm:pb-16">
      <div className="container-x">
        <div className="mx-auto max-w-4xl">
          {useNative ? <NativeVsl onUnavailable={() => setMp4Failed(true)} /> : <YouTubeVsl />}

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
