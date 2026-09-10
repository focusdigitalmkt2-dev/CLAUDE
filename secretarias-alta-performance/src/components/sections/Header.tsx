"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { cn } from "@/lib/cn";
import { sections } from "@/lib/config";

const nav = [
  { label: "O problema", href: `#${sections.problem}` },
  { label: "Método", href: `#${sections.method}` },
  { label: "Cases", href: `#${sections.cases}` },
  { label: "Inscrição", href: `#${sections.signup}` },
  { label: "FAQ", href: `#${sections.faq}` },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-line bg-black/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="container-x flex h-16 items-center justify-between gap-4 sm:h-[72px]">
        <Link href={`#${sections.hero}`} aria-label="Voltar ao início" className="shrink-0">
          <Logo />
        </Link>

        <nav aria-label="Navegação principal" className="hidden lg:block">
          <ul className="flex items-center gap-7">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="text-sm font-semibold text-muted transition-colors hover:text-gold"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden lg:block">
          <Button href={`#${sections.signup}`} size="md" track="header_cta">
            Quero lotar minha agenda
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          className="inline-flex size-11 items-center justify-center rounded-lg border border-line text-paper lg:hidden"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {/* Menu mobile */}
      <div
        id="mobile-menu"
        className={cn(
          "lg:hidden fixed inset-x-0 top-16 bottom-0 z-40 bg-black/95 backdrop-blur-lg transition-all duration-300",
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
        )}
      >
        <nav aria-label="Navegação mobile" className="container-x flex h-full flex-col py-8">
          <ul className="flex flex-col divide-y divide-line">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex min-h-14 items-center font-display text-xl font-extrabold uppercase tracking-wide text-paper hover:text-gold"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-auto pt-8">
            <Button
              href={`#${sections.signup}`}
              size="xl"
              fullWidth
              track="mobile_menu_cta"
              onClick={() => setOpen(false)}
            >
              Quero lotar minha agenda
            </Button>
            <p className="mt-3 text-center text-xs text-muted">Treinamento intensivo de 2 dias.</p>
          </div>
        </nav>
      </div>
    </header>
  );
}
