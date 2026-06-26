"use client";

import { GradientShimmer } from "gradient-shimmer";

const FEATURE_EMPHASIS_SHIMMER_GRADIENT = [
  { color: "#163a50", position: 0 },
  { color: "#d89109", position: 1 },
] as const;

export function FeatureTitleEmphasis({ children }: { children: string }) {
  return (
    <em className="feature-title__emphasis">
      <GradientShimmer
        as="span"
        className="feature-title__emphasis-shimmer"
        gradient={[...FEATURE_EMPHASIS_SHIMMER_GRADIENT]}
        baseColor="var(--outline-brand)"
        pauseBetween={4000}
        duration={1.6}
        easing="smooth"
      >
        {children}
      </GradientShimmer>
    </em>
  );
}
