import type { MetadataRoute } from "next";
import { site } from "@/lib/config";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  // no export estático as rotas terminam com "/" (pasta/index.html)
  const slash = process.env.STATIC_EXPORT === "1" ? "/" : "";
  return [
    { url: site.url, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${site.url}/politica-de-privacidade${slash}`, lastModified: now, priority: 0.2 },
    { url: `${site.url}/termos-de-uso${slash}`, lastModified: now, priority: 0.2 },
  ];
}
