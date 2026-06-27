"use client";

import Lenis from "lenis";
import {
  useCallback,
  useLayoutEffect,
  useRef,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";
import "./ScrollStack.css";

type ScrollStackItemProps = {
  children: ReactNode;
  itemClassName?: string;
};

export function ScrollStackItem({
  children,
  itemClassName = "",
}: ScrollStackItemProps) {
  return (
    <div className={cn("scroll-stack-card", itemClassName)}>{children}</div>
  );
}

type ScrollStackProps = {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
  itemDistance?: number;
  itemScale?: number;
  itemStackDistance?: number;
  stackPosition?: string;
  scaleEndPosition?: string;
  baseScale?: number;
  rotationAmount?: number;
  blurAmount?: number;
  useWindowScroll?: boolean;
  useLenis?: boolean;
  /** Snap translateY to whole pixels — reduces shimmer on mobile GPUs */
  snapToPixels?: boolean;
  onStackComplete?: () => void;
};

type CardTransform = {
  translateY: number;
  scale: number;
  rotation: number;
  blur: number;
};

type LayoutCache = {
  cardTops: number[];
  endTop: number;
};

const defaultEasing = (t: number) => Math.min(1, 1.001 - 2 ** (-10 * t));

function debounce<T extends (...args: never[]) => void>(fn: T, ms: number) {
  let timer: ReturnType<typeof setTimeout> | null = null;
  return (...args: Parameters<T>) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => fn(...args), ms);
  };
}

