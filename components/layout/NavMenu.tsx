"use client";

import Link from "next/link";
import { ArrowSquareOut, List, User, X } from "@phosphor-icons/react";
import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { navLinks } from "@/lib/data/nav";
import { siteConfig } from "@/lib/site";

type NavMenuProps = {
  dark?: boolean;
};

export function NavMenu({ dark = false }: NavMenuProps) {
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

  const panel = (
    <>
      <button
        type="button"
        className="nav-menu__backdrop"
        aria-label="Cerrar menú"
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
            aria-label="Cerrar menú"
          >
            <X size={16} weight="bold" aria-hidden="true" />
            <span>Cerrar</span>
          </button>
        </div>

        <div className="nav-menu__body">
          <p className="nav-menu__label">Menu</p>
          <nav className="nav-menu__links" aria-label="Secciones">
            {navLinks.map((link) => (
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
            <p className="nav-menu__label">Legal</p>
            <Link href="#preguntas" onClick={() => setMenuOpen(false)}>
              FAQ
            </Link>
          </div>

          <div className="nav-menu__group">
            <p className="nav-menu__label">Redes</p>
            <a
              href={siteConfig.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="nav-menu__social"
            >
              Instagram
              <ArrowSquareOut size={14} weight="bold" aria-hidden="true" />
            </a>
          </div>

          <div className="nav-menu__bottom">
            <Link
              href="#cta"
              className="nav-menu__cta"
              onClick={() => setMenuOpen(false)}
            >
              Cotizar
            </Link>
            <Link
              href="#cta"
              className="nav-menu__user"
              aria-label="Contacto"
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
    >
      <button
        type="button"
        className="nav-menu__trigger"
        aria-expanded={open}
        aria-controls="site-nav-menu"
        onClick={() => setMenuOpen(!open)}
      >
        <List size={18} weight="bold" aria-hidden="true" />
        <span>Menu</span>
      </button>

      {mounted ? createPortal(panel, document.body) : null}
    </div>
  );
}
