/**
 * CONFIGURAÇÃO CENTRAL DO SITE
 * ------------------------------------------------------------
 * Tudo que precisa ser trocado antes de publicar está aqui
 * (ou nas variáveis de ambiente correspondentes — ver .env.example).
 */

/**
 * Variáveis públicas (NEXT_PUBLIC_*). Precisam ser referenciadas literalmente
 * (process.env.NOME) para o Next.js embutir o valor no código do navegador;
 * um acesso dinâmico (process.env[nome]) funcionaria só no servidor.
 */
const PUBLIC_ENV = {
  NEXT_PUBLIC_BASE_PATH: process.env.NEXT_PUBLIC_BASE_PATH,
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  NEXT_PUBLIC_WHATSAPP: process.env.NEXT_PUBLIC_WHATSAPP,
  NEXT_PUBLIC_INSTAGRAM: process.env.NEXT_PUBLIC_INSTAGRAM,
  NEXT_PUBLIC_LEAD_WEBHOOK_URL: process.env.NEXT_PUBLIC_LEAD_WEBHOOK_URL,
  NEXT_PUBLIC_VSL_MP4: process.env.NEXT_PUBLIC_VSL_MP4,
  NEXT_PUBLIC_VSL_HLS: process.env.NEXT_PUBLIC_VSL_HLS,
  NEXT_PUBLIC_META_PIXEL_ID: process.env.NEXT_PUBLIC_META_PIXEL_ID,
  NEXT_PUBLIC_GA4_ID: process.env.NEXT_PUBLIC_GA4_ID,
  NEXT_PUBLIC_GTM_ID: process.env.NEXT_PUBLIC_GTM_ID,
} as const;

const env = (key: keyof typeof PUBLIC_ENV, fallback: string) => {
  const v = PUBLIC_ENV[key];
  return (v && v.trim()) || fallback;
};

/** Subcaminho quando o site é servido fora da raiz (ex.: GitHub Pages). */
export const basePath = env("NEXT_PUBLIC_BASE_PATH", "");

/** Prefixa arquivos de /public com o basePath (next/image não faz isso sozinho). */
export const asset = (path: string) => (path.startsWith("/") ? `${basePath}${path}` : path);

export const site = {
  name: "Formação de Secretárias de Alta Performance",
  shortName: "Secretárias de Alta Performance",
  company: "Focus Digital",
  companyLegalName: "Focus Digital Marketing LTDA", // TODO: razão social oficial
  cnpj: "57.138.832/0001-96",
  url: env("NEXT_PUBLIC_SITE_URL", "https://secretariasdealtaperformance.com.br"),
  description:
    "Treinamento intensivo de 2 dias para transformar a secretária da sua clínica em uma vendedora de alta performance, aumentar agendamentos e lotar sua agenda.",
  locale: "pt_BR",
  /**
   * LOGO OFICIAL: coloque o arquivo em /public/images/logo.png (ou .svg) e
   * informe o caminho aqui. Enquanto for `undefined`, o logo vetorial
   * embutido em src/components/ui/Logo.tsx é usado.
   */
  logoSrc: asset("/images/logo.png") as string | undefined,
} as const;

export const links = {
  /** WhatsApp comercial: DDI + DDD + número, apenas dígitos */
  // WhatsApp que recebe os leads: +55 51 9 9325-3856 (formato internacional, só dígitos)
  whatsapp: env("NEXT_PUBLIC_WHATSAPP", "5551993253856"),
  whatsappMessage:
    "Olá! Vim pela página da Formação de Secretárias de Alta Performance e quero mais informações.",
  instagram: env("NEXT_PUBLIC_INSTAGRAM", "https://instagram.com/"),
  email: "contato@focus.com.br", // TODO
  privacy: "/politica-de-privacidade",
  terms: "/termos-de-uso",
} as const;

export const whatsappUrl = () =>
  `https://wa.me/${links.whatsapp}?text=${encodeURIComponent(links.whatsappMessage)}`;

/**
 * CAPTURA DE LEADS (Nome + WhatsApp)
 * - webhookUrl: URL que recebe um POST JSON { name, phone, source, page, date }
 *   (Zapier, Make, n8n, RD Station, Google Sheets via Apps Script, etc.).
 *   Deixe vazio para não enviar a nenhum sistema.
 * - redirectToWhatsApp: após o envio, abre o WhatsApp comercial com a
 *   mensagem já preenchida com os dados do lead.
 */
