# Formação de Secretárias de Alta Performance — Landing Page

Landing page premium, mobile-first e focada em captura de leads (nome + WhatsApp) para o
treinamento intensivo de 2 dias da **Focus Digital** voltado a clínicas, consultórios e
profissionais da saúde.

**Stack:** Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · Framer Motion · lucide-react

## Rodando o projeto

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # build de produção
npm run start      # serve o build
npm run typecheck  # tsc --noEmit
npm run lint
```

## O que trocar antes de publicar

1. **Webhook de leads, WhatsApp e Instagram** → copie `.env.example` para `.env.local` e preencha.
   O formulário envia um POST JSON (`name`, `phone`, `source`, `page`, `date`) para
   `NEXT_PUBLIC_LEAD_WEBHOOK_URL` (Zapier, Make, n8n, RD Station, Apps Script...) e, em seguida,
   abre o WhatsApp comercial com a mensagem preenchida. Sem webhook, só o WhatsApp é usado.
   Ajuste esse comportamento em `lead` dentro de `src/lib/config.ts`.
2. **Razão social, CNPJ e e-mail** → `src/lib/config.ts`.
3. **Imagens** → veja `public/images/README.md`. Todo `<ImagePlaceholder />` aceita a prop `src`;
   enquanto ela não for informada, um placeholder elegante indica o que deve ir ali.
4. **Cases reais** → `src/content/cases.ts` (prints, agendas, conversas, indicadores, depoimentos).
   Não invente depoimentos ou números.
5. **Logo oficial** → `src/components/ui/Logo.tsx`.
6. **Imagem de compartilhamento (OG)** → `public/og.jpg` (1200x630).
7. **Pixels (Meta / GA4 / GTM)** → cole os scripts em `src/app/layout.tsx`. Os eventos de CTA e
   checkout já são disparados por `src/lib/analytics.ts`.
8. **Textos legais** → `src/app/politica-de-privacidade` e `src/app/termos-de-uso`.

## Estrutura

```
src/
├── app/
│   ├── layout.tsx            # fontes, SEO/Open Graph, ponto para pixels
│   ├── page.tsx              # ordem das seções (basta reordenar aqui)
│   ├── globals.css           # tema (preto/amarelo/branco), utilitários
│   ├── robots.ts, sitemap.ts, icon.svg, not-found.tsx
│   ├── politica-de-privacidade/  termos-de-uso/
├── components/
│   ├── sections/             # Header, Hero, ProblemSection, ImpactSection, MethodSection,
│   │                         # NumbersSection, DeliverablesSection, AudienceSection,
│   │                         # MindsetSection, AuthoritySection, CasesSection,
│   │                         # ComparisonSection, SignupSection, ROISection,
│   │                         # UrgencySection, FAQSection, FinalCTA, Footer, StickyCTA
│   ├── ui/                   # Button, Section, SectionHeading, Reveal, ImagePlaceholder, ...
│   ├── LeadForm.tsx          # formulário Nome + WhatsApp (hero e seção de inscrição)
│   └── JsonLd.tsx            # dados estruturados (FAQ + Course)
├── content/
│   ├── cases.ts              # cases (placeholders fáceis de substituir)
│   └── faq.ts                # perguntas frequentes
└── lib/
    ├── config.ts             # links, datas, captura de leads, IDs de seção, dados da empresa
    ├── analytics.ts          # eventos para Meta Pixel / GA4 / GTM
    └── cn.ts
```

## Conversão

- CTA repetido em todas as seções-chave, com microcopy "Treinamento intensivo de 2 dias." e
  "Vagas limitadas.".
- Formulário de captura na primeira dobra e repetido na seção de inscrição.
- Sticky CTA no mobile (aparece após o hero, some na inscrição e no CTA final).
- Sem contadores falsos, número falso de vagas ou depoimentos inventados.

## Acessibilidade e performance

- Hierarquia de headings (1 `h1`, `h2` por seção, `h3` em cards/FAQ), `aria-labelledby` nas seções,
  FAQ com `aria-expanded`/`aria-controls`, skip link, foco visível, `prefers-reduced-motion`.
- Páginas 100% estáticas, `next/image`, fontes com `display: swap`, First Load JS ≈ 174 kB.
