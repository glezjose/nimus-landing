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
  switch (type) {
    case "star":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2.5l2.5 5 5.5.8-4 3.9.9 5.5L12 15l-5 2.7.9-5.5-4-3.9 5.5-.8z" />
        </svg>
      );
    case "calendar":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="5" width="18" height="16" rx="2" />
          <line x1="3" y1="10" x2="21" y2="10" />
          <line x1="8" y1="3" x2="8" y2="7" />
          <line x1="16" y1="3" x2="16" y2="7" />
        </svg>
      );
    case "reviews":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l2.5 6.5L21 9l-5 4.5L17.5 21 12 17.5 6.5 21l1.5-7.5L3 9l6.5-.5z" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <line x1="4" y1="20" x2="4" y2="14" />
          <line x1="10" y1="20" x2="10" y2="10" />
          <line x1="16" y1="20" x2="16" y2="6" />
          <line x1="22" y1="20" x2="22" y2="13" />
        </svg>
      );
  }
}
