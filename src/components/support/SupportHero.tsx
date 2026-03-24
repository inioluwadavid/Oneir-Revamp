import { type Locale } from "@/lib/translations";
import enTranslations from "@/locales/support/en.json";
import frTranslations from "@/locales/support/fr.json";
import Image from "next/image";

interface SupportHeroProps {
  locale: Locale;
}

export default function SupportHero({ locale }: SupportHeroProps) {
  const t = locale === "fr" ? frTranslations : enTranslations;

  return (
    <section className="relative min-h-[350px] sm:min-h-[400px] lg:min-h-[568px] overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero/hero_bg.svg"
          alt=""
          fill
          className="object-cover object-top"
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
      <div className="relative z-10 flex flex-col items-center justify-center px-4 pt-24 pb-16 sm:pt-32 sm:pb-20 lg:pt-40 lg:pb-28 text-center">
        <h1
          className="text-2xl font-semibold text-white sm:text-4xl lg:text-[48px] mb-4"
          style={{ fontFamily: "var(--font-outfit)" }}
        >
          {t.hero.title}
        </h1>
        <p className="max-w-[584px] text-base text-white/95 sm:text-lg leading-relaxed">
          {t.hero.subtitle}
        </p>
      </div>
    </section>
  );
}
