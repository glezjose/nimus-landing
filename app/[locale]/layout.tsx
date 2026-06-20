import type { Metadata } from "next";
import { DictionaryProvider } from "@/components/providers/DictionaryProvider";
import { SetHtmlLang } from "@/components/providers/SetHtmlLang";
import { SiteLoader } from "@/components/layout/SiteLoader";
import {
  defaultLocale,
  isLocale,
  localeAvailableLanguage,
  localeJsonLdLanguage,
  localeOgLocale,
  locales,
  type Locale,
} from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { siteConfig } from "@/lib/site";

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

function resolveLocale(raw: string): Locale {
  return isLocale(raw) ? raw : defaultLocale;
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LayoutProps): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = resolveLocale(rawLocale);
  const t = getDictionary(locale);

  return {
    metadataBase: new URL(siteConfig.url),
    title: t.meta.title,
    description: t.meta.description,
    alternates: {
      canonical: `/${locale}`,
      languages: Object.fromEntries(
        locales.map((item) => [item, `/${item}`]),
      ),
    },
    openGraph: {
      title: t.meta.title,
      description: t.meta.description,
      url: `${siteConfig.url}/${locale}`,
      siteName: siteConfig.name,
      locale: localeOgLocale(locale),
      type: "website",
      images: [
        {
          url: "/assets/og-image.svg",
          width: 1200,
          height: 630,
          alt: t.meta.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t.meta.title,
      description: t.meta.description,
      images: ["/assets/og-image.svg"],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

function JsonLd({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: siteConfig.name,
        url: siteConfig.url,
        email: siteConfig.email,
        sameAs: [siteConfig.instagramUrl],
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "sales",
          telephone: siteConfig.whatsappDisplay,
          email: siteConfig.email,
          availableLanguage: [localeAvailableLanguage(locale)],
        },
      },
      {
        "@type": "WebSite",
        name: siteConfig.name,
        url: siteConfig.url,
        inLanguage: localeJsonLdLanguage(locale),
        description: t.meta.description,
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default async function LocaleLayout({ children, params }: LayoutProps) {
  const { locale: rawLocale } = await params;
  const locale = resolveLocale(rawLocale);
  const dictionary = getDictionary(locale);

  return (
    <DictionaryProvider locale={locale} dictionary={dictionary}>
      <SetHtmlLang locale={locale} />
      <script
        dangerouslySetInnerHTML={{
          __html: `document.body.classList.add("site-loading");`,
        }}
      />
      <SiteLoader />
      <JsonLd locale={locale} />
      {children}
    </DictionaryProvider>
  );
}
