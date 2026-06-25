import type { Dictionary } from "../types";
import { clients } from "@/lib/data/clients";
import {
  numbers,
  processSteps,
  quoteOptions,
  systems,
} from "@/lib/data/content";
import { faqs } from "@/lib/data/faqs";
import { marqueeItems } from "@/lib/data/hero";
import { navLinks } from "@/lib/data/nav";
import { packs } from "@/lib/data/packs";
import { products } from "@/lib/data/products";

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
    backToTopAria: "Volver arriba",
  },
  hero: {
    leadWords: ["Objetos", "que", "trabajan"],
    trailWords: ["por", "tu", "marca."],
    marquee: marqueeItems,
    backgroundAria: "Animación de fondo decorativa",
    scrollAria: "Ir a la sección de clientes",
  },
  sections: {
    tapbar: {
      titleLine1: "Tap Bar:",
      titleLine2: "tu negocio",
      titleEmphasis: "conectado.",
      sub: "Menú, reseñas y redes sociales en un solo toque.",
      currency: "MXN",
      view3dAria: "Ver modelo 3D",
      tilesMarqueeAria: "Destinos que puedes programar en cada ficha",
      options: [
        {
          id: "bar-4",
          label: "Bar 4",
          title: "Tap Bar 4",
          description:
            "Stand de 4 fichas con tu marca. Cuatro destinos personalizados, logo en relieve e iconografía a medida.",
          price: "$650",
        },
        {
          id: "bar-3",
          label: "Bar 3",
          title: "Tap Bar 3",
          description:
            "Stand de 3 fichas con tu marca. Reseñas, seguir y un destino más — todo en una sola pieza.",
          price: "$580",
        },
        {
          id: "bar-2",
          label: "Bar 2",
          title: "Tap Bar 2",
          description:
            "Stand de 2 fichas con tu marca. Logo en relieve e iconos personalizados para dos enlaces clave.",
          price: "$450",
        },
        {
          id: "stand",
          label: "Stand",
          title: "Stand NFC",
          description:
            "Una ficha NFC personalizable: tu color, icono y enlace. Ideal para mostrador o un solo punto de contacto.",
          price: "$390",
        },
      ],
    },
    products: {
      sk: "Catálogo · 6 líneas",
      titleBefore: "Una pieza para cada ",
      titleEmphasis: "punto de contacto",
      titleAfter: " entre tu marca y tus clientes.",
      tapboard: {
        titleLine1: "Tapboard:",
        titleLine2: "placa NFC en",
        titleEmphasis: "mesa o mostrador.",
        sub: "Cada ficha abre un destino: reseñas, menú, WhatsApp o redes, con tu logo en relieve.",
        options: [
          {
            id: "bar-4",
            label: "Board 4",
            title: "Tap Board 4",
            description:
              "Placa de 4 fichas con tu marca. Cuatro destinos personalizados, logo en relieve e iconografía a medida.",
            price: "$650",
          },
          {
            id: "bar-3",
            label: "Board 3",
            title: "Tap Board 3",
            description:
              "Placa de 3 fichas con tu marca. Reseñas, seguir y un destino más — todo en una sola pieza.",
            price: "$580",
          },
          {
            id: "bar-2",
            label: "Board 2",
            title: "Tap Board 2",
            description:
              "Placa de 2 fichas con tu marca. Logo en relieve e iconos personalizados para dos enlaces clave.",
            price: "$450",
          },
        ],
      },
      currency: "MXN",
      items: products,
    },
    work: {
      title: "Para marcas que cuidan a sus clientes.",
      subtitle: "Un toque. Presencia permanente.",
      swipeHint: "Desliza para descubrir",
      scrollAria: "Ir a la sección Tap Bar",
      photoPlaceholder: "Foto del cliente",
      clients,
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
    synced: "Listo",
    aria: "Animación de carga NIMUS",
  },
} satisfies Dictionary;
