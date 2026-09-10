> **Projetos neste repositório**
>
> - `index.html` — landing page da Longevuz Uberaba (este README).
> - [`secretarias-alta-performance/`](./secretarias-alta-performance/README.md) — landing page
>   Next.js da **Formação de Secretárias de Alta Performance** (Focus).

# Longevuz Uberaba — Landing Page de Alta Conversão

Landing page (LP) personalizada para captação de clientes da **Longevuz Uberaba**, baseada na
estrutura do site institucional da franquia (https://longevuz.com.br/), porém transformada em uma
página focada em **venda e tráfego pago** (Meta Ads / Google Ads).

A parte de "Seja Franqueado" foi removida — toda a página é voltada para o cliente final.

## Arquivo

- `index.html` — página única, totalmente autossuficiente (HTML + CSS + JS inline). Sem
  dependências além da fonte do Google Fonts. Basta hospedar em qualquer lugar (Vercel, Netlify,
  Hostinger, GitHub Pages, etc.).

## Estrutura da página (na ordem)

1. **Cabeçalho fixo** com menu e CTA "Agendar avaliação"
2. **Hero** com título de conversão + **formulário de captação** (envia direto para o WhatsApp)
3. **Faixa de credibilidade** (protocolos médicos, +15 protocolos, acompanhamento, avaliações)
4. **Você se identifica?** — seção de dores (energia, peso, performance, hormônios…)
5. **A Longevuz Uberaba** — sobre / posicionamento da marca
6. **Nossos protocolos** — grid de tratamentos (energia, emagrecimento, performance, longevidade,
   saúde intestinal/detox, massa muscular, saúde hormonal/sexual, colesterol/metabolismo)
7. **Como funciona** — jornada em 4 passos
8. **Diferenciais** — por que escolher a Longevuz
9. **Depoimentos** — prova social
10. **FAQ** — dúvidas frequentes (acordeão)
11. **CTA final** forte
12. **Rodapé** com contato, redes e disclaimer
13. **Botão flutuante de WhatsApp** em todas as telas

## Como configurar (2 minutos)

Abra o `index.html` e edite o bloco `CONFIG` no `<script>` no final do arquivo:

```js
const CONFIG = {
  whatsapp: "5534999999999",   // DDI + DDD + número, só dígitos
  mensagem: "Olá! Vim pelo site da Longevuz Uberaba e quero agendar minha avaliação.",
  instagram: "https://instagram.com/seu_perfil",
};
```

Todos os botões e o formulário passam a apontar para o WhatsApp configurado, já com mensagem
pré-preenchida. O formulário monta a mensagem com nome, telefone e objetivo do lead.

## Rastreamento para tráfego pago

A função `trackLead()` já dispara evento de **Lead** a cada clique de CTA para:

- **Meta Pixel** (`fbq('track','Lead')`)
- **Google Tag / GA4** (`gtag('event','generate_lead')`)
- **Google Tag Manager** (`dataLayer.push`)

Para ativar, basta colar o script do seu Meta Pixel e/ou Google Tag dentro do `<head>` do
`index.html`. O disparo de eventos já está pronto — não precisa mexer no código.

## Personalização adicional (opcional)

- **Cores da marca:** ajuste as variáveis CSS em `:root` (`--verde-escuro`, `--dourado`, etc.).
- **Textos e depoimentos:** troque livremente pelos reais assim que disponíveis.
- **Endereço e horários:** atualize na seção de rodapé e no FAQ.
- **Imagens:** a página usa gradientes e ícones SVG para carregar rápido; você pode substituir por
  fotos reais da unidade quando quiser.

## Observações

- Página 100% responsiva (desktop, tablet e mobile).
- Leve e rápida — importante para a qualidade do anúncio e para a conversão.
- Os depoimentos são exemplos ilustrativos; substitua por relatos reais antes de veicular.
