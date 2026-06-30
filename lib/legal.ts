export const COOKIE_CONSENT_KEY = "nimus-make-cookie-consent";

export const legalSlugs = ["terms", "privacy", "cookies"] as const;

export type LegalSlug = (typeof legalSlugs)[number];
