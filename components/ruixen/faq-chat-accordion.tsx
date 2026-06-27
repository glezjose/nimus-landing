"use client";

import * as React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQChatAccordionProps {
  title?: string;
  items?: FAQItem[];
  /** Label for the date separator above the thread. */
  dateLabel?: string;
  /** Milliseconds to show typing dots before answer. 0 to skip. */
  typingDelay?: number;
  className?: string;
}

const EXPO = "cubic-bezier(0.16, 1, 0.3, 1)";
const EXPO_STRONG = "cubic-bezier(0.22, 1, 0.36, 1)";
const SPRING_TAP = { type: "spring" as const, duration: 0.3, bounce: 0 };

export function FAQChatAccordion({
  title,
  items = [],
  dateLabel = "Today",
  typingDelay = 400,
  className,
}: FAQChatAccordionProps) {
  const [active, setActive] = React.useState<number | null>(null);
  const [showAnswer, setShowAnswer] = React.useState<number | null>(null);
  const timerRef = React.useRef<ReturnType<typeof setTimeout>>(undefined);

  const handleClick = React.useCallback(
    (i: number) => {
      if (timerRef.current) clearTimeout(timerRef.current);

      if (active === i) {
        setActive(null);
        return;
      }

      setShowAnswer(null);
      setActive(i);

      if (typingDelay > 0) {
        timerRef.current = setTimeout(() => setShowAnswer(i), typingDelay);
      } else {
        setShowAnswer(i);
      }
    },
    [active, typingDelay],
  );

  React.useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  if (items.length === 0) return null;

  return (
    <div className={cn("faq-chat", className)}>
      {title ? (
        <h3 className="faq-chat__title">{title}</h3>
      ) : null}

      <div className="faq-chat__separator" aria-hidden="true">
        <span className="faq-chat__separator-line" />
        <span className="faq-chat__separator-label">{dateLabel}</span>
        <span className="faq-chat__separator-line" />
      </div>

      <div className="faq-chat__thread">
        {items.map((item, i) => {
          const isActive = active === i;
          const hasAnswer = showAnswer === i;

          return (
            <div key={i} className="faq-chat__exchange">
              <div className="faq-chat__question-row">
                <motion.button
                  type="button"
                  className="faq-chat__question"
                  whileTap={{ scale: 0.96 }}
                  transition={SPRING_TAP}
                  onClick={() => handleClick(i)}
                  aria-expanded={isActive}
                >
                  {item.question}
                </motion.button>
              </div>

              <div
                className="faq-chat__answer-grid"
                style={{
                  gridTemplateRows: isActive ? "1fr" : "0fr",
                  transition: isActive
                    ? `grid-template-rows 0.4s ${EXPO_STRONG}`
                    : `grid-template-rows 0.25s ${EXPO}`,
                }}
              >
                <div className="faq-chat__answer-grid-inner">
                  <motion.div
                    initial={false}
                    animate={{
                      y: isActive ? 0 : 4,
                      opacity: isActive ? 1 : 0,
                    }}
                    transition={{
                      y: isActive
                        ? { type: "spring", stiffness: 380, damping: 26 }
                        : { duration: 0.15 },
                      opacity: { duration: isActive ? 0.25 : 0.12 },
                    }}
                  >
                    <div className="faq-chat__answer-row">
                      <div className="faq-chat__answer-bubble">
                        <div
                          className="faq-chat__dots-grid"
                          style={{
                            gridTemplateRows: hasAnswer ? "0fr" : "1fr",
                            transition: `grid-template-rows 0.3s ${EXPO}`,
                          }}
                        >
                          <div className="faq-chat__dots-grid-inner">
                            <div className="faq-chat__dots" aria-hidden="true">
                              <span className="faq-chat__dot" />
                              <span className="faq-chat__dot faq-chat__dot--2" />
                              <span className="faq-chat__dot faq-chat__dot--3" />
                            </div>
                          </div>
                        </div>

                        <div
                          className="faq-chat__text-grid"
                          style={{
                            gridTemplateRows: hasAnswer ? "1fr" : "0fr",
                            transition: `grid-template-rows 0.3s ${EXPO}`,
                          }}
                        >
                          <div className="faq-chat__text-grid-inner">
                            <p
                              className="faq-chat__answer-text"
                              style={{
                                opacity: hasAnswer ? 1 : 0,
                                transition: hasAnswer
                                  ? "opacity 0.2s ease 0.08s"
                                  : "opacity 0.1s ease",
                              }}
                            >
                              {item.answer}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
