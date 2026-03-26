"use client";

import { type Locale } from "@/lib/translations";
import enTranslations from "@/locales/about-us/en.json";
import frTranslations from "@/locales/about-us/fr.json";
import Image from "next/image";

interface OurFocusProps {
  locale: Locale;
}

interface AboutUsTranslations {
  ourFocus: {
    block1: string;
    block2: string;
    block3: string;
    block4: string;
    block5: string;
    block6: string;
    block7: string;
  };
}

export default function OurFocus({ locale }: OurFocusProps) {
  const translations = locale === "fr" ? frTranslations : enTranslations;
  const t = translations as AboutUsTranslations;

  return (
    <section className="py-8 sm:py-[96px] px-4 sm:px-6 lg:px-[96px]">
      <div className="max-w-6xl mx-auto">
        <div className="relative rounded-[28px] overflow-hidden min-h-[350px] sm:min-h-[380px]">
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
          <div className="relative z-10 p-8 sm:p-[96px] lg:p-[96px] h-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center h-full">
              {/* Left: Text blocks (equal width) */}
              <div className="lg:col-span-6 flex flex-col justify-center">
                <p
                  style={{ fontFamily: "var(--font-outfit)" }}
                  className="text-base sm:text-[32px] text-white font-[600] leading-relaxed mb-4"
                >
                  {t.ourFocus.block1}
                  <br />
                  {t.ourFocus.block2}
                </p>
                <p
                  style={{ fontFamily: "var(--font-outfit)" }}
                  className="text-lg sm:text-xl lg:text-[32px] text-white font-[600] leading-relaxed mb-12"
                >
                  {t.ourFocus.block3}
                  <br />
                  {t.ourFocus.block4}
                  <br />
                  {t.ourFocus.block5}
                  <br />
                  {t.ourFocus.block6}
                </p>
                <p
                  style={{ fontFamily: "var(--font-outfit)" }}
                  className="text-2xl sm:text-3xl lg:text-[48px] text-white font-[600] leading-tight"
                >
                  {t.ourFocus.block7}
                </p>
              </div>

              {/* Right: Image (equal width) */}
              <div className="lg:col-span-6 flex items-center justify-center">
                <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden">
                  <Image
                    src="/images/about/about4.png"
                    alt="Oneir partners in collaboration"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
