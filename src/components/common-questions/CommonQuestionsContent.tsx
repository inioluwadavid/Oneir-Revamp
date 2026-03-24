"use client";

import { type Locale } from "@/lib/translations";
import { AccordionGroup } from "@/components/ui/Accordion";
import {
  getCommonQuestionsData,
  type FAQCategory,
  type FAQSubcategory,
} from "@/data/common-questions";
import FadeInSection from "@/components/motion/FadeInSection";
import enTranslations from "@/locales/common-questions/en.json";
import frTranslations from "@/locales/common-questions/fr.json";

interface CommonQuestionsContentProps {
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

export default function CommonQuestionsContent({ locale }: CommonQuestionsContentProps) {
  const t = locale === "fr" ? frTranslations : enTranslations;
  const categories = t.categories as CategoryTranslations;
  const subcategories = t.subcategories as SubcategoryTranslations;
  const faqData = getCommonQuestionsData(locale);

  return (
    <div className="flex flex-col">
      {faqData.map((category: FAQCategory, index: number) => (
        <FadeInSection key={category.categoryKey} delay={index * 0.06}>
          <FAQCategorySection
            category={category}
            categories={categories}
            subcategories={subcategories}
            getCategoryId={getCategoryId}
          />
        </FadeInSection>
      ))}
    </div>
  );
}

interface FAQCategorySectionProps {
  category: FAQCategory;
  categories: CategoryTranslations;
  subcategories: SubcategoryTranslations;
  getCategoryId: (cat: string, sub?: string) => string;
}

function FAQCategorySection({
  category,
  categories,
  subcategories,
  getCategoryId,
}: FAQCategorySectionProps) {
  if (category.subcategories) {
    return (
      <div className="flex flex-col">
        {category.subcategories.map((sub: FAQSubcategory) => (
          <section
            key={getCategoryId(category.categoryKey, sub.subcategoryKey)}
            id={getCategoryId(category.categoryKey, sub.subcategoryKey)}
            className="my-[40px] rounded-[32px] bg-white p-6 shadow-[0px_16px_20px_0px_rgba(0,0,0,0.01)] lg:my-[60px] sm:p-[96px]"
          >
            <h2
              className="mb-6 text-xl font-semibold text-[#070714] sm:text-[40px]"
              style={{ fontFamily: "var(--font-outfit)" }}
            >
              {subcategories[sub.subcategoryKey] ?? sub.subcategoryKey}
            </h2>
            <AccordionGroup
              items={sub.items}
              idPrefix={`${category.categoryKey}-${sub.subcategoryKey}`}
            />
          </section>
        ))}
      </div>
    );
  }

  if (!category.items || category.items.length === 0) return null;

  return (
    <section
      id={getCategoryId(category.categoryKey)}
      className="my-[40px] scroll-mt-28 rounded-[32px] bg-white p-6 shadow-[0px_16px_20px_0px_rgba(0,0,0,0.01)] lg:my-[60px] sm:p-[96px]"
    >
      <h2
        className="mb-6 text-xl font-semibold text-[#070714] sm:text-[40px]"
        style={{ fontFamily: "var(--font-outfit)" }}
      >
        {categories[category.categoryKey] ?? category.categoryKey}
      </h2>
      <AccordionGroup items={category.items} idPrefix={category.categoryKey} />
    </section>
  );
}
