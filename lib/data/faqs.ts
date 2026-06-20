export type Faq = {
  id: string;
  question: string;
  questionEmphasis: string;
  answer: string;
};

export const faqs: Faq[] = [
  {
    id: "nfc",
    question: "¿Qué es exactamente un ",
    questionEmphasis: "chip NFC",
    answer:
      "Un chip NFC es un circuito pasivo que se activa cuando un teléfono se acerca. El cliente no necesita instalar nada — la mayoría de smartphones modernos detectan el chip de forma nativa y abren el destino que tú configures (Instagram, menú, WhatsApp, reseñas).",
  },
  {
    id: "reprogram",
    question: "¿Puedo ",
    questionEmphasis: "cambiar el destino",
    answer:
      "Sí. Los chips NTAG215 son reprogramables. Si cambias tu Instagram, agregas un menú nuevo o lanzas una promoción, podemos reprogramar todos los chips sin costo extra dentro del año de garantía.",
  },
  {
    id: "minimum",
    question: "¿Cuál es el ",
    questionEmphasis: "mínimo de piezas",
    answer:
      "En catálogo estándar, el mínimo es 10 piezas por variante. En Línea Personalizada o Smart Toys hay mínimos específicos (10–20 piezas). Para piezas únicas o pruebas, cotizamos caso por caso.",
  },
  {
    id: "shipping",
    question: "¿Hacen ",
    questionEmphasis: "envíos a toda la república",
    answer:
      "Sí, enviamos a nivel nacional. El costo se cotiza según volumen y destino. Coordinamos paquetería con seguimiento desde el día de entrega del lote.",
  },
  {
    id: "custom",
    question: "¿Qué pasa si quiero un ",
    questionEmphasis: "diseño exclusivo",
    answer:
      "Activamos la Línea Personalizada. Hay tres niveles: adaptación de logo (+$100), forma nueva (+$300) o concepto desde cero con exclusividad y registro del modelo (+$800). El cargo es único por proyecto, no por pieza.",
  },
];
