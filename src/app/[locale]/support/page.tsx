import { type Locale } from "@/lib/translations";
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer";
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

  const isEnglish = locale === "en";

  return (
    <div className="min-h-screen bg-[#EFEFF3]">
      <Navbar currentLocale={locale} />
      <main className="pt-16 sm:pt-20 lg:pt-24 py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1
            className="text-3xl sm:text-4xl font-bold text-[#070714] mb-6"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            {isEnglish ? "Support" : "Support"}
          </h1>
          <p className="text-[#303033] text-base sm:text-lg leading-relaxed mb-8">
            {isEnglish
              ? "Our team is here to help you succeed with Oneir Solutions. Whether you need technical assistance, have questions about your account, or want to explore new features, we're ready to assist."
              : "Notre équipe est là pour vous aider à réussir avec Oneir Solutions. Que vous ayez besoin d'assistance technique, de questions sur votre compte ou souhaitiez explorer de nouvelles fonctionnalités, nous sommes prêts à vous aider."}
          </p>

          <div className="space-y-6">
            <section className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm">
              <h2
                className="text-xl font-bold text-[#070714] mb-3"
                style={{ fontFamily: "var(--font-outfit)" }}
              >
                {isEnglish ? "Customer Support" : "Support Client"}
              </h2>
              <p className="text-[#303033] mb-4">
                {isEnglish
                  ? "For technical support and account inquiries."
                  : "Pour le support technique et les demandes de compte."}
              </p>
              <a
                href="tel:4163223580"
                className="text-[#65083A] font-medium hover:underline"
              >
                416.322.3580
              </a>
            </section>

            <section className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm">
              <h2
                className="text-xl font-bold text-[#070714] mb-3"
                style={{ fontFamily: "var(--font-outfit)" }}
              >
                {isEnglish ? "Sales" : "Ventes"}
              </h2>
              <p className="text-[#303033] mb-4">
                {isEnglish
                  ? "Interested in Oneir Solutions? Our sales team is ready to help you find the right solution."
                  : "Intéressé par Oneir Solutions? Notre équipe commerciale est prête à vous aider à trouver la bonne solution."}
              </p>
              <a
                href="tel:18773223580"
                className="text-[#65083A] font-medium hover:underline"
              >
                1.877.322.3580
              </a>
            </section>

            <section className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm">
              <h2
                className="text-xl font-bold text-[#070714] mb-3"
                style={{ fontFamily: "var(--font-outfit)" }}
              >
                {isEnglish ? "Email" : "Courriel"}
              </h2>
              <p className="text-[#303033] mb-4">
                {isEnglish
                  ? "Reach us by email for general inquiries."
                  : "Contactez-nous par courriel pour les demandes générales."}
              </p>
              <a
                href="mailto:info@oneirsolutions.com"
                className="text-[#65083A] font-medium hover:underline"
              >
                info@oneirsolutions.com
              </a>
            </section>
          </div>
        </div>
      </main>
      <Footer locale={locale} />
    </div>
  );
}
