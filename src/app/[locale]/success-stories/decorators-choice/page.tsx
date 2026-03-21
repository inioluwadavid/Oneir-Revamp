import { Fragment, type ReactNode } from "react";
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
    title: isEnglish ? "Decorators Choice | Success Stories" : "Decorators Choice | Histoires de succès",
    description: isEnglish
      ? "How Decorators Choice paint-and-decorating retailer migrated from Vigilant to Oneir Solutions for multi-location expansion and remote management."
      : "Comment le détaillant de peinture et décoration Decorators Choice a migré de Vigilant vers Oneir Solutions pour l'expansion multi-emplacements et la gestion à distance.",
    openGraph: {
      title: isEnglish ? "Decorators Choice | Oneir Solutions" : "Decorators Choice | Oneir Solutions",
      url: `https://oneirsolutions.com/${locale}/success-stories/decorators-choice`,
    },
  };
}

type LinkDef = { phrase: string; url: string };
type RichSegment = { variant: "body" | "quote"; text: string };
type Paragraph = {
  type: string;
  text?: string;
  items?: unknown[];
  attribution?: string;
  links?: LinkDef[];
  plain?: boolean;
  quotes?: string[];
  segments?: RichSegment[];
};

function renderTextWithLinks(
  text: string,
  links?: LinkDef[],
  className?: string
): ReactNode {
  if (!links?.length) {
    return <span>{text}</span>;
  }
  const parts: ReactNode[] = [];
  let remaining = text;
  for (const { phrase, url } of links) {
    const idx = remaining.indexOf(phrase);
    if (idx === -1) continue;
    if (idx > 0) {
      parts.push(remaining.slice(0, idx));
    }
    parts.push(
      <a
        key={url + phrase}
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#434349] underline decoration-solid underline-offset-2 hover:no-underline"
      >
        {phrase}
      </a>
    );
    remaining = remaining.slice(idx + phrase.length);
  }
  if (remaining) parts.push(remaining);
  return <span className={className}>{parts}</span>;
}

function renderRichSegments(segments: RichSegment[]): ReactNode {
  return segments.map((s, i) =>
    s.variant === "quote" ? (
      <span key={i} className="text-[20px] font-semibold leading-8 text-[#434349]">
        {s.text}
      </span>
    ) : (
      <span key={i}>{s.text}</span>
    )
  );
}

export default async function DecoratorsChoiceCaseStudy({ params }: CaseStudyPageProps) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  const t = getTranslations(locale);

  const caseStudy = t.caseStudies?.decoratorsChoice as {
    logo?: string;
    paragraphs: Paragraph[];
  } | undefined;

  if (!caseStudy?.paragraphs?.length) {
    return null;
  }

  const title = "Decorators Choice";
  const logo = caseStudy.logo ?? "/images/how_businesses/how3.svg";

  const bodyClass = "text-[16px] leading-6 text-[#434349]";
  const paragraphClasses: Record<string, string> = {
    intro: `${bodyClass} pb-6`,
    descriptive: `${bodyClass} pb-6`,
    quote: "text-[20px] font-semibold leading-8 text-[#434349] pb-6",
    sectionHeader: "text-[16px] font-semibold leading-6 text-[#070714] pb-6",
    attribution: "text-[16px] leading-6 text-[#434349] pb-6",
  };

  return (
    <div className="min-h-screen bg-[#EFEFF3]">
      <Navbar currentLocale={locale} />
      <div className="pt-[var(--navbar-height)] sm:pt-24 lg:pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-start">
          <BackButton
            ariaLabel={locale === "en" ? "Go back" : "Retour"}
            className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-white/60 transition-colors mb-4"
          />
          <div className="flex items-center gap-3 mb-8 sm:mb-10">
            <Image
              src={logo}
              alt={title}
              width={48}
              height={48}
              className="flex-shrink-0"
            />
            <h1
              className="text-2xl sm:text-3xl md:text-4xl font-[600] text-[#070714]"
              style={{ fontFamily: "var(--font-outfit)" }}
            >
              {title}
            </h1>
          </div>

          <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 shadow-sm">
            <div className="max-w-3xl flex flex-col">
              {caseStudy.paragraphs.map((p, i) => {
                return (
                  <div key={i}>
                    {p.type === "bullets" && Array.isArray(p.items) ? (
                      <ul
                        className={`list-disc pl-5 ${bodyClass} space-y-0 pb-6 marker:text-[#434349]`}
                      >
                        {(p.items as string[]).map((item, j) => (
                          <li key={j} className="pl-1">
                            <span className="-ml-0.5">{item}</span>
                          </li>
                        ))}
                      </ul>
                    ) : p.type === "quoteMulti" && Array.isArray(p.quotes) ? (
                      <p className={paragraphClasses.quote}>
                        {(p.quotes as string[]).map((q, j) => (
                          <Fragment key={j}>
                            {j > 0 ? (
                              <>
                                <br />
                                <br />
                              </>
                            ) : null}
                            {q}
                          </Fragment>
                        ))}
                      </p>
                    ) : p.type === "rich" && Array.isArray(p.segments) ? (
                      <p className={`${bodyClass} whitespace-pre-wrap pb-6`}>
                        {renderRichSegments(p.segments as RichSegment[])}
                      </p>
                    ) : p.type === "sectionHeader" && p.text ? (
                      <h2 className={paragraphClasses.sectionHeader}>{p.text}</h2>
                    ) : p.type === "quote" && p.text ? (
                      <p className={paragraphClasses.quote}>
                        {p.plain ? (
                          p.text
                        ) : (
                          <>
                            &ldquo;{p.text}&rdquo;
                            {p.attribution && (
                              <span className="font-normal text-[16px] leading-6"> {p.attribution}</span>
                            )}
                          </>
                        )}
                      </p>
                    ) : p.type === "attribution" && p.text ? (
                      <p className={paragraphClasses.attribution}>{p.text}</p>
                    ) : p.type === "descriptive" && p.text ? (
                      <p className={paragraphClasses.descriptive}>
                        {renderTextWithLinks(p.text, p.links)}
                      </p>
                    ) : (
                      <p
                        className={
                          paragraphClasses[p.type as keyof typeof paragraphClasses] ?? paragraphClasses.intro
                        }
                      >
                        {p.text ? renderTextWithLinks(p.text, p.links) : null}
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
