"use client";

import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { sections } from "@/lib/config";

export function AuthoritySection() {
  return (
    <Section id={sections.authority} tone="white" ariaLabelledby="authority-title">
      <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-16">
        {/* Número + imagem */}
        <div className="relative order-2 lg:order-1">
          <Reveal>
            <div className="relative overflow-clip rounded-3xl bg-black p-8 text-paper shadow-card sm:p-10">
              <div aria-hidden className="absolute inset-0 bg-grid opacity-40" />
              <div aria-hidden className="absolute -right-10 -top-10 size-48 rounded-full bg-gold/20 blur-3xl" />
              <div className="relative">
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-gold">Experiência aplicada</p>
                <p className="mt-2 font-display text-[clamp(4rem,14vw,7.5rem)] font-black leading-none tracking-tight text-gold-gradient">
                  +200
                </p>
                <p className="font-display text-xl font-extrabold uppercase tracking-wide sm:text-2xl">
                  Clínicas impactadas
                </p>
              </div>
            </div>
          </Reveal>

          {/*
            IMAGEM — equipe Focus / palestrantes / bastidores
            Sugestão: /public/images/speakers/equipe-focus.jpg (16:10)
          */}
          <Reveal delay={0.1} className="mt-4">
            <ImagePlaceholder
              alt="Equipe Focus em atendimento a clínicas"
              label="Equipe Focus"
              hint="Foto da equipe, palestrantes ou bastidores"
              aspect="16/10"
              className="bg-black"
            />
          </Reveal>
        </div>

        {/* Texto */}
        <div className="order-1 lg:order-2">
          <Reveal>
            <Eyebrow dark>Autoridade</Eyebrow>
            <h2
              id="authority-title"
              className="mt-5 font-display text-[clamp(1.9rem,5.4vw,3.5rem)] font-black uppercase leading-[1.02] tracking-tight text-black text-balance"
            >
              Um método construído dentro da{" "}
              <span className="text-gold-3">rotina real de clínicas.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.1} className="mt-6 max-w-xl space-y-4 text-base leading-relaxed text-black/70 sm:text-lg">
            <p className="text-pretty">
              A Focus acompanha marketing, operação e crescimento de mais de 200 clínicas e
              negócios da saúde.
            </p>
            <p className="text-pretty">
              Desse dia a dia nasceram as estratégias que ajudaram clínicas a{" "}
              <strong className="text-black">agendar mais e faturar mais.</strong>
            </p>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
