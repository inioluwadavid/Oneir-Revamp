import { type Locale } from "@/lib/translations";
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer";
import SupportHero from "@/components/support/SupportHero";
import SupportHelp from "@/components/support/SupportHelp";
import SupportResources from "@/components/support/SupportResources";
import SupportAssistance from "@/components/support/SupportAssistance";
import type { Metadata } from "next";

interface SupportPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: SupportPageProps): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;

  const isEnglish = locale === "en";

  return {
    title: isEnglish ? "Support" : "Support",
    description: isEnglish
      ? "Get support for Oneir Solutions - customer support, sales, and technical assistance."
      : "Obtenez du support pour Oneir Solutions - support client, ventes et assistance technique.",
    openGraph: {
      title: isEnglish ? "Support | Oneir Solutions" : "Support | Oneir Solutions",
      description: isEnglish
        ? "Get support for Oneir Solutions - customer support, sales, and technical assistance."
        : "Obtenez du support pour Oneir Solutions - support client, ventes et assistance technique.",
      url: `https://oneirsolutions.com/${locale}/support`,
    },
  };
}

export default async function Support({ params }: SupportPageProps) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;

  return (
    <div className="min-h-screen bg-[#EFEFF3]">
      <Navbar currentLocale={locale} />

      <SupportHero locale={locale} />

      <main className="pb-16 sm:pb-20 lg:pb-24">
        <div className="mx-auto max-w-[1210px] px-4 sm:px-6 lg:px-8">
          <SupportHelp locale={locale} />
          <SupportResources locale={locale} />
          <SupportAssistance locale={locale} />
        </div>
      </main>

      <Footer locale={locale} />
    </div>
  );
}
