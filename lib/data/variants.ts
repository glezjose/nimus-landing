export type TapBarVariant = {
  id: number;
  slug: string;
  name: string;
  sub: string;
  price: string;
  image: string;
  alt: string;
};

const tapbarImage = "/assets/tapbar-v3.svg";

export const tapBarVariants: TapBarVariant[] = [
  {
    id: 0,
    slug: "bar-2",
    name: "Tap Bar 2",
    sub: "2 destinos · base con peso",
    price: "$650",
    image: tapbarImage,
    alt: "Tap Bar 2",
  },
  {
    id: 1,
    slug: "qr",
    name: "Tap Bar QR",
    sub: "NFC + QR · ideal pagos",
    price: "$520",
    image: tapbarImage,
    alt: "Tap Bar QR",
  },
  {
    id: 2,
    slug: "bar-3",
    name: "Tap Bar 3",
    sub: "3 destinos · PLA matte",
    price: "$800",
    image: tapbarImage,
    alt: "Tap Bar 3",
  },
  {
    id: 3,
    slug: "bar-4",
    name: "Tap Bar 4",
    sub: "4 destinos · diseño completo",
    price: "$1,050",
    image: tapbarImage,
    alt: "Tap Bar 4",
  },
  {
    id: 4,
    slug: "max",
    name: "Tap Bar Max",
    sub: "Formato grande · 4 destinos",
    price: "$890",
    image: tapbarImage,
    alt: "Tap Bar Max",
  },
];
