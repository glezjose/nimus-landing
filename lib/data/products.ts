export type Product = {
  id: string;
  line: string;
  name: string;
  nameEmphasis: string;
  description: string;
  price: string;
  priceLabel: string;
  accent: string;
  photoBg: string;
  span: 3 | 6;
  featured?: boolean;
  placeholder: string;
};

export const products: Product[] = [
  {
    id: "smartlink",
    line: "Línea 02 · Smart Link",
    name: "Smart ",
    nameEmphasis: "Link",
    description:
      "Llavero con chip NFC en cuatro formas — round, square, hex y mini. El objeto que el cliente carga a diario y, en cada toque, conecta con tu marca. Reprogramable, sin costo de actualización.",
    price: "$50",
    priceLabel: "Desde",
    accent: "var(--teal)",
    photoBg: "linear-gradient(135deg, #f0ead8 0%, #ddd4ba 100%)",
    span: 3,
    placeholder: "Foto Smart Link",
  },
  {
    id: "smarttoys",
    line: "Línea 03 · Smart Toys",
    name: "Smart ",
    nameEmphasis: "Toys",
    description:
      'La mascota o personaje de tu marca convertido en llavero coleccionable. Versión opcional con chip NFC oculto que suma "tap" a la identidad — el accesorio que el cliente quiere usar.',
    price: "$65",
    priceLabel: "Desde",
    accent: "var(--amber)",
    photoBg: "linear-gradient(135deg, #e8e8e8 0%, #c4c4c4 100%)",
    span: 3,
    placeholder: "Foto Smart Toy",
  },
  {
    id: "fidget",
    line: "Línea 06 · Fidget",
    name: "Llaveros ",
    nameEmphasis: "Fidget",
    description:
      "Llaveros con piezas móviles — botones, ruedas, switches — que mantienen la marca en las manos del cliente. Versión con chip NFC opcional para sumar un tap a la experiencia.",
    price: "$90",
    priceLabel: "Desde",
    accent: "var(--purple)",
    photoBg: "linear-gradient(135deg, #cbdbe9 0%, #93b3d3 100%)",
    span: 3,
    placeholder: "Foto Llavero Fidget",
  },
  {
    id: "exhibidor",
    line: "Línea 04 · Exhibidor",
    name: "Exhibidor ",
    nameEmphasis: "Merch",
    description:
      "Display de mostrador brandado para exhibir llaveros y Smart Toys. Convierte el punto de venta en parte de tu identidad de marca.",
    price: "$350",
    priceLabel: "Desde",
    accent: "var(--purple)",
    photoBg: "linear-gradient(135deg, #e6e1d6 0%, #cfc7b3 100%)",
    span: 3,
    placeholder: "Foto Exhibidor",
  },
  {
    id: "personalizada",
    line: "Línea 05 · Personalizada",
    name: "Línea ",
    nameEmphasis: "Personalizada",
    description:
      "Diseño desde cero, exclusivo para tu marca. Modelado CAD, iteración, validación y registro del modelo. Tres niveles según complejidad — desde la adaptación de un logo hasta un concepto completo con exclusividad garantizada.",
    price: "+$100",
    priceLabel: "Cargo desde",
    accent: "var(--accent)",
    photoBg: "linear-gradient(135deg, var(--night-3), var(--night) 100%)",
    span: 6,
    featured: true,
    placeholder: "Foto pieza exclusiva",
  },
];
