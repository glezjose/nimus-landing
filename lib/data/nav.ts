export const navLinks = [
  { href: "#productos", label: "Productos" },
  { href: "#tapbar", label: "Tap Bar" },
  { href: "#paquetes", label: "Paquetes" },
  { href: "#preguntas", label: "FAQ" },
];

/** Sections with #fdf9ef (or similar) surfaces — nav inverts to light chrome */
export const NAV_CREAM_SECTION_IDS = [
  "tapbar",
  "productos",
  "tapbase",
] as const;

export function isNavOverCreamSurface(navBottom = 72): boolean {
  if (typeof document === "undefined") return false;

  const probeY = navBottom + 4;

  return NAV_CREAM_SECTION_IDS.some((id) => {
    const section = document.getElementById(id);
    if (!section) return false;
    const rect = section.getBoundingClientRect();
    return rect.top <= probeY && rect.bottom > probeY;
  });
}
