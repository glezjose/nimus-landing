export type Faq = {
  id: string;
  question: string;
  questionEmphasis: string;
  answer: string;
};

export const faqs: Faq[] = [
  {
    id: "nfc",
    question: "¿Qué hace un ",
    questionEmphasis: "chip NFC",
    answer:
      "Acercas el teléfono y abre el link que tú elijas: Instagram, menú, WhatsApp, reseñas o una promo. No requiere app, batería ni login del cliente.",
  },
  {
    id: "reprogram",
    question: "¿Se puede ",
    questionEmphasis: "editar después",
    answer:
      "Sí. Usamos chips NTAG215 reprogramables. Si cambias de menú, perfil o campaña, actualizamos el destino sin costo durante el año de garantía.",
  },
  {
    id: "minimum",
    question: "¿Cuál es el ",
    questionEmphasis: "mínimo para pedir",
    answer:
      "Para catálogo estándar empezamos desde 10 piezas por variante. En diseños personalizados o Smart Toys, el mínimo depende del proyecto; normalmente va de 10 a 20.",
  },
  {
    id: "shipping",
    question: "¿Envían ",
    questionEmphasis: "a todo México",
    answer:
      "Sí. Cotizamos el envío según destino y volumen, y te compartimos guía de rastreo cuando el lote sale.",
  },
  {
    id: "custom",
    question: "¿Pueden hacer un ",
    questionEmphasis: "diseño exclusivo",
    answer:
      "Sí. Podemos adaptar tu logo, crear una forma nueva o desarrollar un concepto desde cero con exclusividad. El cargo de diseño se paga una vez por proyecto.",
  },
];
