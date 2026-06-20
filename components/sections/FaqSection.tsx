"use client";

import { useEffect, useRef } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { faqs } from "@/lib/data/faqs";

export function FaqSection() {
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
          <div className="sk">Preguntas frecuentes</div>
          <h2>
            Lo que los <em>negocios</em> nos preguntan antes de empezar.
          </h2>
        </div>
        <div className="lede">
          Respuestas cortas. Si falta algo, escríbenos por WhatsApp o correo.
        </div>
      </Reveal>

      <div ref={faqsRef}>
        <Reveal variant="stagger" className="faqs">
          {faqs.map((faq, index) => (
            <details key={faq.id} className="faq" open={index === 0}>
              <summary>
                <span>
                  {faq.question}
                  <em>{faq.questionEmphasis}</em>?
                </span>
                <span className="faq-toggle">+</span>
              </summary>
              <div className="faq-body">{faq.answer}</div>
            </details>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
