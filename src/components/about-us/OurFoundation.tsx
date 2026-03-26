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

/** Matches Figma “Our Foundation” card + NeedAdditionalAssistance pink gradient */
const FOUNDATION_CARD_GRADIENT =
  "linear-gradient(180deg, rgb(148, 44, 86) 0.75%, rgba(151, 49, 90, 0.965) 21.77%, rgba(161, 63, 101, 0.867) 46.99%, rgba(177, 86, 120, 0.7) 74.41%, rgba(200, 119, 145, 0.475) 103.33%, rgba(228, 160, 178, 0.184) 133.17%, rgba(246, 186, 199, 0) 149.71%)";

export default function OurFoundation({ locale }: OurFoundationProps) {
  const translations = locale === "fr" ? frTranslations : enTranslations;
  const t = translations as AboutUsTranslations;

  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-16">
      <div className="max-w-6xl mx-auto">
        <h2
          style={{ fontFamily: "var(--font-outfit)" }}
          className="text-2xl sm:text-[48px] font-[600] text-[#070714] mb-8"
        >
          {t.foundation.title}
        </h2>

        <div
          className="relative overflow-hidden rounded-[32px] p-8 sm:p-12 lg:p-24"
          style={{ background: FOUNDATION_CARD_GRADIENT }}
        >
          <div className="flex flex-col gap-12 lg:gap-20">
            {/* Top row: main copy + image (Figma gap 88px, items-center) */}
            <div className="flex flex-col lg:flex-row lg:items-center gap-10 lg:gap-[88px]">
              <p
                style={{ fontFamily: "var(--font-outfit)" }}
                className="w-full max-w-[457px] shrink-0 text-2xl sm:text-[32px] font-[600] text-white leading-normal"
              >
                {t.foundation.mainText}
              </p>
              <div className="relative w-full max-w-[473px] aspect-[473/308] lg:aspect-auto lg:h-[308px] lg:w-[473px] shrink-0 overflow-hidden rounded-[32px]">
                <Image
                  src="/images/about/about3.png"
                  alt="Modern data center with server racks"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 473px"
                />
              </div>
            </div>

            {/* Bottom copy: 16px / 24px line-height, aligned with right column on large screens */}
            <div className="flex justify-start lg:justify-end">
              <p
                className="w-full max-w-[457px] text-base text-white font-[400] leading-6 text-start"
                style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}
              >
                {t.foundation.subText}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
