import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { site, links } from "@/lib/config";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  robots: { index: false },
};

/** TODO: substituir pelo texto jurídico oficial da empresa. */
export default function PrivacyPage() {
  return (
    <LegalPage title="Política de Privacidade">
      <p>
        Esta página descreve como a {site.company} coleta, utiliza e protege os dados pessoais
        fornecidos por você ao acessar este site ou adquirir um ingresso para o treinamento.
      </p>
      <h2>Dados coletados</h2>
      <p>
        Podemos coletar nome, e-mail, telefone e dados de navegação (cookies e pixels de
        rastreamento) para fins de atendimento, emissão de ingressos e comunicação comercial.
      </p>
      <h2>Uso das informações</h2>
      <p>
        Os dados são utilizados exclusivamente para operação do treinamento, suporte ao
        participante e envio de comunicações relacionadas, em conformidade com a LGPD (Lei
        13.709/2018).
      </p>
      <h2>Seus direitos</h2>
      <p>
        Você pode solicitar acesso, correção ou exclusão dos seus dados a qualquer momento pelo
        e-mail {links.email}.
      </p>
    </LegalPage>
  );
}
