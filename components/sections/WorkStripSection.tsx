"use client";

import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { PhotoPlaceholder } from "@/components/ui/Icons";
import { useTranslations } from "@/components/providers/DictionaryProvider";

function WorkCard({
  client,
  clone = false,
}: {
  client: {
    id: string;
    tag: string;
    name: string;
    nameEmphasis?: string;
    meta: string;
  };
  clone?: boolean;
}) {
  const t = useTranslations();

  return (
    <Link
      className="work-card"
      href="#cta"
      aria-hidden={clone || undefined}
      data-clone={clone ? "true" : undefined}
    >
      <div className="work-photo" data-tag={client.tag}>
        <PhotoPlaceholder label={t.sections.work.photoPlaceholder} />
      </div>
      <div className="work-name">
        {client.name}
        {client.nameEmphasis ? <em>{client.nameEmphasis}</em> : null}
      </div>
      <div className="work-meta">{client.meta}</div>
    </Link>
  );
}

export function WorkStripSection() {
  const t = useTranslations();
  const { work } = t.sections;

  return (
    <section className="work-strip" id="trabajos">
      <Reveal className="work-head">
        <div>
          <div className="sk">{work.sk}</div>
          <h2>
            {work.titleBefore}
            <em>{work.titleEmphasis}</em>
            {work.titleAfter}
          </h2>
        </div>
        <div className="work-note">{work.note}</div>
      </Reveal>
      <div className="work-track-wrap">
        <div className="work-track">
          {work.clients.map((client) => (
            <WorkCard key={client.id} client={client} />
          ))}
          {work.clients.map((client) => (
            <WorkCard key={`clone-${client.id}`} client={client} clone />
          ))}
        </div>
      </div>
    </section>
  );
}
