import { type Locale } from "@/lib/translations";
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer";
import BackButton from "@/components/BackButton";
import Image from "next/image";
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
    title: isEnglish ? "Dwight Lumber | Success Stories" : "Dwight Lumber | Histoires de succès",
    description: isEnglish
      ? "How Dwight Lumber uses Oneir Solutions' ERP for operations, CRM, and supplier integration."
      : "Comment Dwight Lumber utilise l'ERP de Oneir Solutions pour les opérations, la CRM et l'intégration fournisseur.",
    openGraph: {
      title: isEnglish ? "Dwight Lumber | Oneir Solutions" : "Dwight Lumber | Oneir Solutions",
      url: `https://oneirsolutions.com/${locale}/success-stories/dwight-lumber`,
    },
  };
}

type Paragraph = { type: string; text?: string; items?: string[]; attribution?: string };

export default async function DwightLumberCaseStudy({ params }: CaseStudyPageProps) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  const t = getTranslations(locale);

  const caseStudy = t.caseStudies?.dwightLumber as {
    paragraphs: Paragraph[];
  } | undefined;

  if (!caseStudy?.paragraphs?.length) {
    return null;
  }

  const paragraphClasses: Record<string, string> = {
    intro: "text-[16px] sm:text-[17px] leading-relaxed text-[#434349] mb-4",
    descriptive: "text-[14px] sm:text-[15px] leading-relaxed text-[#434349] mb-4",
    quote: "text-[18px] sm:text-[20px] font-[600] leading-relaxed text-[#434349] mb-4",
  };

  return (
    <div className="min-h-screen bg-[#EFEFF3]">
      <Navbar currentLocale={locale} />
      <div className="pt-[var(--navbar-height)] sm:pt-24 lg:pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-start">
          {/* Header: back + logo + title */}
          <BackButton
            ariaLabel={locale === "en" ? "Go back" : "Retour"}
            className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-white/60 transition-colors mb-4"
          />
          <div className="flex items-center gap-4 mb-8 sm:mb-10">
            <div className="flex items-center gap-3">
              <Image
                src="/images/how_businesses/how2.svg"
                alt="Dwight Lumber"
                width={48}
                height={48}
                className="flex-shrink-0"
              />
              <h1
                className="text-2xl sm:text-3xl md:text-4xl font-[600] text-[#070714]"
                style={{ fontFamily: "var(--font-outfit)" }}
              >
                Dwight Lumber
              </h1>
            </div>
          </div>

          {/* Content block - light grey rounded */}
          <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 shadow-sm">
            <div className="space-y-6">
              {caseStudy.paragraphs.map((p, i) => (
                <div key={i}>
                  {p.type === "quote" && p.text ? (
                    <div>
                      <p className={paragraphClasses.quote}>
                        &ldquo;{p.text}&rdquo;
                        {p.attribution && (
                          <span className="font-normal text-[14px] sm:text-[15px]"> {p.attribution}</span>
                        )}
                      </p>
                    </div>
                  ) : p.type === "bullets" && p.items ? (
                    <ul className="list-disc list-inside text-[14px] sm:text-[15px] leading-relaxed text-[#434349] space-y-2 ml-2">
                      {p.items.map((item, j) => (
                        <li key={j}>{item}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className={paragraphClasses[p.type as keyof typeof paragraphClasses] ?? paragraphClasses.intro}>
                      {p.text}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer locale={locale} />
    </div>
  );
}
