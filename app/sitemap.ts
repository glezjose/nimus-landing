import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n/config";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.map((locale) => ({
    url: `${siteConfig.url}/${locale}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: locale === "es" ? 1 : 0.9,
  }));
}
