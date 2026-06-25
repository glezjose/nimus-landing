"use client";

import "./dual-tone-rain-background.css";

type DualToneRainBackgroundProps = {
  className?: string;
};

export function DualToneRainBackground({
  className,
}: DualToneRainBackgroundProps) {
  return (
    <div
      className={`dual-tone-rain${className ? ` ${className}` : ""}`}
      aria-hidden="true"
    >
      <div className="dual-tone-rain__canvas rain-container" />
      <div className="dual-tone-rain__grid" />
    </div>
  );
}

export default DualToneRainBackground;
