"use client";

import { useRef } from "react";
import { UserIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import { LocaleToggleChip } from "@/components/layout/LocaleToggleChip";
import { NavMenu } from "@/components/layout/NavMenu";
import { useTranslations } from "@/components/providers/DictionaryProvider";

type TopNavProps = {
  scrolled?: boolean;
  dark?: boolean;
  menuHiddenAtCta?: boolean;
};

export function TopNav({
  scrolled = false,
  dark = false,
  menuHiddenAtCta = false,
}: TopNavProps) {
  const t = useTranslations();
  const navToolsRef = useRef<HTMLDivElement>(null);

  return (
    <nav
      className={`topnav${dark ? " topnav--dark" : ""}${scrolled ? " is-scrolled" : ""}`}
    >
      <Link href="#top" aria-label={t.nav.brandAria} className="topnav__brand">
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
          <LocaleToggleChip className="nav-locale-chip" />
        </div>
      </div>

      <div className="topnav__actions">
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
