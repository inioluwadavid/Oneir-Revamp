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
        {/* White rounded card on light gray background */}
        <div className="bg-white rounded-[28px] p-8 sm:p-12 shadow-lg">
          {/* Top-left: Intro heading */}
          <h3
            style={{ fontFamily: "var(--font-outfit)" }}
            className="text-xl sm:text-2xl lg:text-[32px] font-[600] text-[#070714] leading-relaxed mb-10 sm:mb-12"
          >
            {t.howWeWork.intro}
          </h3>

          {/* Middle: Image left, description right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center mb-10 sm:mb-12">
            <div className="lg:col-span-7">
              <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden">
                <Image
                  src="/images/about/about2.png"
                  alt="Oneir team collaborating around documents and laptop"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />
              </div>
            </div>
            <div className="lg:col-span-5 flex items-center justify-center lg:text-start">
              <p className="text-[15px] sm:text-[16px] font-[400] text-[#434349] leading-relaxed max-w-sm">
                {t.howWeWork.description}
              </p>
            </div>
          </div>

          {/* Bottom-left: Main tagline */}
          <h2
            style={{ fontFamily: "var(--font-outfit)" }}
            className="text-3xl sm:text-4xl lg:text-[48px] font-[700] text-[#070714] leading-tight"
          >
            {t.howWeWork.mainTitle}
          </h2>
        </div>
      </div>
    </section>
  );
}
