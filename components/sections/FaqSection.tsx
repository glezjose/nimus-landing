"use client";

import { useEffect, useRef } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { useTranslations } from "@/components/providers/DictionaryProvider";

export function FaqSection() {
  const t = useTranslations();
  const { faq } = t.sections;
  const faqsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = faqsRef.current;
    if (!container) return;

    const items = container.querySelectorAll<HTMLDetailsElement>(".faq");
    const handlers = Array.from(items).map((item) => {
      const handler = () => {
        if (item.open) {
          items.forEach((other) => {
            if (other !== item) other.open = false;
          });
        }
      };
      item.addEventListener("toggle", handler);
      return { item, handler };
    });

    return () => {
      handlers.forEach(({ item, handler }) => {
        item.removeEventListener("toggle", handler);
      });
    };
  }, []);

  return (
    <section className="section section-narrow" id="preguntas" style={{ paddingTop: 0 }}>
      <Reveal className="section-head">
        <div>
          <div className="sk">{faq.sk}</div>
          <h2>
            {faq.titleBefore}
            <em>{faq.titleEmphasis}</em>
            {faq.titleAfter}
          </h2>
        </div>
        <div className="lede">{faq.lede}</div>
      </Reveal>

      <div ref={faqsRef}>
        <Reveal variant="stagger" className="faqs">
          {faq.items.map((item, index) => (
            <details key={item.id} className="faq" open={index === 0}>
              <summary>
                <span>
                  {item.question}
                  <em>{item.questionEmphasis}</em>?
                </span>
                <span className="faq-toggle">+</span>
              </summary>
              <div className="faq-body">{item.answer}</div>
            </details>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
