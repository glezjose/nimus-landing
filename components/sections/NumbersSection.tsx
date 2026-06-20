import { Reveal } from "@/components/ui/Reveal";
import { numbers } from "@/lib/data/content";

export function NumbersSection() {
  return (
    <section className="section" id="numeros" style={{ paddingTop: 0 }}>
      <Reveal className="section-head">
        <div>
          <div className="sk">Especificaciones</div>
          <h2>
            Por qué <em>funciona</em>.
          </h2>
        </div>
        <div className="lede">
          Una sola inversión que convierte tu mesa, mostrador o llavero en una
          herramienta que paga por sí sola en pocos meses.
        </div>
      </Reveal>

      <Reveal variant="stagger" className="numbers">
        {numbers.map((cell) => (
          <div key={cell.label} className="ncell">
            <div className="nc-label">{cell.label}</div>
            <div className="nc-val">
              {cell.value}
              {cell.valueEmphasis ? <em>{cell.valueEmphasis}</em> : null}
            </div>
            <div className="nc-note">{cell.note}</div>
          </div>
        ))}
      </Reveal>
    </section>
  );
}
