import { type Locale } from "@/lib/translations";
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer";
import BackButton from "@/components/BackButton";
import type { Metadata } from "next";
import { getTranslations } from "@/lib/translations";

interface CaseStudyPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: CaseStudyPageProps): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  const isEnglish = locale === "en";

  return {
    title: isEnglish ? "Fuel Distribution with Cardlock | Success Stories" : "Distribution de carburant avec carte-carburant | Histoires de succès",
    description: isEnglish
      ? "How a fuel-distribution and rural-service supplier adopted Oneir's integrated platform for multi-channel operations and cardlock transactions."
      : "Comment un fournisseur de distribution de carburant a adopté la plateforme intégrée de Oneir pour les opérations multi-canaux et les transactions par carte.",
    openGraph: {
      title: isEnglish ? "Fuel Distribution with Cardlock | Oneir Solutions" : "Distribution de carburant avec carte-carburant | Oneir Solutions",
      url: `https://oneirsolutions.com/${locale}/success-stories/fuel-distribution-cardlock`,
    },
  };
}

type Paragraph = { type: string; text?: string; items?: string[] };

export default async function FuelDistributionCardlockCaseStudy({ params }: CaseStudyPageProps) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  const t = getTranslations(locale);

  const caseStudy = t.caseStudies?.fuelDistributionCardlock as {
    paragraphs: Paragraph[];
  } | undefined;

  if (!caseStudy?.paragraphs?.length) {
    return null;
  }

  const title = locale === "en" ? "Fuel Distribution with Cardlock" : "Distribution de carburant avec carte-carburant";

  const paragraphClasses: Record<string, string> = {
    intro: "text-[16px] sm:text-[17px] leading-relaxed text-[#434349] mb-2",
    descriptive: "text-[14px] sm:text-[15px] leading-relaxed text-[#434349] mb-2",
    quote: "text-[18px] sm:text-[20px] font-[600] leading-relaxed text-[#434349] mb-2",
    sectionHeader: "text-[16px] sm:text-[17px] font-[600] text-[#070714] mb-0",
  };

  return (
    <div className="min-h-screen bg-[#EFEFF3]">
      <Navbar currentLocale={locale} />
      <div className="pt-[var(--navbar-height)] sm:pt-24 lg:pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-start">
          {/* Header: back + title (no logo per image) */}
          <BackButton
            ariaLabel={locale === "en" ? "Go back" : "Retour"}
            className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-white/60 transition-colors mb-4"
          />
          <div className="mb-8 sm:mb-10">
            <h1
              className="text-2xl sm:text-3xl md:text-4xl font-[600] text-[#070714]"
              style={{ fontFamily: "var(--font-outfit)" }}
            >
              {title}
            </h1>
          </div>

          {/* Content block - white rounded */}
          <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 shadow-sm">
            <div className="flex flex-col">
              {caseStudy.paragraphs.map((p, i) => {
                const isAfterSectionHeader = i > 0 && caseStudy.paragraphs[i - 1]?.type === "sectionHeader";
                const marginTop = i === 0 ? "" : isAfterSectionHeader ? "mt-0" : "mt-2";
                return (
                <div key={i} className={marginTop}>
                  {p.type === "bullets" && p.items ? (
                    <ul className="list-disc list-inside text-[14px] sm:text-[15px]  mb-0 leading-relaxed text-[#434349] space-y-0 ml-2">
                      {p.items.map((item, j) => (
                        <li key={j}>{item}</li>
                      ))}
                    </ul>
                  ) : p.type === "sectionHeader" && p.text ? (
                    <h2 className={paragraphClasses.sectionHeader}>{p.text}</h2>
                  ) : (
                    <p className={paragraphClasses[p.type as keyof typeof paragraphClasses] ?? paragraphClasses.intro}>
                      {p.text}
                    </p>
                  )}
                </div>
              );
              })}
            </div>
          </div>
        </div>
      </div>
      <Footer locale={locale} />
    </div>
  );
}
