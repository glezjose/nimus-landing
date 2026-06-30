"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import RotatingText from "@/components/ui/RotatingText";
import ScrollStack, { ScrollStackItem } from "@/components/ui/ScrollStack";
import { Reveal } from "@/components/ui/Reveal";
import { useTranslations } from "@/components/providers/DictionaryProvider";
import { useProcessStackMotion } from "@/components/sections/useProcessStackMotion";
import { SectionScrollCue } from "@/components/sections/SectionScrollCue";
import { ORIGEN_SECTION_ID } from "@/lib/data/hero";

/** Breathing room between the pinned header and the locked card stack. */
const STACK_GAP = 36;

const STEP_MEDIA = [
  "/assets/steps/1.png",
  "/assets/steps/2.png",
  "/assets/steps/3.png",
  "/assets/steps/4.png",
] as const;

type ProcessStep = {
  num: string;
  title: string;
  titleEmphasis: string;
  body: string;
};

function ProcessStepCardContent({
  step,
  index,
}: {
  step: ProcessStep;
  index: number;
}) {
  const mediaSrc = STEP_MEDIA[index];

  return (
    <div className="process-stack-card__layout">
      <div className="process-stack-card__copy">
        <span className="ps-num">{step.num}</span>
        <div className="process-stack-card__bottom">
          <h3 className="ps-title">
            {step.title}
            <em>{step.titleEmphasis}</em>
          </h3>
          <p className="ps-body">{step.body}</p>
        </div>
      </div>
      <div className="process-stack-card__media">
        <Image
          src={mediaSrc}
          alt=""
          fill
          className="process-stack-card__media-image"
          sizes="(max-width: 980px) 100vw, 320px"
        />
      </div>
    </div>
  );
}

export function ProcessSection() {
  const t = useTranslations();
  const { process } = t.sections;
  const stackMotion = useProcessStackMotion();
  const [stackTopPx, setStackTopPx] = useState<number | null>(null);

  useEffect(() => {
    if (!stackMotion) return;

    const measure = () => {
      const head = document.querySelector<HTMLElement>(".process-stack-head");
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
    const settleTimer = window.setTimeout(measure, 600);

    window.addEventListener("orientationchange", measure);
    window.addEventListener("resize", measure);

    return () => {
      window.clearTimeout(settleTimer);
      window.removeEventListener("orientationchange", measure);
      window.removeEventListener("resize", measure);
    };
  }, [stackMotion]);

  return (
    <section className="section dark section-process section--has-scroll-cue">
      <div
        id="proceso"
        className="section section-narrow section-process__shell"
        style={{ padding: "0 0" }}
      >
        <Reveal className="section-head process-stack-head">
          <div>
            <h2 className="process-stack-title">
              <span className="process-stack-title__lead">
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
              </span>
              <span className="process-stack-title__tail">
                {process.titleAfter.trimStart()}
              </span>
            </h2>
          </div>
          <div className="lede">{process.lede}</div>
        </Reveal>

        {stackMotion && stackTopPx !== null ? (
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
            {process.steps.map((step, index) => (
              <ScrollStackItem
                key={step.num}
                itemClassName="process-stack-card pstep"
              >
                <ProcessStepCardContent step={step} index={index} />
              </ScrollStackItem>
            ))}
          </ScrollStack>
        ) : stackMotion ? null : (
          <div className="process-steps-static">
            {process.steps.map((step, index) => (
              <article key={step.num} className="process-stack-card pstep">
                <ProcessStepCardContent step={step} index={index} />
              </article>
            ))}
          </div>
        )}
      </div>

      <div className="section-scroll-slot">
        <SectionScrollCue
          targetId={ORIGEN_SECTION_ID}
          ariaLabel={process.scrollAria}
        />
      </div>
    </section>
  );
}
