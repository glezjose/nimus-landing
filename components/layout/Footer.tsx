"use client";

import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { siteConfig } from "@/lib/site";

export function Footer() {
  return (
    <footer>
      <div className="footer-inner">
        <Reveal variant="stagger" className="footer-top">
          <div className="footer-brand-block">
            <Image
              src="/assets/nimus-logo-white.png"
              alt="NIMUS"
              width={48}
              height={48}
              className="fb-logo"
            />
            <p>
              Piezas 3D con chips NFC que conectan tu marca con tus clientes en un
              toque.
            </p>
          </div>
          <div className="fcol">
            <h4>Productos</h4>
            <ul>
              <li><Link href="#tapbar">Tap Bar NFC</Link></li>
              <li><Link href="#productos">Smart Link</Link></li>
              <li><Link href="#productos">Smart Toys</Link></li>
              <li><Link href="#productos">Exhibidor Merch</Link></li>
              <li><Link href="#productos">Línea Personalizada</Link></li>
            </ul>
          </div>
          <div className="fcol">
            <h4>Negocio</h4>
            <ul>
              <li><Link href="#paquetes">Paquetes</Link></li>
              <li><Link href="#proceso">Proceso</Link></li>
              <li><Link href="#preguntas">FAQ</Link></li>
              <li><Link href="#cta">Cotizar</Link></li>
            </ul>
          </div>
          <div className="fcol">
            <h4>Contacto</h4>
            <ul>
              <li><Link href="#cta">WhatsApp</Link></li>
              <li>
                <Link href={`mailto:${siteConfig.email}`}>{siteConfig.email}</Link>
              </li>
              <li><Link href="#cta">{siteConfig.instagram}</Link></li>
            </ul>
          </div>
        </Reveal>
        <div className="footer-bot">
          <span>© 2026 NIMUS Make · Todos los derechos reservados</span>
          <span>v 2.0 · Landing pública</span>
        </div>
      </div>
    </footer>
  );
}
