/**
 * CONFIGURAÇÃO CENTRAL DO SITE
 * ------------------------------------------------------------
 * Tudo que precisa ser trocado antes de publicar está aqui
 * (ou nas variáveis de ambiente correspondentes — ver .env.example).
 */

const env = (key: string, fallback: string) =>
  (process.env[key] && process.env[key]!.trim()) || fallback;

/** Subcaminho quando o site é servido fora da raiz (ex.: GitHub Pages). */
export const basePath = env("NEXT_PUBLIC_BASE_PATH", "");

/** Prefixa arquivos de /public com o basePath (next/image não faz isso sozinho). */
export const asset = (path: string) => (path.startsWith("/") ? `${basePath}${path}` : path);

export const site = {
  name: "Formação de Secretárias de Alta Performance",
  shortName: "Secretárias de Alta Performance",
  company: "Focus Digital",
  companyLegalName: "Focus Digital Marketing LTDA", // TODO: razão social oficial
  cnpj: "00.000.000/0001-00", // TODO: CNPJ oficial
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
  whatsapp: env("NEXT_PUBLIC_WHATSAPP", "5534999999999"),
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
  webhookUrl: env("NEXT_PUBLIC_LEAD_WEBHOOK_URL", ""),
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

/** IDs das seções (usados em âncoras, header e sticky CTA) */
export const sections = {
  hero: "inicio",
  problem: "problema",
  method: "metodo",
  numbers: "meta",
  deliverables: "entregaveis",
  audience: "para-quem",
  authority: "autoridade",
  cases: "cases",
  comparison: "comparacao",
  signup: "inscricao",
  roi: "roi",
  faq: "faq",
  final: "garantir-vaga",
} as const;
