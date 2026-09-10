"use client";

import { useState } from "react";
import { Play } from "lucide-react";
import { cn } from "@/lib/cn";

interface YouTubeEmbedProps {
  /** ID do vídeo (o que vem depois de watch?v=) */
  id: string;
  title: string;
  className?: string;
}

/**
 * Embed leve do YouTube: mostra só a thumbnail e carrega o player ao clicar.
 * Evita baixar ~500 KB do player do YouTube no carregamento da página.
 */
export function YouTubeEmbed({ id, title, className }: YouTubeEmbedProps) {
  const [playing, setPlaying] = useState(false);

  return (
    <div
      className={cn(
        "relative aspect-video w-full overflow-clip rounded-2xl border border-line bg-graphite-2",
        className,
      )}
    >
      {playing ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 size-full"
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label={`Assistir: ${title}`}
          className="group absolute inset-0 flex items-center justify-center"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
            alt=""
            loading="lazy"
            decoding="async"
            className="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
          <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
          <span className="relative flex size-16 items-center justify-center rounded-full bg-gold text-black shadow-gold transition-transform duration-300 group-hover:scale-110 sm:size-20">
            <Play className="ml-1 size-7 fill-current sm:size-8" aria-hidden />
          </span>
          <span className="absolute inset-x-4 bottom-4 text-left font-display text-sm font-extrabold uppercase tracking-wide text-paper sm:text-base">
            {title}
          </span>
        </button>
      )}
    </div>
  );
}
