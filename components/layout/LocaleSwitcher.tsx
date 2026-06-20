"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, type Locale } from "@/lib/i18n/config";
import { useDictionary } from "@/components/providers/DictionaryProvider";
import { swapLocalePath } from "@/lib/i18n/swap-locale-path";

export function LocaleSwitcher() {
  const { locale } = useDictionary();
  const pathname = usePathname();

  return (
    <div className="locale-switcher" role="navigation" aria-label="Language">
      {locales.map((item) => (
        <Link
          key={item}
          href={swapLocalePath(pathname, item)}
          className="locale-switcher__btn"
          aria-current={locale === item ? "true" : undefined}
          lang={item}
        >
          {item.toUpperCase()}
        </Link>
      ))}
    </div>
  );
}
