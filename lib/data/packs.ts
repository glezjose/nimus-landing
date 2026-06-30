export type Pack = {
  id: string;
  name: string;
  price: string;
  description: string;
  color: string;
  featured?: boolean;
  items: string[];
};

export const packs: Pack[] = [
  {
    id: "entrada",
    name: "Pack Entrada",
    price: "$1,400",
    description:
      "Para el negocio que quiere dar el primer paso digital sin gran inversión.",
    color: "var(--brand-blue)",
    items: [
      "10 Smart Links Round personalizados",
      "Programación de destinos NFC",
      "Diseño básico incluido",
      "Entrega y activación",
    ],
  },
  {
    id: "staff",
    name: "Pack Staff Experience",
    price: "$4,500",
    description:
      "El equipo completo para un restaurante, café o comercio que quiere diferenciarse.",
    color: "var(--brand-gray)",
    featured: true,
    items: [
      "15 Smart Links personalizados (forma a elegir)",
      "2 Tap Bar Plus (3 chips cada uno)",
      "1 Exhibidor Básico brandado",
      "Programación completa de todos los chips",
      "Diseño intermedio incluido",
    ],
  },
  {
    id: "menu",
    name: "Pack Menú Digital",
    price: "$7,500",
    description:
      "Elimina el menú impreso. Break-even contra impresión tradicional en 6–9 meses.",
    color: "var(--brand-orange)",
    items: [
      "25 Smart Links personalizados",
      "10 Tap Bar Max (4 chips · premium)",
      "1 Exhibidor Torre brandado",
      "10 Smart Toys (mascota del negocio)",
      "Diseño exclusivo incluido",
    ],
  },
];
