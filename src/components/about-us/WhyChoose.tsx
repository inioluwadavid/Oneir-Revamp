"use client";

import { type Locale } from "@/lib/translations";
import enTranslations from "@/locales/about-us/en.json";
import frTranslations from "@/locales/about-us/fr.json";
import Image from "next/image";

interface WhyChooseProps {
  locale: Locale;
}

interface WhyCard {
  title: string;
  description: string;
  icon: string;
}

interface AboutUsTranslations {
  why: {
    title: string;
    cards: WhyCard[];
  };
  cta: {
    title: string;
    description: string;
    button: string;
  };
}

export default function WhyChoose({ locale }: WhyChooseProps) {
  const translations = locale === "fr" ? frTranslations : enTranslations;
  const t = translations as AboutUsTranslations;

  return (
    <>
      {/* Why Oneir Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-16 bg-[#EFEFF3]">
        <div className="max-w-6xl mx-auto">
          <h2
            style={{ fontFamily: "var(--font-outfit)" }}
            className="text-2xl sm:text-[48px] font-[600] text-[#434349] mb-10 text-left"
          >
            {t.why.title}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {t.why.cards.map((card, index) => (
              <div
                key={index}
                className="bg-white rounded-[32px] p-6 lg:p-8 shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="w-[64px] h-[64px] mb-5 relative flex-shrink-0">
                  <Image
                    src={`/images/why/${card.icon}.svg`}
                    alt=""
                    fill
                    className="object-contain"
                    sizes="64px"
                  />
                </div>
                <h3
                  style={{ fontFamily: "var(--font-outfit)" }}
                  className="text-xl sm:text-[32px] font-[600] text-[#070714] mb-3"
                >
                  {card.title}
                </h3>
                <p className="text-base sm:text-[16px] text-[#434349] font-[400] leading-relaxed">
                  {card.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

    
    </>
  );
}
