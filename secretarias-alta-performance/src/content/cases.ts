/**
 * CASES REAIS DA FOCUS
 * ------------------------------------------------------------
 * - `image`: print em /public/images/cases/
 * - `metric` / `metricLabel`: indicador em destaque
 * - `quote`: depoimento em texto (opcional)
 * Para trocar um case, substitua o arquivo e ajuste os textos abaixo.
 */

export type CaseType = "print" | "resultado" | "depoimento" | "agenda" | "conversa" | "indicador";

export interface CaseItem {
  id: string;
  title: string;
  subtitle: string;
  type: CaseType;
  image?: string;
  imageAlt?: string;
  metric?: string;
  metricLabel?: string;
  quote?: string;
  author?: string;
  specialty?: string;
}

export const cases: CaseItem[] = [
  {
    id: "case-01",
    title: "Time comercial · Captação",
    subtitle: "365 agendamentos em um mês",
    type: "agenda",
    image: "/images/cases/case-01.jpg",
    imageAlt: "Painel do time comercial: 365 agendamentos, 282 comparecimentos e 77% de conversão em maio",
    metric: "77%",
    metricLabel: "de comparecimento",
    specialty: "Clínica de estética",
  },
  {
    id: "case-02",
    title: "Resultado de julho",
    subtitle: "76 fechamentos no mês",
    type: "indicador",
    image: "/images/cases/case-02.jpg",
    imageAlt: "Relatório de julho: 76 fechamentos, R$ 225 mil vendidos e ticket médio de R$ 2.961",
    metric: "R$ 225 mil",
    metricLabel: "vendidos em julho",
    specialty: "Clínica de estética",
  },
  {
    id: "case-03",
    title: "Capilar · Sorocaba",
    subtitle: "9 conversões em um dia",
    type: "resultado",
    image: "/images/cases/case-03.jpg",
    imageAlt: "Relatório capilar Sorocaba: 13 leads válidos, 11 agendamentos, 22 comparecimentos e 9 convertidos",
    metric: "R$ 43.500",
    metricLabel: "em um dia de atendimento",
    specialty: "Clínica capilar",
  },
  {
    id: "case-04",
    title: "Magrass · Ribeirão Preto",
    subtitle: "14 agendamentos em 16 leads",
    type: "agenda",
    image: "/images/cases/case-04.jpg",
    imageAlt: "Ribeirão Preto: 16 leads, 14 agendamentos, 7 comparecimentos e R$ 18.000 de conversão",
    metric: "14 de 16",
    metricLabel: "leads agendados",
    specialty: "Emagrecimento",
  },
  {
    id: "case-05",
    title: "São José do Rio Preto",
    subtitle: "4 conversões em um dia",
    type: "resultado",
    image: "/images/cases/case-05.jpg",
    imageAlt: "Rio Preto 24/07: 19 leads, 7 agendamentos, 12 comparecimentos e 4 conversões somando R$ 21.467",
    metric: "R$ 21.467",
    metricLabel: "em um dia de atendimento",
    specialty: "Emagrecimento",
  },
];

/** Depoimentos em vídeo (YouTube). Use o ID que vem depois de watch?v= */
export const videoTestimonials = [
  { id: "G2YEI90oKt4", title: "Depoimento de cliente Focus" },
  { id: "BJLF5ct7Gv8", title: "Depoimento de cliente Focus" },
];
