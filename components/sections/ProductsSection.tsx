"use client";

import Link from "next/link";
import { FeaturePreviewCard } from "@/components/sections/FeaturePreviewCard";
import { SectionScrollCue } from "@/components/sections/SectionScrollCue";
import { Reveal } from "@/components/ui/Reveal";
import { FeatureTitleEmphasis } from "@/components/ui/FeatureTitleEmphasis";
import { ProductPhotoCarousel } from "@/components/ui/ProductPhotoCarousel";
import { useTranslations } from "@/components/providers/DictionaryProvider";
import { getProductCatalogImages } from "@/lib/data/product-images";
import {
  DEFAULT_TAPBASE_OPTION_ID,
  DEFAULT_TAPBOARD_OPTION_ID,
  tapbaseOptionFitSize,
  tapbaseOptionModels,
  tapbaseOptionPreviewImages,
  tapboardOptionFitSize,
  tapboardOptionModels,
  tapboardOptionPreviewImages,
} from "@/lib/data/tapbar-options";
import { PROCESO_SECTION_ID } from "@/lib/data/hero";

export function ProductsSection() {
  const t = useTranslations();
  const { products, tapbar } = t.sections;
  const { tapboard, tapbase } = products;

  return (
    <>
      <section className="section product-feature-section" id="productos">
        <Reveal className="section-head section-head--productos">
          <div className="productos-tapboard">
            <div className="productos-tapboard__visual">
              <FeaturePreviewCard
                options={tapboard.options}
                defaultOptionId={DEFAULT_TAPBOARD_OPTION_ID}
                currency={tapbar.currency}
                priceNote={tapbar.priceNote}
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
                <FeatureTitleEmphasis>{tapboard.titleEmphasis}</FeatureTitleEmphasis>
              </h2>
              <p className="feature-sub">{tapboard.sub}</p>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="section product-feature-section" id="tapbase">
        <Reveal className="section-head section-head--productos">
          <div className="productos-tapbase">
            <div className="feature-copy">
              <h2 className="feature-title">
                <span className="feature-title__prefix">{tapbase.titleLine1}</span>
                <span className="feature-title__subject">{tapbase.titleLine2}</span>
                <FeatureTitleEmphasis>{tapbase.titleEmphasis}</FeatureTitleEmphasis>
              </h2>
              <p className="feature-sub">{tapbase.sub}</p>
            </div>

            <div className="productos-tapbase__visual">
              <FeaturePreviewCard
                options={tapbase.options}
                defaultOptionId={DEFAULT_TAPBASE_OPTION_ID}
                currency={tapbar.currency}
                priceNote={tapbar.priceNote}
                view3dAria={tapbar.view3dAria}
                models={tapbaseOptionModels}
                previewImages={tapbaseOptionPreviewImages}
                fitSizes={tapbaseOptionFitSize}
                className="feature-preview-card--compact"
              />
            </div>
          </div>
        </Reveal>
      </section>

      <section className="section product-catalog-section section--has-scroll-cue" id="product-catalog">
        <Reveal className="product-catalog-intro">
          <h2 className="product-catalog-title">
            {products.titleBefore}
            <em>{products.titleEmphasis}</em>
            {products.titleAfter}
          </h2>
        </Reveal>

        <Reveal variant="stagger" className="lineup">
          {products.items.map((product) => (
            <Link
              key={product.id}
              className={`lcard lcard--catalog span-${product.span}`}
              href="#cta"
            >
              <div className="lcard-photo">
                <ProductPhotoCarousel
                  images={getProductCatalogImages(product.id)}
                  label={product.placeholder}
                />
              </div>
              <div className="lcard-body">
                <h3 className="l-name">{product.name}</h3>
                <p className="l-tag">{product.description}</p>
                <div className="l-pricing">
                  <p className="l-price-line">
                    <span className="l-price-value">
                      {product.priceLabel} {product.price}
                    </span>
                    <small>{products.currency}</small>
                  </p>
                  <p className="l-price-note">{products.priceNote}</p>
                </div>
              </div>
            </Link>
          ))}
        </Reveal>

        <div className="section-scroll-slot">
          <SectionScrollCue
            targetId={PROCESO_SECTION_ID}
            ariaLabel={products.scrollAria}
          />
        </div>
      </section>
    </>
  );
}
