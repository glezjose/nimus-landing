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
  { label: "Menú", color: "#7d7d7d", icon: "menu" },
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
    gradient: "linear-gradient(160deg, #4285f4 0%, #1f1f1c 100%)",
  },
  {
    name: "+52 999 NIMUS",
    handle: "WhatsApp · en línea",
    action: "Abrir",
    tag: "CHAT DIRECTO",
    avatar: "W",
    color: "#25d366",
    gradient: "linear-gradient(160deg, #075e54 0%, #1a1a17 100%)",
  },
  {
    name: "Menú Digital",
    handle: "tunegocio.menu",
    action: "Ver",
    tag: "32 PLATILLOS",
    avatar: "M",
    color: "#7d7d7d",
    gradient: "linear-gradient(160deg, #2a2620 0%, #1a1714 100%)",
  },
  {
    name: "@tu_marca",
    handle: "TikTok",
    action: "Seguir",
    tag: "8.2K SEGUIDORES",
    avatar: "t",
    color: "#69c9d0",
    gradient: "linear-gradient(160deg, #1a1a17 0%, #0a0a08 100%)",
  },
  {
    name: "tunegocio.mx",
    handle: "Sitio oficial",
    action: "Abrir",
    tag: "CATÁLOGO",
    avatar: "↗",
    color: "#7c5cbf",
    gradient: "linear-gradient(160deg, #3d2e5e 0%, #1a1a17 100%)",
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

export const scrollDotSections = [
  { target: "#top", label: "Inicio" },
  { target: "#tapbar", label: "Tap Bar" },
  { target: "#productos", label: "Productos" },
  { target: "#paquetes", label: "Paquetes" },
  { target: "#preguntas", label: "FAQ" },
  { target: "#cta", label: "Cotizar" },
];
