"use client";

import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { Microcopy } from "@/components/ui/Microcopy";
import { sections } from "@/lib/config";

export function UrgencySection() {
  return (
    <Section tone="black" ariaLabelledby="urgency-title" className="overflow-clip">
      <div aria-hidden className="absolute inset-0 bg-grid opacity-40" />
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent"
      />
      <div className="relative mx-auto max-w-4xl text-center">
        <Reveal>
          <h2
            id="urgency-title"
            className="font-display text-[clamp(2rem,6.5vw,4.4rem)] font-black uppercase leading-[0.98] tracking-tight text-balance"
          >
            Sua clínica já está recebendo oportunidades.
            <span className="mt-4 block text-muted">A pergunta é:</span>
            <span className="text-gold-gradient">Quantas delas estão sendo perdidas?</span>
          </h2>
        </Reveal>
        <Reveal delay={0.15} className="mt-10 flex flex-col items-center gap-3">
          <Button href={`#${sections.signup}`} size="xl" pulse track="urgency_cta" className="w-full sm:w-auto">
            Quero transformar meu atendimento
          </Button>
          <Microcopy />
        </Reveal>
      </div>
    </Section>
  );
}
