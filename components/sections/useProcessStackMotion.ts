"use client";

import { useEffect, useState } from "react";

/**
 * Enables the scroll-stack animation unless the user prefers reduced motion.
 * Works on both desktop and mobile since the stack uses native window scroll
 * (no nested scroller, no Lenis) and therefore never traps the page scroll.
 */
export function useProcessStackMotion() {
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setEnabled(!query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return enabled;
}
