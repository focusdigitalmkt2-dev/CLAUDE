"use client";

import { Check, UserRoundX } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { Button } from "@/components/ui/Button";
import { Microcopy } from "@/components/ui/Microcopy";
import { sections } from "@/lib/config";

const items = [
  "Você possui uma secretária, mas sente que ela poderia converter muito mais.",
  "Sua clínica recebe leads, mas poucos viram agendamentos.",
  "Sua secretária apenas responde mensagens e não conduz a venda.",
  "Você quer aumentar o número de pacientes sem depender somente de mais investimento em anúncios.",
  "Você percebe falta de motivação, postura comercial ou iniciativa no atendimento.",
  "Você entende que sua secretária precisa ser treinada e motivada por alguém de fora.",
  "Você quer criar uma cultura comercial mais forte dentro da clínica.",
  "Você quer aumentar o faturamento através de uma agenda mais cheia.",
];

export function AudienceSection() {
  return (
    <Section id={sections.audience} tone="graphite" ariaLabelledby="audience-title">
      <div aria-hidden className="absolute inset-0 bg-grid opacity-30" />
      <div className="relative">
        <Reveal>
          <SectionHeading
            id="audience-title"
            eyebrow="Para quem é"
            title={
              <>
                Esse treinamento é para você <span className="text-gold-gradient">se...</span>
              </>
            }
          />
        </Reveal>

        <div className="mt-12 grid gap-10 lg:mt-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
          <Stagger as="ul" className="grid gap-3">
            {items.map((t) => (
              <StaggerItem
                as="li"
                key={t}
                className="flex items-start gap-4 rounded-2xl border border-line bg-black p-4 transition-colors duration-300 hover:border-gold/40 sm:p-5"
              >
                <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-gold text-black">
                  <Check className="size-4" strokeWidth={3} aria-hidden />
                </span>
                <p className="text-[15px] leading-relaxed sm:text-base text-pretty">{t}</p>
              </StaggerItem>
            ))}
          </Stagger>

          <div className="flex flex-col gap-6">
            {/*
              IMAGEM — secretária atendendo paciente / equipe de clínica
              Sugestão: /public/images/clinic/secretaria-atendimento.jpg (4:3)
            */}
            <Reveal>
              <ImagePlaceholder
                alt="Secretária atendendo paciente na recepção da clínica"
                label="Secretária atendendo"
                hint="Foto de atendimento na recepção ou equipe da clínica"
                aspect="4/3"
              />
            </Reveal>

            <Reveal delay={0.1} className="border-gradient-gold rounded-2xl bg-black p-6 sm:p-7">
              <div className="flex items-center gap-3">
                <span className="flex size-10 items-center justify-center rounded-xl bg-gold-soft text-gold">
                  <UserRoundX className="size-5" aria-hidden />
                </span>
                <h3 className="font-display text-xl font-black uppercase leading-none sm:text-2xl">
                  Não tem secretária?
                </h3>
              </div>
              <p className="mt-4 font-display text-lg font-bold text-gold">
                Esse treinamento também é para você.
              </p>
              <p className="mt-3 text-[15px] leading-relaxed text-muted text-pretty">
                Se você mesmo realiza seus atendimentos, responde pacientes ou ainda está
                estruturando sua clínica, poderá aprender o método e aplicar diretamente no seu
                atendimento para aumentar seus agendamentos.
              </p>
              <div className="mt-6 flex flex-col gap-3">
                <Button href={`#${sections.pricing}`} size="lg" fullWidth track="audience_cta">
                  Quero lotar minha agenda
                </Button>
                <Microcopy />
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </Section>
  );
}
