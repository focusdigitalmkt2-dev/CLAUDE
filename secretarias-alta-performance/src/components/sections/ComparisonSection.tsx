"use client";

import { X, Check } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { sections } from "@/lib/config";

const before = [
  "Apenas responde",
  "Informa preço",
  "Espera o paciente decidir",
  "Não faz follow-up",
  "Não conduz objeções",
  "Não acompanha indicadores",
];

const after = [
  "Conduz a conversa",
  "Identifica intenção",
  "Gera valor",
  "Trabalha objeções",
  "Faz follow-up",
  "Busca o agendamento",
  "Acompanha resultados",
];

export function ComparisonSection() {
  return (
    <Section id={sections.comparison} tone="graphite" ariaLabelledby="comparison-title">
      <div aria-hidden className="absolute inset-0 bg-grid opacity-30" />
      <div className="relative">
        <Reveal>
          <SectionHeading
            id="comparison-title"
            eyebrow="Antes e depois"
            title={
              <>
                De secretária a{" "}
                <span className="text-gold-gradient">secretária de alta performance</span>
              </>
            }
          />
        </Reveal>

        <div className="mt-12 grid gap-5 lg:mt-16 lg:grid-cols-2 lg:gap-6">
          {/* ANTES */}
          <Reveal className="rounded-3xl border border-line bg-black p-6 sm:p-8">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-muted-2">Antes</p>
            <h3 className="mt-2 font-display text-2xl font-black uppercase leading-none text-muted sm:text-3xl">
              Secretária
            </h3>
            <Stagger as="ul" className="mt-7 space-y-3">
              {before.map((t) => (
                <StaggerItem as="li" key={t} className="flex items-center gap-3 text-muted">
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-full border border-line-strong text-muted-2">
                    <X className="size-3.5" strokeWidth={3} aria-hidden />
                  </span>
                  <span className="text-[15px] sm:text-base">{t}</span>
                </StaggerItem>
              ))}
            </Stagger>
          </Reveal>

          {/* DEPOIS */}
          <Reveal delay={0.1} className="border-gradient-gold relative overflow-clip rounded-3xl bg-black p-6 shadow-gold sm:p-8">
            <div aria-hidden className="absolute -right-10 -top-10 size-40 rounded-full bg-gold/20 blur-3xl" />
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-gold">Depois</p>
            <h3 className="mt-2 font-display text-2xl font-black uppercase leading-none sm:text-3xl">
              Secretária de <span className="text-gold">Alta Performance</span>
            </h3>
            <Stagger as="ul" className="mt-7 space-y-3">
              {after.map((t) => (
                <StaggerItem as="li" key={t} className="flex items-center gap-3">
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-gold text-black">
                    <Check className="size-3.5" strokeWidth={3} aria-hidden />
                  </span>
                  <span className="text-[15px] font-semibold sm:text-base">{t}</span>
                </StaggerItem>
              ))}
            </Stagger>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <p className="mx-auto mt-10 max-w-2xl text-center font-display text-xl font-bold leading-snug sm:text-2xl text-balance">
            A diferença entre as duas pode representar{" "}
            <span className="text-gold">dezenas de pacientes todos os meses.</span>
          </p>
        </Reveal>
      </div>
    </Section>
  );
}
