"use client";

import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { useTranslations } from "@/components/providers/DictionaryProvider";
import { siteConfig } from "@/lib/site";

export function Footer() {
  const t = useTranslations();

  return (
    <footer>
      <div className="footer-inner">
        <Reveal variant="stagger" className="footer-top">
          <div className="footer-brand-block">
            <Image
              src="/assets/nimus-logo-white.png"
              alt={t.nav.brandAlt}
              width={48}
              height={48}
              className="fb-logo"
            />
            <p>{t.footer.tagline}</p>
          </div>
          <div className="fcol">
            <h4>{t.footer.products}</h4>
            <ul>
              <li><Link href="#tapbar">{t.footer.links.tapBar}</Link></li>
              <li><Link href="#productos">{t.footer.links.smartLink}</Link></li>
              <li><Link href="#productos">{t.footer.links.smartToys}</Link></li>
              <li><Link href="#productos">{t.footer.links.exhibitor}</Link></li>
              <li><Link href="#productos">{t.footer.links.customLine}</Link></li>
            </ul>
          </div>
          <div className="fcol">
            <h4>{t.footer.business}</h4>
            <ul>
              <li><Link href="#paquetes">{t.footer.links.packs}</Link></li>
              <li><Link href="#proceso">{t.footer.links.process}</Link></li>
              <li><Link href="#preguntas">{t.footer.links.faq}</Link></li>
              <li><Link href="#cta">{t.footer.links.quote}</Link></li>
            </ul>
          </div>
          <div className="fcol">
            <h4>{t.footer.contact}</h4>
            <ul>
              <li><Link href="#cta">{t.footer.links.whatsapp}</Link></li>
              <li>
                <Link href={`mailto:${siteConfig.email}`}>{siteConfig.email}</Link>
              </li>
              <li><Link href="#cta">{siteConfig.instagram}</Link></li>
            </ul>
          </div>
        </Reveal>
        <div className="footer-bot">
          <span>{t.footer.copyright}</span>
          <span>{t.footer.version}</span>
        </div>
      </div>
    </footer>
  );
}
