import { type Locale } from "@/lib/translations";
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer";
import BackButton from "@/components/BackButton";
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
    title: isEnglish ? "Apparel Retailer | Success Stories" : "Détaillant de vêtements | Histoires de succès",
    description: isEnglish
      ? "How a family-owned women's apparel retailer adopted an integrated business software platform to streamline operations and support growth."
      : "Comment un détaillant de vêtements pour femmes en propriété familiale a adopté une plateforme logicielle intégrée pour rationaliser ses opérations et soutenir la croissance.",
    alternates: buildAlternates(locale, "success-stories/apparel-retailer"),
    openGraph: {
      title: isEnglish ? "Apparel Retailer | Oneir Solutions" : "Détaillant de vêtements | Oneir Solutions",
      url: localizedPath(locale, "success-stories/apparel-retailer"),
    },
  };
}

type Paragraph = { type: string; text?: string; items?: unknown[]; attribution?: string };

export default async function ApparelRetailerCaseStudy({ params }: CaseStudyPageProps) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  const t = getTranslations(locale);

  const caseStudy = t.caseStudies?.apparelRetailer as {
    paragraphs: Paragraph[];
  } | undefined;

  if (!caseStudy?.paragraphs?.length) {
    return null;
  }

  const title = locale === "en" ? "Apparel Retailer" : "Détaillant de vêtements";

  const paragraphClasses: Record<string, string> = {
    intro: "text-[16px] sm:text-[17px] leading-relaxed text-[#434349] pb-3",
    descriptive: "text-[14px] sm:text-[15px] leading-relaxed text-[#434349] pb-3",
    quote: "text-[18px] sm:text-[20px] font-[600] leading-relaxed text-[#434349] pb-3",
    sectionHeader: "text-[16px] sm:text-[17px] font-[600] text-[#070714] pb-3",
  };
  const caseStudySchema = buildCaseStudySchema({
    locale,
    slug: "apparel-retailer",
    title: locale === "en" ? "Apparel Retailer" : "Detailant de vetements",
    description:
      locale === "en"
        ? "How a family-owned women's apparel retailer adopted an integrated business software platform to streamline operations and support growth."
        : "Comment un detailant de vetements pour femmes a adopte une plateforme integree pour rationaliser ses operations et soutenir sa croissance.",
  });

  return (
    <div className="min-h-screen bg-[#EFEFF3]">
      <JsonLd data={caseStudySchema} />
      <Navbar currentLocale={locale} />
      <div className="pt-[var(--navbar-height)] sm:pt-24 lg:pt-24 pb-16">
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
                  ) : p.type === "labeledBullets" && Array.isArray(p.items) ? (
                    <ul className="list-disc list-inside text-[14px] sm:text-[15px] leading-relaxed text-[#434349] space-y-0 ml-2 pb-3">
                      {(p.items as Array<{ label: string; text: string }>).map((item, j) => (
                        <li key={j}>
                          <span className="font-[600]">{item.label}</span> {item.text}
                        </li>
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
