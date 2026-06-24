"use client";

import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useTranslations } from "@/components/providers/DictionaryProvider";
import { HERO_NEXT_SECTION_ID } from "@/lib/data/hero";

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export function HeroScrollCue() {
  const t = useTranslations();

  const scrollToNextSection = () => {
    const target = document.getElementById(HERO_NEXT_SECTION_ID);
    if (!target) return;

    target.scrollIntoView({
      behavior: prefersReducedMotion() ? "auto" : "smooth",
      block: "start",
    });
  };

  return (
    <button
      type="button"
      className="hero-scroll-cue"
      onClick={scrollToNextSection}
      aria-label={t.hero.scrollAria}
    >
      <ChevronDownIcon className="hero-scroll-cue__icon" aria-hidden="true" />
    </button>
  );
}
