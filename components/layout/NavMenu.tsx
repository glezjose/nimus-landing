"use client";

import {
  ArrowTopRightOnSquareIcon,
  UserIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
  type CSSProperties,
  type RefObject,
} from "react";
import { createPortal } from "react-dom";
import Shuffle from "@/components/Shuffle";
import { NavMenuLottieIcon } from "@/components/layout/NavMenuLottieIcon";
import { useTranslations } from "@/components/providers/DictionaryProvider";
import { useScrollProgress } from "@/lib/hooks/useScrollProgress";
import { siteConfig } from "@/lib/site";

type NavMenuProps = {
  dark?: boolean;
  hiddenAtCta?: boolean;
  navToolsRef: RefObject<HTMLDivElement | null>;
};

const MENU_SHELL_PAD = 10;
const MENU_VIEWPORT_PAD = 10;
const MENU_MOBILE_BOTTOM_INSET = 56;
const MENU_MOBILE_MAX_HEIGHT = 560;

function getPanelGeometry(tools: DOMRect) {
  const mobile = window.innerWidth <= 860;
  const pad = MENU_SHELL_PAD;
  const viewportPad = MENU_VIEWPORT_PAD;
  const viewportHeight = window.visualViewport?.height ?? window.innerHeight;

  const shellWidth = tools.width + pad * 2;
  const openWidth = mobile
    ? Math.min(shellWidth, window.innerWidth - viewportPad * 2)
    : shellWidth;

  const originX = tools.left - pad;
  const originY = tools.top - pad;
  const originW = shellWidth;
  const originH = tools.height + pad * 2;

  const openY = tools.top - pad;
  const openHeight = mobile
    ? Math.min(
        MENU_MOBILE_MAX_HEIGHT,
        viewportHeight - openY - MENU_MOBILE_BOTTOM_INSET,
      )
    : Math.min(580, viewportHeight - 96);

  const openX = mobile
    ? Math.min(
        originX,
        window.innerWidth - viewportPad - openWidth,
      )
    : originX;

  return {
    "--menu-shell-pad": `${pad}px`,
    "--menu-tools-h": `${tools.height}px`,
    "--menu-origin-x": `${originX}px`,
    "--menu-origin-y": `${originY}px`,
    "--menu-origin-w": `${originW}px`,
    "--menu-origin-h": `${originH}px`,
    "--menu-open-x": `${openX}px`,
    "--menu-open-y": `${openY}px`,
    "--menu-open-w": `${openWidth}px`,
    "--menu-open-h": `${openHeight}px`,
  } as CSSProperties;
}

export function NavMenu({
  dark = false,
  hiddenAtCta = false,
  navToolsRef,
}: NavMenuProps) {
  const t = useTranslations();
  const scrollProgress = useScrollProgress();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [panelStyle, setPanelStyle] = useState<CSSProperties>({});

  const setMenuOpen = useCallback((next: boolean) => {
    setOpen(next);
  }, []);

  const syncPanelGeometry = useCallback(() => {
    const tools = navToolsRef.current;
    if (!tools) return;

    setPanelStyle(getPanelGeometry(tools.getBoundingClientRect()));
  }, [navToolsRef]);

  useLayoutEffect(() => {
    syncPanelGeometry();

    const tools = navToolsRef.current;
    const topnav = tools?.closest(".topnav");
    const openAttr = open ? "true" : "false";

    tools?.setAttribute("data-menu-open", openAttr);
    topnav?.setAttribute("data-menu-open", openAttr);
  }, [open, navToolsRef, syncPanelGeometry]);

  useLayoutEffect(() => {
    syncPanelGeometry();
  }, [syncPanelGeometry]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 860px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    syncPanelGeometry();
    window.addEventListener("resize", syncPanelGeometry);
    window.addEventListener("scroll", syncPanelGeometry, { passive: true });
    return () => {
      window.removeEventListener("resize", syncPanelGeometry);
      window.removeEventListener("scroll", syncPanelGeometry);
    };
  }, [syncPanelGeometry]);

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
    <div
      className={`nav-menu__panel${dark ? " nav-menu__panel--dark" : ""}`}
      id="site-nav-menu"
      data-open={open ? "true" : "false"}
      aria-hidden={!open}
      style={panelStyle}
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
        </div>

        {isMobile ? (
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
        ) : null}
      </div>
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
        aria-label={open ? t.nav.closeAria : undefined}
        onClick={() => setMenuOpen(!open)}
      >
        <span className="nav-menu__trigger-main">
          <span className="nav-menu__trigger-icon" aria-hidden="true">
            <NavMenuLottieIcon open={open} />
          </span>
          <span className="nav-menu__trigger-label">
            <span className="nav-menu__trigger-label-sizer" aria-hidden="true">
              {t.nav.close}
            </span>
            <Shuffle
              text={open ? t.nav.close : t.nav.menu}
              tag="span"
              className="nav-menu__trigger-label-text"
              triggerOnChange
              triggerOnce={false}
              triggerOnHover={false}
              respectReducedMotion
              shuffleDirection="right"
              duration={0.28}
              stagger={0.025}
              shuffleTimes={1}
              animationMode="evenodd"
              ease="power3.out"
              textAlign="left"
            />
          </span>
        </span>
        <span className="nav-menu__trigger-divider" aria-hidden="true" />
        <span
          className="nav-menu__trigger-scroll"
          aria-label={`Scroll progress ${scrollProgress} percent`}
        >
          <span className="nav-menu__trigger-scroll-digits">{scrollProgress}</span>
          <span className="nav-menu__trigger-scroll-suffix" aria-hidden="true">
            %
          </span>
        </span>
      </button>

      {mounted ? createPortal(panel, document.body) : null}
    </div>
  );
}
