import { ArrowRightIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

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
      <ChevronRightIcon
        className="hover-arrow__from"
        width={size}
        height={size}
      />
      <ArrowRightIcon className="hover-arrow__to" width={size} height={size} />
    </span>
  );
}
