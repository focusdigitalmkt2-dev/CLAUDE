"use client";

import { vsl } from "@/lib/config";
import { useVslUnlocked } from "@/lib/vslStore";
import { NativeVsl } from "@/components/vsl/NativeVsl";
import { YouTubeVsl } from "@/components/vsl/YouTubeVsl";

/**
 * VSL logo abaixo da headline. Usa o player nativo quando há um MP4 configurado
 * (vsl.mp4Url) e o YouTube como padrão. O restante da página é liberado pelo
 * tempo de vídeo (vsl.unlockAtSeconds) — ver useVslGate.
 */
export function VslSection() {
  const unlocked = useVslUnlocked();

  return (
    <section id="vsl" aria-label="Vídeo de apresentação" className="relative scroll-mt-20 bg-black pb-12 sm:pb-16">
      <div className="container-x">
        <div className="mx-auto max-w-4xl">
          {vsl.mp4Url ? <NativeVsl /> : <YouTubeVsl />}

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
