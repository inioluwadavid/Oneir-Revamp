import { type Locale } from "@/lib/translations";
import SupportResourceCard from "@/components/support/SupportResourceCard";
import FadeInSection from "@/components/motion/FadeInSection";
import enTranslations from "@/locales/support/en.json";
import frTranslations from "@/locales/support/fr.json";

interface SupportResourcesProps {
  locale: Locale;
}

const DRIVERS_SOFTWARE_LINK =
  "https://drive.google.com/drive/folders/1dNdPArjo36WiRScGt1WSJ-1z_f_1zvZK?usp=drive_link";

const RESOURCE_CARDS = [
  {
    resourceKey: "commonQuestions" as const,
    getHref: (locale: string) => `/${locale}/common-questions`,
  },
  {
    resourceKey: "productManuals" as const,
    getHref: (locale: string) => `/${locale}/product-manuals`,
  },
  {
    resourceKey: "driversSoftware" as const,
    getHref: () => DRIVERS_SOFTWARE_LINK,
  },
  {
    resourceKey: "mediaArticles" as const,
    getHref: (locale: string) => `/${locale}/media-and-articles`,
  },
];

export default function SupportResources({ locale }: SupportResourcesProps) {
  const t = locale === "fr" ? frTranslations : enTranslations;

  return (
    <section className="mb-20 sm:mb-24 lg:mb-[120px]">
      <FadeInSection className="mb-10 sm:mb-16 lg:mb-[64px]">
        <h2
          className="text-2xl font-semibold text-[#070714] text-center sm:text-4xl lg:text-[48px]"
          style={{ fontFamily: "var(--font-outfit)" }}
        >
          {t.resources.title}
        </h2>
      </FadeInSection>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-[64px]">
        {RESOURCE_CARDS.map((card, index) => (
          <FadeInSection key={card.resourceKey} delay={index * 0.1}>
            <SupportResourceCard
              locale={locale}
              resourceKey={card.resourceKey}
              href={card.getHref(locale)}
            />
          </FadeInSection>
        ))}
      </div>
    </section>
  );
}
