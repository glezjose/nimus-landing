"use client";

import Image from "next/image";
import Link from "next/link";
import { User } from "@phosphor-icons/react";
import { NavMenu } from "./NavMenu";

type TopNavProps = {
  scrolled?: boolean;
  dark?: boolean;
};

export function TopNav({ scrolled = false, dark = false }: TopNavProps) {
  return (
    <nav
      className={`topnav${dark ? " topnav--dark" : ""}${scrolled ? " is-scrolled" : ""}`}
    >
      <Link href="#top" aria-label="NIMUS" className="topnav__brand">
        <Image
          src="/assets/nimus-logo-white.png"
          alt="NIMUS"
          width={40}
          height={40}
          className="brand-logo brand-logo--mark"
          priority
        />
      </Link>

      <div className="topnav__center">
        <NavMenu dark={dark} />
      </div>

      <div className="topnav__actions">
        <Link href="#cta" className="nav-cta">
          Cotizar
        </Link>
        <Link href="#cta" className="nav-icon-btn" aria-label="Contacto">
          <User size={20} weight="bold" aria-hidden="true" />
        </Link>
      </div>
    </nav>
  );
}
