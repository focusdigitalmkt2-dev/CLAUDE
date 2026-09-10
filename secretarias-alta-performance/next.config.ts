import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    // Adicione aqui domínios externos caso as imagens venham de um CDN.
    remotePatterns: [],
  },
};

export default nextConfig;
