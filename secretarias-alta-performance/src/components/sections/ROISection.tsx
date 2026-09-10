"use client";

import { UserPlus } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { sections } from "@/lib/config";

const tiers = [
  { n: "+1", label: "paciente", dots: 1 },
  { n: "+5", label: "pacientes", dots: 5 },
  { n: "+10", label: "pacientes", dots: 10 },
  { n: "+20", label: "pacientes", dots: 20 },
];

export function ROISection() {
  return (
    <Section id={sections.roi} tone="white" ariaLabelledby="roi-title">
      <Reveal>
        <SectionHeading
          id="roi-title"
          dark
          eyebrow="Raciocínio simples"
          title={
            <>
              Quanto vale um <span className="text-gold-3">novo paciente</span> para sua clínica?
            </>
          }
          subtitle="Dependendo do ticket da sua consulta ou procedimento, poucos novos agendamentos podem ser suficientes para recuperar o investimento no treinamento."
        />
      </Reveal>

      <Stagger className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {tiers.map((t) => (
          <StaggerItem
            key={t.n}
            className="group relative overflow-hidden rounded-3xl border border-black/10 bg-paper-2 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-gold hover:shadow-[0_20px_50px_-25px_rgba(0,0,0,0.45)] sm:p-7"
          >
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-br from-gold/0 to-gold/0 transition-all duration-500 group-hover:from-gold/20 group-hover:to-transparent"
            />
            <div className="relative">
              <div className="flex flex-wrap gap-1" aria-hidden>
                {Array.from({ length: t.dots }).map((_, k) => (
                  <span
                    key={k}
                    className="flex size-5 items-center justify-center rounded-full bg-black text-gold"
                    style={{ opacity: 1 - (k / Math.max(t.dots, 1)) * 0.55 }}
                  >
                    <UserPlus className="size-3" />
                  </span>
                ))}
              </div>
              <p className="mt-5 font-display text-4xl font-black leading-none tracking-tight text-black sm:text-5xl">
                {t.n}
              </p>
              <p className="mt-1 text-sm font-semibold uppercase tracking-wider text-black/60">{t.label}</p>
            </div>
          </StaggerItem>
        ))}
      </Stagger>

      <Reveal delay={0.15}>
        <p className="mx-auto mt-10 max-w-2xl text-center font-display text-xl font-bold leading-snug text-black sm:text-2xl text-balance">
          Agora imagine uma mudança de processo capaz de impactar sua agenda{" "}
          <span className="text-gold-3">todos os meses.</span>
        </p>
      </Reveal>
    </Section>
  );
}
