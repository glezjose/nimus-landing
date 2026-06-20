"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { tapBarFeatures } from "@/lib/data/content";
import { tapBarVariants } from "@/lib/data/variants";

export function TapBarSection() {
  const [current, setCurrent] = useState(2);

  useEffect(() => {
    const auto = setInterval(() => {
      setCurrent((i) => (i + 1) % tapBarVariants.length);
    }, 3800);
    return () => clearInterval(auto);
  }, []);

  const selectVariant = (i: number) => setCurrent(i);
  const variant = tapBarVariants[current];

  return (
    <section className="feature" id="tapbar">
      <div className="feature-inner">
        <div>
          <Reveal className="feature-tag">Producto destacado · Línea 01</Reveal>
          <h2>
            Tap Bar:
            <br />
            tu mesa,
            <br />
            <em>conectada.</em>
          </h2>
          <p className="feature-sub">
            Stand de mesa con 2 a 4 chips NFC integrados. El cliente acerca el teléfono
            y el chip lo lleva directo a donde tú quieras — menú digital, Google Reviews,
            Instagram o WhatsApp. Sin apps, sin instalaciones.
          </p>
          <Reveal variant="stagger" className="feature-list">
            {tapBarFeatures.map((item) => (
              <div key={item.num} className="feature-list-item">
                <span className="num">{item.num}</span>
                <span dangerouslySetInnerHTML={{ __html: item.text }} />
              </div>
            ))}
          </Reveal>
          <Link className="feature-cta" href="#paquetes">
            Ver variantes y precios <span className="arr">→</span>
          </Link>
        </div>

        <div className="feature-visual">
          <div className="tap-variants" id="tap-variants">
            <div className="stage-bg" />
            <div className="variant-label">
              <div className="v-name" id="variant-name">
                {variant.name}
              </div>
              <div className="v-sub" id="variant-sub">
                {variant.sub}
              </div>
            </div>
            <div className="variant-price" id="variant-price">
              <span id="variant-price-amount">{variant.price}</span>
              <small>MXN</small>
            </div>

            {tapBarVariants.map((v) => (
              <Image
                key={v.id}
                className={`variant-img${current === v.id ? " active" : ""}`}
                data-i={v.id}
                src={v.image}
                alt={v.alt}
                width={400}
                height={400}
                sizes="(max-width: 1000px) 80vw, 400px"
              />
            ))}

            <div className="variant-pills">
              {tapBarVariants.map((v) => (
                <button
                  key={v.slug}
                  className="variant-pill"
                  type="button"
                  data-i={v.id}
                  data-active={current === v.id ? "true" : undefined}
                  onClick={() => selectVariant(v.id)}
                >
                  {v.slug === "bar-2" && "Bar 2"}
                  {v.slug === "qr" && "QR"}
                  {v.slug === "bar-3" && "Bar 3"}
                  {v.slug === "bar-4" && "Bar 4"}
                  {v.slug === "max" && "Max"}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
