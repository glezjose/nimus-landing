export const NAV_SECTION_KEYS = [
  "work",
  "tapbar",
  "catalog",
  "process",
  "origin",
  "systems",
  "packs",
  "faq",
] as const;

export type NavSectionKey = (typeof NAV_SECTION_KEYS)[number];

export const NAV_SECTION_HREFS: Record<NavSectionKey, string> = {
  work: "#trabajos",
  tapbar: "#tapbar",
  catalog: "#product-catalog",
  process: "#proceso",
  origin: "#origen",
  systems: "#sistemas",
  packs: "#paquetes",
  faq: "#preguntas",
};

export function buildNavLinks(labels: Record<NavSectionKey, string>) {
  return NAV_SECTION_KEYS.map((key) => ({
    href: NAV_SECTION_HREFS[key],
    label: labels[key],
  }));
}

/** Sections with light/cream surfaces — nav inverts to light chrome */
export const NAV_CREAM_SECTION_IDS = [
  "tapbar",
  "productos",
  "tapbase",
  "sistemas",
  "paquetes",
  "preguntas",
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
