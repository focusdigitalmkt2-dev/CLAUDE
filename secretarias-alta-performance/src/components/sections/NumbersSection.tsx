"use client";

import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { event, sections } from "@/lib/config";

const stats = [
  { value: "8 a 15", label: "agendamentos por dia" },
  { value: "+40%", label: "de potencial de faturamento" },
  { value: "2 dias", label: `intensivos · ${event.dateLabel}` },
];

export function NumbersSection() {
  return (
    <Section id={sections.numbers} tone="gold" ariaLabelledby="numbers-title" className="overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.07] [background-image:radial-gradient(#000_1px,transparent_1px)] [background-size:22px_22px]"
      />
      <div className="relative">
        <Reveal>
          <SectionHeading
            id="numbers-title"
            dark
            eyebrow="Nossa meta"
            title="Nossa meta para sua clínica"
          />
        </Reveal>

        <Stagger className="mt-12 grid gap-4 sm:grid-cols-3 lg:mt-16">
          {stats.map((s) => (
            <StaggerItem
              key={s.label}
              className="relative overflow-hidden rounded-3xl bg-black p-7 text-paper shadow-card sm:p-8"
            >
              <span
                aria-hidden
                className="absolute -right-6 -top-6 size-24 rounded-full bg-gold/15 blur-2xl"
              />
              <p className="font-display text-[clamp(3rem,9vw,4.75rem)] font-black uppercase leading-none tracking-tight text-gold-gradient">
                {s.value}
              </p>
              <p className="mt-3 font-display text-base font-extrabold uppercase leading-tight tracking-wide sm:text-lg">
                {s.label}
              </p>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal delay={0.15}>
          <p className="mx-auto mt-8 max-w-2xl text-center text-xs leading-relaxed text-black/60 sm:text-[13px]">
            Os resultados podem variar conforme volume de oportunidades, oferta, localização,
            operação comercial e execução do método.
          </p>
        </Reveal>
      </div>
    </Section>
  );
}
