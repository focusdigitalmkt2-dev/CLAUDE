"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  CalendarDays,
  MessageCircle,
  BarChart3,
  Quote,
  ImageIcon,
  Trophy,
  type LucideIcon,
} from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { Button } from "@/components/ui/Button";
import { Microcopy } from "@/components/ui/Microcopy";
import { cases, type CaseType } from "@/content/cases";
import { sections } from "@/lib/config";
import { cn } from "@/lib/cn";

const typeMeta: Record<CaseType, { label: string; icon: LucideIcon }> = {
  print: { label: "Print", icon: ImageIcon },
  resultado: { label: "Resultado", icon: Trophy },
  depoimento: { label: "Depoimento", icon: Quote },
  agenda: { label: "Agenda", icon: CalendarDays },
  conversa: { label: "Conversa", icon: MessageCircle },
  indicador: { label: "Indicadores", icon: BarChart3 },
};

export function CasesSection() {
  const trackRef = useRef<HTMLUListElement>(null);
  const [index, setIndex] = useState(0);

  const scrollTo = useCallback((i: number) => {
    const track = trackRef.current;
    if (!track) return;
    const items = Array.from(track.children) as HTMLElement[];
    const target = items[Math.max(0, Math.min(i, items.length - 1))];
    target?.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const onScroll = () => {
      const items = Array.from(track.children) as HTMLElement[];
      const left = track.scrollLeft;
      let best = 0;
      let bestDist = Infinity;
      items.forEach((el, i) => {
        const d = Math.abs(el.offsetLeft - left);
        if (d < bestDist) {
          bestDist = d;
          best = i;
        }
      });
      setIndex(best);
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <Section id={sections.cases} tone="black" ariaLabelledby="cases-title" className="overflow-hidden">
      <div aria-hidden className="absolute inset-0 bg-glow-gold" />
      <div className="relative">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <Reveal>
            <SectionHeading
              id="cases-title"
              align="left"
              eyebrow="Cases Focus"
              title={
                <>
                  Resultados construídos <span className="text-gold-gradient">na prática.</span>
                </>
              }
              subtitle="Agendas, conversas e indicadores de clínicas que aplicaram o método."
            />
          </Reveal>

          <Reveal delay={0.1} className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => scrollTo(index - 1)}
              aria-label="Case anterior"
              className="flex size-12 items-center justify-center rounded-full border border-line-strong text-paper transition-colors hover:border-gold hover:text-gold"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              type="button"
              onClick={() => scrollTo(index + 1)}
              aria-label="Próximo case"
              className="flex size-12 items-center justify-center rounded-full border border-line-strong text-paper transition-colors hover:border-gold hover:text-gold"
            >
              <ChevronRight className="size-5" />
            </button>
          </Reveal>
        </div>

        {/* Carrossel (scroll-snap nativo, acessível e leve) */}
        <ul
          ref={trackRef}
          aria-label="Cases de clínicas"
          className="mt-10 -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 [scrollbar-width:none] sm:-mx-8 sm:px-8 lg:-mx-10 lg:px-10 [&::-webkit-scrollbar]:hidden"
        >
          {cases.map((c) => {
            const meta = typeMeta[c.type];
            const Icon = meta.icon;
            return (
              <li
                key={c.id}
                className="group relative w-[84%] shrink-0 snap-start overflow-hidden rounded-3xl border border-line bg-graphite transition-colors duration-300 hover:border-gold/50 sm:w-[60%] lg:w-[calc((100%-2rem)/3)]"
              >
                {/* Mídia */}
                {c.quote ? (
                  <div className="flex aspect-[4/3] flex-col justify-between bg-graphite-2 p-6">
                    <Quote className="size-8 text-gold" aria-hidden />
                    <blockquote className="font-display text-lg font-bold leading-snug">
                      &ldquo;{c.quote}&rdquo;
                    </blockquote>
                    {c.author && <p className="mt-3 text-sm text-muted">— {c.author}</p>}
                  </div>
                ) : (
                  <ImagePlaceholder
                    src={c.image}
                    alt={c.imageAlt ?? c.title}
                    label={c.title}
                    hint={`Espaço para ${meta.label.toLowerCase()}: print, resultado ou depoimento`}
                    aspect="4/3"
                    rounded="rounded-none"
                    className="border-0"
                    icon={<Icon className="size-6" aria-hidden />}
                    sizes="(min-width: 1024px) 33vw, 80vw"
                  />
                )}

                {/* Rodapé do card */}
                <div className="flex items-start justify-between gap-4 p-5 sm:p-6">
                  <div className="min-w-0">
                    <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-gold">{c.title}</p>
                    <p className="mt-1 font-display text-lg font-extrabold uppercase leading-tight">
                      {c.subtitle}
                    </p>
                    {c.specialty && <p className="mt-1 text-xs text-muted-2">{c.specialty}</p>}
                  </div>
                  {c.metric ? (
                    <div className="shrink-0 text-right">
                      <p className="font-display text-2xl font-black leading-none text-gold">{c.metric}</p>
                      <p className="mt-1 max-w-[12ch] text-[11px] leading-tight text-muted">{c.metricLabel}</p>
                    </div>
                  ) : (
                    <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-line px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-muted">
                      <Icon className="size-3" aria-hidden />
                      {meta.label}
                    </span>
                  )}
                </div>
              </li>
            );
          })}
        </ul>

        {/* Indicadores */}
        <div className="mt-2 flex items-center justify-center gap-2" aria-hidden>
          {cases.map((c, i) => (
            <button
              key={c.id}
              type="button"
              tabIndex={-1}
              onClick={() => scrollTo(i)}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                i === index ? "w-8 bg-gold" : "w-2 bg-line-strong",
              )}
            />
          ))}
        </div>

        <Reveal delay={0.1} className="mt-12 flex flex-col items-center gap-3">
          <Button href={`#${sections.pricing}`} size="xl" track="cases_cta" className="w-full sm:w-auto">
            Quero lotar minha agenda
          </Button>
          <Microcopy />
        </Reveal>
      </div>
    </Section>
  );
}
