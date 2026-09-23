"use client";

import { useId, useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { ArrowRight, CalendarDays, CheckCircle2, Loader2, MessageCircle, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/cn";
import { useRouter } from "next/navigation";
import { event, lead, leadWhatsappUrl, links } from "@/lib/config";
import { trackContact, trackLead } from "@/lib/analytics";

interface LeadFormProps {
  /** Identifica a origem do lead nos sistemas (ex.: "hero", "inscricao") */
  source: string;
  className?: string;
  /** Título exibido acima dos campos */
  title?: string;
  compact?: boolean;
}

/** Máscara (DD) 9XXXX-XXXX */
/**
 * Máscara "(DD) 9XXXX-XXXX". O +55 é fixo no campo; se o preenchimento automático
 * do celular mandar "+55 81 9..." ou "081...", o código do país e o zero são removidos.
 */
function maskPhone(value: string) {
  let d = value.replace(/\D/g, "");
  if (d.startsWith("55") && d.length > 11) d = d.slice(2);
  if (d.startsWith("0")) d = d.slice(1);
  d = d.slice(0, 11);
  if (d.length <= 2) return d;
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

type Status = "idle" | "sending" | "success" | "error";

/**
 * FORMULÁRIO DE CAPTURA — Nome + WhatsApp.
 * 1. Envia POST JSON para `lead.webhookUrl` (se configurado).
 * 2. Dispara evento "Lead" nos pixels.
 * 3. Abre o WhatsApp comercial com a mensagem preenchida (se `lead.redirectToWhatsApp`).
 */
export function LeadForm({ source, className, title = "Garanta sua vaga", compact = false }: LeadFormProps) {
  const uid = useId();
  const router = useRouter();
  // pré-carrega a página de obrigado para a troca ser instantânea
  useEffect(() => {
    if (lead.thankYouPath) router.prefetch(lead.thankYouPath);
  }, [router]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [company, setCompany] = useState(""); // honeypot

  const digits = phone.replace(/\D/g, "");
  const nameOk = name.trim().length >= 2;
  // DDD válido (11 a 99) + 8 dígitos (fixo) ou 9 dígitos começando com 9 (celular)
  const dddOk = digits.length >= 2 && Number(digits.slice(0, 2)) >= 11;
  const phoneOk = dddOk && (digits.length === 10 || (digits.length === 11 && digits[2] === "9"));

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (company) return; // bot
    if (!nameOk) return setError("Digite seu nome.");
    if (!phoneOk) return setError("Digite um WhatsApp válido com DDD.");
    setError(null);
    setStatus("sending");

    // parâmetros de campanha (utm_*, fbclid) da URL, para saber de onde veio o lead
    const q = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : null;
    const utm = Object.fromEntries(
      ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "fbclid"].map((k) => [k, q?.get(k) ?? ""]),
    );

    const payload = {
      name: name.trim(),
      phone: `+55${digits}`,
      source,
      page: typeof window !== "undefined" ? window.location.href : "",
      date: new Date().toISOString(),
      event: event.dateLabel,
      ...utm,
    };

    if (lead.webhookUrl) {
      // Em segundo plano, sem esperar a resposta (o Apps Script demora alguns segundos).
      // keepalive garante que o envio termina mesmo com a troca de página.
      // text/plain + no-cors: sem preflight, funciona com Google Apps Script, n8n, Make, Zapier
      try {
        void fetch(lead.webhookUrl, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "text/plain;charset=UTF-8" },
          body: JSON.stringify(payload),
          keepalive: true,
        }).catch(() => {});
      } catch {
        /* segue mesmo se o webhook falhar */
      }
    }

    trackLead({ source });
    setStatus("success");

    if (lead.redirectToWhatsApp) {
      trackContact({ source });
      window.open(leadWhatsappUrl(payload.name, phone), "_blank", "noopener,noreferrer");
    }
    if (lead.thankYouPath) {
      const q = new URLSearchParams({ nome: payload.name, tel: phone });
      router.push(`${lead.thankYouPath}?${q.toString()}`);
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className={cn(
          "border-gradient-gold flex flex-col items-center gap-4 rounded-3xl bg-black p-7 text-center sm:p-9",
          className,
        )}
      >
        <span className="flex size-14 items-center justify-center rounded-full bg-gold text-black">
          <CheckCircle2 className="size-7" aria-hidden />
        </span>
        <p className="font-display text-2xl font-black uppercase leading-tight">{lead.successTitle}</p>
        <p className="max-w-sm text-sm leading-relaxed text-muted">{lead.successText}</p>
        <a
          href={leadWhatsappUrl(name.trim(), phone)}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackContact({ source: `${source}_success` })}
          className="mt-2 inline-flex min-h-12 items-center gap-2 rounded-xl bg-gold px-6 font-display text-sm font-extrabold uppercase tracking-wide text-black transition-transform hover:-translate-y-0.5"
        >
          <MessageCircle className="size-4" aria-hidden />
          Falar agora no WhatsApp
        </a>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className={cn(
        "border-gradient-gold relative rounded-3xl bg-black shadow-card",
        compact ? "p-5 sm:p-6" : "p-6 sm:p-8",
        className,
      )}
    >
      <div aria-hidden className="absolute -right-12 -top-12 size-40 rounded-full bg-gold/15 blur-3xl" />

      <div className="relative">
        <span className="inline-flex items-center gap-2 rounded-full bg-gold px-3 py-1 font-display text-[11px] font-black uppercase tracking-[0.18em] text-black">
          <CalendarDays className="size-3.5" aria-hidden />
          {event.dateLabel}
        </span>
        <p className="mt-4 font-display text-2xl font-black uppercase leading-none sm:text-[28px]">{title}</p>
        <p className="mt-2 text-sm text-muted">
          Deixe seu nome e WhatsApp. Nossa equipe entra em contato para confirmar sua vaga.
        </p>

        <div className="mt-6 flex flex-col gap-3">
          <div>
            <label htmlFor={`${uid}-name`} className="mb-1.5 block text-[11px] font-bold uppercase tracking-[0.18em] text-muted">
              Nome
            </label>
            <input
              id={`${uid}-name`}
              name="name"
              type="text"
              autoComplete="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Seu nome"
              className="h-13 w-full rounded-xl border border-line-strong bg-graphite-2 px-4 text-base text-paper placeholder:text-muted-2 focus:border-gold focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor={`${uid}-phone`} className="mb-1.5 block text-[11px] font-bold uppercase tracking-[0.18em] text-muted">
              WhatsApp
            </label>
            <div className="relative">
              <span
                aria-hidden
                className="pointer-events-none absolute inset-y-0 left-0 flex items-center rounded-l-xl border-r border-line-strong bg-graphite-3 px-3.5 font-display text-sm font-bold text-paper"
              >
                +55
              </span>
              <input
                id={`${uid}-phone`}
                name="phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel-national"
                required
                value={phone}
                onChange={(e) => setPhone(maskPhone(e.target.value))}
                placeholder="(DDD) 90000-0000"
                aria-describedby={`${uid}-phone-hint`}
                className="h-13 w-full rounded-xl border border-line-strong bg-graphite-2 pl-[4.5rem] pr-4 text-base text-paper placeholder:text-muted-2 focus:border-gold focus:outline-none"
              />
            </div>
            <p id={`${uid}-phone-hint`} className="mt-1.5 text-[11px] text-muted">
              Só o DDD e o número. O +55 já está incluído.
            </p>
          </div>

          {/* honeypot anti-spam */}
          <input
            type="text"
            name="company"
            tabIndex={-1}
            autoComplete="off"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="absolute -left-[9999px] h-0 w-0 opacity-0"
            aria-hidden
          />

          {error && (
            <p role="alert" className="text-sm font-semibold text-gold">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={status === "sending"}
            className="group mt-1 inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-xl bg-gold px-6 font-display text-[15px] font-extrabold uppercase tracking-wide text-black shadow-gold transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold-2 disabled:cursor-wait disabled:opacity-80 sm:text-base"
          >
            {status === "sending" ? (
              <Loader2 className="size-5 animate-spin" aria-hidden />
            ) : (
              <>
                Quero garantir minha vaga
                <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" aria-hidden />
              </>
            )}
          </button>

          <p className="flex items-start gap-1.5 text-[11px] leading-relaxed text-muted-2">
            <ShieldCheck className="mt-0.5 size-3.5 shrink-0 text-gold" aria-hidden />
            <span>
              Seus dados estão seguros. Ao enviar, você concorda com a{" "}
              <Link href={links.privacy} className="underline hover:text-gold">
                Política de Privacidade
              </Link>
              .
            </span>
          </p>
        </div>
      </div>
    </form>
  );
}
