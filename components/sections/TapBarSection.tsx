"use client";

import { FeaturePreviewCard } from "@/components/sections/FeaturePreviewCard";
import { FeatureTitleEmphasis } from "@/components/ui/FeatureTitleEmphasis";
import { useTranslations } from "@/components/providers/DictionaryProvider";
import { DEFAULT_TAPBAR_OPTION_ID } from "@/lib/data/tapbar-options";

export function TapBarSection() {
  const t = useTranslations();
  const { tapbar } = t.sections;

  return (
    <section className="feature" id="tapbar">
      <div className="feature-inner">
        <div className="feature-copy">
          <h2 className="feature-title">
            <span className="feature-title__prefix">{tapbar.titleLine1}</span>
            <span className="feature-title__subject">{tapbar.titleLine2}</span>
            <FeatureTitleEmphasis>{tapbar.titleEmphasis}</FeatureTitleEmphasis>
          </h2>
          <p className="feature-sub">{tapbar.sub}</p>
        </div>

        <div className="feature-visual">
          <FeaturePreviewCard
            options={tapbar.options}
            defaultOptionId={DEFAULT_TAPBAR_OPTION_ID}
            currency={tapbar.currency}
            view3dAria={tapbar.view3dAria}
            tilesMarqueeAria={tapbar.tilesMarqueeAria}
            priorityPreview
          />
        </div>
      </div>
    </section>
  );
}
