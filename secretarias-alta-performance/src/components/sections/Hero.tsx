"use client";

import { motion, useReducedMotion } from "framer-motion";
import { CalendarCheck, CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { LeadForm } from "@/components/LeadForm";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { event, sections } from "@/lib/config";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const reduce = useReducedMotion();
  const fade = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 26 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, ease, delay },
  });

  return (
    <section
      id={sections.hero}
      aria-labelledby="hero-title"
      className="relative overflow-hidden bg-black pt-28 pb-16 sm:pt-36 sm:pb-24 lg:pt-36 lg:pb-28"
    >
      <div aria-hidden className="absolute inset-0 bg-grid opacity-60" />
      <div aria-hidden className="absolute inset-0 bg-glow-gold" />
      <div aria-hidden className="absolute -right-32 top-24 size-[520px] rounded-full bg-gold/10 blur-[140px]" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black to-transparent" />

      <div className="container-x relative grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <div className="flex flex-col items-start gap-6 sm:gap-7">
          <motion.div {...fade(0)} className="flex flex-wrap items-center gap-2.5">
            <Eyebrow>Formação de Secretárias de Alta Performance</Eyebrow>
            {/* DATAS DO TREINAMENTO — edite em src/lib/config.ts (event.dateLabel) */}
            <span className="inline-flex items-center gap-2 rounded-full bg-gold px-3.5 py-1.5 font-display text-[11px] font-black uppercase tracking-[0.18em] text-black shadow-gold sm:text-xs">
              <CalendarDays className="size-3.5" aria-hidden />
              {event.dateLabel}
            </span>
          </motion.div>

          <motion.h1
            id="hero-title"
            {...fade(0.08)}
            className="font-display text-[clamp(2.1rem,6.4vw,3.85rem)] font-black uppercase leading-[0.98] tracking-tight text-balance"
          >
            Transforme sua secretária em uma{" "}
            <span className="text-gold-gradient">vendedora</span> e comece a{" "}
            <span className="sm:underline sm:decoration-gold sm:decoration-[7px] sm:underline-offset-[8px]">
              lotar sua agenda
            </span>
          </motion.h1>

          <motion.p {...fade(0.16)} className="max-w-lg text-base leading-relaxed text-muted sm:text-[17px] text-pretty">
            2 dias intensivos para transformar o atendimento da sua clínica e converter
            oportunidades em novos pacientes.
          </motion.p>

          {/* Destaque META */}
          <motion.div {...fade(0.24)} className="border-gradient-gold w-full max-w-lg rounded-2xl bg-graphite-2/80 p-5 sm:p-6">
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
          </motion.div>

          <motion.div {...fade(0.32)} className="flex w-full flex-col items-start gap-3 sm:w-auto">
            <Button href="#hero-form" size="xl" pulse track="hero_cta" className="w-full sm:w-auto lg:hidden">
              Quero lotar minha agenda
            </Button>
            <p className="text-xs font-medium text-muted sm:text-[13px]">
              Treinamento intensivo de 2 dias ·{" "}
              <span className="font-bold text-gold">{event.dateLabel}</span> · Vagas limitadas.
            </p>
          </motion.div>
        </div>

        {/* Formulário de captura — primeira dobra */}
        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.96, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 0.2 }}
          className="relative mx-auto w-full max-w-md lg:max-w-none"
        >
          <div aria-hidden className="absolute -inset-3 rounded-[28px] bg-gold/10 blur-2xl" />
          <div id="hero-form" className="scroll-mt-24"><LeadForm source="hero" className="relative" /></div>
        </motion.div>
      </div>
    </section>
  );
}
