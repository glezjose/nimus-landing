"use client";

import { useCallback, useEffect, useState } from "react";

export function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  const update = useCallback(() => {
    const maxScroll =
      document.documentElement.scrollHeight - window.innerHeight;
    if (maxScroll <= 0) {
      setProgress(0);
      return;
    }
    setProgress(Math.min(100, Math.round((window.scrollY / maxScroll) * 100)));
  }, []);

  useEffect(() => {
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [update]);

  return progress;
}
