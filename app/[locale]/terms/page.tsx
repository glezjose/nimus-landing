import type { Metadata } from "next";
import { LegalDocument } from "@/components/legal/LegalDocument";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { isLocale, defaultLocale } from "@/lib/i18n/config";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const t = getDictionary(locale);

  return {
    title: `${t.legal.terms.title} · Nimus`,
    robots: { index: true, follow: true },
  };
}

export default function TermsPage() {
  return <LegalDocument slug="terms" />;
}
