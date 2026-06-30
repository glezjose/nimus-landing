export type HeroDestination = {
  name: string;
  handle: string;
  action: string;
  tag: string;
  avatar: string;
  color: string;
  gradient: string;
};

export type HeroChip = {
  label: string;
  color: string;
  icon: "instagram" | "reviews" | "whatsapp" | "menu" | "tiktok" | "web";
};

export const heroChips: HeroChip[] = [
  { label: "Instagram", color: "#e1306c", icon: "instagram" },
  { label: "Reseñas", color: "#fbbc04", icon: "reviews" },
  { label: "WhatsApp", color: "#25d366", icon: "whatsapp" },
  { label: "Menú", color: "#b1b7bd", icon: "menu" },
  { label: "TikTok", color: "#69c9d0", icon: "tiktok" },
  { label: "Web", color: "#7c5cbf", icon: "web" },
];

export const heroDestinations: HeroDestination[] = [
  {
    name: "@tu_marca",
    handle: "Instagram",
    action: "Seguir",
    tag: "PERFIL · 12.4K",
    avatar: "i",
    color: "#e1306c",
    gradient: "linear-gradient(160deg, #833ab4 0%, #e1306c 50%, #fd1d1d 100%)",
  },
  {
    name: "Tu Negocio",
    handle: "Google Reviews",
    action: "Reseñar",
    tag: "4.8 ★★★★★",
    avatar: "G",
    color: "#fbbc04",
    gradient: "linear-gradient(160deg, var(--brand-blue) 0%, var(--black) 100%)",
  },
  {
    name: "+52 999 NIMUS",
    handle: "WhatsApp · en línea",
    action: "Abrir",
    tag: "CHAT DIRECTO",
    avatar: "W",
    color: "#25d366",
    gradient: "linear-gradient(160deg, var(--brand-blue) 0%, var(--black) 100%)",
  },
  {
    name: "Menú Digital",
    handle: "tunegocio.menu",
    action: "Ver",
    tag: "32 PLATILLOS",
    avatar: "M",
    color: "#b1b7bd",
    gradient: "linear-gradient(160deg, var(--brand-blue) 0%, var(--black) 100%)",
  },
  {
    name: "@tu_marca",
    handle: "TikTok",
    action: "Seguir",
    tag: "8.2K SEGUIDORES",
    avatar: "t",
    color: "#69c9d0",
    gradient: "linear-gradient(160deg, var(--brand-blue) 0%, var(--black) 100%)",
  },
  {
    name: "tunegocio.mx",
    handle: "Sitio oficial",
    action: "Abrir",
    tag: "CATÁLOGO",
    avatar: "↗",
    color: "#7c5cbf",
    gradient: "linear-gradient(160deg, var(--brand-blue) 0%, var(--black) 100%)",
  },
];

export const marqueeItems = [
  "Un tap → Instagram",
  "Menú digital al instante",
  "Más reseñas en Google",
  "WhatsApp directo",
  "Reprogramable sin costo",
  "Desde 10 piezas",
  "Listo en 3–5 días",
  "Diseño 100% a tu marca",
];

/** Radians of idle sway on each side of center (180° total arc). */
export const HERO_IDLE_HALF_ARC = Math.PI / 2;

/** Angular speed of hero model idle sway (rad/s factor in sin(elapsed * speed)). */
export const HERO_IDLE_SPEED = 0.2;

/** One full idle sway cycle — shared with hero marquee loop duration. */
export const HERO_IDLE_CYCLE_SECONDS = (2 * Math.PI) / HERO_IDLE_SPEED;

export const HERO_MARQUEE_DURATION_SECONDS = HERO_IDLE_CYCLE_SECONDS;

export const HERO_NEXT_SECTION_ID = "trabajos";

/** Scroll target for the hero cue — lands past the inter-section dead space. */
export const TRABAJOS_INTRO_ID = "trabajos-intro";

export const TAPBAR_SECTION_ID = "tapbar";

export const PROCESO_SECTION_ID = "proceso";
export const ORIGEN_SECTION_ID = "origen";
export const SISTEMAS_SECTION_ID = "sistemas";

/** Clearance below the work outro cue when jumping to Tap Bar */
export const TAPBAR_SCROLL_PAST_CUE_PADDING = 16;

/** Match Tap Bar / model mobile layout breakpoint */
export const MOBILE_LAYOUT_MQ = "(max-width: 1000px)";

export const scrollDotSections = [
  { target: "#top", label: "Inicio" },
  { target: "#tapbar", label: "Tap Bar" },
  { target: "#productos", label: "Productos" },
  { target: "#paquetes", label: "Paquetes" },
  { target: "#preguntas", label: "FAQ" },
  { target: "#cta", label: "Cotizar" },
];
