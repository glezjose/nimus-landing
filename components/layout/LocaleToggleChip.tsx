"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDictionary } from "@/components/providers/DictionaryProvider";
import {
  getAlternateLocale,
  swapLocalePath,
} from "@/lib/i18n/swap-locale-path";

type LocaleToggleChipProps = {
  className?: string;
  onNavigate?: () => void;
};

export function LocaleToggleChip({
  className,
  onNavigate,
}: LocaleToggleChipProps) {
  const { locale } = useDictionary();
  const pathname = usePathname();
  const alternateLocale = getAlternateLocale(locale);

  return (
    <Link
      href={swapLocalePath(pathname, alternateLocale)}
      className={className}
      aria-label={`Switch to ${alternateLocale.toUpperCase()}`}
      lang={alternateLocale}
      onClick={(event) => {
        event.stopPropagation();
        onNavigate?.();
      }}
    >
      {locale.toUpperCase()}
    </Link>
  );
}
