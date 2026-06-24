"use client";

import {
  createElement,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
} from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText as GSAPSplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import "./Shuffle.css";

gsap.registerPlugin(ScrollTrigger, GSAPSplitText, useGSAP);

type ShuffleDirection = "left" | "right" | "up" | "down";
type AnimationMode = "evenodd" | "random";
type ShuffleTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";

type ShuffleProps = {
  text: string;
  className?: string;
  style?: CSSProperties;
  shuffleDirection?: ShuffleDirection;
  duration?: number;
  maxDelay?: number;
  ease?: string;
  threshold?: number;
  rootMargin?: string;
  tag?: ShuffleTag;
  textAlign?: CSSProperties["textAlign"];
  onShuffleComplete?: () => void;
  shuffleTimes?: number;
  animationMode?: AnimationMode;
  loop?: boolean;
  loopDelay?: number;
  stagger?: number;
  scrambleCharset?: string;
  colorFrom?: string;
  colorTo?: string;
  triggerOnce?: boolean;
  respectReducedMotion?: boolean;
  triggerOnHover?: boolean;
  /** Play shuffle when `text` changes (no scroll trigger). */
  triggerOnChange?: boolean;
};

type ShuffleEngine = {
  run: () => void;
  teardown: () => void;
  resetText: (value: string) => void;
};

