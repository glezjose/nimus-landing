export const locales = ["es", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "es";

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function localeHtmlLang(locale: Locale): string {
  return locale === "es" ? "es" : "en";
}

export function localeOgLocale(locale: Locale): string {
  return locale === "es" ? "es_MX" : "en_US";
}

export function localeJsonLdLanguage(locale: Locale): string {
  return locale === "es" ? "es-MX" : "en-US";
}

export function localeAvailableLanguage(locale: Locale): string {
  return locale === "es" ? "Spanish" : "English";
}
