"use client";

import Link from "next/link";
import { TopNav } from "./TopNav";
import { useTranslations } from "@/components/providers/DictionaryProvider";
import { useScrollChrome } from "@/lib/hooks/useScrollChrome";

type SiteChromeProps = {
  toastMessage: string | null;
  toastVisible: boolean;
};

export function SiteChrome({ toastMessage, toastVisible }: SiteChromeProps) {
  const t = useTranslations();
  const {
    navScrolled,
    floatCtaVisible,
    toTopVisible,
    menuHiddenAtCta,
    scrollToTop,
  } = useScrollChrome();

  return (
    <>
      <TopNav scrolled={navScrolled} dark menuHiddenAtCta={menuHiddenAtCta} />

      <Link className="float-cta" href="#cta" data-visible={floatCtaVisible ? "true" : "false"}>
        {t.nav.floatCta} <span className="arr">→</span>
      </Link>

      <button
        className="to-top"
        type="button"
        aria-label={t.nav.backToTopAria}
        data-visible={toTopVisible ? "true" : "false"}
        onClick={scrollToTop}
      >
        ↑
      </button>

      <div
        className="toast"
        id="toast"
        role="status"
        aria-live="polite"
        aria-hidden={!toastVisible}
        data-visible={toastVisible ? "true" : "false"}
      >
        <span className="toast-icon">✓</span>
        <span className="toast-text">{toastMessage ?? t.ui.copied}</span>
      </div>
    </>
  );
}
