# Felipe Sampaio — Tricologia & Estética | Landing Page

Landing page de alta conversão para captação de pacientes de **Felipe Sampaio — Tricologia &
Estética**, focada em tráfego pago (Meta Ads / Google Ads) para o público masculino: queda de
cabelo, calvície, falhas na barba e estética facial.

A logo é reproduzida em SVG (monograma "SF" em degradê dourado + wordmark "Felipe Sampaio" /
"Tricologia & Estética") no cabeçalho, na seção "Sobre" e no rodapé — nítida em qualquer tamanho
de tela, sem depender de um arquivo de imagem.

## Arquivo

- `index.html` — página única, totalmente autossuficiente (HTML + CSS + JS inline). Sem
  dependências além da fonte do Google Fonts. Basta hospedar em qualquer lugar (Vercel, Netlify,
  Hostinger, GitHub Pages, etc.).

## Estrutura da página (na ordem)

1. **Cabeçalho fixo** com logo, menu e CTA "Agendar avaliação"
2. **Hero** com título de conversão + **formulário de captação** (envia direto para o WhatsApp)
3. **Faixa de credibilidade** (diagnóstico especializado, protocolos individuais, acompanhamento,
   avaliações)
4. **Você se identifica?** — seção de dores (queda de cabelo, entradas, falhas na barba, couro
   cabeludo, autoestima…)
5. **Sobre** — posicionamento do Felipe Sampaio
6. **Nossos protocolos** — tricoscopia, PRP capilar, microagulhamento, mesoterapia, protocolo
   anti-queda, densidade de barba, estética facial masculina, encaminhamento para transplante
7. **Como funciona** — jornada em 4 passos
8. **Diferenciais** — por que escolher a Felipe Sampaio
9. **Depoimentos** — prova social
10. **FAQ** — dúvidas frequentes (acordeão)
11. **CTA final** forte
12. **Rodapé** com logo, contato, redes e disclaimer
13. **Botão flutuante de WhatsApp** em todas as telas

## Como configurar (2 minutos)

Abra o `index.html` e edite o bloco `CONFIG` no `<script>` no final do arquivo:

```js
const CONFIG = {
  whatsapp: "5500000000000",   // DDI + DDD + número, só dígitos
  mensagem: "Olá! Vim pelo site da Felipe Sampaio e quero agendar minha avaliação.",
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

## Sobre a logo

A logo original (monograma dourado "SF" + wordmark) foi recriada em SVG diretamente no HTML, pois
o arquivo de imagem enviado não pôde ser salvo no repositório. Se preferir usar o arquivo de logo
original (PNG/SVG), basta:

1. Adicionar o arquivo em `assets/logo.png` (ou `.svg`).
2. Substituir os blocos `<svg class="monograma">...</svg>` no cabeçalho e rodapé por
   `<img src="assets/logo.png" class="monograma" alt="Felipe Sampaio">`.

## Personalização adicional (opcional)

- **Cores da marca:** ajuste as variáveis CSS em `:root` (`--preto`, `--dourado`, etc.).
- **Textos e depoimentos:** troque livremente pelos reais assim que disponíveis.
- **Endereço e horários:** atualize na seção de rodapé e no FAQ.
- **Fotos:** a página usa gradientes e ícones SVG para carregar rápido; você pode substituir por
  fotos reais do consultório/atendimento quando quiser.

## Observações

- Página 100% responsiva (desktop, tablet e mobile).
- Leve e rápida — importante para a qualidade do anúncio e para a conversão.
- Os depoimentos são exemplos ilustrativos; substitua por relatos reais antes de veicular.
- Este repositório não estava conectado ao domínio `hair-for-man.vercel.app` no momento desta
  atualização — confirme a conexão do projeto Vercel com esta branch para publicar as mudanças.
