"use client";

import Link from "next/link";
import { TopNav } from "./TopNav";
import { useScrollChrome } from "@/lib/hooks/useScrollChrome";

type SiteChromeProps = {
  toastMessage: string | null;
  toastVisible: boolean;
};

export function SiteChrome({ toastMessage, toastVisible }: SiteChromeProps) {
  const {
    navScrolled,
    floatCtaVisible,
    toTopVisible,
    scrollToTop,
  } = useScrollChrome();

  return (
    <>
      <TopNav scrolled={navScrolled} dark />

      <Link className="float-cta" href="#cta" data-visible={floatCtaVisible ? "true" : "false"}>
        Cotizar tu pedido <span className="arr">→</span>
      </Link>

      <button
        className="to-top"
        type="button"
        aria-label="Volver arriba"
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
        <span className="toast-text">{toastMessage ?? "Copiado al portapapeles"}</span>
      </div>
    </>
  );
}
