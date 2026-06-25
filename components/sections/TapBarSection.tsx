"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { InvertTabs } from "@/components/ruixen/invert-tabs";
import { TapBarStage } from "@/components/sections/TapBarStage";
import { TapBarTilesMarquee } from "@/components/sections/TapBarTilesMarquee";
import { useTranslations } from "@/components/providers/DictionaryProvider";
import {
  DEFAULT_TAPBAR_OPTION_ID,
  tapBarOptionFitSize,
  tapBarOptionModels,
  tapBarOptionPreviewImages,
  type TapBarOptionId,
} from "@/lib/data/tapbar-options";

export function TapBarSection() {
  const t = useTranslations();
  const { tapbar } = t.sections;
  const [activeId, setActiveId] = useState<TapBarOptionId>(DEFAULT_TAPBAR_OPTION_ID);

  const tabItems = useMemo(
    () =>
      tapbar.options.map((option) => ({
        value: option.id,
        label: option.label,
      })),
    [tapbar.options],
  );

  const activeOption =
    tapbar.options.find((option) => option.id === activeId) ?? tapbar.options[0];

  return (
    <section className="feature" id="tapbar">
      <div className="feature-inner">
        <div className="feature-copy">
          <h2 className="feature-title">
            <span className="feature-title__prefix">{tapbar.titleLine1}</span>
            <span className="feature-title__subject">{tapbar.titleLine2}</span>
            <em className="feature-title__emphasis">{tapbar.titleEmphasis}</em>
          </h2>
          <p className="feature-sub">{tapbar.sub}</p>
        </div>

        <div className="feature-visual">
          <div className="feature-preview-card">
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
                    <h3 className="feature-preview-card__title">
                      {activeOption.title}
                    </h3>
                    <p className="feature-preview-card__price">
                      <span className="feature-preview-card__price-value">
                        {activeOption.price}
                      </span>
                      <small>{tapbar.currency}</small>
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

            <TapBarTilesMarquee ariaLabel={tapbar.tilesMarqueeAria} />

            <div className="feature-preview-card__stage">
              <TapBarStage
                activeId={activeId}
                modelPath={tapBarOptionModels[activeId]}
                previewImage={tapBarOptionPreviewImages[activeId]}
                fitSize={tapBarOptionFitSize[activeId]}
                view3dAria={tapbar.view3dAria}
                priorityPreview
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
