"use client";

import { useCallback, useEffect, useState } from "react";
import { SiteChrome } from "@/components/layout/SiteChrome";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { TapBarSection } from "@/components/sections/TapBarSection";
import { ProductsSection } from "@/components/sections/ProductsSection";
import { WorkStripSection } from "@/components/sections/WorkStripSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { OriginCollectionSection } from "@/components/sections/OriginCollectionSection";
import { SystemsSection } from "@/components/sections/SystemsSection";
import { PacksSection } from "@/components/sections/PacksSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { CtaSection } from "@/components/sections/CtaSection";

export function HomePage() {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastVisible, setToastVisible] = useState(false);

  const showToast = useCallback((text: string) => {
    setToastMessage(text);
    setToastVisible(true);
  }, []);

  useEffect(() => {
    if (!toastVisible) return;
    const timer = setTimeout(() => setToastVisible(false), 2200);
    return () => clearTimeout(timer);
  }, [toastVisible, toastMessage]);

  return (
    <>
      <SiteChrome toastMessage={toastMessage} toastVisible={toastVisible} />
      <main>
        <HeroSection />
        <WorkStripSection />
        <TapBarSection />
        <ProductsSection />
        <ProcessSection />
        <OriginCollectionSection />
        <SystemsSection />
        <PacksSection />
        <FaqSection />
        <CtaSection onToast={showToast} />
      </main>
      <Footer />
    </>
  );
}