export default function ScrollStack({
  children,
  className = "",
  innerClassName = "",
  itemDistance = 100,
  itemScale = 0.03,
  itemStackDistance = 30,
  stackPosition = "20%",
  scaleEndPosition = "10%",
  baseScale = 0.85,
  rotationAmount = 0,
  blurAmount = 0,
  useWindowScroll = false,
  useLenis,
  snapToPixels = false,
  onStackComplete,
}: ScrollStackProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const stackCompletedRef = useRef(false);
  const animationFrameRef = useRef<number | null>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const cardsRef = useRef<HTMLElement[]>([]);
  const layoutCacheRef = useRef<LayoutCache | null>(null);
  const lastTransformsRef = useRef<Map<number, CardTransform>>(new Map());
  const isUpdatingRef = useRef(false);
  const tickingRef = useRef(false);
  const shouldUseLenis = useLenis ?? !useWindowScroll;

  const calculateProgress = useCallback(
    (scrollTop: number, start: number, end: number) => {
      if (scrollTop < start) return 0;
      if (scrollTop > end) return 1;
      return (scrollTop - start) / (end - start);
    },
    [],
  );

  const parsePercentage = useCallback(
    (value: string | number, containerHeight: number) => {
      if (typeof value === "string" && value.includes("%")) {
        return (parseFloat(value) / 100) * containerHeight;
      }
      return parseFloat(String(value));
    },
    [],
  );

  const getScrollData = useCallback(() => {
    if (useWindowScroll) {
      const containerHeight =
        window.visualViewport?.height ?? window.innerHeight;
      return {
        scrollTop: window.scrollY,
        containerHeight,
      };
    }

    const scroller = scrollerRef.current;
    return {
      scrollTop: scroller?.scrollTop ?? 0,
      containerHeight: scroller?.clientHeight ?? 0,
    };
  }, [useWindowScroll]);

  const measureElementTop = useCallback(
    (element: HTMLElement, scroller: HTMLElement) => {
      let top = 0;
      let current: HTMLElement | null = element;
      while (current) {
        top += current.offsetTop;
        current = current.offsetParent as HTMLElement | null;
      }

      if (useWindowScroll) return top;

      let scrollerTop = 0;
      current = scroller;
      while (current) {
        scrollerTop += current.offsetTop;
        current = current.offsetParent as HTMLElement | null;
      }
      return top - scrollerTop;
    },
    [useWindowScroll],
  );

  const measureLayout = useCallback(() => {
    const scroller = scrollerRef.current;
    if (!scroller || !cardsRef.current.length) return;

    const endElement = scroller.querySelector<HTMLElement>(".scroll-stack-end");
    layoutCacheRef.current = {
      cardTops: cardsRef.current.map((card) =>
        measureElementTop(card, scroller),
      ),
      endTop: endElement ? measureElementTop(endElement, scroller) : 0,
    };
  }, [measureElementTop]);

  const updateCardTransforms = useCallback(() => {
    if (!cardsRef.current.length || isUpdatingRef.current) return;

    const scroller = scrollerRef.current;
    const layout = layoutCacheRef.current;
    if (!scroller || !layout) return;

    isUpdatingRef.current = true;

    const { scrollTop, containerHeight } = getScrollData();
    const stackPositionPx = parsePercentage(stackPosition, containerHeight);
    const scaleEndPositionPx = parsePercentage(
      scaleEndPosition,
      containerHeight,
    );

    cardsRef.current.forEach((card, i) => {
      const cardTop = layout.cardTops[i] ?? 0;
      const triggerStart = cardTop - stackPositionPx - itemStackDistance * i;
      const triggerEnd = cardTop - scaleEndPositionPx;
      const pinStart = cardTop - stackPositionPx - itemStackDistance * i;
      const pinEnd = layout.endTop - containerHeight / 2;

      const scaleProgress = calculateProgress(
        scrollTop,
        triggerStart,
        triggerEnd,
      );
      const targetScale = baseScale + i * itemScale;
      const scale = 1 - scaleProgress * (1 - targetScale);
      const rotation = rotationAmount ? i * rotationAmount * scaleProgress : 0;

      let blur = 0;
      if (blurAmount) {
        let topCardIndex = 0;
        for (let j = 0; j < cardsRef.current.length; j++) {
          const jCardTop = layout.cardTops[j] ?? 0;
          const jTriggerStart =
            jCardTop - stackPositionPx - itemStackDistance * j;
          if (scrollTop >= jTriggerStart) {
            topCardIndex = j;
          }
        }

        if (i < topCardIndex) {
          blur = Math.max(0, (topCardIndex - i) * blurAmount);
        }
      }

      let translateY = 0;
      const isPinned = scrollTop >= pinStart && scrollTop <= pinEnd;

      if (isPinned) {
        translateY =
          scrollTop - cardTop + stackPositionPx + itemStackDistance * i;
      } else if (scrollTop > pinEnd) {
        translateY =
          pinEnd - cardTop + stackPositionPx + itemStackDistance * i;
      }

      if (snapToPixels) {
        translateY = Math.round(translateY);
      } else {
        translateY = Math.round(translateY * 100) / 100;
      }

      const newTransform: CardTransform = {
        translateY,
        scale: Math.round(scale * 1000) / 1000,
        rotation: Math.round(rotation * 100) / 100,
        blur: Math.round(blur * 100) / 100,
      };

      const lastTransform = lastTransformsRef.current.get(i);
      const translateThreshold = snapToPixels ? 1 : 0.5;
      const hasChanged =
        !lastTransform ||
        Math.abs(lastTransform.translateY - newTransform.translateY) >=
          translateThreshold ||
        Math.abs(lastTransform.scale - newTransform.scale) > 0.002 ||
        Math.abs(lastTransform.rotation - newTransform.rotation) > 0.1 ||
        Math.abs(lastTransform.blur - newTransform.blur) > 0.1;

      if (hasChanged) {
        card.style.transform = `translate3d(0, ${newTransform.translateY}px, 0) scale(${newTransform.scale}) rotate(${newTransform.rotation}deg)`;
        card.style.filter =
          newTransform.blur > 0 ? `blur(${newTransform.blur}px)` : "none";

        lastTransformsRef.current.set(i, newTransform);
      }

      if (i === cardsRef.current.length - 1) {
        const isInView = scrollTop >= pinStart && scrollTop <= pinEnd;
        if (isInView && !stackCompletedRef.current) {
          stackCompletedRef.current = true;
          onStackComplete?.();
        } else if (!isInView && stackCompletedRef.current) {
          stackCompletedRef.current = false;
        }
      }
    });

    isUpdatingRef.current = false;
  }, [
    itemScale,
    itemStackDistance,
    stackPosition,
    scaleEndPosition,
    baseScale,
    rotationAmount,
    blurAmount,
    snapToPixels,
    onStackComplete,
    calculateProgress,
    parsePercentage,
    getScrollData,
  ]);

  const handleScroll = useCallback(() => {
    if (tickingRef.current) return;
    tickingRef.current = true;
    requestAnimationFrame(() => {
      updateCardTransforms();
      tickingRef.current = false;
    });
  }, [updateCardTransforms]);

  useLayoutEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const cards = Array.from(
      scroller.querySelectorAll<HTMLElement>(".scroll-stack-card"),
    );

    cardsRef.current = cards;
    const transformsCache = lastTransformsRef.current;

    cards.forEach((card, i) => {
      if (i < cards.length - 1) {
        card.style.marginBottom = `${itemDistance}px`;
      }
      card.style.transformOrigin = "top center";
      card.style.backfaceVisibility = "hidden";
      card.style.transform = "translate3d(0, 0, 0)";
      if (blurAmount > 0) {
        card.style.willChange = "transform, filter";
      } else {
        card.style.willChange = "transform";
      }
      if (!snapToPixels) {
        card.style.perspective = "1000px";
      }
    });

    measureLayout();
    updateCardTransforms();

    const debouncedRemeasure = debounce(() => {
      measureLayout();
      updateCardTransforms();
    }, 400);

    let lenis: Lenis | null = null;

    if (shouldUseLenis && useWindowScroll) {
      lenis = new Lenis({
        duration: 1.2,
        easing: defaultEasing,
        smoothWheel: true,
        touchMultiplier: 2,
        wheelMultiplier: 1,
        lerp: 0.1,
        syncTouch: true,
        syncTouchLerp: 0.075,
      });

      lenis.on("scroll", handleScroll);

      const raf = (time: number) => {
        lenis?.raf(time);
        animationFrameRef.current = requestAnimationFrame(raf);
      };
      animationFrameRef.current = requestAnimationFrame(raf);
    } else if (shouldUseLenis) {
      const content = scroller.querySelector<HTMLElement>(".scroll-stack-inner");
      if (!content) return;

      lenis = new Lenis({
        wrapper: scroller,
        content,
        duration: 1.2,
        easing: defaultEasing,
        smoothWheel: true,
        touchMultiplier: 2,
        wheelMultiplier: 1,
        lerp: 0.1,
        syncTouch: true,
        syncTouchLerp: 0.075,
      });

      lenis.on("scroll", handleScroll);

      const raf = (time: number) => {
        lenis?.raf(time);
        animationFrameRef.current = requestAnimationFrame(raf);
      };
      animationFrameRef.current = requestAnimationFrame(raf);
    } else if (useWindowScroll) {
      window.addEventListener("scroll", handleScroll, { passive: true });
      window.visualViewport?.addEventListener("resize", debouncedRemeasure);
      window.addEventListener("orientationchange", debouncedRemeasure);
    } else {
      scroller.addEventListener("scroll", handleScroll, { passive: true });
    }

    window.addEventListener("resize", debouncedRemeasure);

    lenisRef.current = lenis;

    return () => {
      window.removeEventListener("resize", debouncedRemeasure);
      window.visualViewport?.removeEventListener("resize", debouncedRemeasure);
      window.removeEventListener("orientationchange", debouncedRemeasure);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      lenisRef.current?.destroy();
      lenisRef.current = null;
      if (useWindowScroll && !shouldUseLenis) {
        window.removeEventListener("scroll", handleScroll);
      } else if (!shouldUseLenis) {
        scroller.removeEventListener("scroll", handleScroll);
      }
      stackCompletedRef.current = false;
      cardsRef.current = [];
      layoutCacheRef.current = null;
      transformsCache.clear();
      isUpdatingRef.current = false;
    };
  }, [
    itemDistance,
    itemScale,
    itemStackDistance,
    stackPosition,
    scaleEndPosition,
    baseScale,
    rotationAmount,
    blurAmount,
    snapToPixels,
    useWindowScroll,
    shouldUseLenis,
    handleScroll,
    measureLayout,
    updateCardTransforms,
  ]);

  return (
    <div
      ref={scrollerRef}
      className={cn(
        "scroll-stack-scroller",
        useWindowScroll && "scroll-stack-scroller--window",
        snapToPixels && "scroll-stack-scroller--snap",
        className,
      )}
    >
      <div className={cn("scroll-stack-inner", innerClassName)}>
        {children}
        <div className="scroll-stack-end" aria-hidden="true" />
      </div>
    </div>
  );
}
