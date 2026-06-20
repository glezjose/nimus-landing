"use client";

import { FormEvent, useCallback } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { quoteOptions } from "@/lib/data/content";
import { siteConfig } from "@/lib/site";

type CtaSectionProps = {
  onCopy: (text: string) => void;
  onToast: (text: string) => void;
};

export function CtaSection({ onCopy, onToast }: CtaSectionProps) {
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
    const msg =
      `Hola NIMUS, soy ${data.get("nombre") || ""} de ${data.get("negocio") || ""}.\n` +
      `Me interesa: ${data.get("interes") || ""}\n` +
      (data.get("detalle") ? `Detalle: ${data.get("detalle")}` : "");
    const url = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
    onToast("Abriendo WhatsApp…");
    e.currentTarget.reset();
  };

  return (
    <section className="cta-band" id="cta">
      <div className="cta-orb" />
      <Reveal variant="stagger" className="cta-inner">
        <div>
          <h2>
            ¿Listos para que tu marca <em>esté</em> en el bolsillo de tus clientes?
          </h2>
          <p>
            Cuéntanos qué necesitas — desde 10 piezas hasta un menú digital completo.
            Respondemos en menos de 24 horas con cotización y plazos en la misma
            conversación.
          </p>
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
              <div className="cl">WhatsApp directo</div>
              <div className="cv">{siteConfig.whatsappDisplay}</div>
            </div>
            <span className="copy-hint">copiar</span>
            <span className="arrow">↗</span>
          </a>
          <a
            className="cta-contact"
            data-copy={siteConfig.email}
            href={`mailto:${siteConfig.email}`}
            onClick={() => handleCopy(siteConfig.email)}
          >
            <div>
              <div className="cl">Correo</div>
              <div className="cv">{siteConfig.email}</div>
            </div>
            <span className="copy-hint">copiar</span>
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
              <div className="cl">Instagram</div>
              <div className="cv">{siteConfig.instagram}</div>
            </div>
            <span className="copy-hint">copiar</span>
            <span className="arrow">↗</span>
          </a>

          <form className="quick-quote" id="quick-quote" onSubmit={handleSubmit}>
            <h3>
              O cotiza en <em>30 segundos</em>.
            </h3>
            <div className="qq-grid">
              <div className="qq-field">
                <input name="nombre" type="text" placeholder="Tu nombre" required />
              </div>
              <div className="qq-field">
                <input name="negocio" type="text" placeholder="Negocio · marca" required />
              </div>
              <div className="qq-field full">
                <select name="interes" required defaultValue="">
                  <option value="" disabled>
                    ¿Qué te interesa?
                  </option>
                  {quoteOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div className="qq-field full">
                <textarea
                  name="detalle"
                  placeholder="Cuéntanos: cantidad, formas, destinos NFC…"
                  rows={2}
                />
              </div>
            </div>
            <button type="submit">
              Enviar cotización <span className="arr">→</span>
            </button>
            <div className="qq-tiny">Respondemos en menos de 24 h</div>
          </form>
        </div>
      </Reveal>
    </section>
  );
}
