import { Header, Hero, VslSection, Footer, StickyCTA } from "@/components/sections";
import { DelayedContent } from "@/components/DelayedContent";
import { JsonLd } from "@/components/JsonLd";

/**
 * ESTRUTURA
 * Hero (título) → VSL → [liberado após vsl.unlockAtSeconds de vídeo] → restante
 * (src/components/RestOfPage.tsx). O restante só é baixado e renderizado após
 * a liberação, para o carregamento inicial ser o mais leve possível.
 */
export default function HomePage() {
  return (
    <>
      <JsonLd />
      <Header />
      <main id="conteudo">
        <Hero />
        <VslSection />
        <DelayedContent />
      </main>
      <Footer />
      <StickyCTA />
    </>
  );
}
