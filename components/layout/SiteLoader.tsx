"use client";

import Lottie from "lottie-react";
import UnicornScene from "unicornstudio-react/next";
import { useEffect, useRef, useState } from "react";
import type { LottieRefCurrentProps } from "lottie-react";
import { useSiteLoader } from "@/lib/hooks/useSiteLoader";
import spinnerAnimation from "@/public/assets/ios-loading-spinner.json";

const SCENE_WIDTH = 1440;
const SCENE_HEIGHT = 900;
const SCENE_ASPECT = SCENE_WIDTH / SCENE_HEIGHT;
const SCENE_SDK_URL =
  "https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v2.2.5/dist/unicornStudio.umd.js";
const SPINNER_SPEED = 0.55;

function fitSceneSize(width: number, height: number) {
  if (width <= 0 || height <= 0) return { width: 0, height: 0 };

  const heightFromWidth = width / SCENE_ASPECT;
  if (heightFromWidth <= height) {
    return {
      width: Math.floor(width),
      height: Math.floor(heightFromWidth),
    };
  }

  const widthFromHeight = height * SCENE_ASPECT;
  return {
    width: Math.floor(widthFromHeight),
    height: Math.floor(height),
  };
}

export function SiteLoader() {
  const { phase, statusLabel, markUnicornReady, isVisible } = useSiteLoader();
  const sceneRef = useRef<HTMLDivElement>(null);
  const spinnerRef = useRef<LottieRefCurrentProps | null>(null);
  const [sceneSize, setSceneSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    spinnerRef.current?.setSpeed(SPINNER_SPEED);
  }, [isVisible]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      markUnicornReady();
    }, 1800);

    return () => window.clearTimeout(timer);
  }, [markUnicornReady]);

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene || !isVisible) return;

    const updateSize = () => {
      const style = window.getComputedStyle(scene);
      const paddingX =
        Number.parseFloat(style.paddingLeft) +
        Number.parseFloat(style.paddingRight);
      const paddingY =
        Number.parseFloat(style.paddingTop) +
        Number.parseFloat(style.paddingBottom);

      const viewport = window.visualViewport;
      const viewportWidth = viewport?.width ?? window.innerWidth;
      const viewportHeight = viewport?.height ?? window.innerHeight;
      const availableWidth = Math.max(0, viewportWidth - paddingX);
      const availableHeight = Math.max(0, viewportHeight - paddingY);
      const maxWidth = Math.min(availableWidth, SCENE_WIDTH);

      setSceneSize(fitSceneSize(maxWidth, availableHeight));
    };

    updateSize();

    const observer = new ResizeObserver(updateSize);
    observer.observe(scene);
    window.addEventListener("resize", updateSize);
    window.visualViewport?.addEventListener("resize", updateSize);
    window.visualViewport?.addEventListener("scroll", updateSize);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateSize);
      window.visualViewport?.removeEventListener("resize", updateSize);
      window.visualViewport?.removeEventListener("scroll", updateSize);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  const sceneReady = sceneSize.width > 0 && sceneSize.height > 0;

  return (
    <div
      className={`site-loader${phase === "synced" ? " site-loader--synced" : ""}`}
      aria-live="polite"
      aria-busy={phase === "loading"}
    >
      <div className="site-loader__status">{statusLabel}</div>

      <div ref={sceneRef} className="site-loader__scene" aria-hidden="true">
        <div
          className="site-loader__scene-inner"
          style={
            sceneReady
              ? {
                  width: `${sceneSize.width}px`,
                  height: `${sceneSize.height}px`,
                }
              : undefined
          }
        >
          {sceneReady ? (
            <UnicornScene
              projectId="zCQ8xuCjnD3s4AcjRlO9"
              width={sceneSize.width}
              height={sceneSize.height}
              scale={1}
              dpi={1.5}
              lazyLoad={false}
              sdkUrl={SCENE_SDK_URL}
              className="site-loader__unicorn"
              altText=""
              ariaLabel="Animación de carga NIMUS"
            />
          ) : null}
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
