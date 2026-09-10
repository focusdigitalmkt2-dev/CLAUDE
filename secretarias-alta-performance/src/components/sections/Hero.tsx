"use client";

import { motion, useReducedMotion } from "framer-motion";
import { CalendarCheck, CalendarDays, MessageCircle, Phone, TrendingUp, Users } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
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
      {/* Fundo */}
      <div aria-hidden className="absolute inset-0 bg-grid opacity-60" />
      <div aria-hidden className="absolute inset-0 bg-glow-gold" />
      <div
        aria-hidden
        className="absolute -right-32 top-24 size-[520px] rounded-full bg-gold/10 blur-[140px]"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black to-transparent"
      />

      <div className="container-x relative grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        {/* Coluna de texto */}
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

          <motion.p
            {...fade(0.16)}
            className="max-w-xl text-base leading-relaxed text-muted sm:text-[17px] text-pretty"
          >
            Um treinamento intensivo de 2 dias para transformar o atendimento da sua clínica,
            aumentar seus agendamentos e criar uma secretária de alta performance capaz de
            converter oportunidades em novos pacientes.
          </motion.p>

          {/* Destaque META */}
          <motion.div
            {...fade(0.24)}
            className="border-gradient-gold w-full max-w-xl rounded-2xl bg-graphite-2/80 p-5 sm:p-6"
          >
            <div className="flex items-start gap-4">
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
              Nossa meta é ajudar sua clínica a aumentar em até{" "}
              <strong className="text-paper">40% o faturamento</strong> utilizando o método de
              agendamentos que já ajudou clínicas a baterem recordes de vendas.
            </p>
          </motion.div>

          <motion.div {...fade(0.32)} className="flex w-full flex-col items-start gap-3 sm:w-auto">
            <Button
              href={`#${sections.pricing}`}
              size="xl"
              pulse
              track="hero_cta"
              className="w-full sm:w-auto"
            >
              Quero lotar minha agenda
            </Button>
            <p className="text-xs font-medium text-muted sm:text-[13px]">
              Treinamento intensivo de 2 dias.{" "}
              <span className="font-bold text-gold">{event.dateLabel}.</span>{" "}
              <span className="text-muted-2">Vagas limitadas.</span>
            </p>
          </motion.div>

          {/* Mini prova / ícones */}
          <motion.ul
            {...fade(0.4)}
            aria-label="Temas do treinamento"
            className="mt-2 flex flex-wrap gap-x-6 gap-y-3 text-xs font-semibold uppercase tracking-wider text-muted-2"
          >
            <li className="inline-flex items-center gap-2"><MessageCircle className="size-4 text-gold" aria-hidden />WhatsApp</li>
            <li className="inline-flex items-center gap-2"><Phone className="size-4 text-gold" aria-hidden />Telefone</li>
            <li className="inline-flex items-center gap-2"><Users className="size-4 text-gold" aria-hidden />Pacientes</li>
            <li className="inline-flex items-center gap-2"><TrendingUp className="size-4 text-gold" aria-hidden />Faturamento</li>
          </motion.ul>
        </div>

        {/* Coluna de imagem */}
        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.96, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 0.2 }}
          className="relative mx-auto w-full max-w-md lg:max-w-none"
        >
          <div aria-hidden className="absolute -inset-3 rounded-[28px] bg-gold/10 blur-2xl" />

          {/*
            IMAGEM PRINCIPAL DO HERO
            Substituir por: foto dos especialistas/palestrantes ou imagem do treinamento presencial.
            Arquivo sugerido: /public/images/speakers/palestrantes.jpg (proporção 4:5)
            → passe src="/images/speakers/palestrantes.jpg"
          */}
          <ImagePlaceholder
            alt="Foto dos especialistas que conduzem o treinamento"
            label="Foto dos especialistas"
            hint="Palestrantes ou imagem do treinamento presencial"
            aspect="4/5"
            priority
            rounded="rounded-[24px]"
            className="relative shadow-card"
            icon={<Users className="size-6" aria-hidden />}
          />

          {/* Card flutuante — agenda */}
          <motion.div
            aria-hidden
            className="absolute -left-4 bottom-10 hidden w-52 rounded-2xl border border-line-strong bg-black/90 p-4 shadow-card backdrop-blur sm:block lg:-left-10"
            animate={reduce ? undefined : { y: [0, -8, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold">Agenda de hoje</p>
            <p className="mt-1 font-display text-3xl font-black">12<span className="text-base text-muted"> / 15</span></p>
            <p className="text-xs text-muted">agendamentos confirmados</p>
            <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-graphite-3">
              <div className="h-full w-4/5 rounded-full bg-gold" />
            </div>
          </motion.div>

          {/* Card flutuante — WhatsApp */}
          <motion.div
            aria-hidden
            className="absolute -right-3 top-8 hidden w-56 rounded-2xl border border-line-strong bg-black/90 p-4 shadow-card backdrop-blur sm:block lg:-right-8"
            animate={reduce ? undefined : { y: [0, 8, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
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
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
