import { type Locale } from "@/lib/translations";
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer";
import ProductManualsHero from "@/components/product-manuals/ProductManualsHero";
import ProductManualsSection from "@/components/product-manuals/ProductManualsSection";
import NeedAdditionalAssistance from "@/components/shared/NeedAdditionalAssistance";
import enTranslations from "@/locales/product-manuals/en.json";
import frTranslations from "@/locales/product-manuals/fr.json";
import type { Metadata } from "next";

interface ProductManualsPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: ProductManualsPageProps): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  const t = locale === "fr" ? frTranslations : enTranslations;

  return {
    title: t.hero.title,
    description: t.hero.subtitle,
    openGraph: {
      title: `${t.hero.title} | Oneir Solutions`,
      description: t.hero.subtitle,
      url: `https://oneirsolutions.com/${locale}/product-manuals`,
    },
  };
}

const SECTION_KEYS = [
  "manuals",
  "printingEmailing",
  "importingExporting",
  "electronicFundTransfers",
  "termsConditions",
] as const;

type SectionKey = (typeof SECTION_KEYS)[number];

export default async function ProductManualsPage({
  params,
}: ProductManualsPageProps) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  const t = locale === "fr" ? frTranslations : enTranslations;

  return (
    <div className="min-h-screen bg-[#EFEFF3]">
      <Navbar currentLocale={locale} />

      <ProductManualsHero locale={locale} />

      <main className="pb-16 pt-4 sm:pb-20 sm:pt-6 lg:pb-24 lg:pt-8">
        <div className="mx-auto max-w-[1210px] px-4 sm:px-6 lg:px-8">
          {SECTION_KEYS.map((key) => {
            const section = t.sections[key as SectionKey];
            if (!section) return null;
            return (
              <ProductManualsSection
                key={key}
                id={key}
                title={section.title}
                items={section.items}
                linkText={t.linkText}
                layout={key === "termsConditions" ? "single" : "grid"}
              />
            );
          })}
          <NeedAdditionalAssistance
            translations={t.assistance}
            sectionId="contact-support"
          />
        </div>
      </main>

      <Footer locale={locale} />
    </div>
  );
}
