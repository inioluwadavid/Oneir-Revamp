import { type Locale } from "@/lib/translations";
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer";
import BackButton from "@/components/BackButton";
import Image from "next/image";
import type { Metadata } from "next";
import { getTranslations } from "@/lib/translations";
import JsonLd from "@/components/seo/JsonLd";
import { buildAlternates, buildCaseStudySchema, localizedPath } from "@/lib/seo";

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
    title: isEnglish ? "Amity Insulation | Success Stories" : "Amity Insulation | Histoires de succès",
    description: isEnglish
      ? "How Amity Insulation improved operations with Oneir Solutions' accounting-based business management software."
      : "Comment Amity Insulation a amélioré ses opérations avec le logiciel de gestion d'entreprise Oneir Solutions.",
    alternates: buildAlternates(locale, "success-stories/amity-insulation"),
    openGraph: {
      title: isEnglish ? "Amity Insulation | Oneir Solutions" : "Amity Insulation | Oneir Solutions",
      url: localizedPath(locale, "success-stories/amity-insulation"),
    },
  };
}

export default async function AmityInsulationCaseStudy({ params }: CaseStudyPageProps) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  const t = getTranslations(locale);

  const caseStudy = t.caseStudies?.amityInsulation as {
    paragraphs: Array<{ type: string; text: string; attribution?: string }>;
  } | undefined;

  if (!caseStudy?.paragraphs?.length) {
    return null;
  }

  const paragraphClasses: Record<string, string> = {
    intro: "text-[16px] sm:text-[17px] leading-relaxed text-[#434349] mb-4",
    descriptive: "text-[14px] sm:text-[15px] leading-relaxed text-[#434349] mb-4",
    quote: "text-[18px] sm:text-[20px] font-[600] leading-relaxed text-[#434349] mb-4",
  };
  const caseStudySchema = buildCaseStudySchema({
    locale,
    slug: "amity-insulation",
    title: "Amity Insulation",
    description:
      locale === "en"
        ? "How Amity Insulation improved operations with Oneir Solutions' accounting-based business management software."
        : "Comment Amity Insulation a ameliore ses operations avec le logiciel de gestion d'entreprise Oneir Solutions.",
  });

  return (
    <div className="min-h-screen bg-[#EFEFF3]">
      <JsonLd data={caseStudySchema} />
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
                src="/images/how_businesses/how1.svg"
                alt="Amity Insulation"
                width={48}
                height={48}
                className="flex-shrink-0"
              />
              <h1
                className="text-2xl sm:text-3xl md:text-4xl font-[600] text-[#070714]"
                style={{ fontFamily: "var(--font-outfit)" }}
              >
                Amity Insulation
              </h1>
            </div>
          </div>

          {/* Content block - light grey rounded */}
          <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 shadow-sm">
            <div className="space-y-6">
              {caseStudy.paragraphs.map((p, i) => (
                <div key={i}>
                  {p.type === "quote" ? (
                    <div>
                      <p className={paragraphClasses.quote}>
                        &ldquo;{p.text}&rdquo;
                      </p>
                      {p.attribution && (
                        <p className="text-[14px] sm:text-[15px] text-[#434349] pl-4 border-l-2 border-[#942C56]">
                          {p.attribution}
                        </p>
                      )}
                    </div>
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
