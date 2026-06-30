import type { Dictionary } from "../types";
import { clients } from "@/lib/data/clients";
import { buildNavLinks } from "@/lib/data/nav";

export const en = {
  meta: {
    title: "Nimus Make · Physical objects that connect your brand to customers",
    description:
      "3D-printed pieces with NFC chips that connect your business to customers in one tap. Digital menus, keychains, and displays tailored to your brand identity.",
  },
  nav: {
    links: buildNavLinks({
      work: "Clients",
      tapbar: "Tap Bar",
      catalog: "Products",
      process: "Process",
      origin: "Origin Collection",
      systems: "Systems",
      packs: "Packs",
      faq: "FAQ",
    }),
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
          title: "Tap Stand",
          description:
            "One NFC tile for a key action: menu, reviews, WhatsApp, or social. Place it on the counter and reprogram it whenever the campaign changes.",
          price: "$350",
        },
        {
          id: "bar-2",
          label: "Bar 2",
          title: "Tap Bar 2",
          description:
            "Two essential actions in one compact piece. Ideal for menu and reviews, or pairing direct contact with social.",
          price: "$650",
        },
        {
          id: "bar-3",
          label: "Bar 3",
          title: "Tap Bar 3",
          description:
            "Three visible access points that guide customers without explanation: reviews, WhatsApp, and social, with clear icons and your brand up front.",
          price: "$800",
        },
        {
          id: "bar-4",
          label: "Bar 4",
          title: "Tap Bar 4",
          description:
            "Four destinations in one counter piece. Built for businesses that want menu, reviews, contact, and social always in sight.",
          price: "$1,050",
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
            price: "$800",
          },
          {
            id: "bar-3",
            label: "Board 3",
            title: "Tap Board 3",
            description:
              "Three destinations on table or counter for ordering, WhatsApp, and social from the same spot.",
            price: "$900",
          },
          {
            id: "bar-4",
            label: "Board 4",
            title: "Tap Board 4",
            description:
              "Four tiles for the full customer path: menu, reviews, contact, and social in a branded plaque with presence.",
            price: "$1,050",
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
            id: "base-2",
            label: "Base 2",
            title: "Tap Base 2",
            description:
              "Two-tile base for counter or display. Ideal when you only need menu and reviews, or contact and social.",
            price: "$250",
          },
          {
            id: "base-3",
            label: "Base 3",
            title: "Tap Base 3",
            description:
              "Compact three-tile base for counters. Keeps reviews, menu, and contact visible without taking over selling space.",
            price: "$350",
          },
          {
            id: "base-4",
            label: "Base 4",
            title: "Tap Base 4",
            description:
              "Four-tile base for displays, bars, or reception. Organizes your key links and turns the point of sale into a digital trigger.",
            price: "$500",
          },
        ],
      },
      currency: "MXN",
      items: [
        {
          id: "smartlink",
          name: "Smart Link 5cm",
          nameEmphasis: "",
          description: "Reprogrammable NFC keychain for any destination.",
          price: "$60",
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
      scrollAria: "Go to process section",
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
      titleRotatingTexts: ["table", "bar", "display"],
      titleAfter: " in under a week.",
      lede:
        "Short operation, no middlemen, local production. Modeling, testing, and printing under one roof.",
      scrollAria: "Go to Origin collection",
      steps: [
        {
          num: "1.",
          title: "Brief and ",
          titleEmphasis: "quote",
          body: "We choose line, quantity, and NFC destinations. You receive a proposal and timeline in under 24 hours.",
        },
        {
          num: "2.",
          title: "Design and ",
          titleEmphasis: "approval",
          body: "Logo adaptation or exclusive design. 1–2 test iterations before production depending on tier.",
        },
        {
          num: "3.",
          title: "3D ",
          titleEmphasis: "printing",
          body: "Two- or three-color. NFC programming included. Batches up to 25 units in 3–5 business days.",
        },
        {
          num: "4.",
          title: "Delivery and ",
          titleEmphasis: "activation",
          body: "Each piece arrives ready to place, with its NFC destination tested. We guide activation and adjust links when your campaign changes.",
        },
      ],
    },
    originCollection: {
      titleBefore: "We also make ",
      titleEmphasis: "lamps",
      titleAfter: ".",
      lede:
        "Locally printed light objects, designed to bring atmosphere to bars, tables, and corners.",
      cta: "Origin Collection",
      scrollAria: "Go to digital systems section",
    },
    systems: {
      sk: "Digital systems · complement your Tap Bar",
      titleBefore: "Beyond the ",
      titleEmphasis: "physical object",
      titleAfter: ".",
      lede:
        "Your NFC pieces can connect bookings, reviews, and more. We implement them with you, custom-built or integrated with what you already use.",
      items: [
        {
          id: "rewards",
          name: "Rewards ",
          nameEmphasis: "system",
          description:
            "Every tap earns points. Customers collect visits and redeem drinks, discounts, or products from a simple dashboard.",
          tag: "Coming soon",
          soon: true,
          icon: "star" as const,
        },
        {
          id: "booking",
          name: "Bookings in ",
          nameEmphasis: "one tap",
          description:
            "The chip opens your table, appointment, or service calendar. Works with Calendly, Google Calendar, or custom builds.",
          tag: "Available",
          soon: false,
          icon: "calendar" as const,
        },
        {
          id: "reviews",
          name: "Automatic ",
          nameEmphasis: "reviews",
          description:
            "Opens Google Reviews with the rating ready. From one tap to 5 stars in seconds.",
          tag: "Available",
          soon: false,
          icon: "reviews" as const,
        },
        {
          id: "analytics",
          name: "Live ",
          nameEmphasis: "metrics",
          description:
            "Taps per chip, day, hour, and destination. See what works and where to adjust, without forms or surveys.",
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
      priceNote: "*Price does not include VAT",
      ctaFeatured: "Quote this pack",
      ctaDefault: "Start here",
      items: [
        {
          id: "entrada",
          name: "Starter Pack",
          price: "$1,400",
          description:
            "For businesses taking their first digital step without a large investment.",
          color: "var(--brand-blue)",
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
          price: "$1,949",
          description:
            "The full team setup for a restaurant, café, or shop that wants to stand out.",
          color: "var(--brand-gray)",
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
          price: "$2,499",
          description:
            "Eliminate printed menus. Break-even vs traditional printing in 6–9 months.",
          color: "var(--brand-orange)",
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
      titleBefore: "Common ",
      titleEmphasis: "questions",
      titleAfter: "",
      lede: "Short answers. If something's missing, reach us on WhatsApp or email.",
      chatToday: "Today",
      items: [
        {
          id: "nfc",
          question: "What does an ",
          questionEmphasis: "NFC chip",
          answer:
            "Tap a phone and it opens the link you choose: Instagram, menu, WhatsApp, reviews, or a promo. No app, battery, or customer login required.",
        },
        {
          id: "reprogram",
          question: "Can it be ",
          questionEmphasis: "edited later",
          answer:
            "Yes. We use reprogrammable NTAG215 chips. If your menu, profile, or campaign changes, we update the destination at no cost during the warranty year.",
        },
        {
          id: "minimum",
          question: "What is the ",
          questionEmphasis: "minimum order",
          answer:
            "Standard catalog orders start at 10 units per variant. Custom designs and Smart Toys depend on the project, usually between 10 and 20 units.",
        },
        {
          id: "shipping",
          question: "Do you ",
          questionEmphasis: "ship nationwide",
          answer:
            "Yes, we ship across Mexico. Shipping is quoted by destination and volume, and we send tracking once the batch is on its way.",
        },
        {
          id: "custom",
          question: "Can you make an ",
          questionEmphasis: "exclusive design",
          answer:
            "Yes. We can adapt your logo, create a new shape, or develop a concept from scratch with exclusivity. The design fee is paid once per project.",
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
    sections: "Sections",
    contact: "Contact",
    links: {
      whatsapp: "WhatsApp",
    },
    copyright: "© 2026 Nimus · All rights reserved",
    legal: {
      terms: "Terms",
      privacy: "Privacy",
      cookies: "Cookies",
    },
  },
  cookies: {
    bannerAria: "Cookie notice",
    bannerMessage:
      "We use essential cookies to remember your privacy preference.",
    accept: "Accept",
    policyLink: "Learn more",
  },
  legal: {
    backHome: "Back to home",
    updatedLabel: "Last updated:",
    updatedDate: "June 29, 2026",
    terms: {
      title: "Terms of use",
      body: [
        "This site presents Nimus products and services. By browsing it you agree to these terms.",
        "Information, pricing, and timelines shown are indicative and may change without notice. A formal quote confirms scope, price, and delivery times.",
        "Visual content, copy, 3D models, and brand assets belong to Nimus or their respective owners. Reproduction without permission is not allowed.",
        "Links to third-party services (such as WhatsApp or Instagram) are governed by those platforms' policies.",
        "For questions about these terms, email hola@nimus.mx.",
      ],
    },
    privacy: {
      title: "Privacy notice",
      body: [
        "At Nimus we process the data you share with us to respond to quotes, provide commercial follow-up, and improve our services.",
        "We may receive your name, business, email, phone, and details you submit via forms or WhatsApp. We do not sell your personal data.",
        "We use your information to contact you, prepare proposals, and support orders or NFC projects.",
        "We retain data for as long as needed for the commercial relationship and applicable legal obligations.",
        "You may request access, correction, or deletion of your data by emailing hola@nimus.mx.",
      ],
    },
    cookies: {
      title: "Cookie policy",
      body: [
        "This site uses browser local storage to remember whether you accepted the cookie notice.",
        "The key used is nimus-make-cookie-consent and only stores your preference (for example, accepted). It does not track your activity on other sites.",
        "If you clear this preference, the notice may appear again on your next visit.",
        "We do not use third-party advertising cookies on this landing. If we add analytics in the future, we will update this page.",
        "For privacy or cookie questions, contact hola@nimus.mx.",
      ],
    },
  },
  loader: {
    synced: "Ready",
    aria: "NIMUS loading animation",
  },
} satisfies Dictionary;
