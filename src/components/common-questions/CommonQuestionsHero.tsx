"use client";

import { type Locale } from "@/lib/translations";
import {
  getCommonQuestionsData,
  type FAQCategory,
} from "@/data/common-questions";
import HeroHeaderRow from "@/components/shared/HeroHeaderRow";
import enTranslations from "@/locales/common-questions/en.json";
import frTranslations from "@/locales/common-questions/fr.json";
import Image from "next/image";
import Link from "next/link";

interface CommonQuestionsHeroProps {
  locale: Locale;
}

type CategoryTranslations = Record<string, string>;
type SubcategoryTranslations = Record<string, string>;

function getCategoryId(categoryKey: string, subcategoryKey?: string): string {
  if (subcategoryKey) {
    return `section-${categoryKey}-${subcategoryKey}`;
  }
  return `section-${categoryKey}`;
}

/** Flatten categories into nav items with id, label key, and whether it's a subcategory */
function getNavItems(faqData: FAQCategory[]): { id: string; labelKey: string; isSub: boolean }[] {
  const items: { id: string; labelKey: string; isSub: boolean }[] = [];
  for (const cat of faqData) {
    if (cat.subcategories) {
      for (const sub of cat.subcategories) {
        items.push({
          id: getCategoryId(cat.categoryKey, sub.subcategoryKey),
          labelKey: sub.subcategoryKey,
          isSub: true,
        });
      }
    } else {
      items.push({ id: getCategoryId(cat.categoryKey), labelKey: cat.categoryKey, isSub: false });
    }
  }
  return items;
}

/** Split nav items into 3 columns (Figma layout) */
function getNavColumns(faqData: FAQCategory[]) {
  const items = getNavItems(faqData);
  const third = Math.ceil(items.length / 3);
  return [items.slice(0, third), items.slice(third, third * 2), items.slice(third * 2)];
}

export default function CommonQuestionsHero({ locale }: CommonQuestionsHeroProps) {
  const t = locale === "fr" ? frTranslations : enTranslations;
  const categories = t.categories as CategoryTranslations;
  const subcategories = t.subcategories as SubcategoryTranslations;
  const faqData = getCommonQuestionsData(locale);
  const columns = getNavColumns(faqData);

  const getLabel = (labelKey: string, isSub: boolean) =>
    isSub ? (subcategories[labelKey] ?? labelKey) : (categories[labelKey] ?? labelKey);

  return (
    <section className="relative overflow-hidden">
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
      {/* Soft blend gradient at bottom */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 z-[5] h-24 sm:h-28 lg:h-32"
        style={{
          background:
            "linear-gradient(to top, #EFEFF3 0%, rgba(239, 239, 243, 0.6) 30%, rgba(217, 136, 167, 0.15) 90%, transparent 100%)",
        }}
        aria-hidden
      />
      <div className="relative z-10 mx-auto flex w-full max-w-[1210px] flex-col items-center gap-8 px-4 pt-24 pb-16 sm:px-6 sm:gap-10 sm:pt-32 sm:pb-20 lg:gap-16 lg:px-8 lg:pt-40 lg:pb-28">
        <HeroHeaderRow
          title={t.hero.title}
          backAriaLabel={t.hero.backToSupport}
          backHref={`/${locale}/support`}
        />
        <nav
          className="flex w-full max-w-[1086px] flex-col gap-6 sm:grid sm:grid-cols-2 sm:gap-8 lg:grid-cols-3 lg:gap-[96px]"
          aria-label="FAQ categories"
        >
          {columns.map((col, colIndex) => (
            <div key={colIndex} className="flex flex-col gap-4">
              {col.map((item) => (
                <Link
                  key={item.id}
                  href={`#${item.id}`}
                  className="text-left text-base text-white underline decoration-white/30 transition-colors hover:text-white hover:decoration-white"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {getLabel(item.labelKey, item.isSub)}
                </Link>
              ))}
            </div>
          ))}
        </nav>
      </div>
    </section>
  );
}
