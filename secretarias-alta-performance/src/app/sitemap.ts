import type { MetadataRoute } from "next";
import { site } from "@/lib/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: site.url, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${site.url}/politica-de-privacidade`, lastModified: now, priority: 0.2 },
    { url: `${site.url}/termos-de-uso`, lastModified: now, priority: 0.2 },
  ];
}
