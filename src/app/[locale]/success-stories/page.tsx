import { type Locale } from "@/lib/translations";
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer";
import HowBusinessesRun from "@/components/HowBusinessesRun";
import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import SeoContentLinks from "@/components/shared/SeoContentLinks";
import { buildAlternates, buildWebPageSchema, localizedPath } from "@/lib/seo";
interface SuccessStoriesPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: SuccessStoriesPageProps): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;

  const isEnglish = locale === "en";
  const title = isEnglish ? "Our Success Stories" : "Nos histoires de succes";
  const description = isEnglish
    ? "Discover how businesses like yours run smarter with Oneir Solutions."
    : "Decouvrez comment des entreprises comme la votre fonctionnent plus intelligemment avec Oneir Solutions.";

  return {
    title,
    description,
    alternates: buildAlternates(locale, "success-stories"),
    openGraph: {
      title: isEnglish ? "Our Success Stories | Oneir Solutions" : "Nos histoires de succes | Oneir Solutions",
      description,
      url: localizedPath(locale, "success-stories"),
    },
  };
}

export default async function SuccessStories({ params }: SuccessStoriesPageProps) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  const storiesSchema = buildWebPageSchema({
    locale,
    route: "success-stories",
    title: locale === "en" ? "Our Success Stories" : "Nos histoires de succes",
    description:
      locale === "en"
        ? "Discover how businesses like yours run smarter with Oneir Solutions."
        : "Decouvrez comment des entreprises comme la votre fonctionnent plus intelligemment avec Oneir Solutions.",
    type: "CollectionPage",
  });

  return (
    <div className="min-h-screen bg-[#EFEFF3]">
      <JsonLd data={storiesSchema} />
      <Navbar currentLocale={locale} />
      <div className="pt-[var(--navbar-height)] sm:pt-24 lg:pt-24">
        {/* Header: back + logo + title */}
        
        <HowBusinessesRun locale={locale} variant="full" />
        <div className="mx-auto w-full max-w-[1210px] px-4 pb-12 sm:px-6 lg:px-8">
          <SeoContentLinks locale={locale} currentPath="success-stories" />
        </div>
      </div>
      <Footer locale={locale} />
    </div>
  );
}
