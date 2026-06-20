"use client";

import type { CSSProperties } from "react";
import { useTranslations } from "@/components/providers/DictionaryProvider";

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

export function HeroHeadline() {
  const t = useTranslations();

  return (
    <h1>
      <span className="hero-copy__lead">
        <HeroWordLine words={t.hero.leadWords} variant="lead" startIndex={0} />
      </span>
      <span className="hero-copy__trail">
        <HeroWordLine
          words={t.hero.trailWords}
          variant="trail"
          startIndex={t.hero.leadWords.length}
        />
      </span>
    </h1>
  );
}
