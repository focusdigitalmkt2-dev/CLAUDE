"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { faq } from "@/content/faq";
import { sections, whatsappUrl } from "@/lib/config";
import { cn } from "@/lib/cn";

export function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <Section id={sections.faq} tone="graphite" ariaLabelledby="faq-title">
      <div aria-hidden className="absolute inset-0 bg-grid opacity-30" />
      <div className="relative grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <Reveal>
          <SectionHeading
            id="faq-title"
            align="left"
            eyebrow="Dúvidas frequentes"
            title={
              <>
                Perguntas <span className="text-gold-gradient">frequentes</span>
              </>
            }
            subtitle="Ficou alguma dúvida? Fale com a equipe."
          />
          <a
            href={whatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex min-h-12 items-center gap-2 rounded-xl border border-line-strong px-5 text-sm font-bold uppercase tracking-wide text-paper transition-colors hover:border-gold hover:text-gold"
          >
            Falar no WhatsApp
          </a>
        </Reveal>

        <Reveal delay={0.1}>
          <ul className="divide-y divide-line rounded-3xl border border-line bg-black">
            {faq.map((item, i) => {
              const isOpen = open === i;
              const panelId = `faq-panel-${i}`;
              const btnId = `faq-btn-${i}`;
              return (
                <li key={item.q}>
                  <h3>
                    <button
                      id={btnId}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left transition-colors hover:text-gold sm:px-7"
                    >
                      <span className="font-display text-base font-bold leading-snug sm:text-lg">
                        {item.q}
                      </span>
                      <span
                        className={cn(
                          "flex size-9 shrink-0 items-center justify-center rounded-full border transition-all duration-300",
                          isOpen
                            ? "rotate-45 border-gold bg-gold text-black"
                            : "border-line-strong text-paper",
                        )}
                      >
                        <Plus className="size-4" aria-hidden />
                      </span>
                    </button>
                  </h3>
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={btnId}
                    aria-hidden={!isOpen}
                    className={cn(
                      "grid transition-[grid-template-rows] duration-300 ease-out",
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                    )}
                  >
                    <div className="overflow-clip">
                      <p className="px-5 pb-6 text-[15px] leading-relaxed text-muted sm:px-7 sm:text-base text-pretty">
                        {item.a}
                      </p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </Section>
  );
}
