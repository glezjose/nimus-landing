"use client";

import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useDictionary } from "@/components/providers/DictionaryProvider";
import type { LegalSlug } from "@/lib/legal";

type LegalDocumentProps = {
  slug: LegalSlug;
};

export function LegalDocument({ slug }: LegalDocumentProps) {
  const { locale, t } = useDictionary();
  const page = t.legal[slug];

  return (
    <div className="legal-page">
      <div className="legal-page__inner">
        <Link href={`/${locale}`} className="legal-page__back">
          <ChevronLeftIcon
            className="legal-page__back-icon"
            width={16}
            height={16}
            aria-hidden="true"
          />
          {t.legal.backHome}
        </Link>
        <header className="legal-page__head">
          <h1>{page.title}</h1>
          <p className="legal-page__updated">
            {t.legal.updatedLabel} {t.legal.updatedDate}
          </p>
        </header>
        <div className="legal-page__body">
          {page.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>
    </div>
  );
}
