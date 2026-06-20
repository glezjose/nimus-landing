"use client";

import { FormEvent, useCallback } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { useTranslations } from "@/components/providers/DictionaryProvider";
import { formatMessage } from "@/lib/i18n/types";
import { siteConfig } from "@/lib/site";

type CtaSectionProps = {
  onCopy: (text: string) => void;
  onToast: (text: string) => void;
};

export function CtaSection({ onCopy, onToast }: CtaSectionProps) {
  const t = useTranslations();
  const { cta } = t.sections;

  const handleCopy = useCallback(
    async (text: string) => {
      try {
        await navigator.clipboard.writeText(text);
        onCopy(text);
      } catch {
        onToast(text);
      }
    },
    [onCopy, onToast],
  );

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("nombre") || "");
    const business = String(data.get("negocio") || "");
    const interest = String(data.get("interes") || "");
    const detail = String(data.get("detalle") || "");

    const msg = [
      formatMessage(cta.whatsappGreeting, { name, business }),
      formatMessage(cta.whatsappInterest, { interest }),
      detail ? formatMessage(cta.whatsappDetail, { detail }) : "",
    ]
      .filter(Boolean)
      .join("\n");

    const url = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
    onToast(cta.openingWhatsApp);
    e.currentTarget.reset();
  };

  return (
    <section className="cta-band" id="cta">
      <div className="cta-orb" />
      <Reveal variant="stagger" className="cta-inner">
        <div>
          <h2>
            {cta.titleBefore}
            <em>{cta.titleEmphasis}</em>
            {cta.titleAfter}
          </h2>
          <p>{cta.intro}</p>
        </div>
        <div className="cta-right">
          <a
            className="cta-contact"
            data-copy={siteConfig.whatsappDisplay}
            href={`https://wa.me/${siteConfig.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => handleCopy(siteConfig.whatsappDisplay)}
          >
            <div>
              <div className="cl">{cta.whatsappLabel}</div>
              <div className="cv">{siteConfig.whatsappDisplay}</div>
            </div>
            <span className="copy-hint">{cta.copyHint}</span>
            <span className="arrow">↗</span>
          </a>
          <a
            className="cta-contact"
            data-copy={siteConfig.email}
            href={`mailto:${siteConfig.email}`}
            onClick={() => handleCopy(siteConfig.email)}
          >
            <div>
              <div className="cl">{cta.emailLabel}</div>
              <div className="cv">{siteConfig.email}</div>
            </div>
            <span className="copy-hint">{cta.copyHint}</span>
            <span className="arrow">↗</span>
          </a>
          <a
            className="cta-contact"
            data-copy={siteConfig.instagram}
            href={siteConfig.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => handleCopy(siteConfig.instagram)}
          >
            <div>
              <div className="cl">{cta.instagramLabel}</div>
              <div className="cv">{siteConfig.instagram}</div>
            </div>
            <span className="copy-hint">{cta.copyHint}</span>
            <span className="arrow">↗</span>
          </a>

          <form className="quick-quote" id="quick-quote" onSubmit={handleSubmit}>
            <h3>
              {cta.formTitleBefore}
              <em>{cta.formTitleEmphasis}</em>
              {cta.formTitleAfter}
            </h3>
            <div className="qq-grid">
              <div className="qq-field">
                <input name="nombre" type="text" placeholder={cta.namePlaceholder} required />
              </div>
              <div className="qq-field">
                <input name="negocio" type="text" placeholder={cta.businessPlaceholder} required />
              </div>
              <div className="qq-field full">
                <select name="interes" required defaultValue="">
                  <option value="" disabled>
                    {cta.interestPlaceholder}
                  </option>
                  {cta.quoteOptions.map((option: string) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div className="qq-field full">
                <textarea
                  name="detalle"
                  placeholder={cta.detailPlaceholder}
                  rows={2}
                />
              </div>
            </div>
            <button type="submit">
              {cta.submit} <span className="arr">→</span>
            </button>
            <div className="qq-tiny">{cta.formNote}</div>
          </form>
        </div>
      </Reveal>
    </section>
  );
}
