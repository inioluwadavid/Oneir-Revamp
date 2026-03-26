"use client";

import { type Locale } from "@/lib/translations";
import enTranslations from "@/locales/about-us/en.json";
import frTranslations from "@/locales/about-us/fr.json";
import Image from "next/image";

interface HowWeWorkProps {
  locale: Locale;
}

interface AboutUsTranslations {
  howWeWork: {
    intro: string;
    mainTitle: string;
    description: string;
  };
}

export default function HowWeWork({ locale }: HowWeWorkProps) {
  const translations = locale === "fr" ? frTranslations : enTranslations;
  const t = translations as AboutUsTranslations;

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-16">
      <div className="max-w-6xl mx-auto">
        <div
          className="bg-white rounded-[32px] px-4 py-8 shadow-[0px_16px_20px_0px_rgba(0,0,0,0.01)] sm:px-8 sm:py-12 lg:px-24 lg:py-20"
          aria-labelledby="how-we-work-tagline"
        >
          <div className="flex flex-col gap-12 lg:gap-20 items-start w-full">
            <p
              style={{ fontFamily: "var(--font-outfit)" }}
              className="max-w-[644px] text-2xl sm:text-[32px] font-[600] text-[#070714] leading-normal"
            >
              {t.howWeWork.intro}
            </p>

            <div className="flex flex-col lg:flex-row lg:items-center gap-10 lg:gap-[88px] w-full">
              <div className="relative h-[220px] sm:h-[280px] lg:h-[308px] w-full max-w-[473px] shrink-0 overflow-hidden rounded-[32px]">
                <Image
                  src="/images/about/about2.png"
                  alt="Oneir team collaborating around documents and laptop"
                  width={1419}
                  height={924}
                  className="absolute max-w-none object-cover w-[111.85%] h-[117.55%] left-[-3.9%] top-[-4.59%]"
                  sizes="(max-width: 1024px) 100vw, 473px"
                />
              </div>
              <p
                className="w-full max-w-[457px] text-base font-[400] text-[#434349] leading-6"
                style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}
              >
                {t.howWeWork.description}
              </p>
            </div>

            <h2
              id="how-we-work-tagline"
              style={{ fontFamily: "var(--font-outfit)" }}
              className="text-2xl sm:text-[48px] font-[600] text-[#070714] leading-normal w-full min-w-full"
            >
              {t.howWeWork.mainTitle}
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
}
