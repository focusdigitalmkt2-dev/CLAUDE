"use client";

import {
  HeroSignup,
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
} from "@/components/sections";

/**
 * Seções liberadas após a VSL. Para reordenar, mova os componentes abaixo.
 * Ordem: captura → problema → impacto → método → meta → para quem é →
 * autoridade → cases → comparação → inscrição → ROI → urgência → FAQ → CTA final
 */
export function RestOfPage() {
  return (
    <>
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
    </>
  );
}
