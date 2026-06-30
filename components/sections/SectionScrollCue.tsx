"use client";

import { ChevronDownIcon } from "@heroicons/react/24/outline";

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

type SectionScrollCueProps = {
  targetId: string;
  ariaLabel: string;
};

export function SectionScrollCue({ targetId, ariaLabel }: SectionScrollCueProps) {
  const scrollToTarget = () => {
    const target = document.getElementById(targetId);
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
      onClick={scrollToTarget}
      aria-label={ariaLabel}
    >
      <ChevronDownIcon className="hero-scroll-cue__icon" aria-hidden="true" />
    </button>
  );
}
