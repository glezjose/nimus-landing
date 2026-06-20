"use client";

import UnicornScene from "unicornstudio-react/next";

export function HeroBackground() {
  return (
    <div className="hero-bg" aria-hidden="true">
      <UnicornScene
        projectId="xXLVuzQIF2EmrAEKHhJq"
        width="100%"
        height="100%"
        scale={1}
        dpi={1.5}
        lazyLoad={false}
        sdkUrl="https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v2.2.5/dist/unicornStudio.umd.js"
        className="hero-unicorn"
        altText=""
        ariaLabel="Animación de fondo decorativa"
      />
      <div className="hero-bg-overlay" />
    </div>
  );
}
