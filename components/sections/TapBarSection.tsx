"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { DualToneRainBackground } from "@/components/ruixen/dual-tone-rain-background";
import { Reveal } from "@/components/ui/Reveal";
import { useTranslations } from "@/components/providers/DictionaryProvider";

export function TapBarSection() {
  const t = useTranslations();
  const { tapbar } = t.sections;
  const [current, setCurrent] = useState(2);

  useEffect(() => {
    const auto = setInterval(() => {
      setCurrent((i) => (i + 1) % tapbar.variants.length);
    }, 3800);
    return () => clearInterval(auto);
  }, [tapbar.variants.length]);

  const selectVariant = (i: number) => setCurrent(i);
  const variant = tapbar.variants[current];

  return (
    <section className="feature" id="tapbar">
      <div className="feature__bg">
        <DualToneRainBackground />
      </div>
      <div className="feature__edge-fade" aria-hidden="true" />
      <div className="feature-inner">
        <div>
          <h2>
            {tapbar.titleLine1}
            <br />
            {tapbar.titleLine2}
            <br />
            <em>{tapbar.titleEmphasis}</em>
          </h2>
          <p className="feature-sub">{tapbar.sub}</p>
          <Reveal variant="stagger" className="feature-list">
            {tapbar.features.map((item) => (
              <div key={item.num} className="feature-list-item">
                <span className="num">{item.num}</span>
                <span dangerouslySetInnerHTML={{ __html: item.text }} />
              </div>
            ))}
          </Reveal>
        </div>

        <div className="feature-visual">
          <div className="tap-variants" id="tap-variants">
            <div className="stage-bg" />
            <div className="variant-label">
              <div className="v-name" id="variant-name">
                {variant.name}
              </div>
              <div className="v-sub" id="variant-sub">
                {variant.sub}
              </div>
            </div>
            <div className="variant-price" id="variant-price">
              <span id="variant-price-amount">{variant.price}</span>
              <small>{tapbar.currency}</small>
            </div>

            {tapbar.variants.map((v) => (
              <Image
                key={v.id}
                className={`variant-img${current === v.id ? " active" : ""}`}
                data-i={v.id}
                src={v.image}
                alt={v.alt}
                width={400}
                height={400}
                sizes="(max-width: 1000px) 80vw, 400px"
              />
            ))}

            <div className="variant-pills">
              {tapbar.variants.map((v) => (
                <button
                  key={v.slug}
                  className="variant-pill"
                  type="button"
                  data-i={v.id}
                  data-active={current === v.id ? "true" : undefined}
                  onClick={() => selectVariant(v.id)}
                >
                  {v.slug === "bar-2" && tapbar.variantPills.bar2}
                  {v.slug === "qr" && tapbar.variantPills.qr}
                  {v.slug === "bar-3" && tapbar.variantPills.bar3}
                  {v.slug === "bar-4" && tapbar.variantPills.bar4}
                  {v.slug === "max" && tapbar.variantPills.max}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
