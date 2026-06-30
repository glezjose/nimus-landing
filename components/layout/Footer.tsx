"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { SocialContacts } from "@/components/ui/SocialContacts";
import { useDictionary } from "@/components/providers/DictionaryProvider";

export function Footer() {
  const { locale, t } = useDictionary();

  const scrollToTop = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
    window.history.replaceState(null, "", "#top");
  }, []);

  return (
    <footer>
      <div className="footer-inner">
        <Reveal variant="stagger" className="footer-top">
          <div className="footer-brand-block">
            <Link
              href="#top"
              className="footer-brand-link"
              aria-label={t.nav.backToTopAria}
              onClick={scrollToTop}
            >
              <Image
                src="/assets/nimus-logo-complete-white.png"
                alt={t.nav.brandAlt}
                width={1080}
                height={1080}
                className="fb-logo"
              />
            </Link>
            <p>{t.footer.tagline}</p>
          </div>
          <div className="fcol">
            <h4>{t.footer.sections}</h4>
            <ul>
              {t.nav.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="fcol">
            <h4>{t.footer.contact}</h4>
            <SocialContacts
              whatsappLabel={t.footer.links.whatsapp}
              emailLabel={t.sections.cta.emailLabel}
              instagramLabel={t.sections.cta.instagramLabel}
            />
          </div>
        </Reveal>
        <div className="footer-bot">
          <span>{t.footer.copyright}</span>
          <nav className="footer-legal" aria-label={t.nav.legal}>
            <Link href={`/${locale}/terms`}>{t.footer.legal.terms}</Link>
            <Link href={`/${locale}/privacy`}>{t.footer.legal.privacy}</Link>
            <Link href={`/${locale}/cookies`}>{t.footer.legal.cookies}</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
