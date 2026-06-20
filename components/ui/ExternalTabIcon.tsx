import { ArrowUpRightIcon } from "@heroicons/react/24/solid";

type ExternalTabIconProps = {
  size?: number;
  className?: string;
};

export function ExternalTabIcon({ size = 14, className }: ExternalTabIconProps) {
  return (
    <ArrowUpRightIcon
      width={size}
      height={size}
      aria-hidden
      className={className}
    />
  );
}