export default function Shuffle({
  text,
  className = "",
  style = {},
  shuffleDirection = "right",
  duration = 0.35,
  maxDelay = 0,
  ease = "power3.out",
  threshold = 0.1,
  rootMargin = "-100px",
  tag = "p",
  textAlign = "center",
  onShuffleComplete,
  shuffleTimes = 1,
  animationMode = "evenodd",
  loop = false,
  loopDelay = 0,
  stagger = 0.03,
  scrambleCharset = "",
  colorFrom,
  colorTo,
  triggerOnce = true,
  respectReducedMotion = true,
  triggerOnHover = true,
  triggerOnChange = false,
}: ShuffleProps) {
  const ref = useRef<HTMLElement>(null);
  const textRef = useRef(text);
  const engineRef = useRef<ShuffleEngine | null>(null);
  const skipChangeAnimationRef = useRef(true);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [ready, setReady] = useState(false);

  textRef.current = text;

  useEffect(() => {
    if ("fonts" in document) {
      if (document.fonts.status === "loaded") setFontsLoaded(true);
      else document.fonts.ready.then(() => setFontsLoaded(true));
    } else {
      setFontsLoaded(true);
    }
  }, []);

  const scrollTriggerStart = useMemo(() => {
    const startPct = (1 - threshold) * 100;
    const mm = /^(-?\d+(?:\.\d+)?)(px|em|rem|%)?$/.exec(rootMargin || "");
    const mv = mm ? parseFloat(mm[1]) : 0;
    const mu = mm ? mm[2] || "px" : "px";
    const sign =
      mv === 0 ? "" : mv < 0 ? `-=${Math.abs(mv)}${mu}` : `+=${mv}${mu}`;
    return `top ${startPct}%${sign}`;
  }, [threshold, rootMargin]);

  const engineConfig = useMemo(
    () => ({
      shuffleDirection,
      duration,
      maxDelay,
      ease,
      shuffleTimes,
      animationMode,
      loop,
      loopDelay,
      stagger,
      scrambleCharset,
      colorFrom,
      colorTo,
      triggerOnHover,
      triggerOnChange,
      respectReducedMotion,
    }),
    [
      shuffleDirection,
      duration,
      maxDelay,
      ease,
      shuffleTimes,
      animationMode,
      loop,
      loopDelay,
      stagger,
      scrambleCharset,
      colorFrom,
      colorTo,
      triggerOnHover,
      triggerOnChange,
      respectReducedMotion,
    ],
  );

  useGSAP(
    () => {
      if (!ref.current || !fontsLoaded) return;

      const el = ref.current;

      if (
        respectReducedMotion &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        el.textContent = textRef.current;
        setReady(true);
        onShuffleComplete?.();
        return;
      }

      const splitRef: { current: GSAPSplitText | null } = { current: null };
      const wrappersRef: { current: HTMLSpanElement[] } = { current: [] };
      const tlRef: { current: gsap.core.Timeline | null } = { current: null };
      const playingRef = { current: false };
      const hoverHandlerRef: { current: (() => void) | null } = {
        current: null,
      };

      const removeHover = () => {
        if (hoverHandlerRef.current && ref.current) {
          ref.current.removeEventListener("mouseenter", hoverHandlerRef.current);
          hoverHandlerRef.current = null;
        }
      };

      const resetText = (value: string) => {
        if (!ref.current) return;
        ref.current.textContent = value;
      };

      const teardown = () => {
        if (tlRef.current) {
          tlRef.current.kill();
          tlRef.current = null;
        }
        if (wrappersRef.current.length) {
          wrappersRef.current.forEach((wrap) => {
            const inner = wrap.firstElementChild;
            const orig = inner?.querySelector('[data-orig="1"]');
            if (orig && wrap.parentNode) wrap.parentNode.replaceChild(orig, wrap);
          });
          wrappersRef.current = [];
        }
        try {
          splitRef.current?.revert();
        } catch {
          /* noop */
        }
        splitRef.current = null;
        playingRef.current = false;
      };

      const build = () => {
        teardown();
        resetText(textRef.current);

        splitRef.current = new GSAPSplitText(el, {
          type: "chars",
          charsClass: "shuffle-char",
          wordsClass: "shuffle-word",
          linesClass: "shuffle-line",
          smartWrap: true,
          reduceWhiteSpace: false,
        });

        const chars = splitRef.current.chars || [];
        wrappersRef.current = [];

        const rolls = Math.max(1, Math.floor(shuffleTimes));
        const rand = (set: string) =>
          set.charAt(Math.floor(Math.random() * set.length)) || "";

        chars.forEach((charNode) => {
          const ch = charNode as HTMLElement;
          const parent = ch.parentElement;
          if (!parent) return;

          const w = ch.getBoundingClientRect().width;
          const h = ch.getBoundingClientRect().height;
          if (!w) return;

          const wrap = document.createElement("span");
          Object.assign(wrap.style, {
            display: "inline-block",
            overflow: "hidden",
            width: `${w}px`,
            height:
              shuffleDirection === "up" || shuffleDirection === "down"
                ? `${h}px`
                : "auto",
            verticalAlign: "bottom",
          });

          const inner = document.createElement("span");
          Object.assign(inner.style, {
            display: "inline-block",
            whiteSpace:
              shuffleDirection === "up" || shuffleDirection === "down"
                ? "normal"
                : "nowrap",
            willChange: "transform",
          });

          parent.insertBefore(wrap, ch);
          wrap.appendChild(inner);

          const firstOrig = ch.cloneNode(true) as HTMLElement;
          Object.assign(firstOrig.style, {
            display:
              shuffleDirection === "up" || shuffleDirection === "down"
                ? "block"
                : "inline-block",
            width: `${w}px`,
            textAlign: "center",
          });

          ch.setAttribute("data-orig", "1");
          Object.assign(ch.style, {
            display:
              shuffleDirection === "up" || shuffleDirection === "down"
                ? "block"
                : "inline-block",
            width: `${w}px`,
            textAlign: "center",
          });

          inner.appendChild(firstOrig);
          for (let k = 0; k < rolls; k++) {
            const c = ch.cloneNode(true) as HTMLElement;
            if (scrambleCharset) c.textContent = rand(scrambleCharset);
            Object.assign(c.style, {
              display:
                shuffleDirection === "up" || shuffleDirection === "down"
                  ? "block"
                  : "inline-block",
              width: `${w}px`,
              textAlign: "center",
            });
            inner.appendChild(c);
          }
          inner.appendChild(ch);

          const steps = rolls + 1;

          if (shuffleDirection === "right" || shuffleDirection === "down") {
            const firstCopy = inner.firstElementChild;
            const real = inner.lastElementChild;
            if (real) inner.insertBefore(real, inner.firstChild);
            if (firstCopy) inner.appendChild(firstCopy);
          }

          let startX = 0;
          let finalX = 0;
          let startY = 0;
          let finalY = 0;

          if (shuffleDirection === "right") {
            startX = -steps * w;
            finalX = 0;
          } else if (shuffleDirection === "left") {
            startX = 0;
            finalX = -steps * w;
          } else if (shuffleDirection === "down") {
            startY = -steps * h;
            finalY = 0;
          } else if (shuffleDirection === "up") {
            startY = 0;
            finalY = -steps * h;
          }

          if (shuffleDirection === "left" || shuffleDirection === "right") {
            gsap.set(inner, { x: startX, y: 0, force3D: true });
            inner.setAttribute("data-start-x", String(startX));
            inner.setAttribute("data-final-x", String(finalX));
          } else {
            gsap.set(inner, { x: 0, y: startY, force3D: true });
            inner.setAttribute("data-start-y", String(startY));
            inner.setAttribute("data-final-y", String(finalY));
          }

          if (colorFrom) inner.style.color = colorFrom;
          wrappersRef.current.push(wrap);
        });
      };

      const inners = () =>
        wrappersRef.current.map((w) => w.firstElementChild as HTMLElement);

      const randomizeScrambles = () => {
        if (!scrambleCharset) return;
        wrappersRef.current.forEach((w) => {
          const strip = w.firstElementChild;
          if (!strip) return;
          const kids = Array.from(strip.children);
          for (let i = 1; i < kids.length - 1; i++) {
            kids[i].textContent = scrambleCharset.charAt(
              Math.floor(Math.random() * scrambleCharset.length),
            );
          }
        });
      };

      const cleanupToStill = () => {
        wrappersRef.current.forEach((w) => {
          const strip = w.firstElementChild;
          if (!strip) return;
          const real = strip.querySelector('[data-orig="1"]');
          if (!real) return;
          strip.replaceChildren(real);
          (strip as HTMLElement).style.transform = "none";
          (strip as HTMLElement).style.willChange = "auto";
        });
      };

      const play = () => {
        const strips = inners();
        if (!strips.length) return;

        playingRef.current = true;
        const isVertical =
          shuffleDirection === "up" || shuffleDirection === "down";

        const tl = gsap.timeline({
          smoothChildTiming: true,
          repeat: loop ? -1 : 0,
          repeatDelay: loop ? loopDelay : 0,
          onRepeat: () => {
            if (scrambleCharset) randomizeScrambles();
            if (isVertical) {
              gsap.set(strips, {
                y: (_i, t) =>
                  parseFloat(t.getAttribute("data-start-y") || "0"),
              });
            } else {
              gsap.set(strips, {
                x: (_i, t) =>
                  parseFloat(t.getAttribute("data-start-x") || "0"),
              });
            }
            onShuffleComplete?.();
          },
          onComplete: () => {
            playingRef.current = false;
            if (!loop) {
              cleanupToStill();
              if (colorTo) gsap.set(strips, { color: colorTo });
              onShuffleComplete?.();
              if (!triggerOnChange) armHover();
            }
          },
        });

        const addTween = (targets: HTMLElement[], at: number) => {
          const vars: gsap.TweenVars = {
            duration,
            ease,
            force3D: true,
            stagger: animationMode === "evenodd" ? stagger : 0,
          };
          if (isVertical) {
            vars.y = (_i, t) =>
              parseFloat(t.getAttribute("data-final-y") || "0");
          } else {
            vars.x = (_i, t) =>
              parseFloat(t.getAttribute("data-final-x") || "0");
          }

          tl.to(targets, vars, at);

          if (colorFrom && colorTo) {
            tl.to(targets, { color: colorTo, duration, ease }, at);
          }
        };

        if (animationMode === "evenodd") {
          const odd = strips.filter((_, i) => i % 2 === 1);
          const even = strips.filter((_, i) => i % 2 === 0);
          const oddTotal = duration + Math.max(0, odd.length - 1) * stagger;
          const evenStart = odd.length ? oddTotal * 0.7 : 0;
          if (odd.length) addTween(odd, 0);
          if (even.length) addTween(even, evenStart);
        } else {
          strips.forEach((strip) => {
            const d = Math.random() * maxDelay;
            const vars: gsap.TweenVars = {
              duration,
              ease,
              force3D: true,
            };
            if (isVertical) {
              vars.y = parseFloat(strip.getAttribute("data-final-y") || "0");
            } else {
              vars.x = parseFloat(strip.getAttribute("data-final-x") || "0");
            }
            tl.to(strip, vars, d);
            if (colorFrom && colorTo) {
              tl.fromTo(
                strip,
                { color: colorFrom },
                { color: colorTo, duration, ease },
                d,
              );
            }
          });
        }

        tlRef.current = tl;
      };

      const armHover = () => {
        if (!triggerOnHover || !ref.current || triggerOnChange) return;
        removeHover();
        const handler = () => {
          if (playingRef.current) return;
          build();
          if (scrambleCharset) randomizeScrambles();
          play();
        };
        hoverHandlerRef.current = handler;
        ref.current.addEventListener("mouseenter", handler);
      };

      const run = () => {
        build();
        if (scrambleCharset) randomizeScrambles();
        play();
        setReady(true);
      };

      engineRef.current = { run, teardown, resetText };

      if (triggerOnChange) {
        resetText(textRef.current);
        setReady(true);
        return () => {
          removeHover();
          teardown();
          engineRef.current = null;
        };
      }

      const create = () => {
        run();
        armHover();
      };

      const st = ScrollTrigger.create({
        trigger: el,
        start: scrollTriggerStart,
        once: triggerOnce,
        onEnter: create,
      });

      return () => {
        st.kill();
        removeHover();
        teardown();
        engineRef.current = null;
        setReady(false);
      };
    },
    {
      dependencies: triggerOnChange
        ? [fontsLoaded, engineConfig, scrollTriggerStart, triggerOnce, onShuffleComplete]
        : [
            text,
            fontsLoaded,
            engineConfig,
            scrollTriggerStart,
            triggerOnce,
            onShuffleComplete,
          ],
      scope: ref,
    },
  );

  useEffect(() => {
    if (!triggerOnChange || !fontsLoaded) return;

    if (skipChangeAnimationRef.current) {
      skipChangeAnimationRef.current = false;
      return;
    }

    const engine = engineRef.current;
    if (!engine) return;

    engine.teardown();
    engine.resetText(text);
    engine.run();
  }, [text, triggerOnChange, fontsLoaded]);

  const commonStyle = useMemo(
    () => ({ textAlign, ...style }),
    [textAlign, style],
  );

  const classes = useMemo(
    () => `shuffle-parent ${ready ? "is-ready" : ""} ${className}`.trim(),
    [ready, className],
  );

  return createElement(tag as ElementType, {
    ref,
    className: classes,
    style: commonStyle,
    suppressHydrationWarning: true,
    children: text,
  });
}
