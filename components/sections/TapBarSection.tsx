"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { DualToneRainBackground } from "@/components/ruixen/dual-tone-rain-background";
import { InvertTabs } from "@/components/ruixen/invert-tabs";
import { TapBarModelCanvas } from "@/components/sections/TapBarModelCanvas";
import { useTranslations } from "@/components/providers/DictionaryProvider";
import {
  DEFAULT_TAPBAR_OPTION_ID,
  tapBarOptionFitSize,
  tapBarOptionModels,
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
      <div className="feature__bg">
        <DualToneRainBackground />
      </div>
      <div className="feature__edge-fade" aria-hidden="true" />
      <div className="feature-inner">
        <div className="feature-copy">
          <h2>
            {tapbar.titleLine1}
            <br />
            {tapbar.titleLine2}
            <br />
            <em>{tapbar.titleEmphasis}</em>
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
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.22, ease: [0.2, 0, 0, 1] }}
                >
                  <div className="feature-preview-card__heading">
                    <h3 className="feature-preview-card__title">
                      {activeOption.title}
                    </h3>
                    <p className="feature-preview-card__price">
                      <span className="feature-preview-card__price-value">
                        {activeOption.price}
                      </span>
                      <small>{tapbar.currency}</small>
                    </p>
                  </div>
                  <p className="feature-preview-card__body">
                    {activeOption.description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="feature-preview-card__stage">
              <TapBarModelCanvas
                modelPath={tapBarOptionModels[activeId]}
                fitSize={tapBarOptionFitSize[activeId]}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
