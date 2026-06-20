"use client";

import { Reveal } from "@/components/ui/Reveal";
import { useTranslations } from "@/components/providers/DictionaryProvider";

export function ProcessSection() {
  const t = useTranslations();
  const { process } = t.sections;

  return (
    <section className="section dark">
      <div className="section section-narrow" style={{ padding: "0 0" }}>
        <Reveal className="section-head">
          <div>
            <div className="sk">{process.sk}</div>
            <h2 style={{ color: "var(--bg)" }}>
              {process.titleBefore}
              <em>{process.titleEmphasis}</em>
              {process.titleAfter}
            </h2>
          </div>
          <div className="lede">{process.lede}</div>
        </Reveal>

        <Reveal variant="stagger" className="process" id="proceso">
          {process.steps.map((step) => (
            <div key={step.num} className="pstep">
              <div className="ps-num">{step.num}</div>
              <h3 className="ps-title">
                {step.title}
                <em>{step.titleEmphasis}</em>
              </h3>
              <p className="ps-body">{step.body}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
