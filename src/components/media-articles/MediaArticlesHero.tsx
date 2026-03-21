"use client";

import { type Locale } from "@/lib/translations";
import HeroHeaderRow from "@/components/shared/HeroHeaderRow";
import enTranslations from "@/locales/media-articles/en.json";
import frTranslations from "@/locales/media-articles/fr.json";
import Image from "next/image";

interface MediaArticlesHeroProps {
  locale: Locale;
}

export default function MediaArticlesHero({ locale }: MediaArticlesHeroProps) {
  const t = locale === "fr" ? frTranslations : enTranslations;

  return (
    <section className="relative min-h-[350px] overflow-hidden sm:min-h-[400px] lg:min-h-[514px]">
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
      {/* Soft blend gradient at bottom - transitions hero into next section */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 z-[5] h-24 sm:h-28 lg:h-32"
        style={{
          background:
            "linear-gradient(to top, #EFEFF3 0%, rgba(239, 239, 243, 0.6) 30%, rgba(217, 136, 167, 0.15) 90%, transparent 100%)",
        }}
        aria-hidden
      />
      <div className="relative z-10 mx-auto flex w-full max-w-[1210px] flex-col items-center gap-4 px-4 pt-24 pb-16 text-center sm:px-6 sm:pt-32 sm:pb-20 lg:px-8 lg:pt-40 lg:pb-28">
        <HeroHeaderRow
          title={t.hero.title}
          backAriaLabel={t.hero.backToSupport}
          backHref={`/${locale}/support`}
        />
        <p className="max-w-[584px] text-base leading-relaxed text-white/95 sm:text-lg">
          {t.hero.subtitle}
        </p>
      </div>
    </section>
  );
}
