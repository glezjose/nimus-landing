"use client";

import Lottie from "lottie-react";
import { useEffect, useRef } from "react";
import type { LottieRefCurrentProps } from "lottie-react";
import menuAnimation from "@/public/assets/animations/menu.json";

const MENU_CLOSED_FRAME = 0;
const MENU_OPEN_FRAME = 59;
const MENU_SPEED = 2;

type NavMenuLottieIconProps = {
  open: boolean;
};

export function NavMenuLottieIcon({ open }: NavMenuLottieIconProps) {
  const lottieRef = useRef<LottieRefCurrentProps | null>(null);
  const openRef = useRef(open);

  openRef.current = open;

  useEffect(() => {
    const anim = lottieRef.current;
    if (!anim) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    anim.setSpeed(MENU_SPEED);

    if (reducedMotion) {
      anim.goToAndStop(open ? MENU_OPEN_FRAME : MENU_CLOSED_FRAME, true);
      return;
    }

    if (open) {
      anim.setDirection(1);
      anim.goToAndStop(MENU_CLOSED_FRAME, true);
      anim.playSegments([MENU_CLOSED_FRAME, MENU_OPEN_FRAME], true);
      return;
    }

    anim.setDirection(-1);
    anim.goToAndStop(MENU_OPEN_FRAME, true);
    anim.playSegments([MENU_OPEN_FRAME, MENU_CLOSED_FRAME], true);
  }, [open]);

  return (
    <Lottie
      lottieRef={lottieRef}
      animationData={menuAnimation}
      loop={false}
      autoplay={false}
      className="nav-menu__trigger-lottie"
      aria-hidden
      onDOMLoaded={() => {
        const anim = lottieRef.current;
        if (!anim) return;
        anim.setSpeed(MENU_SPEED);
        anim.goToAndStop(
          openRef.current ? MENU_OPEN_FRAME : MENU_CLOSED_FRAME,
          true,
        );
      }}
    />
  );
}
