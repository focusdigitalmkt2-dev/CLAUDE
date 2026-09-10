import {
  Header,
  Hero,
  ProblemSection,
  ImpactSection,
  MethodSection,
  NumbersSection,
  DeliverablesSection,
  AudienceSection,
  AuthoritySection,
  CasesSection,
  ComparisonSection,
  SignupSection,
  ROISection,
  UrgencySection,
  FAQSection,
  FinalCTA,
  Footer,
  StickyCTA,
} from "@/components/sections";
import { JsonLd } from "@/components/JsonLd";

/**
 * ORDEM DAS SEÇÕES (estratégia de conversão)
 * 1. Problema → 2. Desejo de agenda cheia → 3. Oportunidades perdidas
 * 4. Método → 5. Meta → 6. Entregáveis → 7. Para quem é
 * 8. Autoridade → 9. Cases → 10. Comparação → 11. Inscrição
 * 12. ROI → 13. Urgência → 14. FAQ → 15. CTA final
 * Para reordenar, basta mover os componentes abaixo.
 */
export default function HomePage() {
  return (
    <>
      <JsonLd />
      <Header />
      <main id="conteudo">
        <Hero />
        <ProblemSection />
        <ImpactSection />
        <MethodSection />
        <NumbersSection />
        <DeliverablesSection />
        <AudienceSection />
        <AuthoritySection />
        <CasesSection />
        <ComparisonSection />
        <SignupSection />
        <ROISection />
        <UrgencySection />
        <FAQSection />
        <FinalCTA />
      </main>
      <Footer />
      <StickyCTA />
    </>
  );
}
