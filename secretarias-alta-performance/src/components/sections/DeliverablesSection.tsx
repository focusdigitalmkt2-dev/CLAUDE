"use client";

import {
  BookOpen,
  ClipboardCheck,
  MessageSquareQuote,
  RotateCcw,
  CalendarRange,
  Footprints,
  TrendingUp,
  Rocket,
  type LucideIcon,
} from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { sections } from "@/lib/config";

const items: Array<{ label: string; icon: LucideIcon }> = [
  { label: "Apostila completa do treinamento", icon: BookOpen },
  { label: "Checklists de atendimento", icon: ClipboardCheck },
  { label: "Scripts e direcionamentos", icon: MessageSquareQuote },
  { label: "Processo de follow-up", icon: RotateCcw },
  { label: "Rotina comercial para secretária", icon: CalendarRange },
  { label: "Passo a passo para aplicar imediatamente", icon: Footprints },
  { label: "Plano para aumentar o número de agendamentos", icon: TrendingUp },
  { label: "Estratégias que podem começar a ser utilizadas no mesmo dia", icon: Rocket },
];

export function DeliverablesSection() {
  return (
    <Section id={sections.deliverables} tone="white" ariaLabelledby="deliverables-title">
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16">
        <div>
          <Reveal>
            <SectionHeading
              id="deliverables-title"
              dark
              align="left"
              eyebrow="Entregáveis"
              title={
                <>
                  Você não vai sair apenas com mais conhecimento.{" "}
                  <span className="text-gold-3">Vai sair com um plano para executar.</span>
                </>
              }
            />
          </Reveal>

          <Reveal delay={0.1} className="mt-8 rounded-2xl border-l-4 border-gold bg-paper-2 p-5 sm:p-6">
            <p className="font-display text-lg font-bold leading-snug text-black sm:text-xl text-pretty">
              A intenção é que sua equipe consiga sair do treinamento e começar a aplicar o método
              imediatamente dentro da clínica.
            </p>
          </Reveal>

          {/*
            IMAGEM — material / apostila / treinamento presencial
            Sugestão: /public/images/training/material.jpg (16:10)
          */}
          <Reveal delay={0.15} className="mt-8 hidden lg:block">
            <ImagePlaceholder
              alt="Material e apostila do treinamento"
              label="Foto do material"
              hint="Apostila, checklists ou treinamento presencial"
              aspect="16/10"
              className="bg-black"
            />
          </Reveal>
        </div>

        <Stagger as="ul" className="grid gap-3 sm:grid-cols-2">
          {items.map((it, i) => {
            const Icon = it.icon;
            return (
              <StaggerItem
                as="li"
                key={it.label}
                className="group flex items-start gap-4 rounded-2xl border border-black/10 bg-paper p-5 shadow-[0_10px_30px_-20px_rgba(0,0,0,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:border-gold hover:shadow-[0_18px_40px_-20px_rgba(0,0,0,0.35)]"
              >
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-black text-gold transition-colors duration-300 group-hover:bg-gold group-hover:text-black">
                  <Icon className="size-5" aria-hidden />
                </span>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-black/40">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="mt-0.5 font-semibold leading-snug text-black text-pretty">{it.label}</p>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </Section>
  );
}
