import type { Dictionary } from "../types";
import { clients } from "@/lib/data/clients";

export const en = {
  meta: {
    title: "Nimus Make · Physical objects that connect your brand to customers",
    description:
      "3D-printed pieces with NFC chips that connect your business to customers in one tap. Digital menus, keychains, and displays tailored to your brand identity.",
  },
  nav: {
    links: [
      { href: "#productos", label: "Products" },
      { href: "#tapbar", label: "Tap Bar" },
      { href: "#paquetes", label: "Packs" },
      { href: "#preguntas", label: "FAQ" },
    ],
    brandAria: "NIMUS",
    brandAlt: "NIMUS",
    cta: "Get a quote",
    contactAria: "Contact",
    menu: "Menu",
    close: "Close",
    closeAria: "Close menu",
    sectionsAria: "Sections",
    legal: "Legal",
    social: "Social",
    faq: "FAQ",
    instagram: "Instagram",
    backToTopAria: "Back to top",
  },
  hero: {
    leadWords: ["Objects", "that", "work"],
    trailWords: ["for", "your", "brand."],
    marquee: [
      "One tap → Instagram",
      "Instant digital menu",
      "More Google reviews",
      "Direct WhatsApp",
      "Reprogrammable at no cost",
      "From 10 units",
      "Ready in 3–5 days",
      "100% on-brand design",
    ],
    backgroundAria: "Decorative background animation",
    scrollAria: "Go to client work section",
  },
  sections: {
    tapbar: {
      titleLine1: "Tap Bar:",
      titleLine2: "your business",
      titleEmphasis: "connected.",
      sub: "Menu, reviews, and social — all in one tap.",
      currency: "MXN",
      view3dAria: "View 3D model",
      tilesMarqueeAria: "Destinations you can assign to each tile",
      options: [
        {
          id: "stand",
          label: "Stand",
          title: "NFC Stand",
          description:
            "One NFC tile for a key action: menu, reviews, WhatsApp, or social. Place it on the counter and reprogram it whenever the campaign changes.",
          price: "$430",
        },
        {
          id: "bar-2",
          label: "Bar 2",
          title: "Tap Bar 2",
          description:
            "Two essential actions in one compact piece. Ideal for menu and reviews, or pairing direct contact with social.",
          price: "$780",
        },
        {
          id: "bar-3",
          label: "Bar 3",
          title: "Tap Bar 3",
          description:
            "Three visible access points that guide customers without explanation: reviews, WhatsApp, and social, with clear icons and your brand up front.",
          price: "$1,140",
        },
        {
          id: "bar-4",
          label: "Bar 4",
          title: "Tap Bar 4",
          description:
            "Four destinations in one counter piece. Built for businesses that want menu, reviews, contact, and social always in sight.",
          price: "$1,440",
        },
      ],
    },
    products: {
      sk: "Secondary objects",
      titleBefore: "Small pieces to ",
      titleEmphasis: "complete the experience",
      titleAfter: ".",
      tapboard: {
        titleLine1: "Tapboard:",
        titleLine2: "for your",
        titleEmphasis: "table or counter",
        sub: "An NFC chip that opens any destination from the table.",
        options: [
          {
            id: "bar-2",
            label: "Board 2",
            title: "Tap Board 2",
            description:
              "Two tiles on a clean plaque for the main actions: open the menu and leave a review without hunting for codes or links.",
            price: "$780",
          },
          {
            id: "bar-3",
            label: "Board 3",
            title: "Tap Board 3",
            description:
              "Three destinations on table or counter for ordering, WhatsApp, and social from the same spot.",
            price: "$1,140",
          },
          {
            id: "bar-4",
            label: "Board 4",
            title: "Tap Board 4",
            description:
              "Four tiles for the full customer path: menu, reviews, contact, and social in a branded plaque with presence.",
            price: "$1,440",
          },
        ],
      },
      tapbase: {
        titleLine1: "Tapbase:",
        titleLine2: "for your",
        titleEmphasis: "bar or display",
        sub: "Quick access for displays, bars, or point of sale.",
        options: [
          {
            id: "base-3",
            label: "Base 3",
            title: "Tap Base 3",
            description:
              "Compact three-tile base for counters. Keeps reviews, menu, and contact visible without taking over selling space.",
            price: "$450",
          },
          {
            id: "base-4",
            label: "Base 4",
            title: "Tap Base 4",
            description:
              "Four-tile base for displays, bars, or reception. Organizes your key links and turns the point of sale into a digital trigger.",
            price: "$550",
          },
        ],
      },
      currency: "MXN",
      items: [
        {
          id: "smartlink",
          name: "Smart Link",
          nameEmphasis: "",
          description: "Reprogrammable NFC keychain for any destination.",
          price: "$72",
          priceLabel: "From",
          accent: "var(--ink)",
          photoBg: "#b1b7bd",
          span: 3 as const,
          placeholder: "Smart Link photo",
        },
        {
          id: "fidget",
          name: "Fidget Keychains",
          nameEmphasis: "",
          description: "Moving parts with your brand. Optional NFC.",
          price: "$90",
          priceLabel: "From",
          accent: "var(--ink)",
          photoBg: "#b1b7bd",
          span: 3 as const,
          placeholder: "Fidget keychain photo",
        },
        {
          id: "personalizada",
          name: "Custom pieces",
          nameEmphasis: "",
          description: "Custom 3D objects for campaigns or activations.",
          price: "+$100",
          priceLabel: "From",
          accent: "var(--ink)",
          photoBg: "#b1b7bd",
          span: 3 as const,
          placeholder: "Exclusive piece photo",
        },
      ],
    },
    work: {
      title: "For brands that care about their customers.",
      subtitle: "One tap. Lasting presence.",
      swipeHint: "Swipe to discover",
      scrollAria: "Go to Tap Bar section",
      photoPlaceholder: "Client photo",
      clients,
    },
    process: {
      sk: "Process · 4 steps",
      titleBefore: "On your ",
      titleRotatingTexts: ["counter", "table", "bar", "display"],
      titleAfter: " in under a week.",
      lede:
        "Short operation, no middlemen, local production. Modeling, testing, and printing under one roof.",
      steps: [
        {
          num: "Step 01",
          title: "Brief and ",
          titleEmphasis: "quote",
          body: "We choose line, quantity, and NFC destinations. You receive a proposal and timeline in under 24 hours.",
        },
        {
          num: "Step 02",
          title: "Design and ",
          titleEmphasis: "approval",
          body: "Logo adaptation or exclusive design. 1–2 test iterations before production depending on tier.",
        },
        {
          num: "Step 03",
          title: "3D ",
          titleEmphasis: "printing",
          body: "Two- or three-color. NFC programming included. Batches up to 25 units in 3–5 business days.",
        },
        {
          num: "Step 04",
          title: "Delivery and ",
          titleEmphasis: "activation",
          body: "Each piece arrives ready to place, with its NFC destination tested. We guide activation and adjust links when your campaign changes.",
        },
      ],
    },
    systems: {
      sk: "Digital systems · complement your Tap Bar",
      titleBefore: "Beyond the ",
      titleEmphasis: "physical object",
      titleAfter: ".",
      lede:
        "If your business doesn't have them yet, we implement them with you. Your NFC pieces connect to rewards, bookings, tips, reviews, and metrics — custom-built or integrated with what you already use.",
      items: [
        {
          id: "rewards",
          name: "Rewards ",
          nameEmphasis: "system",
          description:
            "Every tap earns points. Customers accumulate visits and redeem drinks, discounts, or products. You control the mechanics from a simple dashboard.",
          tag: "Available",
          soon: false,
          icon: "star" as const,
        },
        {
          id: "booking",
          name: "Bookings in ",
          nameEmphasis: "one tap",
          description:
            "The chip takes customers to your booking calendar — table, appointment, or service. Connects with Calendly, Google Calendar, or custom systems.",
          tag: "Available",
          soon: false,
          icon: "calendar" as const,
        },
        {
          id: "reviews",
          name: "Automatic ",
          nameEmphasis: "reviews",
          description:
            "The chip opens Google Reviews with the rating pre-loaded. A tap → 5 stars in 8 seconds.",
          tag: "Available",
          soon: false,
          icon: "reviews" as const,
        },
        {
          id: "analytics",
          name: "Live ",
          nameEmphasis: "metrics",
          description:
            "Taps per chip, day, hour, and destination. See what works and where to adjust — all without forms or surveys.",
          tag: "Coming soon",
          soon: true,
          icon: "chart" as const,
        },
      ],
    },
    packs: {
      sk: "Commercial packs",
      titleBefore: "Complete ",
      titleEmphasis: "solutions",
      titleLine2: "for every type of business.",
      lede:
        "Three packages ready to operate — from café to restaurant or premium experience. Products, programming, and service in one price.",
      currency: "MXN",
      ctaFeatured: "Quote this pack",
      ctaDefault: "Start here",
      items: [
        {
          id: "entrada",
          name: "Starter Pack",
          price: "$1,800",
          description:
            "For businesses taking their first digital step without a large investment.",
          color: "var(--teal)",
          items: [
            "10 personalized Round Smart Links",
            "NFC destination programming",
            "Basic design included",
            "Delivery and activation",
          ],
        },
        {
          id: "staff",
          name: "Staff Experience Pack",
          price: "$4,500",
          description:
            "The full team setup for a restaurant, café, or shop that wants to stand out.",
          color: "var(--accent)",
          featured: true,
          items: [
            "15 personalized Smart Links (shape of choice)",
            "2 Tap Bar Plus (3 chips each)",
            "1 branded Basic Display",
            "Full programming for all chips",
            "Intermediate design included",
          ],
        },
        {
          id: "menu",
          name: "Digital Menu Pack",
          price: "$7,500",
          description:
            "Eliminate printed menus. Break-even vs traditional printing in 6–9 months.",
          color: "var(--coral)",
          items: [
            "25 personalized Smart Links",
            "10 Tap Bar Max (4 chips · premium)",
            "1 branded Tower Display",
            "10 Smart Toys (business mascot)",
            "Exclusive design included",
          ],
        },
      ],
    },
    numbers: {
      sk: "Specifications",
      titleBefore: "Why it ",
      titleEmphasis: "works",
      titleAfter: ".",
      lede:
        "One investment that turns your table, counter, or keychain into a tool that pays for itself in months.",
      items: [
        {
          label: "Lowest ticket",
          value: "$60",
          note: "Smart Link — accessible for large batches and big teams.",
        },
        {
          label: "Production",
          value: "3–5",
          valueEmphasis: "days",
          note: "Delivery in batches up to 25 units. No waiting on imports.",
        },
        {
          label: "Compatibility",
          value: "100",
          valueEmphasis: "%",
          note: "NFC smartphones. No apps to install, no customer login.",
        },
      ],
    },
    faq: {
      sk: "Frequently asked questions",
      titleBefore: "What ",
      titleEmphasis: "businesses",
      titleAfter: " ask us before starting.",
      lede: "Short answers. If something's missing, reach us on WhatsApp or email.",
      items: [
        {
          id: "nfc",
          question: "What exactly is an ",
          questionEmphasis: "NFC chip",
          answer:
            "An NFC chip is a passive circuit activated when a phone gets close. Customers don't need to install anything — most modern smartphones detect the chip natively and open the destination you configure (Instagram, menu, WhatsApp, reviews).",
        },
        {
          id: "reprogram",
          question: "Can I ",
          questionEmphasis: "change the destination",
          answer:
            "Yes. NTAG215 chips are reprogrammable. If you change your Instagram, add a new menu, or launch a promotion, we can reprogram all chips at no extra cost within the warranty year.",
        },
        {
          id: "minimum",
          question: "What is the ",
          questionEmphasis: "minimum order",
          answer:
            "For standard catalog, the minimum is 10 units per variant. Custom Line or Smart Toys have specific minimums (10–20 units). For one-offs or tests, we quote case by case.",
        },
        {
          id: "shipping",
          question: "Do you ",
          questionEmphasis: "ship nationwide",
          answer:
            "Yes, we ship across Mexico. Cost is quoted by volume and destination. We coordinate tracked courier from delivery day.",
        },
        {
          id: "custom",
          question: "What if I want an ",
          questionEmphasis: "exclusive design",
          answer:
            "We activate the Custom Line. Three tiers: logo adaptation (+$100), new shape (+$300), or concept from scratch with exclusivity and model registration (+$800). The fee is per project, not per unit.",
        },
      ],
    },
    cta: {
      titleBefore: "Ready for your brand to live ",
      titleEmphasis: "in",
      titleAfter: " your customers' pockets?",
      intro:
        "Tell us what you need — from 10 units to a full digital menu. We reply within 24 hours with a quote and timeline in the same conversation.",
      whatsappLabel: "Direct WhatsApp",
      emailLabel: "Email",
      instagramLabel: "Instagram",
      copyHint: "copy",
      formTitleBefore: "Or get a quote in ",
      formTitleEmphasis: "30 seconds",
      formTitleAfter: ".",
      namePlaceholder: "Your name",
      businessPlaceholder: "Business · brand",
      interestPlaceholder: "What are you interested in?",
      detailPlaceholder: "Tell us: quantity, shapes, NFC destinations…",
      submit: "Send quote request",
      formNote: "We reply within 24 h",
      openingWhatsApp: "Opening WhatsApp…",
      whatsappGreeting: "Hi NIMUS, I'm {name} from {business}.",
      whatsappInterest: "I'm interested in: {interest}",
      whatsappDetail: "Details: {detail}",
      quoteOptions: [
        "Starter Pack",
        "Staff Experience Pack",
        "Digital Menu Pack",
        "Tap Bar (small quantity)",
        "Smart Link",
        "Smart Toys",
        "Custom Line",
        "Not sure · advise me",
      ],
    },
  },
  ui: {
    copied: "Copied to clipboard",
    copiedWith: "Copied: {text}",
  },
  footer: {
    tagline:
      "3D-printed pieces with NFC chips that connect your brand to customers in one tap.",
    products: "Products",
    business: "Business",
    contact: "Contact",
    links: {
      tapBar: "Tap Bar NFC",
      smartLink: "Smart Link",
      smartToys: "Smart Toys",
      exhibitor: "Merch Display",
      customLine: "Custom Line",
      packs: "Packs",
      process: "Process",
      faq: "FAQ",
      quote: "Get a quote",
      whatsapp: "WhatsApp",
    },
    copyright: "© 2026 NIMUS Make · All rights reserved",
    version: "v 2.0 · Public landing",
  },
  loader: {
    synced: "Ready",
    aria: "NIMUS loading animation",
  },
} satisfies Dictionary;
