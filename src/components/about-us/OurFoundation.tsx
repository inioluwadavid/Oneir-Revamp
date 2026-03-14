"use client";

import { type Locale } from "@/lib/translations";
import enTranslations from "@/locales/about-us/en.json";
import frTranslations from "@/locales/about-us/fr.json";
import Image from "next/image";

interface OurFoundationProps {
  locale: Locale;
}

interface AboutUsTranslations {
  foundation: {
    title: string;
    mainText: string;
    subText: string;
  };
}

export default function OurFoundation({ locale }: OurFoundationProps) {
  const translations = locale === "fr" ? frTranslations : enTranslations;
  const t = translations as AboutUsTranslations;

  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-16">
      <div className="max-w-6xl mx-auto">
        {/* Section title */}
        <h2
          style={{ fontFamily: "var(--font-outfit)" }}
          className="text-2xl sm:text-3xl font-[600] text-[#434349] mb-8"
        >
          {t.foundation.title}
        </h2>

        {/* Main container with gradient background from sell_bg.svg */}
        <div className="relative rounded-[24px] overflow-hidden min-h-[400px] sm:min-h-[450px] lg:min-h-[380px]">
          {/* Background - sell_bg.svg gradient */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/sell/sell_bg.svg"
              alt=""
              fill
              className="object-cover object-center"
              sizes="100vw"
            />
          </div>

          {/* Content */}
          <div className="relative z-10 p-8 sm:p-10 lg:p-12 h-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch h-full">
              {/* Left: Main text block */}
              <div className="lg:col-span-6 flex flex-col justify-center">
                <p
                  style={{ fontFamily: "var(--font-outfit)" }}
                  className="text-base sm:text-lg text-white font-[500] leading-relaxed"
                >
                  {t.foundation.mainText}
                </p>
              </div>

              {/* Right: Image + bottom text */}
              <div className="lg:col-span-6 flex flex-col gap-6">
                <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden flex-shrink-0">
                  <Image
                    src="/images/about/about3.png"
                    alt="Modern data center with server racks"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                <p className="text-sm sm:text-base text-white/90 font-[400] leading-relaxed text-right">
                  {t.foundation.subText}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
