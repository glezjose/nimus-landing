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

export function ChipIcon({ type }: { type: string }) {
  switch (type) {
    case "instagram":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r=".6" fill="currentColor" />
        </svg>
      );
    case "reviews":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2 L14.5 8.5 L21.5 9.2 L16.2 13.8 L17.8 20.7 L12 17.1 L6.2 20.7 L7.8 13.8 L2.5 9.2 L9.5 8.5 Z" />
        </svg>
      );
    case "whatsapp":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.5C6.8 2.5 2.6 6.7 2.6 11.9c0 1.8.5 3.5 1.4 5L2.5 21.5l4.7-1.4c1.4.8 3.1 1.3 4.8 1.3 5.2 0 9.4-4.2 9.4-9.4S17.2 2.5 12 2.5zm5.5 13.3c-.2.6-1.2 1.2-1.7 1.3-.4.1-1 .1-1.6-.1-.4-.1-.9-.3-1.5-.6-2.7-1.2-4.4-3.9-4.6-4.1-.1-.2-1-1.4-1-2.7 0-1.3.7-1.9.9-2.2.2-.2.5-.3.7-.3h.5c.2 0 .4 0 .6.4.2.5.7 1.8.8 1.9.1.1.1.3 0 .5-.1.2-.2.3-.3.4-.2.2-.3.4-.5.6-.1.2-.3.4-.1.7s.6 1.1 1.4 1.7c1 .9 1.8 1.2 2.1 1.3.3.2.4.1.6-.1.2-.2.7-.8.9-1 .2-.3.4-.2.7-.1.3.1 1.7.8 2 1 .3.2.5.2.6.3 0 .2 0 .8-.2 1.4z" />
        </svg>
      );
    case "menu":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <rect x="5" y="3" width="14" height="18" rx="1.5" />
          <line x1="8" y1="8" x2="16" y2="8" />
          <line x1="8" y1="12" x2="16" y2="12" />
          <line x1="8" y1="16" x2="13" y2="16" />
        </svg>
      );
    case "tiktok":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M16.6 5.8c-1-1-1.5-2.3-1.5-3.6h-3v13.5c-.1 1.4-1.2 2.5-2.6 2.5-1.5 0-2.6-1.2-2.6-2.6 0-1.6 1.5-2.8 3.1-2.3v-3.1c-3.3-.4-6.2 2.2-6.2 5.4 0 3.1 2.6 5.3 5.3 5.3 2.9 0 5.3-2.4 5.3-5.3V9.7c1.2.8 2.5 1.3 4 1.3v-3c0 0-1.8 0-2.8-2.2z" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18" />
          <path d="M12 3c2.5 3 2.5 15 0 18M12 3c-2.5 3-2.5 15 0 18" />
        </svg>
      );
  }
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
