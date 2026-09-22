"use client";

import { CalendarCheck, CalendarDays } from "lucide-react";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { LocationBadge } from "@/components/ui/LocationBadge";
import { LeadForm } from "@/components/LeadForm";
import { event } from "@/lib/config";

/** Bloco liberado ao fim da VSL: meta + formulário de inscrição. */
export function HeroSignup() {
  return (
    <section id="hero-form" aria-labelledby="hero-signup-title" className="relative scroll-mt-24 overflow-clip bg-black pb-16 sm:pb-24">
      <div aria-hidden className="absolute inset-0 bg-glow-gold" />
      <div className="container-x relative">
        {/* Eyebrow + data + local, centralizados */}
        <div className="flex flex-col items-center gap-3 pt-8 text-center sm:pt-10">
          <Eyebrow>Formação de Secretárias de Alta Performance</Eyebrow>
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            <span className="inline-flex h-12 items-center gap-2 rounded-full bg-gold px-5 font-display text-sm font-black uppercase tracking-[0.18em] text-black shadow-gold sm:text-base">
              <CalendarDays className="size-4" aria-hidden />
              {event.dateLabel}
            </span>
            <LocationBadge />
          </div>
        </div>

        <div className="mt-10 grid items-center gap-8 lg:grid-cols-[1fr_0.95fr] lg:gap-16">
        <div className="flex flex-col gap-5">
          <h2 id="hero-signup-title" className="font-display text-[clamp(1.75rem,4.6vw,2.8rem)] font-black uppercase leading-[1.02] tracking-tight text-balance">
            Agora é sua vez: <span className="text-gold-gradient">garanta sua vaga</span>
          </h2>
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

        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div aria-hidden className="absolute -inset-3 rounded-[28px] bg-gold/10 blur-2xl" />
          <LeadForm source="hero" className="relative" />
        </div>
        </div>
      </div>
    </section>
  );
}
