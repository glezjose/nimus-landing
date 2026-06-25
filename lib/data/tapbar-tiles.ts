export type TapBarTileIcon =
  | "google"
  | "reviews"
  | "instagram"
  | "whatsapp"
  | "menu"
  | "tiktok"
  | "web"
  | "facebook"
  | "linkedin"
  | "youtube"
  | "maps"
  | "email";

export type TapBarTile = {
  id: string;
  icon: TapBarTileIcon;
  label: string;
  color: string;
};

/** Destinations customers can assign to Tap Bar tiles */
export const tapBarTiles: TapBarTile[] = [
  { id: "google", icon: "reviews", label: "Google Reviews", color: "#fbbc04" },
  { id: "instagram", icon: "instagram", label: "Instagram", color: "#e1306c" },
  { id: "whatsapp", icon: "whatsapp", label: "WhatsApp", color: "#25d366" },
  { id: "menu", icon: "menu", label: "Menú digital", color: "#ffffff" },
  { id: "tiktok", icon: "tiktok", label: "TikTok", color: "#ffffff" },
  { id: "web", icon: "web", label: "Sitio web", color: "#7c5cbf" },
  { id: "facebook", icon: "facebook", label: "Facebook", color: "#1877f2" },
  { id: "linkedin", icon: "linkedin", label: "LinkedIn", color: "#0a66c2" },
  { id: "youtube", icon: "youtube", label: "YouTube", color: "#ff0000" },
  { id: "maps", icon: "maps", label: "Google Maps", color: "#34a853" },
  { id: "email", icon: "email", label: "Email", color: "#ea4335" },
];
