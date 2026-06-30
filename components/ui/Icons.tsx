import {
  CalendarDaysIcon,
  ChartBarIcon,
  GiftIcon,
  StarIcon,
} from "@heroicons/react/24/outline";
import { EnvelopeIcon } from "@heroicons/react/24/solid";
import { config } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faGoogle,
  faInstagram,
  faLinkedinIn,
  faTiktok,
  faWhatsapp,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import {
  faEnvelope,
  faGlobe,
  faMapLocationDot,
  faStar,
  faUtensils,
} from "@fortawesome/free-solid-svg-icons";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import type { TapBarTileIcon } from "@/lib/data/tapbar-tiles";

config.autoAddCss = false;

const chipIconMap: Record<TapBarTileIcon, IconDefinition> = {
  instagram: faInstagram,
  whatsapp: faWhatsapp,
  tiktok: faTiktok,
  facebook: faFacebookF,
  linkedin: faLinkedinIn,
  youtube: faYoutube,
  google: faGoogle,
  reviews: faStar,
  maps: faMapLocationDot,
  menu: faUtensils,
  web: faGlobe,
  email: faEnvelope,
};

type PhotoPlaceholderProps = {
  label: string;
  className?: string;
};

export function PhotoPlaceholder({ label, className = "" }: PhotoPlaceholderProps) {
  return (
    <div className={`photo-placeholder${className ? ` ${className}` : ""}`} aria-hidden="true">
      {label}
    </div>
  );
}

export type ContactChannel = "whatsapp" | "email" | "instagram";

const ctaChannelIconProps = {
  className: "cta-contact-icon__svg",
  "aria-hidden": true as const,
};

export function CtaChannelIcon({ channel }: { channel: ContactChannel }) {
  switch (channel) {
    case "whatsapp":
      return (
        <FontAwesomeIcon
          icon={faWhatsapp}
          className="cta-contact-icon__svg"
          fixedWidth
          aria-hidden="true"
        />
      );
    case "email":
      return <EnvelopeIcon {...ctaChannelIconProps} />;
    case "instagram":
      return (
        <FontAwesomeIcon
          icon={faInstagram}
          className="cta-contact-icon__svg"
          fixedWidth
          aria-hidden="true"
        />
      );
  }
}

export function ChipIcon({ type }: { type: TapBarTileIcon }) {
  const icon = chipIconMap[type] ?? faGlobe;

  return (
    <FontAwesomeIcon
      icon={icon}
      className="tapbar-tile-marquee__icon"
      fixedWidth
      aria-hidden="true"
    />
  );
}

export function SystemIcon({ type }: { type: "star" | "calendar" | "reviews" | "chart" }) {
  const iconProps = {
    width: 22,
    height: 22,
    strokeWidth: 1.5,
    "aria-hidden": true as const,
  };

  switch (type) {
    case "star":
      return <GiftIcon {...iconProps} />;
    case "calendar":
      return <CalendarDaysIcon {...iconProps} />;
    case "reviews":
      return <StarIcon {...iconProps} />;
    default:
      return <ChartBarIcon {...iconProps} />;
  }
}
