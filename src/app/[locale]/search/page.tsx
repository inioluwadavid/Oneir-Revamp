import { type Locale } from "@/lib/translations";
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer";
import SearchPageContent from "@/components/search/SearchPageContent";
import type { Metadata } from "next";

interface SearchPageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ q?: string }>;
}

export async function generateMetadata({
  params,
}: SearchPageProps): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  const isEnglish = locale === "en";

  return {
    title: isEnglish ? "Search" : "Recherche",
    description: isEnglish
      ? "Search the Oneir knowledge base for articles, guides, and support."
      : "Recherchez dans la base de connaissances Oneir.",
    robots: {
      index: false,
      follow: true,
    },
    alternates: {
      canonical: `https://oneirsolutions.com/${locale}/search`,
      languages: {
        en: "https://oneirsolutions.com/en/search",
        fr: "https://oneirsolutions.com/fr/search",
      },
    },
    openGraph: {
      title: isEnglish ? "Search | Oneir Solutions" : "Recherche | Oneir Solutions",
      url: `https://oneirsolutions.com/${locale}/search`,
    },
  };
}

export default async function SearchPage({ params, searchParams }: SearchPageProps) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  const { q: query } = await searchParams;

  return (
    <div className="min-h-screen bg-[#EFEFF3]">
      <Navbar currentLocale={locale} />

      <main className="pt-24 pb-16 sm:pt-32 sm:pb-20 lg:pt-40 lg:pb-24">
        <SearchPageContent locale={locale} initialQuery={query ?? ""} />
      </main>

      <Footer locale={locale} />
    </div>
  );
}
