import type { NextConfig } from "next";

/**
 * STATIC_EXPORT=1 npm run build → gera a pasta /out (HTML estático puro),
 * útil para hospedar em qualquer servidor sem Node.js.
 */
const isStaticExport = process.env.STATIC_EXPORT === "1";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  ...(isStaticExport ? { output: "export" as const } : {}),
  images: {
    formats: ["image/avif", "image/webp"],
    unoptimized: isStaticExport,
    // Adicione aqui domínios externos caso as imagens venham de um CDN.
    remotePatterns: [],
  },
};

export default nextConfig;
