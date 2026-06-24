"use client";

import { TopNav } from "./TopNav";
import { useTranslations } from "@/components/providers/DictionaryProvider";
import { useScrollChrome } from "@/lib/hooks/useScrollChrome";

type SiteChromeProps = {
  toastMessage: string | null;
  toastVisible: boolean;
};

export function SiteChrome({ toastMessage, toastVisible }: SiteChromeProps) {
  const t = useTranslations();
  const { navScrolled, menuHiddenAtCta } = useScrollChrome();

  return (
    <>
      <TopNav scrolled={navScrolled} dark menuHiddenAtCta={menuHiddenAtCta} />

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
