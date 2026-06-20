"use client";

import { createContext, useContext } from "react";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/types";

type DictionaryContextValue = {
  locale: Locale;
  t: Dictionary;
};

const DictionaryContext = createContext<DictionaryContextValue | null>(null);

type DictionaryProviderProps = {
  locale: Locale;
  dictionary: Dictionary;
  children: React.ReactNode;
};

export function DictionaryProvider({
  locale,
  dictionary,
  children,
}: DictionaryProviderProps) {
  return (
    <DictionaryContext.Provider value={{ locale, t: dictionary }}>
      {children}
    </DictionaryContext.Provider>
  );
}

export function useDictionary() {
  const context = useContext(DictionaryContext);
  if (!context) {
    throw new Error("useDictionary must be used within DictionaryProvider");
  }
  return context;
}

export function useTranslations() {
  return useDictionary().t;
}
