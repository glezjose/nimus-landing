import { ArrowRight, CaretRight } from "@phosphor-icons/react";

type HoverArrowIconProps = {
  size?: number;
  className?: string;
};

export function HoverArrowIcon({ size = 16, className }: HoverArrowIconProps) {
  return (
    <span
      className={["hover-arrow", className].filter(Boolean).join(" ")}
      aria-hidden
    >
      <CaretRight className="hover-arrow__from" size={size} weight="bold" />
      <ArrowRight className="hover-arrow__to" size={size} weight="bold" />
    </span>
  );
}
