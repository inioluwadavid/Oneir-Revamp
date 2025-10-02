import { type Locale } from "@/lib/translations";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import PromoSection from "@/components/PromoSection";
import Features from "@/components/feature";
import Financial from "@/components/financial";
import Footer from "@/components/footer";
import ErpSolutions from "@/components/erp-solutions";

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export default async function Home({ params }: HomePageProps) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar currentLocale={locale} />
      <div className="pt-16 sm:pt-20 lg:pt-24">
        <Hero locale={locale} />
        <ErpSolutions locale={locale} />  
        <PromoSection locale={locale} />
        <Features locale={locale} />
        <Financial locale={locale} />
      </div>
      <Footer locale={locale} />
    </div>
  );
}
