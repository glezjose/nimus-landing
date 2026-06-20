"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  variant?: "default" | "from-left" | "from-right" | "scale-in" | "stagger";
  as?: ElementType;
  id?: string;
};

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export function Reveal({
  children,
  className = "",
  variant = "default",
  as: Tag = "div",
  id,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  const [reduceMotion] = useState(prefersReducedMotion);

  useEffect(() => {
    if (reduceMotion) return;

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [reduceMotion]);

  const visible = reduceMotion || inView;
  const variantClass =
    variant === "stagger"
      ? "reveal-stagger"
      : variant === "default"
        ? "reveal"
        : `reveal ${variant}`;

  return (
    <Tag
      ref={ref}
      id={id}
      className={`${variantClass}${visible ? " in-view" : ""}${className ? ` ${className}` : ""}`}
    >
      {children}
    </Tag>
  );
}
