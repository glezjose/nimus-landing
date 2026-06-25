"use client";

import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useTranslations } from "@/components/providers/DictionaryProvider";
import {
  HERO_NEXT_SECTION_ID,
  TRABAJOS_INTRO_ID,
} from "@/lib/data/hero";

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export function HeroScrollCue() {
  const t = useTranslations();

  const scrollToNextSection = () => {
    const target =
      document.getElementById(TRABAJOS_INTRO_ID) ??
      document.getElementById(HERO_NEXT_SECTION_ID);
    if (!target) return;

    const scrollMargin =
      parseFloat(getComputedStyle(target).scrollMarginTop) || 0;
    const top =
      target.getBoundingClientRect().top + window.scrollY - scrollMargin;

    window.scrollTo({
      top,
      behavior: prefersReducedMotion() ? "auto" : "smooth",
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
