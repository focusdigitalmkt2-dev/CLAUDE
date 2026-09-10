"use client";

import { Check, Crown, ShieldCheck, Sparkles } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { Microcopy } from "@/components/ui/Microcopy";
import { pricing, sections } from "@/lib/config";
import { trackCheckout } from "@/lib/analytics";

export function PricingSection() {
  const { individual, duplo } = pricing;

  return (
    <Section id={sections.pricing} tone="black" ariaLabelledby="pricing-title" className="overflow-hidden">
      <div aria-hidden className="absolute inset-0 bg-glow-gold" />
      <div
        aria-hidden
        className="absolute left-1/2 top-1/3 size-[700px] -translate-x-1/2 rounded-full bg-gold/[0.08] blur-[160px]"
      />
      <div className="relative">
        <Reveal>
          <SectionHeading
            id="pricing-title"
            eyebrow="Oferta"
            title={
              <>
                Escolha como você quer <span className="text-gold-gradient">participar</span>
              </>
            }
            subtitle="Treinamento intensivo de 2 dias. Vagas limitadas."
          />
        </Reveal>

        <div className="mt-12 grid items-stretch gap-5 lg:mt-16 lg:grid-cols-2 lg:gap-6">
          {/* PLANO 01 — Individual */}
          <Reveal className="flex">
            <article className="flex w-full flex-col rounded-3xl border border-line bg-graphite p-7 sm:p-9">
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-muted-2">{individual.label}</p>
              <h3 className="mt-2 font-display text-2xl font-black uppercase leading-none sm:text-3xl">
                {individual.name}
              </h3>
              <p className="mt-3 text-sm text-muted">{individual.tagline}</p>

              <div className="mt-7 flex items-end gap-2">
                <p className="font-display text-5xl font-black leading-none tracking-tight sm:text-6xl">
                  {individual.priceLabel}
                </p>
              </div>
              <p className="mt-2 text-xs text-muted-2">1 participante</p>

              <ul className="mt-7 space-y-3">
                {individual.features.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-[15px]">
                    <span className="flex size-6 shrink-0 items-center justify-center rounded-full border border-gold/50 text-gold">
                      <Check className="size-3.5" strokeWidth={3} aria-hidden />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-8">
                <Button
                  href={individual.href}
                  variant="outline"
                  size="xl"
                  fullWidth
                  track="pricing_individual"
                  onClick={() => trackCheckout("individual", individual.price)}
                >
                  {individual.cta}
                </Button>
                <Microcopy className="mt-3" />
              </div>
            </article>
          </Reveal>

          {/* PLANO 02 — Duplo (destaque) */}
          <Reveal delay={0.1} className="mt-3 flex lg:mt-0">
            <article className="border-gradient-gold relative flex w-full flex-col rounded-3xl bg-black p-7 shadow-gold sm:p-9 lg:-my-4 lg:py-13">
              <div aria-hidden className="absolute -right-16 -top-16 size-56 rounded-full bg-gold/20 blur-3xl" />

              <span className="absolute -top-4 left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full bg-gold px-4 py-1.5 font-display text-[11px] font-black uppercase tracking-[0.18em] text-black shadow-gold">
                <Crown className="size-3.5" aria-hidden />
                {duplo.badge}
              </span>

              <div className="relative">
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-gold">{duplo.label}</p>
                <h3 className="mt-2 font-display text-2xl font-black uppercase leading-none sm:text-3xl">
                  {duplo.name}
                </h3>
                <p className="mt-3 text-sm text-muted text-pretty">{duplo.tagline}</p>

                <div className="mt-7 flex items-end gap-3">
                  <p className="font-display text-5xl font-black leading-none tracking-tight text-gold-gradient sm:text-6xl">
                    {duplo.priceLabel}
                  </p>
                </div>
                <p className="mt-2 text-xs text-muted-2">2 participantes</p>

                {/* Comparação */}
                <div className="mt-6 grid grid-cols-3 gap-2 rounded-2xl border border-line bg-graphite p-3 text-center">
                  <div className="rounded-xl p-2">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-muted-2">2 individuais</p>
                    <p className="mt-1 font-display text-base font-bold text-muted line-through decoration-gold/70 sm:text-lg">
                      {duplo.comparison.twoIndividual}
                    </p>
                  </div>
                  <div className="rounded-xl p-2">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-muted-2">Ingresso duplo</p>
                    <p className="mt-1 font-display text-base font-black sm:text-lg">{duplo.comparison.duplo}</p>
                  </div>
                  <div className="rounded-xl bg-gold p-2 text-black">
                    <p className="text-[10px] font-bold uppercase tracking-wider">Economia</p>
                    <p className="mt-1 font-display text-base font-black sm:text-lg">{duplo.comparison.savings}</p>
                  </div>
                </div>

                <ul className="mt-7 space-y-3">
                  {duplo.features.map((f) => (
                    <li key={f} className="flex items-center gap-3 text-[15px] font-medium">
                      <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-gold text-black">
                        <Check className="size-3.5" strokeWidth={3} aria-hidden />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="relative mt-auto pt-8">
                <Button
                  href={duplo.href}
                  size="xl"
                  fullWidth
                  pulse
                  track="pricing_duplo"
                  onClick={() => trackCheckout("duplo", duplo.price)}
                >
                  {duplo.cta}
                </Button>
                <Microcopy className="mt-3" />
              </div>
            </article>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <ul className="mx-auto mt-10 flex max-w-3xl flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs font-semibold uppercase tracking-wider text-muted-2">
            <li className="inline-flex items-center gap-2"><ShieldCheck className="size-4 text-gold" aria-hidden />Pagamento seguro</li>
            <li className="inline-flex items-center gap-2"><Sparkles className="size-4 text-gold" aria-hidden />Material de implementação incluso</li>
            <li className="inline-flex items-center gap-2"><Crown className="size-4 text-gold" aria-hidden />Método completo</li>
          </ul>
        </Reveal>
      </div>
    </Section>
  );
}
