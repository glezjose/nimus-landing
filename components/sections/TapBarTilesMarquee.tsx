"use client";

import { useLayoutEffect, useMemo, useRef } from "react";
import { ChipIcon } from "@/components/ui/Icons";
import { tapBarTiles, type TapBarTileIcon } from "@/lib/data/tapbar-tiles";

const TILE_COUNT = tapBarTiles.length;
const MARQUEE_DURATION_SECONDS = 32;
/** Enough duplicates to cover wide desktop viewports (viewport can exceed one loop width). */
const MARQUEE_COPIES = 4;

function TileChip({
  icon,
  label,
  color,
  ariaHidden,
}: {
  icon: TapBarTileIcon;
  label: string;
  color: string;
  ariaHidden?: boolean;
}) {
  return (
    <span
      className="tapbar-tile-marquee__chip"
      style={{ "--tile-accent": color } as React.CSSProperties}
      title={label}
      aria-hidden={ariaHidden || undefined}
    >
      <ChipIcon type={icon} />
    </span>
  );
}

export function TapBarTilesMarquee({ ariaLabel }: { ariaLabel: string }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const loopItems = useMemo(
    () =>
      Array.from({ length: MARQUEE_COPIES }, () => tapBarTiles)
        .flat()
        .map((tile, index) => ({ ...tile, index })),
    [],
  );

  useLayoutEffect(() => {
    const track = trackRef.current;
    const viewport = track?.parentElement;
    if (!track || !viewport) return;

    const offsetRef = { current: 0 };
    const shiftRef = { current: 0 };
    const lastTimeRef = { current: null as number | null };
    let frameId = 0;

    const measureShift = () => {
      const chips = track.querySelectorAll<HTMLElement>(".tapbar-tile-marquee__chip");
      if (chips.length < TILE_COUNT * 2) return false;

      const next =
        chips[TILE_COUNT]!.getBoundingClientRect().left -
        chips[0]!.getBoundingClientRect().left;

      if (next <= 0) return false;

      const prev = shiftRef.current;
      if (prev > 0 && Math.abs(next - prev) > 0.5) {
        const progress = offsetRef.current / prev;
        offsetRef.current = (progress % 1) * next;
      }

      shiftRef.current = next;
      return true;
    };

    const applyTransform = () => {
      track.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`;
    };

    if (!measureShift()) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    applyTransform();

    if (!reducedMotion) {
      const tick = (time: number) => {
        if (lastTimeRef.current === null) lastTimeRef.current = time;

        const delta = Math.min((time - lastTimeRef.current) / 1000, 0.05);
        lastTimeRef.current = time;

        const shift = shiftRef.current;
        if (shift > 0) {
          offsetRef.current += (shift / MARQUEE_DURATION_SECONDS) * delta;
          while (offsetRef.current >= shift) {
            offsetRef.current -= shift;
          }
          applyTransform();
        }

        frameId = window.requestAnimationFrame(tick);
      };

      frameId = window.requestAnimationFrame(tick);
    }

    const onResize = () => {
      measureShift();
      applyTransform();
    };

    const observer = new ResizeObserver(onResize);
    observer.observe(track);
    observer.observe(viewport);

    return () => {
      window.cancelAnimationFrame(frameId);
      observer.disconnect();
      track.style.removeProperty("transform");
    };
  }, []);

  return (
    <div className="tapbar-tile-marquee" aria-label={ariaLabel}>
      <div className="tapbar-tile-marquee__viewport">
        <div ref={trackRef} className="tapbar-tile-marquee__track">
          {loopItems.map((tile) => (
            <TileChip
              key={`${tile.id}-${tile.index}`}
              icon={tile.icon}
              label={tile.label}
              color={tile.color}
              ariaHidden={tile.index >= TILE_COUNT}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
