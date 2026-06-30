"use client";

import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { useTranslations } from "@/components/providers/DictionaryProvider";

export function PacksSection() {
  const t = useTranslations();
  const { packs } = t.sections;

  return (
    <section className="section" id="paquetes">
      <Reveal className="section-head">
        <div>
          <h2>
            {packs.titleBefore}
            <em>{packs.titleEmphasis}</em>
            <br />
            {packs.titleLine2}
          </h2>
        </div>
        <div className="lede">{packs.lede}</div>
      </Reveal>

      <Reveal variant="stagger" className="packs">
        {packs.items.map((pack) => (
          <div
            key={pack.id}
            className="pack"
            data-featured={pack.featured ? "true" : undefined}
            style={{ "--pack-color": pack.color } as React.CSSProperties}
          >
            <div className="pack-name">{pack.name}</div>
            <div className="pack-price">
              {pack.price} <small>{packs.currency}</small>
            </div>
            <p className="pack-desc">{pack.description}</p>
            <div className="pack-items">
              {pack.items.map((item) => (
                <div key={item} className="pack-item">
                  {item}
                </div>
              ))}
            </div>
            <Link className="btn btn-ghost" href="#cta">
              {pack.featured ? packs.ctaFeatured : packs.ctaDefault}
            </Link>
          </div>
        ))}
      </Reveal>
    </section>
  );
}
