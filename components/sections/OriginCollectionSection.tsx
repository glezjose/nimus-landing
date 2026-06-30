"use client";

import { Reveal } from "@/components/ui/Reveal";
import { HoverArrowIcon } from "@/components/ui/HoverArrowIcon";
import { SectionScrollCue } from "@/components/sections/SectionScrollCue";
import { useTranslations } from "@/components/providers/DictionaryProvider";
import { SISTEMAS_SECTION_ID } from "@/lib/data/hero";

export function OriginCollectionSection() {
  const t = useTranslations();
  const { originCollection } = t.sections;

  return (
    <section
      className="origin-collection section--has-scroll-cue"
      id="origen"
      aria-labelledby="origin-collection-title"
    >
      <div className="origin-collection__overlay" />
      <Reveal variant="stagger" className="origin-collection__content">
        <h2 id="origin-collection-title">
          {originCollection.titleBefore}
          <em>{originCollection.titleEmphasis}</em>
          {originCollection.titleAfter}
        </h2>
        <p>{originCollection.lede}</p>
        <a
          className="nav-cta"
          href="https://nimus.mx/shop"
          target="_blank"
          rel="noopener noreferrer"
        >
          {originCollection.cta}
          <HoverArrowIcon size={16} />
        </a>
      </Reveal>

      <div className="section-scroll-slot">
        <SectionScrollCue
          targetId={SISTEMAS_SECTION_ID}
          ariaLabel={originCollection.scrollAria}
        />
      </div>
    </section>
  );
}
