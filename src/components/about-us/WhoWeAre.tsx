"use client";

import { type Locale } from "@/lib/translations";
import enTranslations from "@/locales/about-us/en.json";
import frTranslations from "@/locales/about-us/fr.json";
import Image from "next/image";

interface WhoWeAreProps {
  locale: Locale;
}

interface AboutUsTranslations {
  whoWeAre: {
    title: string;
    paragraph1: string;
    paragraph2: string;
    paragraph3: string;
    paragraph4: string;
  };
}

export default function WhoWeAre({ locale }: WhoWeAreProps) {
  const translations = locale === "fr" ? frTranslations : enTranslations;
  const t = translations as AboutUsTranslations;

  return (
    <section className="relative min-h-[700px] sm:min-h-[750px] lg:min-h-[800px] overflow-hidden" aria-labelledby="about-hero-heading">
      {/* Background - about1.png gradient with abstract shapes */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero/hero_bg.svg"
          alt=""
          fill
          className="object-cover object-center"
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

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-[calc(var(--navbar-height)+3.5rem)] sm:pt-[calc(6rem+4rem)] lg:pt-[calc(6rem+6rem)] pb-14 sm:pb-16 lg:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 xl:gap-16 items-center">
          {/* Left - Text content (50% width) */}
          <div className="lg:col-span-6 flex flex-col justify-center text-left">
            <h1
              id="about-hero-heading"
              style={{ fontFamily: "var(--font-outfit)" }}
              className="text-2xl sm:text-[48px] font-[600] text-white mb-6 leading-tight"
            >
              {t.whoWeAre.title}
            </h1>

            <p className="text-base sm:text-[16px] text-white font-[400] leading-relaxed mb-4">
              {t.whoWeAre.paragraph1}
            </p>

            <p className="text-base sm:text-[16px] text-white font-[400] leading-relaxed mb-4">
              {t.whoWeAre.paragraph2}
            </p>

            <p className="text-base sm:text-[16px] text-white font-[400] leading-relaxed mb-4">
              {t.whoWeAre.paragraph3}
            </p>

            <p className="text-base sm:text-[16px] text-white font-[400] leading-relaxed">
              {t.whoWeAre.paragraph4}
            </p>
          </div>

          {/* Right - Meeting/team image (50% width) with rounded corners */}
          <div className="lg:col-span-6 flex items-center justify-center">
            <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-xl">
              <Image
                src="/images/about/about1.png"
                alt="Oneir team in a business meeting"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 400px"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
