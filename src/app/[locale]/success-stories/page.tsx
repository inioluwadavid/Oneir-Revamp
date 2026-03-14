import { type Locale } from "@/lib/translations";
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer";
import HowBusinessesRun from "@/components/HowBusinessesRun";
import type { Metadata } from "next";
interface SuccessStoriesPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: SuccessStoriesPageProps): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;

  const isEnglish = locale === "en";

  return {
    title: isEnglish ? "Our Success Stories" : "Nos histoires de succès",
    description: isEnglish
      ? "Discover how businesses like yours run smarter with Oneir Solutions."
      : "Découvrez comment des entreprises comme la vôtre fonctionnent plus intelligemment avec Oneir Solutions.",
    openGraph: {
      title: isEnglish ? "Our Success Stories | Oneir Solutions" : "Nos histoires de succès | Oneir Solutions",
      description: isEnglish
        ? "Discover how businesses like yours run smarter with Oneir Solutions."
        : "Découvrez comment des entreprises comme la vôtre fonctionnent plus intelligemment avec Oneir Solutions.",
      url: `https://oneirsolutions.com/${locale}/success-stories`,
    },
  };
}

export default async function SuccessStories({ params }: SuccessStoriesPageProps) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;

  return (
    <div className="min-h-screen bg-[#EFEFF3]">
      <Navbar currentLocale={locale} />
      <div className="pt-16 sm:pt-20 lg:pt-24">
        {/* Header: back + logo + title */}
        
        <HowBusinessesRun locale={locale} variant="full" />
      </div>
      <Footer locale={locale} />
    </div>
  );
}
