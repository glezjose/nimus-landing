"use client";

import { useCallback, useEffect, useState } from "react";
import { isNavOverCreamSurface } from "@/lib/data/nav";

export function useScrollChrome() {
  const [navScrolled, setNavScrolled] = useState(false);
  const [navOnCream, setNavOnCream] = useState(false);
  const [menuHiddenAtCta, setMenuHiddenAtCta] = useState(false);

  const onScroll = useCallback(() => {
    const y = window.scrollY;
    setNavScrolled(y > 20);

    const nav = document.querySelector(".topnav");
    const navBottom = nav?.getBoundingClientRect().bottom ?? 72;
    setNavOnCream(isNavOverCreamSurface(navBottom));

    const cta = document.getElementById("cta");
    if (cta) {
      const rect = cta.getBoundingClientRect();
      const navBottom = 72;
      const enteredCta = rect.top <= navBottom;
      const stillInCta = rect.bottom > navBottom;
      setMenuHiddenAtCta(enteredCta && stillInCta);
    } else {
      setMenuHiddenAtCta(false);
    }

    const orbHero = document.querySelector(".hero-orb") as HTMLElement | null;
    if (orbHero) {
      const offset = Math.min(y * 0.25, 200);
      orbHero.style.transform = `translateY(${offset}px)`;
    }

    const orbCta = document.querySelector(".cta-orb") as HTMLElement | null;
    if (orbCta) {
      const r = orbCta.getBoundingClientRect();
      const offset = (window.innerHeight - r.top) * 0.08;
      orbCta.style.transform = `translateY(${-offset}px)`;
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    const frame = requestAnimationFrame(onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [onScroll]);

  return {
    navScrolled,
    navOnCream,
    menuHiddenAtCta,
  };
}
