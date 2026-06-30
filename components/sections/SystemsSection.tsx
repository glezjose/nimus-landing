"use client";

import { Reveal } from "@/components/ui/Reveal";
import { SystemIcon } from "@/components/ui/Icons";
import { useTranslations } from "@/components/providers/DictionaryProvider";

export function SystemsSection() {
  const t = useTranslations();
  const { systems } = t.sections;

  return (
    <section className="systems-section" id="sistemas">
      <div className="systems-inner">
        <Reveal className="section-head systems-section__head">
          <div>
            <h2 className="text-balance">
              {systems.titleBefore}
              <em>{systems.titleEmphasis}</em>
              {systems.titleAfter}
            </h2>
          </div>
          <div className="lede text-pretty">{systems.lede}</div>
        </Reveal>

        <Reveal variant="stagger" className="systems-grid">
          {systems.items.map((sys) => (
            <div
              key={sys.id}
              className={`sys-card${sys.soon ? " sys-card--soon" : ""}`}
            >
              <div className="sys-icon">
                <SystemIcon type={sys.icon} />
              </div>
              <h3 className="sys-name text-balance">
                {sys.name}
                <em>{sys.nameEmphasis}</em>
              </h3>
              <p className="sys-desc">{sys.description}</p>
              <span className={`sys-tag${sys.soon ? " soon" : ""}`}>{sys.tag}</span>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}