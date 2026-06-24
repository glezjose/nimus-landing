"use client";

import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useTranslations } from "@/components/providers/DictionaryProvider";

const WORK_NEXT_SECTION_ID = "tapbar";

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export function WorkScrollCue() {
  const t = useTranslations();

  const scrollToNextSection = () => {
    const target = document.getElementById(WORK_NEXT_SECTION_ID);
    if (!target) return;

    const top = target.getBoundingClientRect().top + window.scrollY;
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
      aria-label={t.sections.work.scrollAria}
    >
      <ChevronDownIcon className="hero-scroll-cue__icon" aria-hidden="true" />
    </button>
  );
}
