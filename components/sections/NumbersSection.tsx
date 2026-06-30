"use client";

import { Reveal } from "@/components/ui/Reveal";
import { useTranslations } from "@/components/providers/DictionaryProvider";

export function NumbersSection() {
  const t = useTranslations();
  const { numbers } = t.sections;

  return (
    <section className="section" id="numeros" style={{ paddingTop: 0 }}>
      <Reveal className="section-head">
        <div>
          <h2>
            {numbers.titleBefore}
            <em>{numbers.titleEmphasis}</em>
            {numbers.titleAfter}
          </h2>
        </div>
        <div className="lede">{numbers.lede}</div>
      </Reveal>

      <Reveal variant="stagger" className="numbers">
        {numbers.items.map((cell) => (
          <div key={cell.label} className="ncell">
            <div className="nc-label">{cell.label}</div>
            <div className="nc-val">
              {cell.value}
              {cell.valueEmphasis ? <em>{cell.valueEmphasis}</em> : null}
            </div>
            <div className="nc-note">{cell.note}</div>
          </div>
        ))}
      </Reveal>
    </section>
  );
}
