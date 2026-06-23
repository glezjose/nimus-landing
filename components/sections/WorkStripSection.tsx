"use client";

import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { useTranslations } from "@/components/providers/DictionaryProvider";
import type { Client } from "@/lib/data/clients";

function clientAlt(client: Client) {
  return `${client.name}${client.nameEmphasis ?? ""}`.trim();
}

function WorkCard({ client, clone = false }: { client: Client; clone?: boolean }) {
  return (
    <Link
      className="clients-arch__card"
      href="#cta"
      aria-hidden={clone || undefined}
      tabIndex={clone ? -1 : undefined}
      data-clone={clone ? "true" : undefined}
    >
      <div className="clients-arch__photo">
        <Image
          className="clients-arch__photo-img"
          src={client.photoSrc}
          alt={clientAlt(client)}
          width={400}
          height={520}
          sizes="(max-width: 860px) 78vw, 400px"
        />
        <div className="clients-arch__caption">
          <div className="clients-arch__name">
            {client.name}
            {client.nameEmphasis ? <em>{client.nameEmphasis}</em> : null}
          </div>
          <div className="clients-arch__meta">{client.meta}</div>
        </div>
      </div>
    </Link>
  );
}

export function WorkStripSection() {
  const t = useTranslations();
  const { work } = t.sections;

  return (
    <section className="clients-arch" id="trabajos">
      <div className="clients-arch__inner">
        <Reveal className="clients-arch__copy">
          <h2 className="clients-arch__title">{work.title}</h2>
          <p className="clients-arch__subtitle">{work.subtitle}</p>
        </Reveal>

        <div className="clients-arch__gallery">
          <div className="clients-arch__track-wrap">
            <div className="clients-arch__track">
              {work.clients.map((client) => (
                <WorkCard key={client.id} client={client} />
              ))}
              {work.clients.map((client) => (
                <WorkCard key={`clone-${client.id}`} client={client} clone />
              ))}
            </div>
          </div>
          <p className="clients-arch__hint">{work.swipeHint}</p>
        </div>
      </div>
    </section>
  );
}
