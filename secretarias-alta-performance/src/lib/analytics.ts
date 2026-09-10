/**
 * Disparo de eventos para pixels de rastreamento.
 * Cole os scripts do Meta Pixel / GA4 / GTM em src/app/layout.tsx
 * e os eventos abaixo passam a funcionar automaticamente.
 */

type Win = Window & {
  fbq?: (...args: unknown[]) => void;
  gtag?: (...args: unknown[]) => void;
  dataLayer?: unknown[];
};

export function trackCTA(label: string, extra: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  const w = window as Win;
  try {
    w.fbq?.("trackCustom", "CTAClick", { label, ...extra });
    w.gtag?.("event", "cta_click", { label, ...extra });
    w.dataLayer?.push({ event: "cta_click", label, ...extra });
  } catch {
    /* silencioso */
  }
}

export function trackLead(extra: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  const w = window as Win;
  try {
    w.fbq?.("track", "Lead", extra);
    w.gtag?.("event", "generate_lead", extra);
    w.dataLayer?.push({ event: "generate_lead", ...extra });
  } catch {
    /* silencioso */
  }
}
