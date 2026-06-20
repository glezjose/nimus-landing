"use client";

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

  return (
    <nav
      className={`topnav${dark ? " topnav--dark" : ""}${scrolled ? " is-scrolled" : ""}`}
    >
      <Link href="#top" aria-label={t.nav.brandAria} className="topnav__brand">
        <Image
          src="/assets/nimus-logo-white.png"
          alt={t.nav.brandAlt}
          width={48}
          height={48}
          className="brand-logo brand-logo--mark"
          priority
        />
      </Link>

      <div className="topnav__center">
        <div className="topnav__nav-tools">
          <NavMenu dark={dark} hiddenAtCta={menuHiddenAtCta} />
          <LocaleToggleChip className="nav-locale-chip" />
        </div>
      </div>

      <div className="topnav__actions">
        <Link href="#cta" className="nav-icon-btn" aria-label={t.nav.contactAria}>
          <UserIcon width={20} height={20} aria-hidden="true" />
        </Link>
        <Link href="#cta" className="nav-cta">
          {t.nav.cta}
        </Link>
      </div>
    </nav>
  );
}
