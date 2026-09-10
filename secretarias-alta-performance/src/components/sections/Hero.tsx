"use client";

import type { CSSProperties } from "react";
import { CalendarCheck, CalendarDays, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
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
      className="relative overflow-clip bg-black pt-28 pb-16 sm:pt-36 sm:pb-24 lg:pt-36 lg:pb-28"
    >
      <div aria-hidden className="absolute inset-0 bg-grid opacity-60" />
      <div aria-hidden className="absolute inset-0 bg-glow-gold" />
      <div aria-hidden className="absolute -right-32 top-24 size-[520px] rounded-full bg-gold/10 blur-[140px]" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black to-transparent" />

      <div className="container-x relative grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <div className="flex flex-col items-start gap-6 sm:gap-7">
          <div className="enter flex flex-wrap items-center gap-2.5" style={enter(0)}>
            <Eyebrow>Formação de Secretárias de Alta Performance</Eyebrow>
            {/* DATAS DO TREINAMENTO — edite em src/lib/config.ts (event.dateLabel) */}
            <span className="inline-flex items-center gap-2 rounded-full bg-gold px-3.5 py-1.5 font-display text-[11px] font-black uppercase tracking-[0.18em] text-black shadow-gold sm:text-xs">
              <CalendarDays className="size-3.5" aria-hidden />
              {event.dateLabel}
            </span>
          </div>

          <h1
            id="hero-title"
            className="enter font-display text-[clamp(2.1rem,6.4vw,3.85rem)] font-black uppercase leading-[0.98] tracking-tight text-balance"
            style={enter(0.08)}
          >
            Transforme sua secretária em uma{" "}
            <span className="text-gold-gradient">vendedora</span> e comece a{" "}
            <span className="sm:underline sm:decoration-gold sm:decoration-[7px] sm:underline-offset-[8px]">
              lotar sua agenda
            </span>
          </h1>

          <p className="enter max-w-lg text-base leading-relaxed text-muted sm:text-[17px] text-pretty" style={enter(0.16)}>
            2 dias intensivos para transformar o atendimento da sua clínica e converter
            oportunidades em novos pacientes.
          </p>

          {/* Destaque META */}
          <div className="enter border-gradient-gold w-full max-w-lg rounded-2xl bg-graphite-2/80 p-5 sm:p-6" style={enter(0.24)}>
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

          <div className="enter flex w-full flex-col items-start gap-3 sm:w-auto" style={enter(0.32)}>
            <Button href="#hero-form" size="xl" pulse track="hero_cta" className="w-full sm:w-auto lg:hidden">
              Quero lotar minha agenda
            </Button>
            <p className="text-xs font-medium text-muted sm:text-[13px]">
              Treinamento intensivo de 2 dias ·{" "}
              <span className="font-bold text-gold">{event.dateLabel}</span> · Vagas limitadas.
            </p>
          </div>
        </div>

        {/* Formulário de captura — primeira dobra */}
        <div className="enter relative mx-auto w-full max-w-md lg:max-w-none" style={enter(0.2)}>
          <div aria-hidden className="absolute -inset-3 rounded-[28px] bg-gold/10 blur-2xl" />
          <div id="hero-form" className="scroll-mt-24">
            <LeadForm source="hero" className="relative" />
          </div>

          {/* Card flutuante — conversa no WhatsApp */}
          <div
            aria-hidden
            className="absolute -left-4 bottom-10 hidden w-60 animate-float rounded-2xl border border-line-strong bg-black/90 p-4 shadow-card backdrop-blur sm:block lg:-left-10"
          >
            <div className="flex items-center gap-2">
              <span className="flex size-8 items-center justify-center rounded-full bg-gold text-black">
                <MessageCircle className="size-4" />
              </span>
              <div>
                <p className="text-xs font-bold">Paciente</p>
                <p className="text-[10px] text-muted">agora</p>
              </div>
            </div>
            <p className="mt-3 rounded-xl rounded-tl-sm bg-graphite-3 px-3 py-2 text-xs leading-snug text-paper/90">
              Oi! Quanto custa a consulta?
            </p>
            <p className="mt-2 ml-6 rounded-xl rounded-tr-sm bg-gold px-3 py-2 text-xs font-semibold leading-snug text-black">
              Posso te agendar hoje às 15h ou amanhã às 9h?
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
