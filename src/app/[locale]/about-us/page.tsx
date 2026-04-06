import { type Locale } from "@/lib/translations";
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer";
import WhoWeAre from "@/components/about-us/WhoWeAre";
import OurFoundation from "@/components/about-us/OurFoundation";
import OurFocus from "@/components/about-us/OurFocus";
import Mission from "@/components/about-us/Mission";
import HowWeWork from "@/components/about-us/HowWeWork";
import Experience from "@/components/about-us/Experience";
import Values from "@/components/about-us/Values";
import WhyChoose from "@/components/about-us/WhyChoose";
import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import SeoContentLinks from "@/components/shared/SeoContentLinks";
import { buildAlternates, buildWebPageSchema, localizedPath } from "@/lib/seo";

interface AboutUsPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: AboutUsPageProps): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  
  const isEnglish = locale === 'en';
  const title = isEnglish ? "About Us" : "A propos de nous";
  const description = isEnglish
    ? "Learn about Oneir Solutions - our mission, values, and commitment to delivering exceptional ERP and accounting software solutions."
    : "Decouvrez Oneir Solutions - notre mission, nos valeurs et notre engagement a offrir des solutions ERP et comptables d'exception.";
  
  return {
    title,
    description,
    alternates: buildAlternates(locale, "about-us"),
    openGraph: {
      title: isEnglish ? "About Us | Oneir Solutions" : "A propos de nous | Oneir Solutions",
      description,
      url: localizedPath(locale, "about-us"),
    },
  };
}

export default async function AboutUs({ params }: AboutUsPageProps) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  const isEnglish = locale === "en";
  const pageDescription = isEnglish
    ? "Learn about Oneir Solutions - our mission, values, and commitment to delivering exceptional ERP and accounting software solutions."
    : "Decouvrez Oneir Solutions - notre mission, nos valeurs et notre engagement a offrir des solutions ERP et comptables d'exception.";
  const aboutPageSchema = buildWebPageSchema({
    locale,
    route: "about-us",
    title: isEnglish ? "About Us" : "A propos de nous",
    description: pageDescription,
    type: "AboutPage",
  });
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Oneir Solutions",
    url: "https://oneirsolutions.com",
    description: pageDescription,
  };

 

  return (
    <div className="min-h-screen bg-[#EFEFF3]">
      <JsonLd data={aboutPageSchema} />
      <JsonLd data={organizationSchema} />
      <Navbar currentLocale={locale} />
      <div>
        <WhoWeAre locale={locale} />
       
      {/* <Mission locale={locale} /> */}
      <HowWeWork locale={locale} />
    
      <OurFoundation locale={locale} />
      <OurFocus locale={locale} />
      {/* <Experience locale={locale} />
      <Values locale={locale} /> */}
      <WhyChoose locale={locale} />
      <div className="mx-auto w-full max-w-[1210px] px-4 pb-12 sm:px-6 lg:px-8">
        <SeoContentLinks locale={locale} currentPath="about-us" />
      </div>
      </div>
      <Footer locale={locale} />
    </div>
  );
}
