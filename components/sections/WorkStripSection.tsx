import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { PhotoPlaceholder } from "@/components/ui/Icons";
import { clients } from "@/lib/data/clients";

function WorkCard({ client, clone = false }: { client: (typeof clients)[0]; clone?: boolean }) {
  return (
    <Link
      className="work-card"
      href="#cta"
      aria-hidden={clone || undefined}
      data-clone={clone ? "true" : undefined}
    >
      <div className="work-photo" data-tag={client.tag}>
        <PhotoPlaceholder label="Foto del cliente" />
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
  return (
    <section className="work-strip" id="trabajos">
      <Reveal className="work-head">
        <div>
          <div className="sk">Trabajamos con</div>
          <h2>
            Marcas que ya entregan en <em>un toque</em>.
          </h2>
        </div>
        <div className="work-note">+40 negocios activos · México y LATAM</div>
      </Reveal>
      <div className="work-track-wrap">
        <div className="work-track">
          {clients.map((client) => (
            <WorkCard key={client.id} client={client} />
          ))}
          {clients.map((client) => (
            <WorkCard key={`clone-${client.id}`} client={client} clone />
          ))}
        </div>
      </div>
    </section>
  );
}
