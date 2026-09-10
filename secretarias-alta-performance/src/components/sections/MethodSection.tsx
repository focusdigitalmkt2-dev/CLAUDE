"use client";

import {
  Brain,
  Filter,
  CalendarPlus,
  RotateCcw,
  Zap,
  ListChecks,
  type LucideIcon,
} from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { Microcopy } from "@/components/ui/Microcopy";
import { sections } from "@/lib/config";

interface Pillar {
  n: string;
  title: string;
  text: string;
  icon: LucideIcon;
}

const pillars: Pillar[] = [
  {
    n: "01",
    title: "Mentalidade comercial",
    text: "Sua secretária precisa deixar de enxergar o atendimento apenas como uma função administrativa e entender seu impacto direto no faturamento.",
    icon: Brain,
  },
  {
    n: "02",
    title: "Conversão de leads",
    text: "Como conduzir conversas para aumentar as chances de transformar interessados em pacientes agendados.",
    icon: Filter,
  },
  {
    n: "03",
    title: "Agendamento",
    text: "Métodos para gerar mais agendamentos todos os dias e reduzir oportunidades desperdiçadas.",
    icon: CalendarPlus,
  },
  {
    n: "04",
    title: "Follow-up",
    text: "Como recuperar pessoas que pediram informações, demonstraram interesse e ainda não marcaram.",
    icon: RotateCcw,
  },
  {
    n: "05",
    title: "Atendimento de alta performance",
    text: "Postura, comunicação, velocidade, organização e comportamento necessários para uma operação comercial eficiente.",
    icon: Zap,
  },
  {
    n: "06",
    title: "Rotina e processos",
    text: "Checklists e processos para que o método continue sendo aplicado depois do treinamento.",
    icon: ListChecks,
  },
];

export function MethodSection() {
  return (
    <Section id={sections.method} tone="black" ariaLabelledby="method-title">
      <div aria-hidden className="absolute inset-0 bg-glow-gold" />
      <div className="relative">
        <Reveal>
          <SectionHeading
            id="method-title"
            eyebrow="O método"
            title={
              <>
                Formação de Secretárias de{" "}
                <span className="text-gold-gradient">Alta Performance</span>
              </>
            }
            subtitle="Em 2 dias, vamos trabalhar atendimento, vendas, comportamento, mentalidade e processos para transformar o atendimento da sua clínica."
          />
        </Reveal>

        <Stagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-5">
          {pillars.map((p) => {
            const Icon = p.icon;
            return (
              <StaggerItem
                as="article"
                key={p.n}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-line bg-graphite p-6 transition-all duration-300 hover:-translate-y-1 hover:border-gold/50 hover:shadow-card sm:p-7"
              >
                <div
                  aria-hidden
                  className="absolute -right-10 -top-10 size-32 rounded-full bg-gold/0 blur-2xl transition-all duration-500 group-hover:bg-gold/15"
                />
                <div className="flex items-start justify-between">
                  <span className="flex size-12 items-center justify-center rounded-xl border border-gold/30 bg-gold-soft text-gold transition-colors duration-300 group-hover:bg-gold group-hover:text-black">
                    <Icon className="size-6" aria-hidden />
                  </span>
                  <span className="font-display text-4xl font-black leading-none text-paper/10 transition-colors duration-300 group-hover:text-gold/40">
                    {p.n}
                  </span>
                </div>
                <h3 className="mt-6 font-display text-lg font-extrabold uppercase leading-tight tracking-wide sm:text-xl">
                  {p.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted sm:text-[15px] text-pretty">
                  {p.text}
                </p>
              </StaggerItem>
            );
          })}
        </Stagger>

        <Reveal delay={0.1} className="mt-12 flex flex-col items-center gap-3">
          <Button href={`#${sections.pricing}`} size="xl" track="method_cta" className="w-full sm:w-auto">
            Quero lotar minha agenda
          </Button>
          <Microcopy />
        </Reveal>
      </div>
    </Section>
  );
}
