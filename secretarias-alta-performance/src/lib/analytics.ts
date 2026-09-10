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

export function trackCheckout(plan: "individual" | "duplo", value: number) {
  if (typeof window === "undefined") return;
  const w = window as Win;
  try {
    w.fbq?.("track", "InitiateCheckout", { content_name: plan, value, currency: "BRL" });
    w.gtag?.("event", "begin_checkout", { items: [{ item_name: plan, price: value }], value, currency: "BRL" });
    w.dataLayer?.push({ event: "begin_checkout", plan, value });
  } catch {
    /* silencioso */
  }
}
