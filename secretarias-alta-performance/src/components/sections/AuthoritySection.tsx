"use client";

import { Building2, LineChart, Workflow } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { sections } from "@/lib/config";

const proofs = [
  { icon: Building2, title: "Operação real", text: "Método construído dentro da rotina de clínicas, não em teoria." },
  { icon: LineChart, title: "Marketing + comercial", text: "Acompanhamos do anúncio ao agendamento, onde a conversão acontece." },
  { icon: Workflow, title: "Processos aplicáveis", text: "Estratégias testadas e ajustadas em diferentes especialidades." },
];

export function AuthoritySection() {
  return (
    <Section id={sections.authority} tone="white" ariaLabelledby="authority-title">
      <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-16">
        {/* Número + imagem */}
        <div className="relative order-2 lg:order-1">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl bg-black p-8 text-paper shadow-card sm:p-10">
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
                <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
                  Experiência aplicada em mais de 200 clínicas e negócios da área da saúde.
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

          <Reveal delay={0.1} className="mt-6 space-y-4 text-base leading-relaxed text-black/70 sm:text-lg">
            <p className="text-pretty">
              A Focus acompanha a operação, marketing e crescimento de mais de 200 clínicas e
              negócios da área da saúde.
            </p>
            <p className="text-pretty">
              Ao longo dessa experiência, desenvolvemos e aplicamos estratégias comerciais que
              ajudaram clínicas a aumentarem seus agendamentos, melhorarem seus processos e
              alcançarem novos patamares de faturamento.
            </p>
          </Reveal>

          <Stagger className="mt-8 grid gap-3 sm:grid-cols-3">
            {proofs.map((p) => {
              const Icon = p.icon;
              return (
                <StaggerItem key={p.title} className="rounded-2xl border border-black/10 bg-paper-2 p-5">
                  <span className="flex size-10 items-center justify-center rounded-xl bg-black text-gold">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <p className="mt-4 font-display text-sm font-extrabold uppercase tracking-wide text-black">
                    {p.title}
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed text-black/65">{p.text}</p>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </div>
    </Section>
  );
}
