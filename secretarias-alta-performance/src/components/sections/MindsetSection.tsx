"use client";

import { MessageCircle, PhoneCall, RotateCcw } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";

const beats = [
  { icon: MessageCircle, text: "Cada mensagem pode representar um novo paciente." },
  { icon: PhoneCall, text: "Cada ligação pode representar um novo agendamento." },
  { icon: RotateCcw, text: "Cada follow-up pode representar uma venda que seria perdida." },
];

export function MindsetSection() {
  return (
    <Section tone="black" ariaLabelledby="mindset-title" className="overflow-hidden">
      <div
        aria-hidden
        className="absolute -left-40 top-0 size-[560px] rounded-full bg-gold/10 blur-[150px]"
      />
      <div className="relative grid gap-12 lg:grid-cols-[1fr_0.85fr] lg:items-center lg:gap-16">
        <div>
          <Reveal>
            <Eyebrow>Mentalidade</Eyebrow>
            <h2
              id="mindset-title"
              className="mt-5 font-display text-[clamp(2rem,6vw,3.9rem)] font-black uppercase leading-[0.98] tracking-tight text-balance"
            >
              Às vezes o que sua secretária precisa não é de mais cobrança.{" "}
              <span className="text-gold-gradient">É de uma nova mentalidade.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.1} className="mt-8 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            <p className="text-pretty">
              Orientação do próprio dono raramente muda a rotina. Uma visão externa, com técnica e
              processo, muda a forma como ela enxerga cada conversa.
            </p>
          </Reveal>

          <Stagger as="ul" className="mt-8 grid gap-3">
            {beats.map((b) => {
              const Icon = b.icon;
              return (
                <StaggerItem
                  as="li"
                  key={b.text}
                  className="flex items-center gap-4 rounded-2xl border border-line bg-graphite p-4 sm:p-5"
                >
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-gold text-black">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <p className="font-display text-base font-bold leading-snug sm:text-lg">{b.text}</p>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>

        {/*
          IMAGEM — treinamento presencial / equipe motivada
          Sugestão: /public/images/training/treinamento-presencial.jpg (4:5)
        */}
        <Reveal delay={0.15} className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div aria-hidden className="absolute -inset-4 rounded-[32px] bg-gold/10 blur-2xl" />
          <ImagePlaceholder
            alt="Treinamento presencial com a equipe da clínica"
            label="Treinamento presencial"
            hint="Foto do treinamento ou da equipe em ação"
            aspect="4/5"
            rounded="rounded-[24px]"
            className="relative shadow-card"
          />
        </Reveal>
      </div>
    </Section>
  );
}
