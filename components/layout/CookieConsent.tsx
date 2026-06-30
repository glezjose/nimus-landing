"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useDictionary } from "@/components/providers/DictionaryProvider";
import { COOKIE_CONSENT_KEY } from "@/lib/legal";

export function CookieConsent() {
  const { locale, t } = useDictionary();
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    try {
      const accepted = window.localStorage.getItem(COOKIE_CONSENT_KEY);
      setVisible(accepted !== "accepted");
    } catch {
      setVisible(true);
    }
  }, []);

  const accept = () => {
    try {
      window.localStorage.setItem(COOKIE_CONSENT_KEY, "accepted");
    } catch {
      /* ignore storage failures */
    }
    setClosing(true);
    window.setTimeout(() => setVisible(false), 220);
  };

  if (!mounted || !visible) return null;

  const panel = (
    <div
      className={`cookie-consent${closing ? " cookie-consent--closing" : ""}`}
      role="dialog"
      aria-live="polite"
      aria-label={t.cookies.bannerAria}
    >
      <p className="cookie-consent__message">
        {t.cookies.bannerMessage}{" "}
        <Link href={`/${locale}/cookies`} className="cookie-consent__link">
          {t.cookies.policyLink}
        </Link>
      </p>
      <button
        type="button"
        className="cookie-consent__accept"
        onClick={accept}
      >
        {t.cookies.accept}
      </button>
    </div>
  );

  return createPortal(panel, document.body);
}
