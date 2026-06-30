export const siteConfig = {
  name: "Nimus",
  title: "Nimus · Objetos que conectan tu marca con tus clientes",
  description:
    "Piezas 3D con chips NFC que conectan tu negocio con tus clientes en un toque. Menús digitales, llaveros y exhibidores, hechos a la medida de tu identidad.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://make.nimus.mx",
  locale: "es_MX",
  whatsapp: "529997490713",
  whatsappDisplay: "+52 999 749 0713",
  email: "hola@nimus.mx",
  instagram: "@nimus.make",
  instagramUrl: "https://instagram.com/nimus.make",
  platformUrl: process.env.NEXT_PUBLIC_PLATFORM_URL ?? "https://app.nimus.mx",
  version: "2.0",
} as const;
