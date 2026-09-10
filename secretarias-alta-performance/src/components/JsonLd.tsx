import { faq } from "@/content/faq";
import { event, pricing, site } from "@/lib/config";

/** Dados estruturados (SEO): FAQ + Evento/Curso. */
export function JsonLd() {
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const courseLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: site.name,
    description: site.description,
    provider: { "@type": "Organization", name: site.company, url: site.url },
    offers: [
      {
        "@type": "Offer",
        name: pricing.individual.name,
        price: pricing.individual.price,
        priceCurrency: "BRL",
        availability: "https://schema.org/InStock",
        url: `${site.url}/#oferta`,
      },
      {
        "@type": "Offer",
        name: pricing.duplo.name,
        price: pricing.duplo.price,
        priceCurrency: "BRL",
        availability: "https://schema.org/InStock",
        url: `${site.url}/#oferta`,
      },
    ],
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "Onsite",
      courseWorkload: "P2D",
      startDate: event.startDate,
      endDate: event.endDate,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseLd) }}
      />
    </>
  );
}
