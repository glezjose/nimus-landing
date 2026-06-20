export const processSteps = [
  {
    num: "Paso 01",
    title: "Brief y ",
    titleEmphasis: "cotización",
    body: "Escogemos línea, cantidad y destinos NFC. Recibes propuesta y plazos en menos de 24 horas.",
  },
  {
    num: "Paso 02",
    title: "Diseño y ",
    titleEmphasis: "validación",
    body: "Adaptación de logo o diseño exclusivo. 1–2 iteraciones de prueba antes de producción según el nivel.",
  },
  {
    num: "Paso 03",
    title: "Impresión ",
    titleEmphasis: "3D",
    body: "Bicolor o tricolor. Programación NFC incluida. Lotes de hasta 25 piezas en 3–5 días hábiles.",
  },
  {
    num: "Paso 04",
    title: "Entrega y ",
    titleEmphasis: "activación",
    body: "Llega listo para usar. Soporte incluido.",
  },
];

export const systems = [
  {
    id: "rewards",
    name: "Sistema de ",
    nameEmphasis: "recompensas",
    description:
      "Cada toque suma puntos. El cliente acumula visitas y canjea por bebidas, descuentos o productos. Tú controlas la mecánica desde un panel simple.",
    tag: "Disponible",
    soon: false,
    icon: "star" as const,
  },
  {
    id: "booking",
    name: "Reservas en ",
    nameEmphasis: "un toque",
    description:
      "El chip lleva al cliente a tu calendario de reservas — mesa, cita o servicio. Se conecta con Calendly, Google Calendar o sistemas a la medida.",
    tag: "Disponible",
    soon: false,
    icon: "calendar" as const,
  },
  {
    id: "reviews",
    name: "Reseñas ",
    nameEmphasis: "automáticas",
    description:
      "El chip abre Google Reviews con la calificación pre-cargada. Una experiencia de tap → 5 estrellas en 8 segundos.",
    tag: "Disponible",
    soon: false,
    icon: "reviews" as const,
  },
  {
    id: "analytics",
    name: "Métricas ",
    nameEmphasis: "en vivo",
    description:
      "Cuántos toques por chip, día, hora y destino. Saber qué funciona y dónde ajustar — toda la información sin formularios ni encuestas.",
    tag: "Próximamente",
    soon: true,
    icon: "chart" as const,
  },
];

export const numbers = [
  {
    label: "Ticket más bajo",
    value: "$60",
    note: "Smart Link — accesible para lotes grandes y staff numeroso.",
  },
  {
    label: "Producción",
    value: "3–5",
    valueEmphasis: "dias",
    note: "Entregas por lote de hasta 25 piezas. Sin esperar importaciones.",
  },
  {
    label: "Compatibilidad",
    value: "100",
    valueEmphasis: "%",
    note: "Smartphones con NFC. Sin instalar apps, sin login del cliente.",
  },
];

export const tapBarFeatures = [
  {
    num: "01",
    text: "Hasta <strong>4 destinos programables</strong> en una sola pieza, con iconografía en relieve.",
  },
  {
    num: "02",
    text: "Diseño bicolor o tricolor con el logo de tu marca <strong>impreso en relieve</strong>.",
  },
  {
    num: "03",
    text: "Formato wedge, clamshell o premium con <strong>inserto metálico</strong>.",
  },
  {
    num: "04",
    text: "<strong>Reprogramable</strong> sin costo durante la garantía.",
  },
];

export const quoteOptions = [
  "Pack Entrada",
  "Pack Staff Experience",
  "Pack Menú Digital",
  "Tap Bar (cantidad pequeña)",
  "Smart Link",
  "Smart Toys",
  "Línea Personalizada",
  "No estoy seguro · asesorame",
];
