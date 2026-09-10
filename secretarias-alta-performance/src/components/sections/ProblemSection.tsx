"use client";

import {
  Megaphone,
  UserPlus,
  MessageSquareText,
  CalendarCheck,
  HeartPulse,
  BadgeDollarSign,
  AlertTriangle,
} from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { sections } from "@/lib/config";

const flow = [
  { label: "Anúncio", icon: Megaphone },
  { label: "Lead", icon: UserPlus },
  { label: "Atendimento", icon: MessageSquareText, critical: true },
  { label: "Agendamento", icon: CalendarCheck },
  { label: "Paciente", icon: HeartPulse },
  { label: "Faturamento", icon: BadgeDollarSign },
];

const lines = ["Você investe em marketing.", "Os leads chegam.", "Perguntam preço.", "Demonstram interesse."];

export function ProblemSection() {
  return (
    <Section id={sections.problem} tone="graphite" ariaLabelledby="problem-title">
      <div aria-hidden className="absolute inset-0 bg-grid opacity-30" />
      <div className="relative">
        <Reveal>
          <SectionHeading
            id="problem-title"
            eyebrow="O problema invisível"
            title={
              <>
                Todo dia sua clínica pode estar{" "}
                <span className="text-gold-gradient">perdendo pacientes</span> sem você perceber.
              </>
            }
          />
        </Reveal>

        <div className="mt-14 grid gap-10 lg:mt-20 lg:grid-cols-2 lg:gap-16">
          <div>
            <Stagger as="ul" className="space-y-2">
              {lines.map((l) => (
                <StaggerItem as="li" key={l} className="font-display text-xl font-bold sm:text-2xl">
                  {l}
                </StaggerItem>
              ))}
            </Stagger>

            <Reveal delay={0.1} className="mt-6">
              <p className="font-display text-3xl font-black uppercase leading-none text-gold sm:text-4xl">
                Mas muitas não agendam.
              </p>
              <p className="mt-6 text-lg leading-relaxed text-muted text-pretty">
                E o problema, na maioria das vezes, não está no anúncio.{" "}
                <strong className="text-paper">Está no atendimento.</strong>
              </p>
            </Reveal>

            <Reveal delay={0.15} className="mt-8 rounded-2xl border border-gold/30 bg-black p-6 sm:p-7">
              <p className="text-base font-semibold text-muted">Não basta ter uma secretária.</p>
              <p className="mt-2 font-display text-2xl font-black uppercase leading-tight sm:text-3xl">
                Sua clínica precisa de uma <span className="text-gold">vendedora</span>.
              </p>
            </Reveal>
          </div>

          <div className="flex flex-col justify-center">
            <Stagger className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3">
              {flow.map((step) => {
                const Icon = step.icon;
                return (
                  <StaggerItem
                    key={step.label}
                    className={
                      step.critical
                        ? "relative rounded-2xl border border-gold bg-gold p-4 text-black shadow-gold"
                        : "relative rounded-2xl border border-line bg-black p-4"
                    }
                  >
                    <Icon className="size-6" aria-hidden />
                    <p className="mt-4 font-display text-sm font-extrabold uppercase tracking-wide sm:text-base">
                      {step.label}
                    </p>
                    {step.critical && (
                      <p className="mt-1 text-[11px] font-bold uppercase tracking-wider text-black/70">
                        Ponto crítico
                      </p>
                    )}
                  </StaggerItem>
                );
              })}
            </Stagger>

            <Reveal delay={0.2} className="mt-6 flex items-start gap-3 rounded-2xl border border-gold/25 bg-gold-soft p-5">
              <AlertTriangle className="mt-0.5 size-5 shrink-0 text-gold" aria-hidden />
              <p className="text-sm font-semibold leading-relaxed sm:text-base">
                Se o atendimento falha, todo o investimento anterior se perde.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </Section>
  );
}
