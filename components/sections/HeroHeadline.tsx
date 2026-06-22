"use client";

import { GradientShimmer } from "gradient-shimmer";
import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { useTranslations } from "@/components/providers/DictionaryProvider";

const TRAIL_SHIMMER_GRADIENT = [
  { color: "#163a50", position: 0 },
  { color: "#d89109", position: 1 },
] as const;

function formatTrailText(words: readonly string[]) {
  return words.reduce((acc, word, i) => acc + (i > 0 ? "\u00A0" : "") + word, "");
}

function HeroWordLine({
  words,
  variant,
  startIndex,
}: {
  words: readonly string[];
  variant: "lead" | "trail";
  startIndex: number;
}) {
  return (
    <>
      {words.map((word, i) => (
        <span
          key={`${variant}-${word}-${i}`}
          className={`hero-copy__word hero-copy__word--${variant}`}
          style={{ "--word-index": startIndex + i } as CSSProperties}
        >
          {i > 0 ? "\u00A0" : null}
          {word}
        </span>
      ))}
    </>
  );
}

function useSiteLoaderDone() {
  const [loaderDone, setLoaderDone] = useState(
    () =>
      typeof document !== "undefined" &&
      !document.body.classList.contains("site-loading"),
  );

  useEffect(() => {
    if (loaderDone) return;

    const sync = () => {
      if (!document.body.classList.contains("site-loading")) {
        setLoaderDone(true);
      }
    };

    sync();
    const observer = new MutationObserver(sync);
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, [loaderDone]);

  return loaderDone;
}

export function HeroHeadline() {
  const t = useTranslations();
  const loaderDone = useSiteLoaderDone();
  const trailStartIndex = t.hero.leadWords.length;
  const [trailShimmerReady, setTrailShimmerReady] = useState(false);

  const trailText = useMemo(
    () => formatTrailText(t.hero.trailWords),
    [t.hero.trailWords],
  );

  const trailAppearEndMs = useMemo(
    () =>
      (0.22 +
        (trailStartIndex + t.hero.trailWords.length - 1) * 0.14 +
        0.5) *
        1000 +
      80,
    [trailStartIndex, t.hero.trailWords.length],
  );

  useEffect(() => {
    if (!loaderDone) return;

    const timer = window.setTimeout(
      () => setTrailShimmerReady(true),
      trailAppearEndMs,
    );

    return () => window.clearTimeout(timer);
  }, [loaderDone, trailAppearEndMs]);

  return (
    <h1>
      <span className="hero-copy__lead">
        <HeroWordLine words={t.hero.leadWords} variant="lead" startIndex={0} />
      </span>
      <span className="hero-copy__trail">
        {trailShimmerReady ? (
          <GradientShimmer
            className="hero-copy__trail-shimmer"
            gradient={[...TRAIL_SHIMMER_GRADIENT]}
            baseColor="var(--hero-trail)"
            pauseBetween={4000}
            duration={1.6}
            easing="smooth"
          >
            {trailText}
          </GradientShimmer>
        ) : (
          <HeroWordLine
            words={t.hero.trailWords}
            variant="trail"
            startIndex={trailStartIndex}
          />
        )}
      </span>
    </h1>
  );
}
