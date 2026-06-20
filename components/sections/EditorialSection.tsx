"use client";

import { Reveal } from "@/components/ui/Reveal";
import { useTranslations } from "@/components/providers/DictionaryProvider";

export function EditorialSection() {
  const t = useTranslations();
  const { editorial } = t.sections;

  return (
    <section className="editorial">
      <div className="editorial-bg" />
      <div className="editorial-marks">
        <span className="editorial-mark tl">{editorial.markTl}</span>
        <span className="editorial-mark tr">{editorial.markTr}</span>
        <span className="editorial-mark bl">{editorial.markBl}</span>
        <span className="editorial-mark br">{editorial.markBr}</span>
      </div>
      <Reveal className="editorial-inner">
        <div>
          <h2>
            {editorial.titleBefore}
            <em>{editorial.titleEmphasis}</em>
          </h2>
        </div>
        <div className="editorial-side">
          <div className="label">{editorial.label}</div>
          <p>
            <strong>{editorial.body1Strong}</strong>
            {editorial.body1After}
          </p>
          <p>{editorial.body2}</p>
        </div>
      </Reveal>
    </section>
  );
}
