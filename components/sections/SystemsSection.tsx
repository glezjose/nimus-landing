import { Reveal } from "@/components/ui/Reveal";
import { SystemIcon } from "@/components/ui/Icons";
import { systems } from "@/lib/data/content";

export function SystemsSection() {
  return (
    <section className="systems-section" id="sistemas">
      <div className="systems-inner">
        <Reveal className="section-head">
          <div>
            <div className="sk">Sistemas digitales · complementan tu Tap Bar</div>
            <h2>
              Más allá del <em>objeto físico</em>.
            </h2>
          </div>
          <div className="lede">
            Si tu negocio aún no los tiene, los implementamos contigo. Tus piezas
            con NFC se conectan a sistemas de recompensas, reservas, propinas,
            reseñas y métricas — montados a la medida o integrados con lo que ya usas.
          </div>
        </Reveal>

        <Reveal variant="stagger" className="systems-grid">
          {systems.map((sys) => (
            <div key={sys.id} className="sys-card">
              <div className="sys-icon">
                <SystemIcon type={sys.icon} />
              </div>
              <h3 className="sys-name">
                {sys.name}
                <em>{sys.nameEmphasis}</em>
              </h3>
              <p className="sys-desc">{sys.description}</p>
              <span className={`sys-tag${sys.soon ? " soon" : ""}`}>{sys.tag}</span>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
