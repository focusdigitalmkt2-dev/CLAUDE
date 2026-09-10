"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/Button";
import { event, sections } from "@/lib/config";

/**
 * Barra fixa no rodapé em telas pequenas.
 * Aparece após o usuário rolar além do hero e some quando a seção de oferta
 * ou o CTA final estão visíveis (evita CTA duplicado).
 */
export function StickyCTA() {
  const [visible, setVisible] = useState(false);
  const [hiddenByOffer, setHiddenByOffer] = useState(false);

  useEffect(() => {
    const hero = document.getElementById(sections.hero);
    const offer = document.getElementById(sections.signup);
    const final = document.getElementById(sections.final);

    const heroObs = new IntersectionObserver(
      ([e]) => setVisible(!e.isIntersecting),
      { threshold: 0.15 },
    );
    const offerObs = new IntersectionObserver(
      (entries) => setHiddenByOffer(entries.some((e) => e.isIntersecting)),
      { threshold: 0.1 },
    );

    if (hero) heroObs.observe(hero);
    if (offer) offerObs.observe(offer);
    if (final) offerObs.observe(final);

    return () => {
      heroObs.disconnect();
      offerObs.disconnect();
    };
  }, []);

  const show = visible && !hiddenByOffer;

  return (
    <div
      aria-hidden={!show}
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 border-t border-line bg-black/90 px-4 pb-[max(env(safe-area-inset-bottom),12px)] pt-3 backdrop-blur-md transition-all duration-300 ease-out lg:hidden",
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-full opacity-0",
      )}
    >
      <div className="flex items-center gap-3">
        <div className="min-w-0 flex-1">
          <p className="truncate text-[11px] font-bold uppercase tracking-wider text-gold">
            {event.dateLabel} · Vagas limitadas
          </p>
          <p className="truncate text-xs text-muted">Treinamento intensivo de 2 dias</p>
        </div>
        <Button href={`#${sections.signup}`} size="md" track="sticky_cta" className="shrink-0">
          Garantir vaga
        </Button>
      </div>
    </div>
  );
}