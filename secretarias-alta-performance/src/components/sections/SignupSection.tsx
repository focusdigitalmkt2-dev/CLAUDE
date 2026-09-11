"use client";

import { Check } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { LeadForm } from "@/components/LeadForm";
import { event, sections } from "@/lib/config";
import { LocationBadge } from "@/components/ui/LocationBadge";

const included = [
  "2 dias de treinamento intensivo",
  "Apostila completa",
  "Checklists de atendimento",
  "Scripts e processo de follow-up",
  "Material de implementação",
  "Método completo",
];

export function SignupSection() {
  return (
    <Section id={sections.signup} tone="black" ariaLabelledby="signup-title" className="overflow-clip">
      <div aria-hidden className="absolute inset-0 bg-glow-gold" />
      <div
        aria-hidden
        className="absolute left-1/2 top-1/3 size-[700px] -translate-x-1/2 rounded-full bg-gold/[0.08] blur-[160px]"
      />
      <div className="relative grid gap-10 lg:grid-cols-[1fr_0.95fr] lg:items-center lg:gap-16">
        <div>
          <Reveal>
            <SectionHeading
              id="signup-title"
              align="left"
              eyebrow="Inscrição"
              title={
                <>
                  Garanta sua vaga na turma de{" "}
                  <span className="text-gold-gradient">{event.dateLabel}</span>
                </>
              }
              subtitle="Treinamento intensivo de 2 dias. Vagas limitadas."
            />
            <LocationBadge className="mt-5" />
          </Reveal>

          <Stagger as="ul" className="mt-8 grid gap-3 sm:grid-cols-2">
            {included.map((f) => (
              <StaggerItem as="li" key={f} className="flex items-center gap-3 text-[15px] font-medium">
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-gold text-black">
                  <Check className="size-3.5" strokeWidth={3} aria-hidden />
                </span>
                {f}
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        <Reveal delay={0.1}>
          <LeadForm source="inscricao" />
        </Reveal>
      </div>
    </Section>
  );
}
