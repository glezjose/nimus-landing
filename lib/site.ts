export const siteConfig = {
  name: "Nimus Make",
  title: "Nimus Make · Objetos que conectan tu marca con tus clientes",
  description:
    "Piezas 3D con chips NFC que conectan tu negocio con tus clientes en un toque. Menús digitales, llaveros y exhibidores, hechos a la medida de tu identidad.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://make.nimus.mx",
  locale: "es_MX",
  whatsapp: "52999000000",
  whatsappDisplay: "+52 999 · NIMUS",
  email: "hola@nimus.mx",
  instagram: "@nimus.make",
  instagramUrl: "https://instagram.com/nimus.make",
  platformUrl: process.env.NEXT_PUBLIC_PLATFORM_URL ?? "https://app.nimus.mx",
  version: "2.0",
} as const;
