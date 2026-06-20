import { HeroBackground } from "./HeroBackground";
import { HeroCanvas } from "./HeroCanvas";
import { HeroHeadline } from "./HeroHeadline";
import { HeroMarqueeHorizontal, HeroMarqueeVertical } from "./HeroMarquee";

export function HeroSection() {
  return (
    <section className="hero-section hero-section--editorial" id="top">
      <HeroBackground />
      <HeroMarqueeVertical onDark />

      <div className="hero-wrap">
        <div className="hero-copy hero-copy--mobile reveal from-left in-view">
          <HeroHeadline />
        </div>

        <div className="hero-stage reveal in-view">
          <HeroCanvas />
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
