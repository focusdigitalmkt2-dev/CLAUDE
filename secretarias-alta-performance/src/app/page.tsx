import {
  Header,
  Hero,
  ProblemSection,
  ImpactSection,
  MethodSection,
  NumbersSection,
  DeliverablesSection,
  AudienceSection,
  MindsetSection,
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
 * 4. Método → 5. Meta → 6. Entregáveis → 7. Para quem é → 8. Mentalidade
 * 9. Autoridade → 10. Cases → 11. Comparação → 12. Inscrição
 * 13. ROI → 14. Urgência → 15. FAQ → 16. CTA final
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
        <MindsetSection />
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
