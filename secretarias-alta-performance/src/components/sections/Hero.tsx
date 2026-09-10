"use client";

import type { CSSProperties } from "react";
import { CalendarCheck, CalendarDays } from "lucide-react";
import { LeadForm } from "@/components/LeadForm";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { event, sections } from "@/lib/config";

/** Entrada em CSS (.enter) com atraso via --d. Nada fica oculto sem JavaScript. */
const enter = (delay: number) => ({ "--d": `${delay}s` }) as CSSProperties;

export function Hero() {
  return (
    <section
      id={sections.hero}
      aria-labelledby="hero-title"
      className="relative overflow-clip bg-black pt-24 pb-14 sm:pt-32 sm:pb-20 lg:pt-36 lg:pb-28"
    >
      <div aria-hidden className="absolute inset-0 bg-grid opacity-60" />
      <div aria-hidden className="absolute inset-0 bg-glow-gold" />
      <div aria-hidden className="absolute -right-32 top-24 size-[520px] rounded-full bg-gold/10 blur-[140px]" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black to-transparent" />

      <div className="container-x relative">
        {/* Topo centralizado: eyebrow + data */}
        <div className="enter flex flex-col items-center gap-3 text-center" style={enter(0)}>
          <Eyebrow>Formação de Secretárias de Alta Performance</Eyebrow>
          {/* DATAS DO TREINAMENTO — edite em src/lib/config.ts (event.dateLabel) */}
          <span className="inline-flex items-center gap-2 rounded-full bg-gold px-5 py-2 font-display text-sm font-black uppercase tracking-[0.18em] text-black shadow-gold sm:text-base">
            <CalendarDays className="size-4" aria-hidden />
            {event.dateLabel}
          </span>
        </div>

        {/*
          Grade: no celular a ordem é título → formulário → meta.
          No desktop: título e meta à esquerda, formulário à direita.
        */}
        <div className="mt-8 grid gap-8 lg:mt-12 lg:grid-cols-[1.05fr_0.95fr] lg:grid-rows-[auto_1fr] lg:gap-x-16 lg:gap-y-6">
          <h1
            id="hero-title"
            className="enter font-display text-[clamp(1.9rem,6vw,3.6rem)] font-black uppercase leading-[0.98] tracking-tight text-balance lg:col-start-1 lg:row-start-1"
            style={enter(0.08)}
          >
            Transforme sua secretária em uma{" "}
            <span className="text-gold-gradient">vendedora</span> e comece a{" "}
            <span className="sm:underline sm:decoration-gold sm:decoration-[7px] sm:underline-offset-[8px]">
              lotar sua agenda
            </span>
          </h1>

          {/* Formulário de captura — visível na primeira tela */}
          <div className="enter relative mx-auto w-full max-w-md lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:max-w-none lg:self-center" style={enter(0.16)}>
            <div aria-hidden className="absolute -inset-3 rounded-[28px] bg-gold/10 blur-2xl" />
            <div id="hero-form" className="scroll-mt-24">
              <LeadForm source="hero" className="relative" />
            </div>
          </div>

          {/* Subtítulo + META */}
          <div className="enter flex flex-col gap-5 lg:col-start-1 lg:row-start-2" style={enter(0.24)}>
            <p className="max-w-lg text-base leading-relaxed text-muted sm:text-[17px] text-pretty">
              2 dias intensivos para transformar o atendimento da sua clínica e converter
              oportunidades em novos pacientes.
            </p>
            <div className="border-gradient-gold w-full max-w-lg rounded-2xl bg-graphite-2/80 p-5 sm:p-6">
              <div className="flex items-center gap-4">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-gold text-black">
                  <CalendarCheck className="size-6" aria-hidden />
                </span>
                <div className="min-w-0">
                  <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-gold">Meta</p>
                  <p className="font-display text-2xl font-black uppercase leading-tight sm:text-3xl">
                    De 8 a 15 agendamentos por dia
                  </p>
                </div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted text-pretty">
                Até <strong className="text-paper">+40% de faturamento</strong> com o método que já
                levou clínicas a recordes de vendas.
              </p>
            </div>
            <p className="text-xs font-medium text-muted sm:text-[13px]">
              Treinamento intensivo de 2 dias ·{" "}
              <span className="font-bold text-gold">{event.dateLabel}</span> · Vagas limitadas.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
