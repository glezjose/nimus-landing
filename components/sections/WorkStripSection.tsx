"use client";

import Image from "next/image";
import { useMemo } from "react";
import { Reveal } from "@/components/ui/Reveal";
import Stack from "@/components/ui/Stack";
import { useTranslations } from "@/components/providers/DictionaryProvider";
import type { Client } from "@/lib/data/clients";
import { WorkScrollCue } from "./WorkScrollCue";

function clientAlt(client: Client) {
  return `${client.name}${client.nameEmphasis ?? ""}`.trim();
}

function WorkCard({ client }: { client: Client }) {
  return (
    <div className="clients-arch__card">
      <div className="clients-arch__photo">
        <Image
          className="clients-arch__photo-img"
          src={client.photoSrc}
          alt={clientAlt(client)}
          width={460}
          height={598}
          sizes="(max-width: 860px) 78vw, 460px"
          draggable={false}
        />
        <div className="clients-arch__caption">
          <div className="clients-arch__name">
            {client.name}
            {client.nameEmphasis ? <em>{client.nameEmphasis}</em> : null}
          </div>
          <div className="clients-arch__meta">{client.meta}</div>
        </div>
      </div>
    </div>
  );
}

export function WorkStripSection() {
  const t = useTranslations();
  const { work } = t.sections;

  const stackCards = useMemo(
    () => work.clients.map((client) => <WorkCard key={client.id} client={client} />),
    [work.clients],
  );

  return (
    <section className="clients-arch" id="trabajos">
      <div className="clients-arch__inner">
        <div className="clients-arch__body">
          <div className="clients-arch__head">
            <Reveal className="clients-arch__lead">
              <h2 className="clients-arch__title">{work.title}</h2>
            </Reveal>

            <Reveal className="clients-arch__trail">
              <p className="clients-arch__subtitle">{work.subtitle}</p>
            </Reveal>
          </div>

          <div className="clients-arch__gallery">
            <div className="clients-arch__stack-wrap">
              <Stack
                cards={stackCards}
                randomRotation
                sensitivity={180}
                sendToBackOnClick
                autoplay
                autoplayDelay={3200}
                pauseOnHover
                mobileClickOnly
              />
            </div>
          </div>
        </div>

        <div className="clients-arch__scroll-slot">
          <WorkScrollCue />
        </div>
      </div>
    </section>
  );
}
