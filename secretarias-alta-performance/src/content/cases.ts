/**
 * CASES REAIS DA FOCUS
 * ------------------------------------------------------------
 * Substitua os placeholders abaixo por dados reais.
 * - `image`: caminho em /public/images/cases/... (print de agenda, conversa, dashboard, etc.)
 * - `metric` / `metricLabel`: indicador em destaque (opcional). Ex.: "+62%" / "agendamentos em 30 dias"
 * - `quote`: depoimento real do cliente (opcional). NÃO invente depoimentos.
 * - `type`: define o ícone/rótulo: "print" | "resultado" | "depoimento" | "agenda" | "conversa" | "indicador"
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
    title: "Case 01",
    subtitle: "Resultado da clínica",
    type: "agenda",
    // image: "/images/cases/case-01.jpg",
    imageAlt: "Print da agenda da clínica após o treinamento",
    // metric: "+XX%",
    // metricLabel: "agendamentos no mês",
    specialty: "Especialidade da clínica",
  },
  {
    id: "case-02",
    title: "Case 02",
    subtitle: "Resultado da clínica",
    type: "conversa",
    // image: "/images/cases/case-02.jpg",
    imageAlt: "Print de conversa no WhatsApp com paciente agendado",
    specialty: "Especialidade da clínica",
  },
  {
    id: "case-03",
    title: "Case 03",
    subtitle: "Resultado da clínica",
    type: "indicador",
    // image: "/images/cases/case-03.jpg",
    imageAlt: "Indicadores de crescimento de faturamento",
    specialty: "Especialidade da clínica",
  },
  {
    id: "case-04",
    title: "Case 04",
    subtitle: "Resultado da clínica",
    type: "depoimento",
    // quote: "Depoimento real do cliente aqui.",
    // author: "Nome do cliente",
    specialty: "Especialidade da clínica",
  },
];
