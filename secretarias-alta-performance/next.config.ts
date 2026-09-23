import type { NextConfig } from "next";

/**
 * STATIC_EXPORT=1 npm run build → gera a pasta /out (HTML estático puro),
 * útil para hospedar em qualquer servidor sem Node.js.
 */
const isStaticExport = process.env.STATIC_EXPORT === "1";
/** Subcaminho quando o site é servido fora da raiz (ex.: GitHub Pages → "/CLAUDE") */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Export estático: uma pasta por rota (rota/index.html) para funcionar em
  // qualquer servidor (Apache/LiteSpeed da Hostinger, Nginx, GitHub Pages).
  ...(isStaticExport ? { output: "export" as const, trailingSlash: true } : {}),
  ...(basePath ? { basePath } : {}),
  images: {
    formats: ["image/avif", "image/webp"],
    unoptimized: isStaticExport,
    // Adicione aqui domínios externos caso as imagens venham de um CDN.
    remotePatterns: [],
  },
};

export default nextConfig;
