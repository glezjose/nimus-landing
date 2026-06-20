"use client";

import {
  ArrowTopRightOnSquareIcon,
  Bars3Icon,
  UserIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
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
            <XMarkIcon width={16} height={16} aria-hidden="true" />
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
              <ArrowTopRightOnSquareIcon
                width={14}
                height={14}
                aria-hidden="true"
              />
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
              <UserIcon width={20} height={20} aria-hidden="true" />
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
      <button
        type="button"
        className="nav-menu__trigger-shell"
        aria-expanded={open}
        aria-controls="site-nav-menu"
        onClick={() => setMenuOpen(!open)}
      >
        <span className="nav-menu__trigger-main">
          <Bars3Icon width={18} height={18} aria-hidden="true" />
          <span>{t.nav.menu}</span>
        </span>
        <span className="nav-menu__trigger-divider" aria-hidden="true" />
        <span
          className="nav-menu__trigger-scroll"
          aria-label={`Scroll progress ${scrollProgress} percent`}
        >
          {scrollProgress}%
        </span>
      </button>

      {mounted ? createPortal(panel, document.body) : null}
    </div>
  );
}
