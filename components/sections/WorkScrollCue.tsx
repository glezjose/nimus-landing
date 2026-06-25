"use client";

import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useTranslations } from "@/components/providers/DictionaryProvider";
import {
  MOBILE_LAYOUT_MQ,
  TAPBAR_MOBILE_CARD_SCROLL_INSET,
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
    const target = document.getElementById(TAPBAR_SECTION_ID);
    if (!target) return;

    const isMobile = window.matchMedia(MOBILE_LAYOUT_MQ).matches;
    const scrollMargin =
      parseFloat(getComputedStyle(target).scrollMarginTop) || 0;

    const tapbarTop =
      target.getBoundingClientRect().top + window.scrollY - scrollMargin;

    const cue = document.querySelector(".hero-scroll-cue--work-outro");
    const pastCueTop = cue
      ? cue.getBoundingClientRect().bottom +
        window.scrollY +
        TAPBAR_SCROLL_PAST_CUE_PADDING
      : tapbarTop;

    let top = Math.max(tapbarTop, pastCueTop);

    if (isMobile) {
      const card = target.querySelector<HTMLElement>(".feature-preview-card");
      if (card) {
        const cardInset =
          parseFloat(
            getComputedStyle(target).getPropertyValue("--tapbar-mobile-card-inset"),
          ) || TAPBAR_MOBILE_CARD_SCROLL_INSET;
        const cardTop =
          card.getBoundingClientRect().top +
          window.scrollY -
          scrollMargin -
          cardInset;
        top = Math.max(top, cardTop);
      }
    }

    window.scrollTo({
      top,
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
