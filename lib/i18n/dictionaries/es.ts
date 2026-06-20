import type { Dictionary } from "../types";
import { clients } from "@/lib/data/clients";
import {
  numbers,
  processSteps,
  quoteOptions,
  systems,
  tapBarFeatures,
} from "@/lib/data/content";
import { faqs } from "@/lib/data/faqs";
import { marqueeItems } from "@/lib/data/hero";
import { navLinks } from "@/lib/data/nav";
import { packs } from "@/lib/data/packs";
import { products } from "@/lib/data/products";
import { tapBarVariants } from "@/lib/data/variants";

export const es = {
  meta: {
    title: "Nimus Make · Objetos que conectan tu marca con tus clientes",
    description:
      "Piezas 3D con chips NFC que conectan tu negocio con tus clientes en un toque. Menús digitales, llaveros y exhibidores, hechos a la medida de tu identidad.",
  },
  nav: {
    links: navLinks,
    brandAria: "NIMUS",
    brandAlt: "NIMUS",
    cta: "Cotizar",
    contactAria: "Contacto",
    menu: "Menú",
    close: "Cerrar",
    closeAria: "Cerrar menú",
    sectionsAria: "Secciones",
    legal: "Legal",
    social: "Redes",
    faq: "FAQ",
    instagram: "Instagram",
    floatCta: "Cotizar tu pedido",
    backToTopAria: "Volver arriba",
  },
  hero: {
    leadWords: ["Objetos", "que", "trabajan"],
    trailWords: ["por", "tu", "marca."],
    marquee: marqueeItems,
    backgroundAria: "Animación de fondo decorativa",
  },
  sections: {
    tapbar: {
      tag: "Producto destacado · Línea 01",
      titleLine1: "Tap Bar:",
      titleLine2: "tu mesa,",
      titleEmphasis: "conectada.",
      sub: "Stand de mesa con 2 a 4 chips NFC integrados. El cliente acerca el teléfono y el chip lo lleva directo a donde tú quieras — menú digital, Google Reviews, Instagram o WhatsApp. Sin apps, sin instalaciones.",
      cta: "Ver variantes y precios",
      currency: "MXN",
      variantPills: {
        bar2: "Bar 2",
        qr: "QR",
        bar3: "Bar 3",
        bar4: "Bar 4",
        max: "Max",
      },
      features: tapBarFeatures,
      variants: tapBarVariants,
    },
    products: {
      sk: "Catálogo · 6 líneas",
      titleBefore: "Una pieza para cada ",
      titleEmphasis: "punto de contacto",
      titleAfter: " entre tu marca y tus clientes.",
      lede:
        "Cada línea cubre un momento específico — la mesa del restaurante, las llaves del cliente, el mostrador. Todas se imprimen bajo demanda y se personalizan con tu identidad visual.",
      currency: "MXN",
      items: products,
    },
    work: {
      sk: "Trabajamos con",
      titleBefore: "Marcas que ya entregan en ",
      titleEmphasis: "un toque",
      titleAfter: ".",
      note: "+40 negocios activos · México y LATAM",
      photoPlaceholder: "Foto del cliente",
      clients,
    },
    editorial: {
      markTl: "Interface module · rev 2.1",
      markTr: "Tap to connect",
      markBl: "PLA matte · NTAG215",
      markBr: "Dimensions · 150mm",
      titleBefore: "Pensado para marcas que ",
      titleEmphasis: "cuidan a sus clientes.",
      label: "El por qué",
      body1Strong:
        "Cada día, negocios pierden contacto con clientes que ya estuvieron ahí",
      body1After:
        " — no por falta de esfuerzo, sino por un instante de fricción. El cliente sale del local, olvida seguir la cuenta, nunca deja la reseña.",
      body2:
        "Una pieza física en su mesa o en su mano cierra ese hueco en un solo toque. Sin app, sin suscripción, sin login. La pieza llega lista y tus enlaces siguen siendo tuyos — los actualizas cuando quieras, sin que nada caduque.",
    },
    process: {
      sk: "Proceso · 4 pasos",
      titleBefore: "Del brief a ",
      titleEmphasis: "tu mostrador",
      titleAfter: " en menos de una semana.",
      lede:
        "Operación corta, sin intermediarios y con producción local. Modelado, prueba e impresión bajo el mismo techo.",
      steps: processSteps,
    },
    systems: {
      sk: "Sistemas digitales · complementan tu Tap Bar",
      titleBefore: "Más allá del ",
      titleEmphasis: "objeto físico",
      titleAfter: ".",
      lede:
        "Si tu negocio aún no los tiene, los implementamos contigo. Tus piezas con NFC se conectan a sistemas de recompensas, reservas, propinas, reseñas y métricas — montados a la medida o integrados con lo que ya usas.",
      items: systems,
    },
    packs: {
      sk: "Paquetes comerciales",
      titleBefore: "Soluciones ",
      titleEmphasis: "completas",
      titleLine2: "para cada tipo de negocio.",
      lede:
        "Tres tickets pensados para llegar listos a operar — desde cafetería hasta restaurante o experiencia premium. Productos, programación y servicio en un solo precio.",
      currency: "MXN",
      ctaFeatured: "Cotizar este pack",
      ctaDefault: "Empezar aquí",
      items: packs,
    },
    numbers: {
      sk: "Especificaciones",
      titleBefore: "Por qué ",
      titleEmphasis: "funciona",
      titleAfter: ".",
      lede:
        "Una sola inversión que convierte tu mesa, mostrador o llavero en una herramienta que paga por sí sola en pocos meses.",
      items: numbers,
    },
    faq: {
      sk: "Preguntas frecuentes",
      titleBefore: "Lo que los ",
      titleEmphasis: "negocios",
      titleAfter: " nos preguntan antes de empezar.",
      lede: "Respuestas cortas. Si falta algo, escríbenos por WhatsApp o correo.",
      items: faqs,
    },
    cta: {
      titleBefore: "¿Listos para que tu marca ",
      titleEmphasis: "esté",
      titleAfter: " en el bolsillo de tus clientes?",
      intro:
        "Cuéntanos qué necesitas — desde 10 piezas hasta un menú digital completo. Respondemos en menos de 24 horas con cotización y plazos en la misma conversación.",
      whatsappLabel: "WhatsApp directo",
      emailLabel: "Correo",
      instagramLabel: "Instagram",
      copyHint: "copiar",
      formTitleBefore: "O cotiza en ",
      formTitleEmphasis: "30 segundos",
      formTitleAfter: ".",
      namePlaceholder: "Tu nombre",
      businessPlaceholder: "Negocio · marca",
      interestPlaceholder: "¿Qué te interesa?",
      detailPlaceholder: "Cuéntanos: cantidad, formas, destinos NFC…",
      submit: "Enviar cotización",
      formNote: "Respondemos en menos de 24 h",
      openingWhatsApp: "Abriendo WhatsApp…",
      whatsappGreeting: "Hola NIMUS, soy {name} de {business}.",
      whatsappInterest: "Me interesa: {interest}",
      whatsappDetail: "Detalle: {detail}",
      quoteOptions,
    },
  },
  ui: {
    copied: "Copiado al portapapeles",
    copiedWith: "Copiado: {text}",
  },
  footer: {
    tagline:
      "Piezas 3D con chips NFC que conectan tu marca con tus clientes en un toque.",
    products: "Productos",
    business: "Negocio",
    contact: "Contacto",
    links: {
      tapBar: "Tap Bar NFC",
      smartLink: "Smart Link",
      smartToys: "Smart Toys",
      exhibitor: "Exhibidor Merch",
      customLine: "Línea Personalizada",
      packs: "Paquetes",
      process: "Proceso",
      faq: "FAQ",
      quote: "Cotizar",
      whatsapp: "WhatsApp",
    },
    copyright: "© 2026 NIMUS Make · Todos los derechos reservados",
    version: "v 2.0 · Landing pública",
  },
  loader: {
    synced: "Sincronizado",
    aria: "Animación de carga NIMUS",
  },
} satisfies Dictionary;
