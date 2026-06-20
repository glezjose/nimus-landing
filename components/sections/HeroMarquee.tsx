import { marqueeItems } from "@/lib/data/hero";

function MarqueePills({
  items,
  prefix,
}: {
  items: string[];
  prefix: string;
}) {
  return (
    <>
      {items.map((item, i) => (
        <span key={`${prefix}-${item}-${i}`} className="hero-marquee__pill">
          {item}
        </span>
      ))}
    </>
  );
}

export function HeroMarqueeVertical({ onDark = true }: { onDark?: boolean }) {
  const items = [...marqueeItems, ...marqueeItems];

  return (
    <div
      className={`hero-marquee hero-marquee--vertical${onDark ? " hero-marquee--on-dark" : ""}`}
      aria-hidden="true"
    >
      <div className="hero-marquee__viewport hero-marquee__viewport--vertical">
        <div className="hero-marquee__track hero-marquee__track--vertical">
          <MarqueePills items={items} prefix="v" />
        </div>
      </div>
    </div>
  );
}

export function HeroMarqueeHorizontal() {
  const items = [...marqueeItems, ...marqueeItems];

  return (
    <div
      className="hero-marquee hero-marquee--horizontal hero-marquee--on-dark"
      aria-hidden="true"
    >
      <div className="hero-marquee__viewport hero-marquee__viewport--horizontal">
        <div className="hero-marquee__track hero-marquee__track--horizontal">
          <MarqueePills items={items} prefix="h" />
        </div>
      </div>
    </div>
  );
}
