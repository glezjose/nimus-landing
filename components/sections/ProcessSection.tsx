import { Reveal } from "@/components/ui/Reveal";
import { processSteps } from "@/lib/data/content";

export function ProcessSection() {
  return (
    <section className="section dark">
      <div className="section section-narrow" style={{ padding: "0 0" }}>
        <Reveal className="section-head">
          <div>
            <div className="sk">Proceso · 4 pasos</div>
            <h2 style={{ color: "var(--bg)" }}>
              Del brief a <em>tu mostrador</em> en menos de una semana.
            </h2>
          </div>
          <div className="lede">
            Operación corta, sin intermediarios y con producción local. Modelado, prueba
            e impresión bajo el mismo techo.
          </div>
        </Reveal>

        <Reveal variant="stagger" className="process" id="proceso">
          {processSteps.map((step) => (
            <div key={step.num} className="pstep">
              <div className="ps-num">{step.num}</div>
              <h3 className="ps-title">
                {step.title}
                <em>{step.titleEmphasis}</em>
              </h3>
              <p className="ps-body">{step.body}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
