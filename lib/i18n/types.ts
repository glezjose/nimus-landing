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
  };
  sections: {
    tapbar: {
      tag: string;
      titleLine1: string;
      titleLine2: string;
      titleEmphasis: string;
      sub: string;
      cta: string;
      currency: string;
      variantPills: {
        bar2: string;
        qr: string;
        bar3: string;
        bar4: string;
        max: string;
      };
      features: ReadonlyArray<{ num: string; text: string }>;
      variants: ReadonlyArray<{
        id: number;
        slug: string;
        name: string;
        sub: string;
        price: string;
        image: string;
        alt: string;
      }>;
    };
    products: {
      sk: string;
      titleBefore: string;
      titleEmphasis: string;
      titleAfter: string;
      lede: string;
      currency: string;
      items: ReadonlyArray<{
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
      }>;
    };
    work: {
      title: string;
      subtitle: string;
      swipeHint: string;
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
      titleEmphasis: string;
      titleAfter: string;
      lede: string;
      steps: ReadonlyArray<{
        num: string;
        title: string;
        titleEmphasis: string;
        body: string;
      }>;
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
    products: string;
    business: string;
    contact: string;
    links: {
      tapBar: string;
      smartLink: string;
      smartToys: string;
      exhibitor: string;
      customLine: string;
      packs: string;
      process: string;
      faq: string;
      quote: string;
      whatsapp: string;
    };
    copyright: string;
    version: string;
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
