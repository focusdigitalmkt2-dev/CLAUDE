import type { Metadata, Viewport } from "next";
import { Inter, Montserrat } from "next/font/google";
import { site } from "@/lib/config";
import { Tracking } from "@/components/Tracking";
import "./globals.css";

/**
 * TIPOGRAFIA
 * Inter → texto corrido | Montserrat (800/900) → títulos.
 * Para trocar, altere aqui e as variáveis --font-* em globals.css.
 */
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Transforme sua secretária em uma vendedora`,
    template: `%s | ${site.shortName}`,
  },
  description: site.description,
  keywords: [
    "treinamento de secretárias",
    "secretária de clínica",
    "agendamentos clínica",
    "conversão de leads clínica",
    "atendimento WhatsApp clínica",
    "treinamento para clínicas",
    "recepcionista vendedora",
    "lotar agenda clínica",
  ],
  openGraph: {
    type: "website",
    locale: site.locale,
    url: site.url,
    siteName: site.shortName,
    title: "Transforme sua secretária em uma vendedora e comece a lotar sua agenda",
    description: site.description,
    // Coloque a imagem em /public/og.jpg (1200x630)
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: site.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Transforme sua secretária em uma vendedora e comece a lotar sua agenda",
    description: site.description,
    images: ["/og.jpg"],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${montserrat.variable}`}>
      <head>
        {/* Pré-conexão com o YouTube: o player da VSL carrega mais rápido */}
        <link rel="preconnect" href="https://www.youtube.com" />
        <link rel="preconnect" href="https://i.ytimg.com" />
        <link rel="preconnect" href="https://s.ytimg.com" />
        <link rel="dns-prefetch" href="https://www.google.com" />
      </head>
      <body className="min-h-dvh antialiased">
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-gold focus:px-4 focus:py-2 focus:font-bold focus:text-black"
        >
          Pular para o conteúdo
        </a>
        {children}
        {/* Meta Pixel / GA4 / GTM — IDs em src/lib/config.ts (tracking) ou variáveis de ambiente */}
        <Tracking />
      </body>
    </html>
  );
}
