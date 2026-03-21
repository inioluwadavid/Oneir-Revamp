import { type Locale } from "@/lib/translations";
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer";
import SignInPageContent from "@/components/signin/SignInPageContent";
import type { Metadata } from "next";

interface SignInPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: SignInPageProps): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;

  const isEnglish = locale === "en";

  return {
    title: isEnglish ? "Sign in" : "Se connecter",
    description: isEnglish
      ? "Sign in to your Oneir Solutions account."
      : "Connectez-vous à votre compte Oneir Solutions.",
    openGraph: {
      title: isEnglish ? "Sign in | Oneir Solutions" : "Se connecter | Oneir Solutions",
      description: isEnglish
        ? "Sign in to your Oneir Solutions account."
        : "Connectez-vous à votre compte Oneir Solutions.",
      url: `https://oneirsolutions.com/${locale}/signin`,
    },
  };
}

export default async function SignInPage({ params }: SignInPageProps) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;

  return (
    <div className="min-h-screen bg-[#EFEFF3]">
      <Navbar currentLocale={locale} />

      <main className="pb-16 pt-[calc(var(--navbar-height)+1.5rem)] sm:pb-20 lg:pb-24">
        <SignInPageContent locale={locale} />
      </main>

      <Footer locale={locale} />
    </div>
  );
}
