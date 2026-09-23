/**
 * Eventos de rastreamento (Meta Pixel, GA4, GTM).
 * Os scripts são carregados por src/components/Tracking.tsx.
 *
 * Eventos disparados pela página:
 *  - PageView            → ao carregar (Tracking.tsx)
 *  - ViewContent         → VSL começou a tocar
 *  - VSLUnmute (custom)  → som do vídeo ativado
 *  - VSLUnlock (custom)  → página liberada aos 3,5 min
 *  - Lead                → formulário enviado (conversão principal)
 *  - Contact             → WhatsApp aberto
 *  - CTAClick (custom)   → clique em botões de CTA
 */

type Win = Window & {
  fbq?: (...args: unknown[]) => void;
  gtag?: (...args: unknown[]) => void;
  dataLayer?: unknown[];
};

const win = () => (typeof window === "undefined" ? null : (window as Win));

/** ID único para deduplicar com a API de Conversões, se for usada depois. */
export function eventId(prefix = "ev") {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}

function fb(kind: "track" | "trackCustom", name: string, params: Record<string, unknown>, id?: string) {
  const w = win();
  if (!w?.fbq) return;
  try {
    w.fbq(kind, name, params, id ? { eventID: id } : undefined);
  } catch {
    /* silencioso */
  }
}

function ga(name: string, params: Record<string, unknown>) {
  const w = win();
  try {
    w?.gtag?.("event", name, params);
    w?.dataLayer?.push({ event: name, ...params });
  } catch {
    /* silencioso */
  }
}

export function trackCTA(label: string, extra: Record<string, unknown> = {}) {
  fb("trackCustom", "CTAClick", { label, ...extra });
  ga("cta_click", { label, ...extra });
}

/** Conversão principal: formulário enviado. */
export function trackLead(extra: Record<string, unknown> = {}) {
  const id = eventId("lead");
  fb("track", "Lead", { content_name: "Formação de Secretárias", ...extra }, id);
  ga("generate_lead", { ...extra, event_id: id });
  return id;
}

/** WhatsApp aberto (após o formulário ou pelo rodapé). */
export function trackContact(extra: Record<string, unknown> = {}) {
  fb("track", "Contact", { content_name: "WhatsApp", ...extra });
  ga("contact", extra);
}

/** VSL começou a tocar. */
export function trackVideoStart() {
  fb("track", "ViewContent", { content_name: "VSL", content_type: "video" });
  ga("video_start", { video_title: "VSL" });
}

/** Som da VSL ativado. */
export function trackVideoUnmute() {
  fb("trackCustom", "VSLUnmute", {});
  ga("video_unmute", { video_title: "VSL" });
}

/** Página liberada pelo tempo de vídeo. */
export function trackVideoUnlock() {
  fb("trackCustom", "VSLUnlock", {});
  ga("video_unlock", { video_title: "VSL" });
}
