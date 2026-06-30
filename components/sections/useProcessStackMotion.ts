"use client";

import { useEffect, useState } from "react";

const MOBILE_STACK_QUERY = "(max-width: 980px)";

/**
 * Enables the scroll-stack animation on desktop only.
 * Mobile uses the static card list — the stack effect is unreliable on small screens.
 */
export function useProcessStackMotion() {
  const [enabled, setEnabled] = useState<boolean | null>(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobile = window.matchMedia(MOBILE_STACK_QUERY);

    const update = () => {
      setEnabled(!reducedMotion.matches && !mobile.matches);
    };

    update();
    reducedMotion.addEventListener("change", update);
    mobile.addEventListener("change", update);

    return () => {
      reducedMotion.removeEventListener("change", update);
      mobile.removeEventListener("change", update);
    };
  }, []);

  return enabled;
}
