"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { InvertTabs } from "@/components/ruixen/invert-tabs";
import { TapBarStage } from "@/components/sections/TapBarStage";
import { TapBarTilesMarquee } from "@/components/sections/TapBarTilesMarquee";
import {
  tapBarOptionFitSize,
  tapBarOptionModels,
  tapBarOptionPreviewImages,
  type TapBarOptionId,
} from "@/lib/data/tapbar-options";

export type FeaturePreviewOption = {
  id: TapBarOptionId;
  label: string;
  title: string;
  description: string;
  price: string;
};

type FeaturePreviewCardProps = {
  options: ReadonlyArray<FeaturePreviewOption>;
  defaultOptionId: TapBarOptionId;
  currency: string;
  view3dAria: string;
  tilesMarqueeAria?: string;
  className?: string;
  models?: Partial<Record<TapBarOptionId, string>>;
  previewImages?: Partial<Record<TapBarOptionId, string>>;
  fitSizes?: Partial<Record<TapBarOptionId, number>>;
  priorityPreview?: boolean;
};

export function FeaturePreviewCard({
  options,
  defaultOptionId,
  currency,
  view3dAria,
  tilesMarqueeAria,
  className,
  models = tapBarOptionModels,
  previewImages = tapBarOptionPreviewImages,
  fitSizes = tapBarOptionFitSize,
  priorityPreview = false,
}: FeaturePreviewCardProps) {
  const [activeId, setActiveId] = useState<TapBarOptionId>(defaultOptionId);

  const tabItems = useMemo(
    () =>
      options.map((option) => ({
        value: option.id,
        label: option.label,
      })),
    [options],
  );

  const activeOption =
    options.find((option) => option.id === activeId) ?? options[0];

  const modelPath = models[activeId] ?? tapBarOptionModels[activeId];
  const previewImage =
    previewImages[activeId] ?? tapBarOptionPreviewImages[activeId];
  const fitSize = fitSizes[activeId] ?? tapBarOptionFitSize[activeId];

  return (
    <div className={className ? `feature-preview-card ${className}` : "feature-preview-card"}>
      <div className="feature-preview-card__toolbar">
        <InvertTabs
          items={tabItems}
          defaultValue={activeId}
          onChange={(value) => setActiveId(value as TapBarOptionId)}
          sound={false}
          className="tapbar-tabs--card"
          fill
          dividers
        />
      </div>

      <div className="feature-preview-card__copy" aria-live="polite">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={activeId}
            className="feature-preview-card__copy-inner"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -3 }}
            transition={{ duration: 0.18, ease: [0.2, 0, 0, 1] }}
          >
            <motion.div
              className="feature-preview-card__heading"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.22, ease: [0.2, 0, 0, 1] }}
            >
              <h3 className="feature-preview-card__title">{activeOption.title}</h3>
              <p className="feature-preview-card__price">
                <span className="feature-preview-card__price-value">
                  {activeOption.price}
                </span>
                <small>{currency}</small>
              </p>
            </motion.div>
            <motion.p
              className="feature-preview-card__body"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.22,
                delay: 0.09,
                ease: [0.2, 0, 0, 1],
              }}
            >
              {activeOption.description}
            </motion.p>
          </motion.div>
        </AnimatePresence>
      </div>

      {tilesMarqueeAria ? (
        <TapBarTilesMarquee ariaLabel={tilesMarqueeAria} />
      ) : null}

      <div className="feature-preview-card__stage">
        <TapBarStage
          activeId={activeId}
          modelPath={modelPath}
          previewImage={previewImage}
          fitSize={fitSize}
          view3dAria={view3dAria}
          priorityPreview={priorityPreview}
        />
      </div>
    </div>
  );
}
