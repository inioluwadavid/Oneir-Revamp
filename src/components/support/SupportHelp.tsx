import { type Locale } from "@/lib/translations";
import SupportSearch from "@/components/support/SupportSearch";
import Button from "@/components/ui/Button";
import enTranslations from "@/locales/support/en.json";
import frTranslations from "@/locales/support/fr.json";
import Image from "next/image";

interface SupportHelpProps {
  locale: Locale;
}

export default function SupportHelp({ locale }: SupportHelpProps) {
  const t = locale === "fr" ? frTranslations : enTranslations;

  return (
    <section className="py-16 sm:py-20 lg:py-24 mb-20 sm:mb-24 lg:mb-[120px] flex flex-col items-center gap-8 sm:gap-10">
      <h2
        className="text-2xl font-semibold text-[#070714] sm:text-4xl lg:text-[48px] text-center"
        style={{ fontFamily: "var(--font-outfit)" }}
      >
        {t.help.title}
      </h2>
      <div className="flex w-full max-w-[688px] flex-col items-center gap-8 sm:gap-10">
        <SupportSearch placeholder={t.help.searchPlaceholder} locale={locale} />
        <div className="flex flex-col gap-4 sm:flex-row sm:gap-8">
          <Button
            href="mailto:support@oneirsolutions.com?subject=Support%20Ticket"
            variant="primary"
            size="lg"
            className="inline-flex items-center justify-center gap-2"
          >
            <Image src="/images/ticket.svg" alt="" width={24} height={24} className="shrink-0" />
            {t.help.submitTicket}
          </Button>
          <Button
            href="#contact-support"
            variant="secondary"
            size="lg"
            className="inline-flex items-center justify-center gap-2"
          >
            <Image src="/images/comment.svg" alt="" width={24} height={19} className="shrink-0" />
            {t.help.contactSupport}
          </Button>
        </div>
      </div>
    </section>
  );
}
