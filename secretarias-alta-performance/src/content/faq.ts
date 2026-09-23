import { event } from "@/lib/config";

export interface FaqItem {
  q: string;
  a: string;
}

/** Dúvidas essenciais (o restante a VSL já responde). */
export const faq: FaqItem[] = [
  {
    q: "Para quem é o treinamento?",
    a: "Donos de clínica, médicos, dentistas e quem cuida do atendimento e da agenda. Pode vir com a secretária ou sozinho e aplicar depois. Se você mesmo atende, também é para você.",
  },
  {
    q: "Quando e onde acontece?",
    a: `Nos dias ${event.dateLabel}, na ${event.address}, ${event.addressHint.toLowerCase()}, em ${event.city}. São 2 dias intensivos.`,
  },
  {
    q: "O que está incluso?",
    a: "Os 2 dias de treinamento, apostila, checklists, scripts de atendimento e follow-up e o material de implementação.",
  },
  {
    q: "O resultado é garantido?",
    a: "Não. Entregamos método, processos e direcionamento; o resultado depende da aplicação na rotina de cada clínica.",
  },
];
