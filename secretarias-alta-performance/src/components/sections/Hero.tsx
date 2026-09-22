"use client";

import type { CSSProperties } from "react";
import { sections } from "@/lib/config";

/** Entrada em CSS (.enter) com atraso via --d. Nada fica oculto sem JavaScript. */
const enter = (delay: number) => ({ "--d": `${delay}s` }) as CSSProperties;

export function Hero() {
  return (
    <section
      id={sections.hero}
      aria-labelledby="hero-title"
      className="relative overflow-clip bg-black pt-24 pb-6 sm:pt-32 sm:pb-8"
    >
      <div aria-hidden className="absolute inset-0 bg-grid opacity-60" />
      <div aria-hidden className="absolute inset-0 bg-glow-gold" />
      <div aria-hidden className="absolute -right-32 top-24 size-[520px] rounded-full bg-gold/10 blur-[140px]" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black to-transparent" />

      <div className="container-x relative">
        <h1
          id="hero-title"
          className="enter mx-auto max-w-4xl text-center font-display text-[clamp(1.85rem,5.6vw,3.6rem)] font-black uppercase leading-[0.98] tracking-tight text-balance"
          style={enter(0)}
        >
          Transforme sua secretária em uma{" "}
          <span className="text-gold-gradient">vendedora</span> e comece a{" "}
          <span className="sm:underline sm:decoration-gold sm:decoration-[7px] sm:underline-offset-[8px]">
            lotar sua agenda
          </span>
        </h1>
      </div>
    </section>
  );
}
