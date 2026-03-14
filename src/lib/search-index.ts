import type { Locale } from "@/lib/translations";
import {
  MEDIA_SECTION_ANCHORS,
  createMediaArticleAnchor,
  createProductManualItemAnchor,
} from "@/lib/anchor-utils";
import { getCommonQuestionsData } from "@/data/common-questions";
import productManualsEn from "@/locales/product-manuals/en.json";
import productManualsFr from "@/locales/product-manuals/fr.json";
import mediaArticlesEn from "@/locales/media-articles/en.json";
import mediaArticlesFr from "@/locales/media-articles/fr.json";
import commonQuestionsEn from "@/locales/common-questions/en.json";
import commonQuestionsFr from "@/locales/common-questions/fr.json";

export type SearchSource = "product-manuals" | "common-questions" | "media-and-articles";

export interface SearchIndexEntry {
  id: string;
  source: SearchSource;
  title: string;
  subtitle?: string;
  keywords: string[];
  href: string;
  anchorId: string;
  locale: Locale;
}

function createEntry(
  source: SearchSource,
  locale: Locale,
  anchorId: string,
  title: string,
  subtitle: string | undefined,
  keywords: string[],
  pagePath: string
): SearchIndexEntry {
  return {
    id: `${source}:${locale}:${anchorId}`,
    source,
    title,
    subtitle,
    keywords,
    href: `/${locale}/${pagePath}#${anchorId}`,
    anchorId,
    locale,
  };
}

export function buildSearchIndex(locale: Locale): SearchIndexEntry[] {
  const entries: SearchIndexEntry[] = [];
  const manualsT = locale === "fr" ? productManualsFr : productManualsEn;
  const mediaT = locale === "fr" ? mediaArticlesFr : mediaArticlesEn;
  const commonQuestionsT = locale === "fr" ? commonQuestionsFr : commonQuestionsEn;
  const faqData = getCommonQuestionsData(locale);

  // Product manuals: section headers + subheaders (manual cards)
  for (const [sectionId, section] of Object.entries(manualsT.sections)) {
    entries.push(
      createEntry(
        "product-manuals",
        locale,
        sectionId,
        section.title,
        undefined,
        [manualsT.hero.title],
        "product-manuals"
      )
    );

    for (const item of section.items) {
      const itemAnchor = createProductManualItemAnchor(sectionId, item.title);
      entries.push(
        createEntry(
          "product-manuals",
          locale,
          itemAnchor,
          item.title,
          item.description,
          [section.title],
          "product-manuals"
        )
      );
    }
  }

  // Media and articles: section headers + article titles
  const mediaSections = [
    { key: "techAdvisor" as const, anchor: MEDIA_SECTION_ANCHORS.techAdvisor },
    { key: "oneirMinute" as const, anchor: MEDIA_SECTION_ANCHORS.oneirMinute },
  ];

  for (const sectionMeta of mediaSections) {
    const section = mediaT.sections[sectionMeta.key];
    const articles = mediaT.articles[sectionMeta.key];

    entries.push(
      createEntry(
        "media-and-articles",
        locale,
        sectionMeta.anchor,
        section.title,
        section.subtitle,
        [mediaT.hero.title],
        "media-and-articles"
      )
    );

    for (const article of articles) {
      const articleAnchor = createMediaArticleAnchor(sectionMeta.anchor, article.title);
      entries.push(
        createEntry(
          "media-and-articles",
          locale,
          articleAnchor,
          article.title,
          article.description,
          [section.title],
          "media-and-articles"
        )
      );
    }
  }

  // Common questions: category/subcategory headers + question entries
  const categories = commonQuestionsT.categories as Record<string, string>;
  const subcategories = commonQuestionsT.subcategories as Record<string, string>;

  for (const category of faqData) {
    if (category.subcategories) {
      for (const sub of category.subcategories) {
        const subAnchor = `section-${category.categoryKey}-${sub.subcategoryKey}`;
        const subTitle = subcategories[sub.subcategoryKey] ?? sub.subcategoryKey;
        entries.push(
          createEntry(
            "common-questions",
            locale,
            subAnchor,
            subTitle,
            undefined,
            [categories[category.categoryKey] ?? category.categoryKey],
            "common-questions"
          )
        );

        sub.items.forEach((item, index) => {
          const questionAnchor = `accordion-trigger-${category.categoryKey}-${sub.subcategoryKey}-${index}`;
          entries.push(
            createEntry(
              "common-questions",
              locale,
              questionAnchor,
              item.question,
              item.answer,
              [subTitle, categories[category.categoryKey] ?? category.categoryKey],
              "common-questions"
            )
          );
        });
      }
      continue;
    }

    const categoryAnchor = `section-${category.categoryKey}`;
    const categoryTitle = categories[category.categoryKey] ?? category.categoryKey;
    entries.push(
      createEntry(
        "common-questions",
        locale,
        categoryAnchor,
        categoryTitle,
        undefined,
        [commonQuestionsT.hero.title],
        "common-questions"
      )
    );

    category.items?.forEach((item, index) => {
      const questionAnchor = `accordion-trigger-${category.categoryKey}-${index}`;
      entries.push(
        createEntry(
          "common-questions",
          locale,
          questionAnchor,
          item.question,
          item.answer,
          [categoryTitle],
          "common-questions"
        )
      );
    });
  }

  return entries;
}
