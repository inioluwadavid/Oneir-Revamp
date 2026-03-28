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
  "gettingStartedSystemSetup",
  "salesCustomersCrm",
  "purchasingInventoryProduction",
  "paymentsPayrollFinancialProcesses",
  "printingEmailDocuments",
  "systemAdministrationDataSupport",
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
          className="object-cover object-top"
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
      <div className="relative z-10 mx-auto flex w-full max-w-[1210px] flex-col items-center gap-8 px-4 pt-24 pb-16 sm:px-6 sm:pt-32 sm:pb-20 lg:gap-10 lg:px-8 lg:pt-40 lg:pb-28">
        <div className="flex w-full flex-col items-center gap-4 mb-[30px] text-center">
          <HeroHeaderRow
            title={t.hero.title}
            backAriaLabel={t.hero.backToSupport}
            backHref={`/${locale}/support`}
          />
          <p className="max-w-[584px] text-base leading-6 text-white sm:text-lg lg:text-[18px] lg:leading-6">
            {t.hero.subtitle}
          </p>
        </div>
        {/* Section tabs - 2 rows on desktop per Figma (Frame 4588) */}
        <nav
          className="flex w-full max-w-[1210px] justify-center pb-2"
          aria-label="Product manual sections"
        >
          <div className="flex w-full max-w-[939px] flex-col items-center gap-6 sm:gap-12">
            <div className="flex flex-wrap justify-center gap-6 sm:gap-8 md:gap-16">
              {TAB_IDS.slice(0, 3).map((tabId) => (
                <button
                  key={tabId}
                  type="button"
                  onClick={() => scrollToSection(tabId)}
                  className="text-center text-balance text-base font-normal text-white underline decoration-white underline-offset-2 transition-colors duration-200 hover:text-white/80 hover:decoration-white/80 sm:whitespace-nowrap"
                >
                  {t.tabs[tabId]}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap justify-center gap-6 sm:gap-8 md:gap-16">
              {TAB_IDS.slice(3, 6).map((tabId) => (
                <button
                  key={tabId}
                  type="button"
                  onClick={() => scrollToSection(tabId)}
                  className="text-center text-balance text-base font-normal text-white underline decoration-white underline-offset-2 transition-colors duration-200 hover:text-white/80 hover:decoration-white/80 sm:whitespace-nowrap"
                >
                  {t.tabs[tabId]}
                </button>
              ))}
            </div>
          </div>
        </nav>
      </div>
    </section>
  );
}
