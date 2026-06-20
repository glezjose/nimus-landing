import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { packs } from "@/lib/data/packs";

export function PacksSection() {
  return (
    <section className="section" id="paquetes">
      <Reveal className="section-head">
        <div>
          <div className="sk">Paquetes comerciales</div>
          <h2>
            Soluciones <em>completas</em>
            <br />
            para cada tipo de negocio.
          </h2>
        </div>
        <div className="lede">
          Tres tickets pensados para llegar listos a operar — desde cafetería hasta
          restaurante o experiencia premium. Productos, programación y servicio
          en un solo precio.
        </div>
      </Reveal>

      <Reveal variant="stagger" className="packs">
        {packs.map((pack) => (
          <div
            key={pack.id}
            className="pack"
            data-featured={pack.featured ? "true" : undefined}
            style={{ "--pack-color": pack.color } as React.CSSProperties}
          >
            <div className="pack-name">{pack.name}</div>
            <div className="pack-price">
              {pack.price} <small>MXN</small>
            </div>
            <p className="pack-desc">{pack.description}</p>
            <div className="pack-items">
              {pack.items.map((item) => (
                <div key={item} className="pack-item">
                  {item}
                </div>
              ))}
            </div>
            <Link className="btn btn-ghost" href="#cta">
              {pack.featured ? "Cotizar este pack" : "Empezar aquí"}
            </Link>
          </div>
        ))}
      </Reveal>
    </section>
  );
}
