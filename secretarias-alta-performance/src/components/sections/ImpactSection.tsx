"use client";

import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { Microcopy } from "@/components/ui/Microcopy";
import { sections } from "@/lib/config";

export function ImpactSection() {
  return (
    <Section tone="black" className="overflow-hidden" ariaLabelledby="impact-title">
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 h-[60%] w-[120%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/[0.07] blur-[120px]"
      />
      <div className="relative mx-auto max-w-5xl text-center">
        <Reveal>
          <h2
            id="impact-title"
            className="font-display text-[clamp(2.6rem,9.5vw,7rem)] font-black uppercase leading-[0.92] tracking-tight text-balance"
          >
            Não tem como <span className="text-gold-gradient">faturar mais</span> sem{" "}
            <span className="text-gold-gradient">agenda cheia</span>.
          </h2>
        </Reveal>

        <Reveal delay={0.1} className="mx-auto mt-10 max-w-3xl space-y-5 text-lg leading-relaxed text-muted sm:text-xl">
          <p className="text-pretty">
            Sua secretária precisa entender que ela não está apenas atendendo mensagens.
          </p>
          <p className="font-semibold text-paper text-pretty">
            Ela está vendendo consultas, procedimentos e oportunidades de transformação.
          </p>
          <p className="text-pretty">
            Se ela — ou você — não se comporta como uma vendedora da sua consulta e dos seus
            serviços, muitos pacientes continuarão escolhendo a concorrência.
          </p>
        </Reveal>

        <Reveal delay={0.2} className="mt-10 flex flex-col items-center gap-3">
          <Button href={`#${sections.pricing}`} size="xl" track="impact_cta" className="w-full sm:w-auto">
            Quero transformar minha secretária
          </Button>
          <Microcopy />
        </Reveal>
      </div>
    </Section>
  );
}
