import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { PhotoPlaceholder } from "@/components/ui/Icons";
import { products } from "@/lib/data/products";

export function ProductsSection() {
  return (
    <section className="section" id="productos">
      <Reveal className="section-head">
        <div>
          <div className="sk">Catálogo · 6 líneas</div>
          <h2>
            Una pieza para cada <em>punto de contacto</em> entre tu marca y tus
            clientes.
          </h2>
        </div>
        <div className="lede">
          Cada línea cubre un momento específico — la mesa del restaurante, las llaves
          del cliente, el mostrador. Todas se imprimen bajo demanda y se personalizan
          con tu identidad visual.
        </div>
      </Reveal>

      <Reveal variant="stagger" className="lineup">
        {products.map((product) => (
          <Link
            key={product.id}
            className={`lcard span-${product.span}${product.featured ? " featured" : ""}`}
            href="#cta"
            style={
              {
                "--card-accent": product.accent,
                "--photo-bg": product.photoBg,
              } as React.CSSProperties
            }
          >
            <div className="lcard-photo">
              <div className="photo-grid" />
              <span className="photo-tag">{product.line}</span>
              <PhotoPlaceholder label={product.placeholder} />
            </div>
            <div className="lcard-body">
              <div className="l-arrow">↗</div>
              <h3 className="l-name">
                {product.name}
                <em>{product.nameEmphasis}</em>
              </h3>
              <p className="l-tag">{product.description}</p>
              <div className="l-foot">
                <span className="l-from">{product.priceLabel}</span>
                <span className="l-price">
                  {product.price}{" "}
                  <small>MXN</small>
                </span>
              </div>
            </div>
          </Link>
        ))}
      </Reveal>
    </section>
  );
}
