"use client";

import {
  HeroSignup,
  MethodSection,
  CasesSection,
  AudienceSection,
  AuthoritySection,
  SignupSection,
  FinalCTA,
} from "@/components/sections";

/**
 * Seções liberadas após a VSL. A VSL já apresenta problema, impacto, comparação,
 * ROI e urgência, então a página fica só com o essencial:
 * captura → método → cases → para quem é → autoridade → inscrição → CTA final.
 * (ProblemSection, ImpactSection, NumbersSection, ComparisonSection, ROISection e
 * UrgencySection e FAQSection continuam no código, caso queira reativar alguma.)
 */
export function RestOfPage() {
  return (
    <>
      <HeroSignup />
      <MethodSection />
      <CasesSection />
      <AudienceSection />
      <AuthoritySection />
      <SignupSection />
      <FinalCTA />
    </>
  );
}
