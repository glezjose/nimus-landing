import type {
  TapBarOptionId,
  TapboardOptionId,
  TapbaseOptionId,
} from "@/lib/data/tapbar-options";

export type NavLink = { href: string; label: string };

export type Dictionary = {
  meta: {
    title: string;
    description: string;
  };
  nav: {
    links: NavLink[];
    brandAria: string;
    brandAlt: string;
    cta: string;
    contactAria: string;
    menu: string;
    close: string;
    closeAria: string;
    sectionsAria: string;
    legal: string;
    social: string;
    faq: string;
    instagram: string;
    backToTopAria: string;
  };
  hero: {
    leadWords: readonly string[];
    trailWords: readonly string[];
    marquee: readonly string[];
    backgroundAria: string;
    scrollAria: string;
  };
  sections: {
    tapbar: {
      titleLine1: string;
      titleLine2: string;
      titleEmphasis: string;
      sub: string;
      currency: string;
      priceNote: string;
      view3dAria: string;
      tilesMarqueeAria: string;
      options: ReadonlyArray<{
        id: TapBarOptionId;
        label: string;
        title: string;
        description: string;
        price: string;
      }>;
    };
    products: {
      sk: string;
      titleBefore: string;
      titleEmphasis: string;
      titleAfter: string;
      tapboard: {
        titleLine1: string;
        titleLine2: string;
        titleEmphasis: string;
        sub: string;
        options: ReadonlyArray<{
          id: TapboardOptionId;
          label: string;
          title: string;
          description: string;
          price: string;
        }>;
      };
      tapbase: {
        titleLine1: string;
        titleLine2: string;
        titleEmphasis: string;
        sub: string;
        options: ReadonlyArray<{
          id: TapbaseOptionId;
          label: string;
          title: string;
          description: string;
          price: string;
        }>;
      };
      currency: string;
      priceNote: string;
      scrollAria: string;
      items: ReadonlyArray<{
        id: string;
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
      }>;
    };
    work: {
      title: string;
      subtitle: string;
      swipeHint: string;
      scrollAria: string;
      photoPlaceholder: string;
      clients: ReadonlyArray<{
        id: string;
        name: string;
        nameEmphasis?: string;
        meta: string;
        photoSrc: string;
      }>;
    };
    process: {
      sk: string;
      titleBefore: string;
      titleRotatingTexts: readonly string[];
      titleAfter: string;
      lede: string;
      scrollAria: string;
      steps: ReadonlyArray<{
        num: string;
        title: string;
        titleEmphasis: string;
        body: string;
      }>;
    };
    originCollection: {
      titleBefore: string;
      titleEmphasis: string;
      titleAfter: string;
      lede: string;
      cta: string;
      scrollAria: string;
    };
    systems: {
      sk: string;
      titleBefore: string;
      titleEmphasis: string;
      titleAfter: string;
      lede: string;
      items: ReadonlyArray<{
        id: string;
        name: string;
        nameEmphasis: string;
        description: string;
        tag: string;
        soon: boolean;
        icon: "star" | "calendar" | "reviews" | "chart";
      }>;
    };
    packs: {
      sk: string;
      titleBefore: string;
      titleEmphasis: string;
      titleLine2: string;
      lede: string;
      currency: string;
      priceNote: string;
      ctaFeatured: string;
      ctaDefault: string;
      items: ReadonlyArray<{
        id: string;
        name: string;
        price: string;
        description: string;
        color: string;
        featured?: boolean;
        items: readonly string[];
      }>;
    };
    numbers: {
      sk: string;
      titleBefore: string;
      titleEmphasis: string;
      titleAfter: string;
      lede: string;
      items: ReadonlyArray<{
        label: string;
        value: string;
        valueEmphasis?: string;
        note: string;
      }>;
    };
    faq: {
      sk: string;
      titleBefore: string;
      titleEmphasis: string;
      titleAfter: string;
      lede: string;
      chatToday: string;
      items: ReadonlyArray<{
        id: string;
        question: string;
        questionEmphasis: string;
        answer: string;
      }>;
    };
    cta: {
      titleBefore: string;
      titleEmphasis: string;
      titleAfter: string;
      intro: string;
      whatsappLabel: string;
      emailLabel: string;
      instagramLabel: string;
      copyHint: string;
      formTitleBefore: string;
      formTitleEmphasis: string;
      formTitleAfter: string;
      namePlaceholder: string;
      businessPlaceholder: string;
      interestPlaceholder: string;
      detailPlaceholder: string;
      submit: string;
      formNote: string;
      openingWhatsApp: string;
      whatsappGreeting: string;
      whatsappInterest: string;
      whatsappDetail: string;
      quoteOptions: readonly string[];
    };
  };
  ui: {
    copied: string;
    copiedWith: string;
  };
  footer: {
    tagline: string;
    sections: string;
    contact: string;
    links: {
      whatsapp: string;
    };
    copyright: string;
    legal: {
      terms: string;
      privacy: string;
      cookies: string;
    };
  };
  cookies: {
    bannerAria: string;
    bannerMessage: string;
    accept: string;
    policyLink: string;
  };
  legal: {
    backHome: string;
    updatedLabel: string;
    updatedDate: string;
    terms: {
      title: string;
      body: readonly string[];
    };
    privacy: {
      title: string;
      body: readonly string[];
    };
    cookies: {
      title: string;
      body: readonly string[];
    };
  };
  loader: {
    synced: string;
    aria: string;
  };
};

export function formatMessage(
  template: string,
  values: Record<string, string>,
) {
  return Object.entries(values).reduce(
    (result, [key, value]) => result.replaceAll(`{${key}}`, value),
    template,
  );
}
