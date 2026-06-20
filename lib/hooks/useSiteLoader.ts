"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

const SYNC_KEY = "nimus-site-synced";
const MIN_LOAD_MS = 2000;
const MIN_RELOAD_MS = 1800;
const MAX_LOAD_MS = 5500;
const MIN_SYNC_MS = 500;
const FADE_MS = 450;
const CRITICAL_IMAGES = ["/assets/nimus-logo-white.png", "/assets/hero-visual.png"];

type LoaderPhase = "loading" | "synced" | "hidden";

function preloadImage(src: string) {
  return new Promise<void>((resolve) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => resolve();
    img.src = src;
  });
}

function wait(ms: number) {
  return new Promise<void>((resolve) => window.setTimeout(resolve, ms));
}

function dismissLoader(
  setPhase: (phase: LoaderPhase) => void,
  visibleMs: number,
  prefersReducedMotion: boolean,
) {
  if (prefersReducedMotion) {
    setPhase("hidden");
    document.body.classList.remove("site-loading");
    return undefined;
  }

  const fadeTimer = window.setTimeout(() => {
    setPhase("synced");
  }, visibleMs);

  const hideTimer = window.setTimeout(() => {
    setPhase("hidden");
    document.body.classList.remove("site-loading");
  }, visibleMs + FADE_MS);

  return () => {
    window.clearTimeout(fadeTimer);
    window.clearTimeout(hideTimer);
  };
}

export function useSiteLoader(syncedLabel: string) {
  const [phase, setPhase] = useState<LoaderPhase>("loading");
  const [progress, setProgress] = useState(1);
  const [statusLabel, setStatusLabel] = useState("1");
  const targetRef = useRef(1);
  const displayRef = useRef(1);
  const unicornReadyRef = useRef(false);

  const markUnicornReady = useCallback(() => {
    unicornReadyRef.current = true;
  }, []);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;

    if (sessionStorage.getItem(SYNC_KEY) !== "1") return;

    setProgress(100);
    setStatusLabel(syncedLabel);
    setPhase("loading");
  }, [syncedLabel]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (sessionStorage.getItem(SYNC_KEY) === "1") {
      const clearDismiss = dismissLoader(setPhase, MIN_RELOAD_MS, prefersReducedMotion);
      return () => {
        clearDismiss?.();
        document.body.classList.remove("site-loading");
      };
    }

    document.body.classList.add("site-loading");
    let cancelled = false;
    let fadeTimer: number | undefined;
    let hideTimer: number | undefined;
    const startedAt = performance.now();

    const setTarget = (value: number) => {
      targetRef.current = Math.max(targetRef.current, Math.min(100, value));
    };

    const finish = () => {
      if (cancelled) return;
      displayRef.current = 100;
      setProgress(100);
      setStatusLabel(syncedLabel);
      setPhase("loading");
      sessionStorage.setItem(SYNC_KEY, "1");

      if (prefersReducedMotion) {
        setPhase("hidden");
        document.body.classList.remove("site-loading");
        return;
      }

      fadeTimer = window.setTimeout(() => {
        if (cancelled) return;
        setPhase("synced");
      }, MIN_SYNC_MS);

      hideTimer = window.setTimeout(() => {
        if (cancelled) return;
        setPhase("hidden");
        document.body.classList.remove("site-loading");
      }, MIN_SYNC_MS + FADE_MS);
    };

    const tick = window.setInterval(() => {
      const delta = targetRef.current - displayRef.current;
      if (delta <= 0) return;

      const step = delta > 8 ? Math.ceil(delta * 0.22) : 1;
      displayRef.current = Math.min(targetRef.current, displayRef.current + step);
      setProgress(displayRef.current);
      setStatusLabel(String(displayRef.current));
    }, 40);

    const run = async () => {
      setTarget(8);

      if (document.readyState === "complete") {
        setTarget(28);
      } else {
        await new Promise<void>((resolve) => {
          window.addEventListener("load", () => resolve(), { once: true });
        });
        if (cancelled) return;
        setTarget(28);
      }

      await document.fonts.ready;
      if (cancelled) return;
      setTarget(48);

      await Promise.all(CRITICAL_IMAGES.map(preloadImage));
      if (cancelled) return;
      setTarget(68);

      const unicornPoll = window.setInterval(() => {
        if (unicornReadyRef.current) {
          window.clearInterval(unicornPoll);
          setTarget(88);
        }
      }, 120);

      window.setTimeout(() => {
        window.clearInterval(unicornPoll);
        setTarget(88);
      }, 2600);

      while (!cancelled) {
        const elapsed = performance.now() - startedAt;
        setTarget(68 + Math.min(31, (elapsed / MIN_LOAD_MS) * 31));

        if (
          elapsed >= MIN_LOAD_MS &&
          targetRef.current >= 88 &&
          displayRef.current >= 85
        ) {
          break;
        }

        if (elapsed >= MAX_LOAD_MS) break;

        await wait(80);
      }

      if (cancelled) return;

      setTarget(100);

      const animateDeadline = performance.now() + 900;
      while (!cancelled && displayRef.current < 100 && performance.now() < animateDeadline) {
        await wait(40);
      }

      finish();
    };

    void run();

    return () => {
      cancelled = true;
      window.clearInterval(tick);
      if (fadeTimer !== undefined) window.clearTimeout(fadeTimer);
      if (hideTimer !== undefined) window.clearTimeout(hideTimer);
      document.body.classList.remove("site-loading");
    };
  }, [syncedLabel]);

  return {
    phase,
    progress,
    statusLabel,
    markUnicornReady,
    isVisible: phase !== "hidden",
  };
}
