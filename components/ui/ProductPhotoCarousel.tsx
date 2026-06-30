"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

type ProductPhotoCarouselProps = {
  images: readonly string[];
  label: string;
  intervalMs?: number;
};

export function ProductPhotoCarousel({
  images,
  label,
  intervalMs = 4200,
}: ProductPhotoCarouselProps) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    setReduceMotion(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    );
  }, []);

  const goTo = useCallback(
    (nextIndex: number) => {
      setIndex((nextIndex + images.length) % images.length);
    },
    [images.length],
  );

  useEffect(() => {
    if (images.length <= 1 || paused || reduceMotion) return;

    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % images.length);
    }, intervalMs);

    return () => window.clearInterval(timer);
  }, [images.length, intervalMs, paused, reduceMotion]);

  if (images.length === 0) return null;

  const handleDotClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <div
      className="product-photo-carousel"
      aria-label={label}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setPaused(false);
        }
      }}
    >
      <div className="product-photo-carousel__viewport">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={images[index]}
            className="product-photo-carousel__slide"
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -4 }}
            transition={
              reduceMotion
                ? { duration: 0 }
                : { duration: 0.28, ease: [0.2, 0, 0, 1] }
            }
          >
            <Image
              src={images[index]}
              alt=""
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 400px"
              className="product-photo-carousel__image"
              priority={index === 0}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {images.length > 1 ? (
        <div
          className="product-photo-carousel__dots"
          role="tablist"
          aria-label={label}
        >
          {images.map((image, dotIndex) => (
            <button
              key={image}
              type="button"
              role="tab"
              className="product-photo-carousel__dot"
              aria-selected={dotIndex === index}
              aria-label={`${label} ${dotIndex + 1}`}
              onClick={(event) => {
                handleDotClick(event);
                goTo(dotIndex);
              }}
            >
              <span className="product-photo-carousel__dot-mark" aria-hidden="true" />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
