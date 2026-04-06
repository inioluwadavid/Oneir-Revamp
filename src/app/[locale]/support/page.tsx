import { type Locale } from "@/lib/translations";
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer";
import SupportHero from "@/components/support/SupportHero";
import SupportHelp from "@/components/support/SupportHelp";
import SupportResources from "@/components/support/SupportResources";
import SupportAssistance from "@/components/support/SupportAssistance";
import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import SeoContentLinks from "@/components/shared/SeoContentLinks";
import { buildAlternates, buildWebPageSchema, localizedPath } from "@/lib/seo";

interface SupportPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: SupportPageProps): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;

  const isEnglish = locale === "en";
  const title = "Support";
  const description = isEnglish
    ? "Get support for Oneir Solutions - customer support, sales, and technical assistance."
    : "Obtenez du support pour Oneir Solutions - support client, ventes et assistance technique.";

  return {
    title,
    description,
    alternates: buildAlternates(locale, "support"),
    openGraph: {
      title: "Support | Oneir Solutions",
      description,
      url: localizedPath(locale, "support"),
    },
  };
}

export default async function Support({ params }: SupportPageProps) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  const isEnglish = locale === "en";
  const supportSchema = buildWebPageSchema({
    locale,
    route: "support",
    title: "Support",
    description: isEnglish
      ? "Get support for Oneir Solutions - customer support, sales, and technical assistance."
      : "Obtenez du support pour Oneir Solutions - support client, ventes et assistance technique.",
    type: "WebPage",
  });

  return (
    <div className="min-h-screen bg-[#EFEFF3]">
      <JsonLd data={supportSchema} />
      <Navbar currentLocale={locale} />

      <SupportHero locale={locale} />

      <main className="pb-16 sm:pb-20 lg:pb-24">
        <div className="mx-auto max-w-[1210px] px-4 sm:px-6 lg:px-8">
          <SupportHelp locale={locale} />
          <SupportResources locale={locale} />
          <SupportAssistance locale={locale} />
{/*           
          <SeoContentLinks locale={locale} currentPath="support" /> */}
        </div>
      </main>

      <Footer locale={locale} />
    </div>
  );
}
