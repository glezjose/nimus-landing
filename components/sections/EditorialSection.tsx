import { Reveal } from "@/components/ui/Reveal";

export function EditorialSection() {
  return (
    <section className="editorial">
      <div className="editorial-bg" />
      <div className="editorial-marks">
        <span className="editorial-mark tl">Interface module · rev 2.1</span>
        <span className="editorial-mark tr">Tap to connect</span>
        <span className="editorial-mark bl">PLA matte · NTAG215</span>
        <span className="editorial-mark br">Dimensions · 150mm</span>
      </div>
      <Reveal className="editorial-inner">
        <div>
          <h2>
            Pensado para marcas que <em>cuidan a sus clientes.</em>
          </h2>
        </div>
        <div className="editorial-side">
          <div className="label">El por qué</div>
          <p>
            <strong>
              Cada día, negocios pierden contacto con clientes que ya estuvieron ahí
            </strong>
            — no por falta de esfuerzo, sino por un instante de fricción. El cliente sale
            del local, olvida seguir la cuenta, nunca deja la reseña.
          </p>
          <p>
            Una pieza física en su mesa o en su mano cierra ese hueco en un solo toque.
            Sin app, sin suscripción, sin login. La pieza llega lista y tus enlaces siguen
            siendo tuyos — los actualizas cuando quieras, sin que nada caduque.
          </p>
        </div>
      </Reveal>
    </section>
  );
}
