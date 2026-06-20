import type { Locale } from "./config";
import { defaultLocale } from "./config";
import { en } from "./dictionaries/en";
import { es } from "./dictionaries/es";
import type { Dictionary } from "./types";

const dictionaries: Record<Locale, Dictionary> = { es, en };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries[defaultLocale];
}
