"use client";

import { ChevronDownIcon } from "@heroicons/react/24/outline";

export function WorkScrollCue() {
  return (
    <div className="hero-scroll-cue hero-scroll-cue--scroll-hint" aria-hidden="true">
      <ChevronDownIcon className="hero-scroll-cue__icon" aria-hidden="true" />
    </div>
  );
}
