"use client";

import { useCallback, useRef } from "react";
import { UserIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import { LocaleToggleChip } from "@/components/layout/LocaleToggleChip";
import { NavMenu } from "@/components/layout/NavMenu";
import { useTranslations } from "@/components/providers/DictionaryProvider";

type TopNavProps = {
  scrolled?: boolean;
  onCream?: boolean;
  dark?: boolean;
  menuHiddenAtCta?: boolean;
};

export function TopNav({
  scrolled = false,
  onCream = false,
  dark = false,
  menuHiddenAtCta = false,
}: TopNavProps) {
  const t = useTranslations();
  const navToolsRef = useRef<HTMLDivElement>(null);

  const scrollToTop = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
    window.history.replaceState(null, "", "#top");
  }, []);

  return (
    <nav
      className={`topnav${dark ? " topnav--dark" : ""}${scrolled ? " is-scrolled" : ""}${onCream ? " topnav--on-cream" : ""}`}
      data-at-cta={menuHiddenAtCta ? "true" : "false"}
    >
      <Link
        href="#top"
        aria-label={t.nav.brandAria}
        className="topnav__brand"
        onClick={scrollToTop}
      >
        <Image
          src="/assets/nimus-logo-white.png"
          alt={t.nav.brandAlt}
          width={40}
          height={40}
          className="brand-logo brand-logo--mark"
          priority
        />
      </Link>

      <div className="topnav__center">
        <div ref={navToolsRef} className="topnav__nav-tools">
          <NavMenu
            dark={dark}
            hiddenAtCta={menuHiddenAtCta}
            navToolsRef={navToolsRef}
          />
          <div
            className="nav-hide-at-cta"
            aria-hidden={menuHiddenAtCta ? true : undefined}
          >
            <LocaleToggleChip className="nav-locale-chip" />
          </div>
        </div>
      </div>

      <div
        className="topnav__actions nav-hide-at-cta"
        aria-hidden={menuHiddenAtCta ? true : undefined}
      >
        <Link href="#cta" className="nav-icon-btn" aria-label={t.nav.contactAria}>
          <UserIcon width={18} height={18} aria-hidden="true" />
        </Link>
        <Link href="#cta" className="nav-cta">
          {t.nav.cta}
        </Link>
      </div>
    </nav>
  );
}
