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
import { buildNavLinks } from "@/lib/data/nav";
import { packs } from "@/lib/data/packs";
import { products } from "@/lib/data/products";

export const es = {
  meta: {
    title: "Nimus Make · Objetos que conectan tu marca con tus clientes",
    description:
      "Piezas 3D con chips NFC que conectan tu negocio con tus clientes en un toque. Menús digitales, llaveros y exhibidores, hechos a la medida de tu identidad.",
  },
  nav: {
    links: buildNavLinks({
      work: "Clientes",
      tapbar: "Tap Bar",
      catalog: "Productos",
      process: "Proceso",
      origin: "Colección Origen",
      systems: "Sistemas",
      packs: "Paquetes",
      faq: "FAQ",
    }),
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
          id: "stand",
          label: "Stand",
          title: "Tap Stand",
          description:
            "Ficha NFC individual para un punto clave: menú, reseñas, WhatsApp o redes. La colocas en mostrador y la puedes reprogramar cuando cambie tu campaña.",
          price: "$350",
        },
        {
          id: "bar-2",
          label: "Bar 2",
          title: "Tap Bar 2",
          description:
            "Dos acciones esenciales en una pieza compacta. Ideal para menú y reseñas, o para combinar contacto directo con redes.",
          price: "$650",
        },
        {
          id: "bar-3",
          label: "Bar 3",
          title: "Tap Bar 3",
          description:
            "Tres accesos visibles para guiar al cliente sin explicación: reseñas, WhatsApp y redes, con iconos claros y tu marca al frente.",
          price: "$800",
        },
        {
          id: "bar-4",
          label: "Bar 4",
          title: "Tap Bar 4",
          description:
            "Cuatro destinos en una pieza de mostrador. Perfecta para negocios que quieren menú, reseñas, contacto y redes siempre a la vista.",
          price: "$1,050",
        },
      ],
    },
    products: {
      sk: "Objetos secundarios",
      titleBefore: "Piezas para ",
      titleEmphasis: "completar la experiencia",
      titleAfter: ".",
      tapboard: {
        titleLine1: "Tapboard:",
        titleLine2: "para tu",
        titleEmphasis: "mesa o mostrador",
        sub: "Un chip NFC para abrir cualquier destino desde la mesa.",
        options: [
          {
            id: "bar-2",
            label: "Board 2",
            title: "Tap Board 2",
            description:
              "Dos fichas sobre una placa limpia para las acciones principales: abrir menú y dejar reseña sin buscar códigos ni enlaces.",
            price: "$800",
          },
          {
            id: "bar-3",
            label: "Board 3",
            title: "Tap Board 3",
            description:
              "Tres destinos en mesa o mostrador para ordenar, escribir por WhatsApp y seguir tus redes desde el mismo punto.",
            price: "$900",
          },
          {
            id: "bar-4",
            label: "Board 4",
            title: "Tap Board 4",
            description:
              "Cuatro fichas para cubrir todo el recorrido del cliente: menú, reseñas, contacto y redes en una placa con presencia de marca.",
            price: "$1,050",
          },
        ],
      },
      tapbase: {
        titleLine1: "Tapbase:",
        titleLine2: "para tu",
        titleEmphasis: "barra o vitrina",
        sub: "Accesos rápidos para vitrina, barra o punto de venta.",
        options: [
          {
            id: "base-2",
            label: "Base 2",
            title: "Tap Base 2",
            description:
              "Base de dos fichas para mostrador o vitrina. Ideal cuando solo necesitas menú y reseñas, o contacto y redes.",
            price: "$250",
          },
          {
            id: "base-3",
            label: "Base 3",
            title: "Tap Base 3",
            description:
              "Base compacta de tres fichas para mostrador. Mantiene reseñas, menú y contacto visibles sin ocupar espacio de venta.",
            price: "$350",
          },
          {
            id: "base-4",
            label: "Base 4",
            title: "Tap Base 4",
            description:
              "Base de cuatro fichas para vitrinas, barras o recepción. Ordena tus accesos clave y convierte el punto de venta en un disparador digital.",
            price: "$500",
          },
        ],
      },
      currency: "MXN",
      scrollAria: "Ir a la sección de proceso",
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
      titleBefore: "En tu ",
      titleRotatingTexts: ["mesa", "barra", "vitrina"],
      titleAfter: " en menos de una semana.",
      lede:
        "Operación corta, sin intermediarios y con producción local. Modelado, prueba e impresión bajo el mismo techo.",
      scrollAria: "Ir a la colección Origen",
      steps: processSteps,
    },
    originCollection: {
      titleBefore: "También hacemos ",
      titleEmphasis: "lámparas",
      titleAfter: ".",
      lede:
        "Objetos de luz impresos localmente, diseñados para dar ambiente a barras, mesas y rincones.",
      cta: "Colección Origen",
      scrollAria: "Ir a la sección de sistemas",
    },
    systems: {
      sk: "Sistemas digitales · complementan tu Tap Bar",
      titleBefore: "Más allá del ",
      titleEmphasis: "objeto físico",
      titleAfter: ".",
      lede:
        "Tus piezas NFC pueden conectar reservas, reseñas y más. Los implementamos contigo, a la medida o integrados con lo que ya usas.",
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
      priceNote: "*Precio no incluye IVA",
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
      titleBefore: "Preguntas ",
      titleEmphasis: "frecuentes",
      titleAfter: "",
      lede: "Respuestas cortas. Si falta algo, escríbenos por WhatsApp o correo.",
      chatToday: "Hoy",
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
    sections: "Secciones",
    contact: "Contacto",
    links: {
      whatsapp: "WhatsApp",
    },
    copyright: "© 2026 Nimus · Todos los derechos reservados",
    legal: {
      terms: "Términos",
      privacy: "Privacidad",
      cookies: "Cookies",
    },
  },
  cookies: {
    bannerAria: "Aviso de cookies",
    bannerMessage:
      "Usamos cookies esenciales para recordar tu preferencia de privacidad.",
    accept: "Aceptar",
    policyLink: "Más información",
  },
  legal: {
    backHome: "Volver al inicio",
    updatedLabel: "Última actualización:",
    updatedDate: "29 de junio de 2026",
    terms: {
      title: "Términos de uso",
      body: [
        "Este sitio presenta los productos y servicios de Nimus. Al navegarlo aceptas estos términos.",
        "La información, precios y plazos mostrados son referenciales y pueden cambiar sin previo aviso. Una cotización formal confirma alcance, precio y tiempos de entrega.",
        "El contenido visual, textos, modelos 3D y marca son propiedad de Nimus o de sus respectivos titulares. No está permitida su reproducción sin autorización.",
        "Los enlaces a servicios de terceros (por ejemplo WhatsApp o Instagram) se rigen por las políticas de esas plataformas.",
        "Para dudas sobre estos términos escríbenos a hola@nimus.mx.",
      ],
    },
    privacy: {
      title: "Aviso de privacidad",
      body: [
        "En Nimus tratamos los datos que nos compartes para responder cotizaciones, dar seguimiento comercial y mejorar nuestros servicios.",
        "Podemos recibir tu nombre, negocio, correo, teléfono y el detalle que envíes en formularios o por WhatsApp. No vendemos tus datos personales.",
        "Usamos tu información para contactarte, preparar propuestas y dar soporte relacionado con pedidos o proyectos NFC.",
        "Conservamos los datos el tiempo necesario para la relación comercial y obligaciones legales aplicables.",
        "Puedes solicitar acceso, corrección o eliminación de tus datos escribiendo a hola@nimus.mx.",
      ],
    },
    cookies: {
      title: "Política de cookies",
      body: [
        "Este sitio usa almacenamiento local del navegador para recordar si aceptaste el aviso de cookies.",
        "La clave utilizada es nimus-make-cookie-consent y solo guarda tu preferencia (por ejemplo, accepted). No rastrea tu actividad en otros sitios.",
        "Si rechazas o borras esta preferencia, el aviso puede mostrarse de nuevo en tu próxima visita.",
        "No usamos cookies de publicidad de terceros en esta landing. Si añadimos analítica en el futuro, actualizaremos esta página.",
        "Para cualquier duda sobre privacidad o cookies, contáctanos en hola@nimus.mx.",
      ],
    },
  },
  loader: {
    synced: "Listo",
    aria: "Animación de carga NIMUS",
  },
} satisfies Dictionary;
