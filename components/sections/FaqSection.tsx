"use client";

import { useMemo } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { FAQChatAccordion } from "@/components/ruixen/faq-chat-accordion";
import { useTranslations } from "@/components/providers/DictionaryProvider";

export function FaqSection() {
  const t = useTranslations();
  const { faq } = t.sections;

  const items = useMemo(
    () =>
      faq.items.map((item) => ({
        question: `${item.question}${item.questionEmphasis}?`,
        answer: item.answer,
      })),
    [faq.items],
  );

  return (
    <section className="section section-narrow faq-chat-section" id="preguntas" style={{ paddingTop: 0 }}>
      <Reveal className="section-head faq-chat-section__head">
        <h2 className="text-balance">
          {faq.titleBefore}
          <em>{faq.titleEmphasis}</em>
          {faq.titleAfter}
        </h2>
      </Reveal>

      <Reveal variant="stagger">
        <FAQChatAccordion
          items={items}
          dateLabel={faq.chatToday}
          className="faq-chat-accordion"
        />
      </Reveal>
    </section>
  );
}
