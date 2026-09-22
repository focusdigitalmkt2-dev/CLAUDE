"use client";

import type { CSSProperties } from "react";
import { CalendarDays } from "lucide-react";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { LocationBadge } from "@/components/ui/LocationBadge";
import { event, sections } from "@/lib/config";

/** Entrada em CSS (.enter) com atraso via --d. Nada fica oculto sem JavaScript. */
const enter = (delay: number) => ({ "--d": `${delay}s` }) as CSSProperties;

export function Hero() {
  return (
    <section
      id={sections.hero}
      aria-labelledby="hero-title"
      className="relative overflow-clip bg-black pt-24 pb-8 sm:pt-32 sm:pb-10"
    >
      <div aria-hidden className="absolute inset-0 bg-grid opacity-60" />
      <div aria-hidden className="absolute inset-0 bg-glow-gold" />
      <div aria-hidden className="absolute -right-32 top-24 size-[520px] rounded-full bg-gold/10 blur-[140px]" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black to-transparent" />

      <div className="container-x relative">
        {/* Topo centralizado: eyebrow + data */}
        <div className="enter flex flex-col items-center gap-3 text-center" style={enter(0)}>
          <Eyebrow>Formação de Secretárias de Alta Performance</Eyebrow>
          {/* DATA + LOCAL — edite em src/lib/config.ts (event) */}
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            <span className="inline-flex h-12 items-center gap-2 rounded-full bg-gold px-5 font-display text-sm font-black uppercase tracking-[0.18em] text-black shadow-gold sm:text-base">
              <CalendarDays className="size-4" aria-hidden />
              {event.dateLabel}
            </span>
            <LocationBadge />
          </div>
        </div>

        <h1
          id="hero-title"
          className="enter mx-auto mt-6 max-w-4xl text-center font-display text-[clamp(1.75rem,5.4vw,3.4rem)] font-black uppercase leading-[0.98] tracking-tight text-balance"
          style={enter(0.08)}
        >
          Transforme sua secretária em uma{" "}
          <span className="text-gold-gradient">vendedora</span> e comece a{" "}
          <span className="sm:underline sm:decoration-gold sm:decoration-[7px] sm:underline-offset-[8px]">
            lotar sua agenda
          </span>
        </h1>
        <p className="enter mx-auto mt-4 max-w-xl text-center text-sm leading-relaxed text-muted sm:text-base text-pretty" style={enter(0.12)}>
          Assista ao vídeo e descubra como o método já ajudou clínicas a baterem recordes de agendamentos.
        </p>
      </div>
    </section>
  );
}
