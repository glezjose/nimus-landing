"use client";

import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { PhotoPlaceholder } from "@/components/ui/Icons";
import { useTranslations } from "@/components/providers/DictionaryProvider";

export function ProductsSection() {
  const t = useTranslations();
  const { products } = t.sections;

  return (
    <section className="section" id="productos">
      <Reveal className="section-head">
        <div>
          <div className="sk">{products.sk}</div>
          <h2>
            {products.titleBefore}
            <em>{products.titleEmphasis}</em>
            {products.titleAfter}
          </h2>
        </div>
        <div className="lede">{products.lede}</div>
      </Reveal>

      <Reveal variant="stagger" className="lineup">
        {products.items.map((product) => (
          <Link
            key={product.id}
            className={`lcard span-${product.span}${product.featured ? " featured" : ""}`}
            href="#cta"
            style={
              {
                "--card-accent": product.accent,
                "--photo-bg": product.photoBg,
              } as React.CSSProperties
            }
          >
            <div className="lcard-photo">
              <div className="photo-grid" />
              <span className="photo-tag">{product.line}</span>
              <PhotoPlaceholder label={product.placeholder} />
            </div>
            <div className="lcard-body">
              <div className="l-arrow">↗</div>
              <h3 className="l-name">
                {product.name}
                <em>{product.nameEmphasis}</em>
              </h3>
              <p className="l-tag">{product.description}</p>
              <div className="l-foot">
                <span className="l-from">{product.priceLabel}</span>
                <span className="l-price">
                  {product.price}{" "}
                  <small>{products.currency}</small>
                </span>
              </div>
            </div>
          </Link>
        ))}
      </Reveal>
    </section>
  );
}
