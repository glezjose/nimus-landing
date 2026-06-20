"use client";

import Link from "next/link";
import { ArrowSquareOut, List, User, X } from "@phosphor-icons/react";
import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { LocaleToggleChip } from "@/components/layout/LocaleToggleChip";
import { useTranslations } from "@/components/providers/DictionaryProvider";
import { useScrollProgress } from "@/lib/hooks/useScrollProgress";
import { siteConfig } from "@/lib/site";

type NavMenuProps = {
  dark?: boolean;
  hiddenAtCta?: boolean;
};

export function NavMenu({ dark = false, hiddenAtCta = false }: NavMenuProps) {
  const t = useTranslations();
  const scrollProgress = useScrollProgress();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const setMenuOpen = useCallback((next: boolean) => {
    setOpen(next);
    document.body.style.overflow = next ? "hidden" : "";
  }, []);

  useEffect(() => {
    setMounted(true);
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [setMenuOpen]);

  useEffect(() => {
    if (hiddenAtCta) setMenuOpen(false);
  }, [hiddenAtCta, setMenuOpen]);

  const panel = (
    <>
      <button
        type="button"
        className="nav-menu__backdrop"
        aria-label={t.nav.closeAria}
        data-open={open ? "true" : "false"}
        onClick={() => setMenuOpen(false)}
      />

      <div
        className={`nav-menu__panel${dark ? " nav-menu__panel--dark" : ""}`}
        id="site-nav-menu"
        data-open={open ? "true" : "false"}
        aria-hidden={!open}
      >
        <div className="nav-menu__toolbar">
          <button
            type="button"
            className="nav-menu__close"
            onClick={() => setMenuOpen(false)}
            aria-label={t.nav.closeAria}
          >
            <X size={16} weight="bold" aria-hidden="true" />
            <span>{t.nav.close}</span>
          </button>
        </div>

        <div className="nav-menu__body">
          <p className="nav-menu__label">{t.nav.menu}</p>
          <nav className="nav-menu__links" aria-label={t.nav.sectionsAria}>
            {t.nav.links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="nav-menu__divider" />

          <div className="nav-menu__group">
            <p className="nav-menu__label">{t.nav.legal}</p>
            <Link href="#preguntas" onClick={() => setMenuOpen(false)}>
              {t.nav.faq}
            </Link>
          </div>

          <div className="nav-menu__group">
            <p className="nav-menu__label">{t.nav.social}</p>
            <a
              href={siteConfig.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="nav-menu__social"
            >
              {t.nav.instagram}
              <ArrowSquareOut size={14} weight="bold" aria-hidden="true" />
            </a>
          </div>

          <div className="nav-menu__bottom">
            <Link
              href="#cta"
              className="nav-menu__cta"
              onClick={() => setMenuOpen(false)}
            >
              {t.nav.cta}
            </Link>
            <Link
              href="#cta"
              className="nav-menu__user"
              aria-label={t.nav.contactAria}
              onClick={() => setMenuOpen(false)}
            >
              <User size={20} weight="bold" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <div
      className={`nav-menu${dark ? " nav-menu--dark" : ""}`}
      data-open={open ? "true" : "false"}
      data-at-cta={hiddenAtCta ? "true" : "false"}
      aria-hidden={hiddenAtCta ? "true" : undefined}
    >
      <div className="nav-menu__trigger-shell">
        <button
          type="button"
          className="nav-menu__trigger"
          aria-expanded={open}
          aria-controls="site-nav-menu"
          onClick={() => setMenuOpen(!open)}
        >
          <List size={18} weight="bold" aria-hidden="true" />
          <span>{t.nav.menu}</span>
        </button>

        <div className="nav-menu__trigger-tools">
          <LocaleToggleChip
            className="nav-menu__trigger-chip nav-menu__trigger-chip--locale"
            onNavigate={() => setMenuOpen(false)}
          />
          <span
            className="nav-menu__trigger-chip nav-menu__trigger-chip--scroll"
            aria-label={`Scroll progress ${scrollProgress} percent`}
          >
            {scrollProgress}%
          </span>
        </div>
      </div>

      {mounted ? createPortal(panel, document.body) : null}
    </div>
  );
}
