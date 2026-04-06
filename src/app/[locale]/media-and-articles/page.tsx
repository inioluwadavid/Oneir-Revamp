import { type Locale } from "@/lib/translations";
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer";
import MediaArticlesHero from "@/components/media-articles/MediaArticlesHero";
import ArticleSection from "@/components/media-articles/ArticleSection";
import NeedAdditionalAssistance from "@/components/shared/NeedAdditionalAssistance";
import SeoContentLinks from "@/components/shared/SeoContentLinks";
import enTranslations from "@/locales/media-articles/en.json";
import frTranslations from "@/locales/media-articles/fr.json";
import { MEDIA_SECTION_ANCHORS } from "@/lib/anchor-utils";
import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import { buildAlternates, buildWebPageSchema, localizedPath } from "@/lib/seo";

interface MediaArticlesPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: MediaArticlesPageProps): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  const t = locale === "fr" ? frTranslations : enTranslations;
  const title = t.hero.title;
  const description = t.hero.subtitle;

  return {
    title,
    description,
    alternates: buildAlternates(locale, "media-and-articles"),
    openGraph: {
      title: `${title} | Oneir Solutions`,
      description,
      url: localizedPath(locale, "media-and-articles"),
    },
  };
}

export default async function MediaArticlesPage({ params }: MediaArticlesPageProps) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  const t = locale === "fr" ? frTranslations : enTranslations;
  const mediaSchema = {
    ...buildWebPageSchema({
      locale,
      route: "media-and-articles",
      title: t.hero.title,
      description: t.hero.subtitle,
      type: "CollectionPage",
    }),
    hasPart: t.articles.techAdvisor.map((article) => ({
      "@type": "Article",
      headline: article.title,
      description: article.description,
      url: article.href,
      inLanguage: locale,
      publisher: {
        "@type": "Organization",
        name: "Oneir Solutions",
      },
    })),
  };

  return (
    <div className="min-h-screen bg-[#EFEFF3]">
      <JsonLd data={mediaSchema} />
      <Navbar currentLocale={locale} />

      <MediaArticlesHero locale={locale} />

      <main className="pb-16 sm:pb-20 lg:pb-24">
        <div className="mx-auto max-w-[1210px] px-4 mt-10 sm:px-6 lg:px-8">
          <ArticleSection
            sectionId={MEDIA_SECTION_ANCHORS.techAdvisor}
            title={t.sections.techAdvisor.title}
            subtitle={t.sections.techAdvisor.subtitle}
            iconSrc="/images/browse_support/b4.svg"
            iconAlt=""
            articles={t.articles.techAdvisor}
            background="white"
          />
          <NeedAdditionalAssistance
            translations={t.assistance}
            sectionId="contact-support"
          />
          <SeoContentLinks locale={locale} currentPath="media-and-articles" />
        </div>
      </main>

      <Footer locale={locale} />
    </div>
  );
}
