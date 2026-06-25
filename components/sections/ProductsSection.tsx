"use client";

import Link from "next/link";
import { FeaturePreviewCard } from "@/components/sections/FeaturePreviewCard";
import { Reveal } from "@/components/ui/Reveal";
import { PhotoPlaceholder } from "@/components/ui/Icons";
import { useTranslations } from "@/components/providers/DictionaryProvider";
import {
  DEFAULT_TAPBOARD_OPTION_ID,
  tapboardOptionFitSize,
  tapboardOptionModels,
  tapboardOptionPreviewImages,
} from "@/lib/data/tapbar-options";

export function ProductsSection() {
  const t = useTranslations();
  const { products, tapbar } = t.sections;
  const { tapboard } = products;

  return (
    <section className="section" id="productos">
      <Reveal className="section-head section-head--productos">
        <div className="productos-tapboard">
          <div className="productos-tapboard__visual">
            <FeaturePreviewCard
              options={tapboard.options}
              defaultOptionId={DEFAULT_TAPBOARD_OPTION_ID}
              currency={tapbar.currency}
              view3dAria={tapbar.view3dAria}
              models={tapboardOptionModels}
              previewImages={tapboardOptionPreviewImages}
              fitSizes={tapboardOptionFitSize}
              priorityPreview
              className="feature-preview-card--compact"
            />
          </div>

          <div className="feature-copy">
            <h2 className="feature-title">
              <span className="feature-title__prefix">{tapboard.titleLine1}</span>
              <span className="feature-title__subject">{tapboard.titleLine2}</span>
              <em className="feature-title__emphasis">{tapboard.titleEmphasis}</em>
            </h2>
            <p className="feature-sub">{tapboard.sub}</p>
          </div>
        </div>
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
