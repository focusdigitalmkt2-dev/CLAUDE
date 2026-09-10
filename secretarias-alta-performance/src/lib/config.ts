/**
 * CONFIGURAÇÃO CENTRAL DO SITE
 * ------------------------------------------------------------
 * Tudo que precisa ser trocado antes de publicar está aqui
 * (ou nas variáveis de ambiente correspondentes — ver .env.example).
 */

const env = (key: string, fallback: string) =>
  (process.env[key] && process.env[key]!.trim()) || fallback;

export const site = {
  name: "Formação de Secretárias de Alta Performance",
  shortName: "Secretárias de Alta Performance",
  company: "Focus",
  companyLegalName: "Focus Digital Marketing LTDA", // TODO: razão social oficial
  cnpj: "00.000.000/0001-00", // TODO: CNPJ oficial
  url: env("NEXT_PUBLIC_SITE_URL", "https://secretariasdealtaperformance.com.br"),
  description:
    "Treinamento intensivo de 2 dias para transformar a secretária da sua clínica em uma vendedora de alta performance, aumentar agendamentos e lotar sua agenda.",
  locale: "pt_BR",
} as const;

export const links = {
  /** Checkout do ingresso individual (R$ 997) */
  checkoutIndividual: env("NEXT_PUBLIC_CHECKOUT_INDIVIDUAL", "#oferta"),
  /** Checkout do ingresso duplo (R$ 1.497) */
  checkoutDuplo: env("NEXT_PUBLIC_CHECKOUT_DUPLO", "#oferta"),
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

export const pricing = {
  individual: {
    id: "individual",
    label: "Plano 01",
    name: "Ingresso Individual",
    tagline: "Para 1 secretária ou participante.",
    price: 997,
    priceLabel: "R$ 997",
    cta: "GARANTIR 1 VAGA",
    href: links.checkoutIndividual,
    features: [
      "2 dias de treinamento",
      "Apostila",
      "Checklists",
      "Material de implementação",
      "Método completo",
    ],
  },
  duplo: {
    id: "duplo",
    label: "Plano 02",
    name: "Ingresso Duplo",
    tagline:
      "Ideal para levar duas pessoas da clínica ou participar junto com sua secretária.",
    price: 1497,
    priceLabel: "R$ 1.497",
    badge: "MAIS ESCOLHIDO",
    cta: "QUERO O INGRESSO DUPLO",
    href: links.checkoutDuplo,
    features: [
      "2 participantes",
      "2 dias de treinamento",
      "Apostilas",
      "Checklists",
      "Material de implementação",
      "Método completo",
    ],
    comparison: {
      twoIndividual: "R$ 1.994",
      duplo: "R$ 1.497",
      savings: "R$ 497",
    },
  },
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
  pricing: "oferta",
  roi: "roi",
  faq: "faq",
  final: "garantir-vaga",
} as const;
