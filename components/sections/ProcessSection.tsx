"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import RotatingText from "@/components/ui/RotatingText";
import ScrollStack, { ScrollStackItem } from "@/components/ui/ScrollStack";
import { Reveal } from "@/components/ui/Reveal";
import { useTranslations } from "@/components/providers/DictionaryProvider";
import { useProcessStackMotion } from "@/components/sections/useProcessStackMotion";

/** Breathing room between the pinned header and the locked card stack. */
const STACK_GAP = 36;

const STEP_MEDIA: Record<string, string | undefined> = {
  "Paso 03": "/assets/steps/printer.gif",
  "Step 03": "/assets/steps/printer.gif",
};

type ProcessStep = {
  num: string;
  title: string;
  titleEmphasis: string;
  body: string;
};

function ProcessStepCardContent({ step }: { step: ProcessStep }) {
  const mediaSrc = STEP_MEDIA[step.num];

  return (
    <div className="process-stack-card__layout">
      <div className="process-stack-card__copy">
        <div className="ps-num">{step.num}</div>
        <h3 className="ps-title">
          {step.title}
          <em>{step.titleEmphasis}</em>
        </h3>
        <p className="ps-body">{step.body}</p>
      </div>
      <div className="process-stack-card__media">
        {mediaSrc ? (
          <Image
            src={mediaSrc}
            alt=""
            fill
            unoptimized
            className="process-stack-card__media-image"
            sizes="(max-width: 980px) 100vw, 320px"
          />
        ) : (
          <span className="process-stack-card__media-label">GIF</span>
        )}
      </div>
    </div>
  );
}

export function ProcessSection() {
  const t = useTranslations();
  const { process } = t.sections;
  const stackMotion = useProcessStackMotion();
  const [stackTopPx, setStackTopPx] = useState(360);

  useEffect(() => {
    if (!stackMotion) return;

    const head = document.querySelector<HTMLElement>(".process-stack-head");

    const measure = () => {
      const navHeight =
        Number.parseFloat(
          getComputedStyle(document.documentElement).getPropertyValue(
            "--nav-bar-height",
          ),
        ) || 60;
      const headHeight = head?.offsetHeight ?? 0;
      setStackTopPx(navHeight + headHeight + STACK_GAP);
    };

    measure();
    window.addEventListener("resize", measure);

    const observer =
      typeof ResizeObserver !== "undefined" && head
        ? new ResizeObserver(measure)
        : null;
    if (head) observer?.observe(head);

    return () => {
      window.removeEventListener("resize", measure);
      observer?.disconnect();
    };
  }, [stackMotion]);

  return (
    <section className="section dark section-process">
      <div
        id="proceso"
        className="section section-narrow section-process__shell"
        style={{ padding: "0 0" }}
      >
        <Reveal className="section-head process-stack-head">
          <div>
            <h2>
              {process.titleBefore}
              <em className="process-title-rotate">
                <RotatingText
                  texts={[...process.titleRotatingTexts]}
                  staggerFrom="last"
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "-120%" }}
                  staggerDuration={0.025}
                  splitLevelClassName="process-rotating-text__word"
                  mainClassName="process-rotating-text"
                  transition={{
                    type: "spring",
                    damping: 30,
                    stiffness: 400,
                    bounce: 0,
                  }}
                  rotationInterval={2400}
                  animatePresenceInitial={false}
                />
              </em>
              {process.titleAfter}
            </h2>
          </div>
          <div className="lede">{process.lede}</div>
        </Reveal>

        {stackMotion ? (
          <ScrollStack
            useWindowScroll
            useLenis={false}
            className="process-scroll-stack"
            innerClassName="process-scroll-stack__inner"
            itemDistance={170}
            itemStackDistance={26}
            stackPosition={`${stackTopPx}px`}
            scaleEndPosition={`${Math.max(stackTopPx - 120, 48)}px`}
            baseScale={0.9}
            itemScale={0.035}
            blurAmount={2.5}
          >
            {process.steps.map((step) => (
              <ScrollStackItem
                key={step.num}
                itemClassName="process-stack-card pstep"
              >
                <ProcessStepCardContent step={step} />
              </ScrollStackItem>
            ))}
          </ScrollStack>
        ) : (
          <div className="process-steps-static">
            {process.steps.map((step) => (
              <article key={step.num} className="process-stack-card pstep">
                <ProcessStepCardContent step={step} />
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
