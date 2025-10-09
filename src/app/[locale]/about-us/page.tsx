import { type Locale } from "@/lib/translations";
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer";
import WhoWeAre from "@/components/about-us/WhoWeAre";
import Mission from "@/components/about-us/Mission";
import HowWeWork from "@/components/about-us/HowWeWork";
import Experience from "@/components/about-us/Experience";
import Values from "@/components/about-us/Values";
import WhyChoose from "@/components/about-us/WhyChoose";
import type { Metadata } from "next";

interface AboutUsPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: AboutUsPageProps): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  
  const isEnglish = locale === 'en';
  
  return {
    title: isEnglish ? "About Us" : "À Propos de Nous",
    description: isEnglish
      ? "Learn about Oneir Solutions - our mission, values, and commitment to delivering exceptional ERP and accounting software solutions."
      : "Découvrez Oneir Solutions - notre mission, nos valeurs et notre engagement à fournir des solutions ERP et comptables exceptionnelles.",
    openGraph: {
      title: isEnglish ? "About Us | Oneir Solutions" : "À Propos de Nous | Oneir Solutions",
      description: isEnglish
        ? "Learn about Oneir Solutions - our mission, values, and commitment to delivering exceptional ERP and accounting software solutions."
        : "Découvrez Oneir Solutions - notre mission, nos valeurs et notre engagement à fournir des solutions ERP et comptables exceptionnelles.",
      url: `https://oneirsolutions.com/${locale}/about-us`,
    },
  };
}

export default async function AboutUs({ params }: AboutUsPageProps) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;

 

  return (
    <div className="min-h-screen bg-[#EFEFF3]">
      <Navbar currentLocale={locale} />
      <WhoWeAre locale={locale} />
      <Mission locale={locale} />
      <HowWeWork locale={locale} />
      <Experience locale={locale} />
      <Values locale={locale} />
      <WhyChoose locale={locale} />
      <Footer locale={locale} />
    </div>
  );
}
