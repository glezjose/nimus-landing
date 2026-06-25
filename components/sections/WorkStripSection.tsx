"use client";

import { useMemo } from "react";
import BlurText from "@/components/ui/BlurText";
import { ScrollTiltedGrid, type GridTile } from "@/components/ruixen/scroll-tilted-grid";
import { useTranslations } from "@/components/providers/DictionaryProvider";
import { WorkScrollCue } from "./WorkScrollCue";

const GRID_CLIENT_COUNT = 10;

export function WorkStripSection() {
  const t = useTranslations();
  const { work } = t.sections;

  const gridTiles = useMemo<GridTile[]>(
    () =>
      work.clients.slice(0, GRID_CLIENT_COUNT).map((client) => ({
        src: client.photoSrc,
        caption: {
          name: client.name,
          nameEmphasis: client.nameEmphasis,
        },
      })),
    [work.clients],
  );

  return (
    <section className="clients-arch" id="trabajos">
      <div className="clients-arch__stage clients-arch__stage--intro" id="trabajos-intro">
        <div className="clients-arch__stage-inner">
          <BlurText
            as="h2"
            text={work.title}
            className="clients-arch__blur-title"
            animateBy="words"
            direction="top"
            delay={120}
            stepDuration={0.32}
          />
        </div>
        <div className="clients-arch__scroll-slot clients-arch__scroll-slot--intro">
          <WorkScrollCue />
        </div>
      </div>

      <ScrollTiltedGrid
        className="clients-arch__grid"
        tiles={gridTiles}
        loop={false}
        aspectRatio="400/520"
        maxWidth="3xl"
        gap={10}
        rounded="28px"
        maxTilt={64}
        maxBlur={7}
        sectionPadding="14vh"
      />

      <div className="clients-arch__stage clients-arch__stage--outro">
        <div className="clients-arch__stage-inner">
          <BlurText
            as="p"
            text={work.subtitle}
            className="clients-arch__blur-subtitle"
            animateBy="words"
            direction="top"
            delay={120}
            stepDuration={0.32}
            replayOnReenter
          />
        </div>
        <div className="clients-arch__scroll-slot clients-arch__scroll-slot--outro">
          <WorkScrollCue variant="tapbar" />
        </div>
      </div>
    </section>
  );
}
