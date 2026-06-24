import { HeroBackground } from "./HeroBackground";
import { HeroCanvas } from "./HeroCanvas";
import { HeroHeadline } from "./HeroHeadline";
import { HeroMarqueeHorizontal, HeroMarqueeVertical } from "./HeroMarquee";
import { HeroScrollCue } from "./HeroScrollCue";
import { HERO_MARQUEE_DURATION_SECONDS } from "@/lib/data/hero";

export function HeroSection() {
  return (
    <section
      className="hero-section hero-section--editorial"
      id="top"
      style={
        {
          "--hero-marquee-duration": `${HERO_MARQUEE_DURATION_SECONDS}s`,
        } as React.CSSProperties
      }
    >
      <HeroBackground />
      <HeroMarqueeVertical onDark />

      <div className="hero-wrap">
        <div className="hero-copy hero-copy--mobile reveal from-left in-view">
          <HeroHeadline />
        </div>

        <div className="hero-stage reveal in-view">
          <HeroCanvas />
        </div>

        <div className="hero-scroll-slot">
          <HeroScrollCue />
        </div>

        <HeroMarqueeHorizontal />

        <div className="hero-footer">
          <div className="hero-copy hero-copy--desktop reveal from-left in-view">
            <HeroHeadline />
          </div>
        </div>
      </div>
    </section>
  );
}
