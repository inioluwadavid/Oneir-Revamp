import { type Locale } from "@/lib/translations";
import SupportResourceCard from "@/components/support/SupportResourceCard";
import enTranslations from "@/locales/support/en.json";
import frTranslations from "@/locales/support/fr.json";

interface SupportResourcesProps {
  locale: Locale;
}

const DRIVERS_SOFTWARE_LINK =
  "https://drive.google.com/drive/folders/1dNdPArjo36WiRScGt1WSJ-1z_f_1zvZK?usp=drive_link";

export default function SupportResources({ locale }: SupportResourcesProps) {
  const t = locale === "fr" ? frTranslations : enTranslations;

  return (
    <section className="mb-20 sm:mb-24 lg:mb-[120px]">
      <h2
        className="mb-10 text-2xl font-semibold text-[#070714] sm:mb-16 lg:mb-[64px] sm:text-4xl lg:text-[48px]"
        style={{ fontFamily: "var(--font-outfit)" }}
      >
        {t.resources.title}
      </h2>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-[64px]">
        <SupportResourceCard
          locale={locale}
          resourceKey="commonQuestions"
          href={`/${locale}/common-questions`}
        />
        <SupportResourceCard
          locale={locale}
          resourceKey="productManuals"
          href={`/${locale}/product-manuals`}
        />
        <SupportResourceCard
          locale={locale}
          resourceKey="driversSoftware"
          href={DRIVERS_SOFTWARE_LINK}
        />
        <SupportResourceCard
          locale={locale}
          resourceKey="mediaArticles"
          href={`/${locale}/media-and-articles`}
        />
      </div>
    </section>
  );
}
