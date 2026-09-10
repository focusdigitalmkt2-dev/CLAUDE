import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { site, links } from "@/lib/config";

export const metadata: Metadata = {
  title: "Termos de Uso",
  robots: { index: false },
};

/** TODO: substituir pelo texto jurídico oficial da empresa. */
export default function TermsPage() {
  return (
    <LegalPage title="Termos de Uso">
      <p>
        Ao adquirir um ingresso para o treinamento {site.name}, você concorda com as condições
        descritas nesta página.
      </p>
      <h2>Ingressos</h2>
      <p>
        Os ingressos são pessoais e dão direito à participação nos 2 dias de treinamento e ao
        material de implementação descrito na página de oferta.
      </p>
      <h2>Cancelamento e reembolso</h2>
      <p>
        As condições de cancelamento seguem o Código de Defesa do Consumidor e a política da
        plataforma de pagamento utilizada. Para solicitações, entre em contato pelo e-mail{" "}
        {links.email}.
      </p>
      <h2>Resultados</h2>
      <p>
        O treinamento oferece metodologia, processos e direcionamentos. Não existem resultados
        garantidos: os resultados dependem da implementação, operação e contexto de cada clínica.
      </p>
    </LegalPage>
  );
}
