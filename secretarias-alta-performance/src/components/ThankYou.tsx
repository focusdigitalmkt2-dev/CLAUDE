"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, CalendarDays, CheckCircle2, MapPin, MessageCircle } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { Footer } from "@/components/sections/Footer";
import { event, leadWhatsappUrl, site } from "@/lib/config";
import { trackContact } from "@/lib/analytics";

export function ThankYou() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    try {
      const q = new URLSearchParams(window.location.search);
      setName((q.get("nome") || "").trim());
      setPhone((q.get("tel") || "").trim());
    } catch {
      /* ignore */
    }
  }, []);

  const firstName = name.split(" ")[0];

  return (
    <>
      <header className="border-b border-line">
        <div className="container-x flex h-16 items-center justify-between">
          <Link href="/" aria-label="Voltar ao início"><Logo /></Link>
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-muted hover:text-gold">
            <ArrowLeft className="size-4" aria-hidden /> Voltar ao site
          </Link>
        </div>
      </header>

      <main className="container-x py-14 sm:py-24">
        <div className="border-gradient-gold mx-auto flex max-w-2xl flex-col items-center gap-5 rounded-3xl bg-black p-8 text-center shadow-card sm:p-12">
          <span className="flex size-16 items-center justify-center rounded-full bg-gold text-black shadow-gold">
            <CheckCircle2 className="size-8" aria-hidden />
          </span>

          <h1 className="font-display text-3xl font-black uppercase leading-tight sm:text-4xl">
            {firstName ? `Obrigado, ${firstName}!` : "Obrigado!"}
            <br />
            <span className="text-gold">Recebemos sua inscrição.</span>
          </h1>

          <p className="max-w-md text-base leading-relaxed text-muted sm:text-lg">
            Nossa equipe vai entrar em contato com você pelo WhatsApp em breve para confirmar sua vaga na{" "}
            <strong className="text-paper">{site.shortName}</strong>.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm font-semibold text-muted">
            <span className="inline-flex items-center gap-2">
              <CalendarDays className="size-4 text-gold" aria-hidden /> {event.dateLabel}
            </span>
            <span className="inline-flex items-center gap-2">
              <MapPin className="size-4 text-gold" aria-hidden /> {event.address}, {event.city}
            </span>
          </div>

          <p className="mt-2 text-sm text-muted">Quer adiantar? Chame a equipe agora:</p>
          <a
            href={leadWhatsappUrl(name || "interessado(a)", phone)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackContact({ source: "obrigado" })}
            className="inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-xl bg-gold px-8 font-display text-base font-extrabold uppercase tracking-wide text-black transition-transform hover:-translate-y-0.5 sm:w-auto"
          >
            <MessageCircle className="size-5" aria-hidden />
            Chamar no WhatsApp
          </a>
        </div>
      </main>

      <Footer />
    </>
  );
}
