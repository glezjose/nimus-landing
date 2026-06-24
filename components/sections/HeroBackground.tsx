"use client";

import dynamic from "next/dynamic";

const LightRays = dynamic(() => import("@/components/LightRays"), { ssr: false });

export function HeroBackground() {
  return (
    <div className="hero-bg" aria-hidden="true">
      <div className="hero-rays">
        <LightRays
          raysOrigin="top-center"
          raysColor="#163a50"
          raysSpeed={1}
          lightSpread={2.9}
          rayLength={3.6}
          pulsating={false}
          fadeDistance={1.9}
          saturation={1}
          followMouse
          mouseInfluence={0.1}
          noiseAmount={0}
          distortion={0.1}
        />
      </div>
      <div className="hero-bg-overlay hero-bg-overlay--rays" />
    </div>
  );
}
