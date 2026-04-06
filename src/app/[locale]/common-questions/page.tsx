import { type Locale } from "@/lib/translations";
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer";
import CommonQuestionsHero from "@/components/common-questions/CommonQuestionsHero";
import CommonQuestionsContent from "@/components/common-questions/CommonQuestionsContent";
import NeedAdditionalAssistance from "@/components/shared/NeedAdditionalAssistance";
import SeoContentLinks from "@/components/shared/SeoContentLinks";
import enTranslations from "@/locales/common-questions/en.json";
import frTranslations from "@/locales/common-questions/fr.json";
import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import { buildAlternates, buildWebPageSchema, localizedPath } from "@/lib/seo";
import { getCommonQuestionsData } from "@/data/common-questions";

interface CommonQuestionsPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: CommonQuestionsPageProps): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  const t = locale === "fr" ? frTranslations : enTranslations;
  const title = t.hero.title;
  const description = t.hero.subtitle;

  return {
    title,
    description,
    alternates: buildAlternates(locale, "common-questions"),
    openGraph: {
      title: `${title} | Oneir Solutions`,
      description,
      url: localizedPath(locale, "common-questions"),
    },
  };
}

export default async function CommonQuestionsPage({ params }: CommonQuestionsPageProps) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  const t = locale === "fr" ? frTranslations : enTranslations;
  const faqItems = getCommonQuestionsData(locale).flatMap((category) =>
    category.subcategories
      ? category.subcategories.flatMap((subcategory) => subcategory.items)
      : (category.items ?? []),
  );
  const faqSchema = {
    ...buildWebPageSchema({
      locale,
      route: "common-questions",
      title: t.hero.title,
      description: t.hero.subtitle,
      type: "FAQPage",
    }),
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <div className="min-h-screen bg-[#EFEFF3]">
      <JsonLd data={faqSchema} />
      <Navbar currentLocale={locale} />

      <CommonQuestionsHero locale={locale} />

      <main className="pb-16 sm:pb-20 lg:pb-24">
        <div className="mx-auto max-w-[1210px] px-4 pt-10 sm:px-6 lg:px-8 lg:pt-16">
          <CommonQuestionsContent locale={locale} />
          <div className="mt-16 sm:mt-20 lg:mt-24">
            <NeedAdditionalAssistance
              translations={t.assistance}
              sectionId="contact-support"
            />
          </div>
          <SeoContentLinks locale={locale} currentPath="common-questions" />
        </div>
      </main>

      <Footer locale={locale} />
    </div>
  );
}
