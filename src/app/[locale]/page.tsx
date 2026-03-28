import { type Locale } from "@/lib/translations";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import PromoSection from "@/components/PromoSection";
import Features from "@/components/feature";
import Financial from "@/components/financial";
import Footer from "@/components/footer";
import ErpSolutions from "@/components/erp-solutions";
import IndustriesWeServe from "@/components/IndustriesWeServe";
import SellAnywhere from "@/components/SellAnywhere";
import HowBusinessesRun from "@/components/HowBusinessesRun";
import JourneySection from "@/components/JourneySection";
import ArticleSection from "@/components/media-articles/ArticleSection";
import { MEDIA_SECTION_ANCHORS } from "@/lib/anchor-utils";
import mediaEn from "@/locales/media-articles/en.json";
import mediaFr from "@/locales/media-articles/fr.json";

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export default async function Home({ params }: HomePageProps) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  const mediaT = locale === "fr" ? mediaFr : mediaEn;

  return (
    <div className="min-h-screen bg-[#EFEFF3]">
      <Navbar currentLocale={locale} />
      <div>
        <Hero locale={locale} />
        <ErpSolutions locale={locale} />
        <IndustriesWeServe locale={locale} />
        <SellAnywhere locale={locale} />
        <HowBusinessesRun locale={locale} />
        <div className=" max-w-7xl mx-auto  ">
          <ArticleSection
            sectionId={MEDIA_SECTION_ANCHORS.oneirMinute}
            title={mediaT.sections.oneirMinute.title}
            subtitle={mediaT.sections.oneirMinute.subtitle}
            iconSrc="/images/onier_video.svg"
            iconAlt=""
            articles={mediaT.articles.oneirMinute}
            background="white"
            embedDriveVideo
          />
        </div>
        <JourneySection locale={locale} />
        {/* <PromoSection locale={locale} />
        <Features locale={locale} />
        <Financial locale={locale} /> */}
      </div>
      <Footer locale={locale} />
    </div>
  );
}
