import { ArrowUpRight } from "@phosphor-icons/react";

type ExternalTabIconProps = {
  size?: number;
  className?: string;
};

export function ExternalTabIcon({ size = 14, className }: ExternalTabIconProps) {
  return (
    <ArrowUpRight
      size={size}
      weight="bold"
      aria-hidden
      className={className}
    />
  );
}
