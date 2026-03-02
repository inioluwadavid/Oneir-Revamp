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
    title: isEnglish ? "Multi-Company | Success Stories" : "Multi-Company | Histoires de succès",
    description: isEnglish
      ? "How a multi-company operation gained unified visibility, consolidated reporting, and centralized control with Oneir Solutions."
      : "Comment une opération multi-sociétés a obtenu une visibilité unifiée, des rapports consolidés et un contrôle centralisé avec Oneir Solutions.",
    openGraph: {
      title: isEnglish ? "Multi-Company | Oneir Solutions" : "Multi-Company | Oneir Solutions",
      url: `https://oneirsolutions.com/${locale}/success-stories/multi-company`,
    },
  };
}

type Paragraph = { type: string; text?: string; items?: unknown[]; attribution?: string };

export default async function MultiCompanyCaseStudy({ params }: CaseStudyPageProps) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  const t = getTranslations(locale);

  const caseStudy = t.caseStudies?.multiCompany as {
    paragraphs: Paragraph[];
  } | undefined;

  if (!caseStudy?.paragraphs?.length) {
    return null;
  }

  const title = "Multi-Company";

  const paragraphClasses: Record<string, string> = {
    intro: "text-[16px] sm:text-[17px] leading-relaxed text-[#434349] pb-3",
    descriptive: "text-[14px] sm:text-[15px] leading-relaxed text-[#434349] pb-3",
    quote: "text-[18px] sm:text-[20px] font-[600] leading-relaxed text-[#434349] pb-3",
    sectionHeader: "text-[16px] sm:text-[17px] font-[600] text-[#070714] pb-3",
  };

  return (
    <div className="min-h-screen bg-[#EFEFF3]">
      <Navbar currentLocale={locale} />
      <div className="pt-16 sm:pt-20 lg:pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-start">
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

          <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 shadow-sm">
            <div className="flex flex-col">
              {caseStudy.paragraphs.map((p, i) => {
                const marginTop = i === 0 ? "" : "mt-0";
                return (
                <div key={i} className={marginTop}>
                  {p.type === "bullets" && Array.isArray(p.items) ? (
                    <ul className="list-disc list-inside text-[14px] sm:text-[15px] leading-relaxed text-[#434349] space-y-0 ml-2 pb-3">
                      {(p.items as string[]).map((item, j) => (
                        <li key={j}>{item}</li>
                      ))}
                    </ul>
                  ) : p.type === "sectionHeader" && p.text ? (
                    <h2 className={paragraphClasses.sectionHeader}>{p.text}</h2>
                  ) : p.type === "quote" && p.text ? (
                    <div>
                      <p className={paragraphClasses.quote}>
                        &ldquo;{p.text}&rdquo;
                        {p.attribution && (
                          <span className="font-normal text-[14px] sm:text-[15px]"> {p.attribution}</span>
                        )}
                      </p>
                    </div>
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
