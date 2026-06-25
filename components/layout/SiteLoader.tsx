"use client";

import Lottie from "lottie-react";
import Image from "next/image";
import { useEffect, useRef } from "react";
import type { LottieRefCurrentProps } from "lottie-react";
import { useTranslations } from "@/components/providers/DictionaryProvider";
import { useSiteLoader } from "@/lib/hooks/useSiteLoader";
import loaderAnimation from "@/public/assets/animations/loader.json";

const LOADER_LOGO_SRC = "/assets/nimus-logo-complete-white.png";
const LOADER_SPEED = 1;

export function SiteLoader() {
  const t = useTranslations();
  const { phase, statusLabel, isVisible } = useSiteLoader(t.loader.synced);
  const loaderRef = useRef<LottieRefCurrentProps | null>(null);

  useEffect(() => {
    loaderRef.current?.setSpeed(LOADER_SPEED);
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

      <div className="site-loader__loader" aria-hidden="true">
        <Lottie
          lottieRef={loaderRef}
          animationData={loaderAnimation}
          loop
          autoplay
          style={{ width: "100%", height: "100%" }}
          onDOMLoaded={() => loaderRef.current?.setSpeed(LOADER_SPEED)}
        />
      </div>
    </div>
  );
}
