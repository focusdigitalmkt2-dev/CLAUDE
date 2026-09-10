"use client";

import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { Microcopy } from "@/components/ui/Microcopy";
import { pricing, sections } from "@/lib/config";

export function FinalCTA() {
  return (
    <Section id={sections.final} tone="gold" ariaLabelledby="final-title" className="overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.07] [background-image:radial-gradient(#000_1px,transparent_1px)] [background-size:22px_22px]"
      />
      <div aria-hidden className="absolute -right-40 -top-40 size-[480px] rounded-full bg-white/30 blur-[120px]" />

      <div className="relative mx-auto max-w-5xl text-center">
        <Reveal>
          <h2
            id="final-title"
            className="font-display text-[clamp(2rem,6.4vw,4.4rem)] font-black uppercase leading-[1.12] tracking-tight text-black text-balance"
          >
            Você pode continuar investindo para gerar mais leads.
            <span className="mt-3 block">
              Ou pode começar a{" "}
              <span className="bg-black px-2 py-0.5 text-gold [box-decoration-break:clone] [-webkit-box-decoration-break:clone]">
                converter melhor
              </span>{" "}
              os leads que já chegam.
            </span>
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-black/75 sm:text-lg text-pretty">
            Transforme sua secretária em uma profissional de alta performance e construa uma
            operação preparada para gerar mais agendamentos todos os dias.
          </p>
        </Reveal>

        <Reveal delay={0.2} className="mt-10 flex flex-col items-center gap-3">
          <Button href={`#${sections.pricing}`} variant="white" size="xl" track="final_cta" className="w-full sm:w-auto">
            Quero garantir minha vaga
          </Button>
          <Microcopy dark />
        </Reveal>

        <Reveal delay={0.25} className="mx-auto mt-10 grid max-w-xl gap-3 sm:grid-cols-2">
          <a
            href={pricing.individual.href}
            className="group flex items-center justify-between rounded-2xl border border-black/15 bg-black/5 px-5 py-4 text-left transition-colors hover:bg-black hover:text-paper"
          >
            <span className="text-xs font-bold uppercase tracking-wider">Ingresso individual</span>
            <span className="whitespace-nowrap font-display text-xl font-black">{pricing.individual.priceLabel}</span>
          </a>
          <a
            href={pricing.duplo.href}
            className="group flex items-center justify-between rounded-2xl bg-black px-5 py-4 text-left text-paper shadow-card transition-transform hover:-translate-y-0.5"
          >
            <span className="flex flex-col gap-1">
              <span className="text-xs font-bold uppercase tracking-wider">Ingresso duplo</span>
              <span className="w-fit rounded bg-gold px-1.5 py-0.5 text-[9px] font-black uppercase tracking-wider text-black">
                Mais escolhido
              </span>
            </span>
            <span className="whitespace-nowrap font-display text-xl font-black text-gold">{pricing.duplo.priceLabel}</span>
          </a>
        </Reveal>
      </div>
    </Section>
  );
}
