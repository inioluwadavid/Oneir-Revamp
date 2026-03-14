"use client";

import { type Locale } from "@/lib/translations";
import { AccordionGroup } from "@/components/ui/Accordion";
import {
  getCommonQuestionsData,
  type FAQCategory,
  type FAQSubcategory,
} from "@/data/common-questions";
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
    <div className="flex flex-col gap-8 sm:gap-10">
      {faqData.map((category: FAQCategory) => (
        <FAQCategorySection
          key={category.categoryKey}
          category={category}
          categories={categories}
          subcategories={subcategories}
          getCategoryId={getCategoryId}
        />
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
      <>
        {category.subcategories.map((sub: FAQSubcategory) => (
          <section
            key={getCategoryId(category.categoryKey, sub.subcategoryKey)}
            id={getCategoryId(category.categoryKey, sub.subcategoryKey)}
            className="scroll-mt-28 sm:my-[46px] rounded-2xl bg-white p-6 shadow-[0px_16px_20px_0px_rgba(0,0,0,0.01)] sm:p-[96px]"
          >
            <h2
              className="mb-6 text-xl font-semibold text-[#070714] sm:text-2xl"
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
      </>
    );
  }

  if (!category.items || category.items.length === 0) return null;

  return (
    <section
      id={getCategoryId(category.categoryKey)}
      className="scroll-mt-28 sm:my-[46px] rounded-2xl bg-white p-6 shadow-[0px_16px_20px_0px_rgba(0,0,0,0.01)] sm:p-[96px]"
    >
      <h2
        className="mb-6 text-xl font-semibold text-[#070714] sm:text-2xl"
        style={{ fontFamily: "var(--font-outfit)" }}
      >
        {categories[category.categoryKey] ?? category.categoryKey}
      </h2>
      <AccordionGroup items={category.items} idPrefix={category.categoryKey} />
    </section>
  );
}
