"use client";

import Lottie from "lottie-react";
import Image from "next/image";
import { useEffect, useRef } from "react";
import type { LottieRefCurrentProps } from "lottie-react";
import { useTranslations } from "@/components/providers/DictionaryProvider";
import { useSiteLoader } from "@/lib/hooks/useSiteLoader";
import spinnerAnimation from "@/public/assets/ios-loading-spinner.json";

const LOADER_LOGO_SRC = "/assets/nimus-logo-complete-white.png";
const SPINNER_SPEED = 0.55;

export function SiteLoader() {
  const t = useTranslations();
  const { phase, statusLabel, isVisible } = useSiteLoader(t.loader.synced);
  const spinnerRef = useRef<LottieRefCurrentProps | null>(null);

  useEffect(() => {
    spinnerRef.current?.setSpeed(SPINNER_SPEED);
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div
      className={`site-loader${phase === "synced" ? " site-loader--synced" : ""}`}
      aria-live="polite"
      aria-busy={phase === "loading"}
    >
      <div className="site-loader__status">{statusLabel}</div>

      <div className="site-loader__scene" aria-hidden="true">
        <div className="site-loader__logo-wrap">
          <Image
            className="site-loader__logo"
            src={LOADER_LOGO_SRC}
            alt=""
            width={480}
            height={160}
            priority
            sizes="(max-width: 640px) 72vw, 420px"
          />
        </div>
      </div>

      <div className="site-loader__spinner" aria-hidden="true">
        <Lottie
          lottieRef={spinnerRef}
          animationData={spinnerAnimation}
          loop
          autoplay
          style={{ width: "100%", height: "100%" }}
          onDOMLoaded={() => spinnerRef.current?.setSpeed(SPINNER_SPEED)}
        />
      </div>
    </div>
  );
}
