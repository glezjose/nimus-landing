"use client";

import { useTranslations } from "@/components/providers/DictionaryProvider";

function MarqueePills({
  items,
  prefix,
}: {
  items: readonly string[];
  prefix: string;
}) {
  return (
    <>
      {items.map((item, i) => (
        <span key={`${prefix}-${item}-${i}`} className="hero-marquee__pill">
          {item}
        </span>
      ))}
    </>
  );
}

function MarqueeTrack({
  items,
  prefix,
  orientation,
}: {
  items: readonly string[];
  prefix: string;
  orientation: "vertical" | "horizontal";
}) {
  const setClass =
    orientation === "vertical"
      ? "hero-marquee__set hero-marquee__set--vertical"
      : "hero-marquee__set hero-marquee__set--horizontal";

  return (
    <div className={`hero-marquee__track hero-marquee__track--${orientation}`}>
      <div className={setClass}>
        <MarqueePills items={items} prefix={`${prefix}-a`} />
      </div>
      <div className={setClass} aria-hidden="true">
        <MarqueePills items={items} prefix={`${prefix}-b`} />
      </div>
    </div>
  );
}

export function HeroMarqueeVertical({ onDark = true }: { onDark?: boolean }) {
  const t = useTranslations();

  return (
    <div
      className={`hero-marquee hero-marquee--vertical${onDark ? " hero-marquee--on-dark" : ""}`}
      aria-hidden="true"
    >
      <div className="hero-marquee__viewport hero-marquee__viewport--vertical">
        <MarqueeTrack items={t.hero.marquee} prefix="v" orientation="vertical" />
      </div>
    </div>
  );
}

export function HeroMarqueeHorizontal() {
  const t = useTranslations();

  return (
    <div
      className="hero-marquee hero-marquee--horizontal hero-marquee--on-dark"
      aria-hidden="true"
    >
      <div className="hero-marquee__viewport hero-marquee__viewport--horizontal">
        <MarqueeTrack items={t.hero.marquee} prefix="h" orientation="horizontal" />
      </div>
    </div>
  );
}
