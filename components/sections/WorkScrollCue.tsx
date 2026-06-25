"use client";

import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useTranslations } from "@/components/providers/DictionaryProvider";
import {
  HERO_NEXT_SECTION_ID,
  MOBILE_LAYOUT_MQ,
  TAPBAR_SCROLL_PAST_CUE_PADDING,
  TAPBAR_SECTION_ID,
} from "@/lib/data/hero";

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

type WorkScrollCueProps = {
  variant?: "hint" | "tapbar";
};

export function WorkScrollCue({ variant = "hint" }: WorkScrollCueProps) {
  const t = useTranslations();

  if (variant === "hint") {
    return (
      <div
        className="hero-scroll-cue hero-scroll-cue--scroll-hint"
        aria-hidden="true"
      >
        <ChevronDownIcon className="hero-scroll-cue__icon" aria-hidden="true" />
      </div>
    );
  }

  const scrollToTapBar = () => {
    const tapbar = document.getElementById(TAPBAR_SECTION_ID);
    if (!tapbar) return;

    const isMobile = window.matchMedia(MOBILE_LAYOUT_MQ).matches;
    const scrollMargin =
      parseFloat(getComputedStyle(tapbar).scrollMarginTop) || 0;

    if (isMobile) {
      const trabajos = document.getElementById(HERO_NEXT_SECTION_ID);
      const seamTop = trabajos
        ? trabajos.getBoundingClientRect().bottom + window.scrollY
        : tapbar.getBoundingClientRect().top + window.scrollY - scrollMargin;

      window.scrollTo({
        top: seamTop,
        behavior: prefersReducedMotion() ? "auto" : "smooth",
      });
      return;
    }

    const tapbarTop =
      tapbar.getBoundingClientRect().top + window.scrollY - scrollMargin;

    const cue = document.querySelector(".hero-scroll-cue--work-outro");
    const pastCueTop = cue
      ? cue.getBoundingClientRect().bottom +
        window.scrollY +
        TAPBAR_SCROLL_PAST_CUE_PADDING
      : tapbarTop;

    window.scrollTo({
      top: Math.max(tapbarTop, pastCueTop),
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    });
  };

  return (
    <button
      type="button"
      className="hero-scroll-cue hero-scroll-cue--work-outro"
      onClick={scrollToTapBar}
      aria-label={t.sections.work.scrollAria}
    >
      <ChevronDownIcon className="hero-scroll-cue__icon" aria-hidden="true" />
    </button>
  );
}