export const lead = {
  webhookUrl: env(
    "NEXT_PUBLIC_LEAD_WEBHOOK_URL",
    // Planilha de leads (Google Sheets via Apps Script) — código em docs/planilha-leads-apps-script.js
    "https://script.google.com/macros/s/AKfycbz0D-9mvwTABmVwR2BPRVAIPhomnDzh7FDEc5czMOSr06izozhZmk__ZOTO6q1MIMOZ/exec",
  ),
  redirectToWhatsApp: true,
  successTitle: "Recebemos seus dados!",
  successText:
    "Nossa equipe vai falar com você pelo WhatsApp para confirmar sua vaga.",
} as const;

export const leadWhatsappUrl = (name: string, phone: string) =>
  `https://wa.me/${links.whatsapp}?text=${encodeURIComponent(
    `Olá! Sou ${name}. Quero garantir minha vaga na Formação de Secretárias de Alta Performance (${event.dateLabel}). Meu WhatsApp: ${phone}`,
  )}`;

/** Datas do treinamento (edite aqui e o site inteiro atualiza) */
export const event = {
  dateLabel: "1 e 2 de Outubro",
  dateShort: "01 e 02 OUT",
  /** Usadas nos dados estruturados (SEO) */
  startDate: "2026-10-01",
  endDate: "2026-10-02",
  format: "Presencial",
  /** Local do treinamento */
  address: "Rua Padre Carapuceiro, 752",
  addressHint: "Em frente ao Shopping Recife",
  city: "Recife",
  state: "PE",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Rua+Padre+Carapuceiro%2C+752%2C+Recife+-+PE",
} as const;

/**
 * VSL (vídeo de vendas) logo abaixo da captura.
 * - youtubeId: ID do vídeo (o que vem depois de youtu.be/ ou watch?v=)
 * - unlockAtSeconds: tempo de vídeo para liberar a página. 0 = só quando o vídeo termina.
 * - fallbackSeconds: se o player do YouTube não carregar em X segundos (rede bloqueada/erro),
 *   libera a página. Autoplay bloqueado não conta: a pessoa precisa tocar no vídeo.
 */
export const vsl = {
  youtubeId: "0RyKkb6d7Xs",
  /**
   * MP4 hospedado pelo próprio site (ou URL direta de um host de vídeo).
   * Quando definido, o player nativo substitui o YouTube: abre mais rápido,
   * toca com som no primeiro toque em qualquer celular (inclusive no navegador
   * do Instagram/Facebook) e não carrega os ~850 KB do player do YouTube.
   * No deploy da Vercel basta definir VSL_MP4_URL (ver .github/workflows/deploy-vercel.yml).
   */
  mp4Url: env("NEXT_PUBLIC_VSL_MP4", ""),
  /**
   * Versão HLS (playlist .m3u8 com várias qualidades). Usada automaticamente no
   * Safari/iPhone, que escolhe a qualidade conforme a rede e não trava por buffer.
   * Gerada no deploy junto com o MP4.
   */
  hlsUrl: env("NEXT_PUBLIC_VSL_HLS", ""),
  posterSrc: asset("/images/vsl-poster.jpg"),
  unlockAtSeconds: 210,
  fallbackSeconds: 40,
  restartOnUnmute: true,
} as const;

/**
 * RASTREAMENTO
 * IDs podem vir das variáveis de ambiente (Vercel) ou ser fixados aqui.
 * - metaPixelId: ID numérico do Pixel/Conjunto de dados da Meta
 * - ga4Id: ID de medição do Google Analytics 4 (G-XXXX), opcional
 * - gtmId: ID do Google Tag Manager (GTM-XXXX), opcional
 */
export const tracking = {
  metaPixelId: env("NEXT_PUBLIC_META_PIXEL_ID", "933428856047544"),
  ga4Id: env("NEXT_PUBLIC_GA4_ID", ""),
  gtmId: env("NEXT_PUBLIC_GTM_ID", ""),
} as const;

/** IDs das seções (usados em âncoras, header e sticky CTA) */
export const sections = {
  hero: "inicio",
  problem: "problema",
  method: "metodo",
  numbers: "meta",
  audience: "para-quem",
  authority: "autoridade",
  cases: "cases",
  comparison: "comparacao",
  signup: "inscricao",
  roi: "roi",
  faq: "faq",
  final: "garantir-vaga",
} as const;
