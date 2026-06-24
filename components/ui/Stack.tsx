"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
  type PanInfo,
} from "motion/react";
import {
  useCallback,
  useEffect,
  useId,
  useState,
  type ReactNode,
} from "react";
import "./Stack.css";

type AnimationConfig = {
  stiffness: number;
  damping: number;
};

type StackItem = {
  id: string;
  content: ReactNode;
  rotateOffset: number;
};

type CardRotateProps = {
  children: ReactNode;
  onSendToBack: () => void;
  sensitivity: number;
  disableDrag?: boolean;
};

function CardRotate({
  children,
  onSendToBack,
  sensitivity,
  disableDrag = false,
}: CardRotateProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [60, -60]);
  const rotateY = useTransform(x, [-100, 100], [-60, 60]);

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (
      Math.abs(info.offset.x) > sensitivity ||
      Math.abs(info.offset.y) > sensitivity
    ) {
      onSendToBack();
      return;
    }

    x.set(0);
    y.set(0);
  };

  if (disableDrag) {
    return (
      <motion.div className="stack-card-rotate--disabled">{children}</motion.div>
    );
  }

  return (
    <motion.div
      className="stack-card-rotate"
      style={{ x, y, rotateX, rotateY }}
      drag
      dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
      dragElastic={0.6}
      whileTap={{ cursor: "grabbing" }}
      onDragEnd={handleDragEnd}
    >
      {children}
    </motion.div>
  );
}

function stableRotateOffset(seed: string) {
  let hash = 0;
  for (let i = 0; i < seed.length; i += 1) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);
    hash |= 0;
  }
  return ((hash % 1000) / 1000) * 10 - 5;
}

function buildStackItems(
  cards: ReactNode[],
  idPrefix: string,
): StackItem[] {
  return cards.map((content, index) => ({
    id: `${idPrefix}-${index}`,
    content,
    rotateOffset: stableRotateOffset(`${idPrefix}-${index}`),
  }));
}

type StackProps = {
  randomRotation?: boolean;
  sensitivity?: number;
  sendToBackOnClick?: boolean;
  cards?: ReactNode[];
  animationConfig?: AnimationConfig;
  autoplay?: boolean;
  autoplayDelay?: number;
  pauseOnHover?: boolean;
  mobileClickOnly?: boolean;
  mobileBreakpoint?: number;
  className?: string;
};

export default function Stack({
  randomRotation = false,
  sensitivity = 200,
  cards = [],
  animationConfig = { stiffness: 260, damping: 20 },
  sendToBackOnClick = false,
  autoplay = false,
  autoplayDelay = 3000,
  pauseOnHover = false,
  mobileClickOnly = false,
  mobileBreakpoint = 768,
  className,
}: StackProps) {
  const idPrefix = useId();
  const prefersReducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [stack, setStack] = useState<StackItem[]>(() =>
    buildStackItems(cards, idPrefix),
  );

  useEffect(() => {
    setStack(buildStackItems(cards, idPrefix));
  }, [cards, idPrefix]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < mobileBreakpoint);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [mobileBreakpoint]);

  const shouldDisableDrag = mobileClickOnly && isMobile;
  const shouldEnableClick = sendToBackOnClick || shouldDisableDrag;
  const shouldAutoplay = autoplay && !prefersReducedMotion;

  const sendToBack = useCallback((cardId: string) => {
    setStack((prev) => {
      const next = [...prev];
      const index = next.findIndex((card) => card.id === cardId);
      if (index === -1) return prev;
      const [card] = next.splice(index, 1);
      next.unshift(card);
      return next;
    });
  }, []);

  useEffect(() => {
    if (!shouldAutoplay || stack.length <= 1 || isPaused) return;

    const interval = window.setInterval(() => {
      setStack((prev) => {
        if (prev.length <= 1) return prev;
        const next = [...prev];
        const topCard = next.pop();
        if (!topCard) return prev;
        next.unshift(topCard);
        return next;
      });
    }, autoplayDelay);

    return () => window.clearInterval(interval);
  }, [autoplayDelay, isPaused, shouldAutoplay, stack.length]);

  return (
    <div
      className={className ? `stack-container ${className}` : "stack-container"}
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
    >
      {stack.map((card, index) => {
        const randomRotate = randomRotation ? card.rotateOffset : 0;

        return (
          <CardRotate
            key={card.id}
            onSendToBack={() => sendToBack(card.id)}
            sensitivity={sensitivity}
            disableDrag={shouldDisableDrag}
          >
            <motion.div
              className="stack-card-layer"
              onClick={() => shouldEnableClick && sendToBack(card.id)}
              animate={{
                rotateZ: (stack.length - index - 1) * 4 + randomRotate,
                scale: 1 + index * 0.06 - stack.length * 0.06,
                transformOrigin: "90% 90%",
              }}
              initial={false}
              transition={{
                type: "spring",
                stiffness: animationConfig.stiffness,
                damping: animationConfig.damping,
              }}
            >
              {card.content}
            </motion.div>
          </CardRotate>
        );
      })}
    </div>
  );
}
