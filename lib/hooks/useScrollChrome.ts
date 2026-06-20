"use client";

import { useCallback, useEffect, useState } from "react";

export function useScrollChrome() {
  const [navScrolled, setNavScrolled] = useState(false);
  const [floatCtaVisible, setFloatCtaVisible] = useState(false);
  const [toTopVisible, setToTopVisible] = useState(false);
  const [menuHiddenAtCta, setMenuHiddenAtCta] = useState(false);

  const onScroll = useCallback(() => {
    const y = window.scrollY;
    setNavScrolled(y > 20);
    setFloatCtaVisible(
      y > 600 && y < document.body.scrollHeight - window.innerHeight - 400,
    );
    setToTopVisible(y > window.innerHeight);

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
    const frame = requestAnimationFrame(onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, [onScroll]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return {
    navScrolled,
    floatCtaVisible,
    toTopVisible,
    menuHiddenAtCta,
    scrollToTop,
  };
}
