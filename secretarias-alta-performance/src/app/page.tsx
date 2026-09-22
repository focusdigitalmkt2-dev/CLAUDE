import {
  Header,
  Hero,
  ProblemSection,
  ImpactSection,
  MethodSection,
  NumbersSection,
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
  VslSection,
  HeroSignup,
} from "@/components/sections";
import { DelayedContent } from "@/components/DelayedContent";
import { JsonLd } from "@/components/JsonLd";

/**
 * ORDEM DAS SEÇÕES (estratégia de conversão)
 * Hero (título) → VSL → [liberado ao fim do vídeo] → captura →
 * 1. Problema → 2. Desejo de agenda cheia → 3. Oportunidades perdidas
 * 4. Método → 5. Meta → 6. Para quem é → 7. Autoridade → 8. Cases
 * 9. Comparação → 10. Inscrição → 11. ROI → 12. Urgência → 13. FAQ → 14. CTA final
 * Para reordenar, basta mover os componentes abaixo.
 */
export default function HomePage() {
  return (
    <>
      <JsonLd />
      <Header />
      <main id="conteudo">
        <Hero />
        <VslSection />
        {/* Tudo abaixo só aparece quando a VSL termina (ou ?full=1) */}
        <DelayedContent>
        <HeroSignup />
        <ProblemSection />
        <ImpactSection />
        <MethodSection />
        <NumbersSection />
        <AudienceSection />
        <AuthoritySection />
        <CasesSection />
        <ComparisonSection />
        <SignupSection />
        <ROISection />
        <UrgencySection />
        <FAQSection />
        <FinalCTA />
        </DelayedContent>
      </main>
      <Footer />
      <StickyCTA />
    </>
  );
}
