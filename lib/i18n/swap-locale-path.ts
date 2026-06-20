import { locales, type Locale } from "@/lib/i18n/config";

export function swapLocalePath(pathname: string, locale: Locale) {
  const segments = pathname.split("/");
  if (segments.length > 1 && locales.includes(segments[1] as Locale)) {
    segments[1] = locale;
    return segments.join("/") || `/${locale}`;
  }
  return `/${locale}${pathname === "/" ? "" : pathname}`;
}

export function getAlternateLocale(locale: Locale): Locale {
  return locale === "es" ? "en" : "es";
}
