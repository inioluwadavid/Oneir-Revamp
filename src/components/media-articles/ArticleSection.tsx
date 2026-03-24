import ArticleCard from "@/components/media-articles/ArticleCard";
import FadeInSection from "@/components/motion/FadeInSection";
import Image from "next/image";
import { createMediaArticleAnchor } from "@/lib/anchor-utils";

export interface ArticleItem {
  title: string;
  description: string;
  linkText: string;
  href: string;
}

interface ArticleSectionProps {
  sectionId: string;
  title: string;
  subtitle: string;
  iconSrc: string;
  iconAlt?: string;
  articles: ArticleItem[];
  /** When "white", wraps section in a white card (e.g. for Oneir Minute) */
  background?: "white" | "transparent";
}

export default function ArticleSection({
  sectionId,
  title,
  subtitle,
  iconSrc,
  iconAlt = "",
  articles,
  background = "transparent",
}: ArticleSectionProps) {
  const content = (
    <div>
      <div className="mb-8 flex flex-col gap-2 sm:mb-10 sm:flex-row sm:items-start sm:gap-2 lg:mb-12 lg:gap-2">
        <div className="flex ">
          
            <Image src={iconSrc} alt={iconAlt} height={85} width={85} className="object-contain" sizes="85px" />
          
        </div>
        <div className="flex flex-col gap-2">
          <h2
            className="text-2xl font-semibold text-[#070714] sm:text-3xl lg:text-[48px]"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            {title}
          </h2>
          <p className="text-sm text-[#434349] sm:text-base">{subtitle}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        {articles.map((article, index) => {
          const articleAnchor = createMediaArticleAnchor(sectionId, article.title);
          const resolvedHref = article.href === "#" ? `#${articleAnchor}` : article.href;
          return (
            <ArticleCard
              key={index}
              id={articleAnchor}
              title={article.title}
              description={article.description}
              linkText={article.linkText}
              href={resolvedHref}
            />
          );
        })}
      </div>
    </div>
  );

  return (
    <FadeInSection className="mb-16 scroll-mt-24 sm:mb-20 lg:mb-[80px]">
      <section id={sectionId}>
        {background === "white" ? (
          <div className="rounded-[32px] my-[120px] bg-white p-6 shadow-[0px_16px_20px_0px_rgba(0,0,0,0.01)] sm:p-8 lg:p-12 ">
            {content}
          </div>
        ) : (
          <div className="">
          {content}
          </div>
        )}
      </section>
    </FadeInSection>
  );
}
