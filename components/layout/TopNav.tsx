"use client";

import Image from "next/image";
import Link from "next/link";
import { User } from "@phosphor-icons/react";
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
        <NavMenu dark={dark} hiddenAtCta={menuHiddenAtCta} />
      </div>

      <div className="topnav__actions">
        <Link href="#cta" className="nav-cta">
          {t.nav.cta}
        </Link>
        <Link href="#cta" className="nav-icon-btn" aria-label={t.nav.contactAria}>
          <User size={20} weight="bold" aria-hidden="true" />
        </Link>
      </div>
    </nav>
  );
}
