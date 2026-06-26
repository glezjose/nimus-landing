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
    name: "Smart Link",
    nameEmphasis: "",
    description: "Llavero NFC reprogramable para abrir cualquier destino.",
    price: "$72",
    priceLabel: "Desde",
    accent: "var(--ink)",
    photoBg: "#b1b7bd",
    span: 3,
    placeholder: "Foto Smart Link",
  },
  {
    id: "fidget",
    line: "Línea 06 · Fidget",
    name: "Llaveros Fidget",
    nameEmphasis: "",
    description: "Piezas móviles con tu marca. NFC opcional.",
    price: "$90",
    priceLabel: "Desde",
    accent: "var(--ink)",
    photoBg: "#b1b7bd",
    span: 3,
    placeholder: "Foto Llavero Fidget",
  },
  {
    id: "personalizada",
    line: "Línea 05 · Personalizada",
    name: "Piezas a medida",
    nameEmphasis: "",
    description: "Objetos 3D personalizados para campañas o activaciones.",
    price: "+$100",
    priceLabel: "Desde",
    accent: "var(--ink)",
    photoBg: "#b1b7bd",
    span: 3,
    placeholder: "Foto pieza exclusiva",
  },
];
