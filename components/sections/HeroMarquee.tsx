"use client";

import {
  useLayoutEffect,
  useRef,
  type RefObject,
} from "react";
import { useTranslations } from "@/components/providers/DictionaryProvider";
import { HERO_MARQUEE_DURATION_SECONDS } from "@/lib/data/hero";

const VERTICAL_MARQUEE_COPIES = 3;

function MarqueePills({
  items,
  prefix,
  clone = false,
}: {
  items: readonly string[];
  prefix: string;
  clone?: boolean;
}) {
  return (
    <>
      {items.map((item, i) => (
        <span
          key={`${prefix}-${item}-${i}`}
          className="hero-marquee__pill"
          aria-hidden={clone || undefined}
        >
          {item}
        </span>
      ))}
    </>
  );
}

function measureVerticalLoopShift(track: HTMLElement, itemCount: number) {
  const pills = track.querySelectorAll<HTMLElement>(".hero-marquee__pill");
  if (pills.length < itemCount * 2) return 0;

  const previousTransform = track.style.transform;
  track.style.transform = "none";

  const shift = pills[itemCount].offsetTop - pills[0].offsetTop;

  track.style.transform = previousTransform;

  return shift > 0 ? shift : 0;
}

function useVerticalMarqueeMotion(
  trackRef: RefObject<HTMLDivElement | null>,
  itemCount: number,
) {
  const offsetRef = useRef(0);
  const shiftRef = useRef(0);
  const lastTimeRef = useRef<number | null>(null);
  const frameRef = useRef(0);

  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track || itemCount === 0) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const applyTransform = () => {
      track.style.transform = `translate3d(0, ${-offsetRef.current}px, 0)`;
    };

    const resyncShift = () => {
      const nextShift = measureVerticalLoopShift(track, itemCount);
      if (nextShift <= 0) return false;

      const prevShift = shiftRef.current;
      if (prevShift > 0 && Math.abs(nextShift - prevShift) > 0.5) {
        const progress = offsetRef.current / prevShift;
        offsetRef.current = (progress % 1) * nextShift;
      }

      shiftRef.current = nextShift;
      track.dataset.loopReady = "true";
      applyTransform();
      return true;
    };

    if (!resyncShift()) return;

    if (reducedMotion) {
      applyTransform();
      return () => {
        delete track.dataset.loopReady;
        track.style.removeProperty("transform");
      };
    }

    const tick = (time: number) => {
      if (lastTimeRef.current === null) {
        lastTimeRef.current = time;
      }

      const delta = Math.min((time - lastTimeRef.current) / 1000, 0.05);
      lastTimeRef.current = time;

      const loopShift = shiftRef.current;
      if (loopShift <= 0) {
        frameRef.current = window.requestAnimationFrame(tick);
        return;
      }

      offsetRef.current += (loopShift / HERO_MARQUEE_DURATION_SECONDS) * delta;

      while (offsetRef.current >= loopShift) {
        offsetRef.current -= loopShift;
      }

      applyTransform();
      frameRef.current = window.requestAnimationFrame(tick);
    };

    frameRef.current = window.requestAnimationFrame(tick);

    const onResize = () => {
      resyncShift();
    };

    const ro = new ResizeObserver(onResize);
    ro.observe(track);
    const viewport = track.parentElement;
    if (viewport) ro.observe(viewport);

    window.addEventListener("resize", onResize);
    void document.fonts?.ready.then(onResize);

    return () => {
      window.cancelAnimationFrame(frameRef.current);
      ro.disconnect();
      window.removeEventListener("resize", onResize);
      delete track.dataset.loopReady;
      track.style.removeProperty("transform");
      offsetRef.current = 0;
      shiftRef.current = 0;
      lastTimeRef.current = null;
    };
  }, [trackRef, itemCount]);
}

function VerticalMarqueeTrack({
  items,
  prefix,
}: {
  items: readonly string[];
  prefix: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  useVerticalMarqueeMotion(trackRef, items.length);

  return (
    <div
      ref={trackRef}
      className="hero-marquee__track hero-marquee__track--vertical"
    >
      {Array.from({ length: VERTICAL_MARQUEE_COPIES }, (_, copyIndex) => (
        <MarqueePills
          key={`${prefix}-copy-${copyIndex}`}
          items={items}
          prefix={`${prefix}-${copyIndex}`}
          clone={copyIndex > 0}
        />
      ))}
    </div>
  );
}

function HorizontalMarqueeTrack({
  items,
  prefix,
}: {
  items: readonly string[];
  prefix: string;
}) {
  return (
    <div className="hero-marquee__track hero-marquee__track--horizontal">
      <MarqueePills items={items} prefix={`${prefix}-a`} />
      <MarqueePills items={items} prefix={`${prefix}-b`} clone />
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
        <VerticalMarqueeTrack items={t.hero.marquee} prefix="v" />
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
        <HorizontalMarqueeTrack items={t.hero.marquee} prefix="h" />
      </div>
    </div>
  );
}
