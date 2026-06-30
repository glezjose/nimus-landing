"use client";

import { FormEvent } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { HoverArrowIcon } from "@/components/ui/HoverArrowIcon";
import { SocialContacts } from "@/components/ui/SocialContacts";
import { useTranslations } from "@/components/providers/DictionaryProvider";
import { formatMessage } from "@/lib/i18n/types";
import { siteConfig } from "@/lib/site";

type CtaSectionProps = {
  onToast: (text: string) => void;
};

export function CtaSection({ onToast }: CtaSectionProps) {
  const t = useTranslations();
  const { cta } = t.sections;
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
          <SocialContacts
            whatsappLabel={cta.whatsappLabel}
            emailLabel={cta.emailLabel}
            instagramLabel={cta.instagramLabel}
          />

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
              {cta.submit}
              <HoverArrowIcon size={14} />
            </button>
            <div className="qq-tiny">{cta.formNote}</div>
          </form>
        </div>
      </Reveal>
    </section>
  );
}
