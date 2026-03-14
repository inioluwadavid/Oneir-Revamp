import { type Locale } from "@/lib/translations";
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer";
import CommonQuestionsHero from "@/components/common-questions/CommonQuestionsHero";
import CommonQuestionsContent from "@/components/common-questions/CommonQuestionsContent";
import NeedAdditionalAssistance from "@/components/shared/NeedAdditionalAssistance";
import enTranslations from "@/locales/common-questions/en.json";
import frTranslations from "@/locales/common-questions/fr.json";
import type { Metadata } from "next";

interface CommonQuestionsPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: CommonQuestionsPageProps): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  const t = locale === "fr" ? frTranslations : enTranslations;

  return {
    title: t.hero.title,
    description: t.hero.subtitle,
    openGraph: {
      title: `${t.hero.title} | Oneir Solutions`,
      description: t.hero.subtitle,
      url: `https://oneirsolutions.com/${locale}/common-questions`,
    },
  };
}

export default async function CommonQuestionsPage({ params }: CommonQuestionsPageProps) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  const t = locale === "fr" ? frTranslations : enTranslations;

  return (
    <div className="min-h-screen bg-[#EFEFF3]">
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
        </div>
      </main>

      <Footer locale={locale} />
    </div>
  );
}
