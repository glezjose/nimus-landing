import type { CSSProperties } from "react";

const LEAD_WORDS = ["Objetos", "que", "trabajan"];
const TRAIL_WORDS = ["por", "tu", "marca."];

function HeroWordLine({
  words,
  variant,
  startIndex,
}: {
  words: string[];
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
  return (
    <h1>
      <span className="hero-copy__lead">
        <HeroWordLine words={LEAD_WORDS} variant="lead" startIndex={0} />
      </span>
      <span className="hero-copy__trail">
        <HeroWordLine
          words={TRAIL_WORDS}
          variant="trail"
          startIndex={LEAD_WORDS.length}
        />
      </span>
    </h1>
  );
}
