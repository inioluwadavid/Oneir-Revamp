"use client";

import { type Locale } from "@/lib/translations";
import HeroHeaderRow from "@/components/shared/HeroHeaderRow";
import enTranslations from "@/locales/product-manuals/en.json";
import frTranslations from "@/locales/product-manuals/fr.json";
import Image from "next/image";

interface ProductManualsHeroProps {
  locale: Locale;
}

const TAB_IDS = [
  "manuals",
  "printingEmailing",
  "importingExporting",
  "electronicFundTransfers",
  "termsConditions",
] as const;

export default function ProductManualsHero({ locale }: ProductManualsHeroProps) {
  const t = locale === "fr" ? frTranslations : enTranslations;

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="relative min-h-[520px] overflow-hidden sm:min-h-[560px] lg:min-h-[620px]">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero/hero_bg.svg"
          alt=""
          fill
          className="object-cover"
          style={{ objectPosition: "center top" }}
          priority
          sizes="100vw"
        />
      </div>
      {/* Soft blend gradient at bottom */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 z-[5] h-24 sm:h-28 lg:h-32"
        style={{
          background:
            "linear-gradient(to top, #EFEFF3 0%, rgba(239, 239, 243, 0.6) 30%, rgba(217, 136, 167, 0.15) 90%, transparent 100%)",
        }}
        aria-hidden
      />
      <div className="relative z-10 flex flex-col items-center gap-8 px-4 pt-24 pb-16 sm:pt-32 sm:pb-20 lg:gap-16 lg:pt-40 lg:pb-28">
        <HeroHeaderRow
          title={t.hero.title}
          backAriaLabel={t.hero.backToSupport}
        />
        {/* Subtitle block - centered */}
        <div className="flex flex-col items-center gap-4 text-center">
          <p className="max-w-[584px] text-base leading-6 text-white sm:text-lg lg:text-[18px]">
            {t.hero.subtitle}
          </p>
        </div>
        {/* Section tabs - grid on mobile, horizontal flex on larger screens */}
        <nav
          className="flex w-full max-w-[1210px] justify-center pb-2"
          aria-label="Product manual sections"
        >
          <div className="grid w-full grid-cols-2 justify-items-center gap-x-4 gap-y-4 sm:flex sm:w-auto sm:shrink-0 sm:flex-wrap sm:justify-center sm:gap-6 md:gap-8 lg:gap-16">
            {TAB_IDS.map((tabId) => (
              <button
                key={tabId}
                type="button"
                onClick={() => scrollToSection(tabId)}
                className="whitespace-nowrap text-base font-normal text-white underline decoration-white underline-offset-2 transition-colors duration-200 hover:text-white/80 hover:decoration-white/80"
              >
                {t.tabs[tabId]}
              </button>
            ))}
          </div>
        </nav>
      </div>
    </section>
  );
}
