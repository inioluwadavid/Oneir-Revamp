import { type Locale } from "@/lib/translations";
import SupportSearch from "@/components/support/SupportSearch";
import ContactSupportButton from "@/components/support/ContactSupportButton";
import SubmitTicketButton from "@/components/support/SubmitTicketButton";
import FadeInSection from "@/components/motion/FadeInSection";
import enTranslations from "@/locales/support/en.json";
import frTranslations from "@/locales/support/fr.json";
import Image from "next/image";

interface SupportHelpProps {
  locale: Locale;
}

export default function SupportHelp({ locale }: SupportHelpProps) {
  const t = locale === "fr" ? frTranslations : enTranslations;

  return (
    <section className="mb-20 flex flex-col items-center gap-8 py-16 sm:mb-24 sm:gap-10 sm:py-20 lg:pb-[120px] lg:py-24">
      <FadeInSection className="w-full text-center">
        <h2
          className="text-2xl font-semibold text-[#070714] sm:text-4xl lg:text-[48px]"
          style={{ fontFamily: "var(--font-outfit)" }}
        >
          {t.help.title}
        </h2>
      </FadeInSection>
      <div className="flex w-full max-w-[688px] flex-col items-center gap-8 sm:gap-10">
        <FadeInSection className="w-full" delay={0.08}>
          <SupportSearch placeholder={t.help.searchPlaceholder} locale={locale} />
        </FadeInSection>
        <FadeInSection className="w-full" delay={0.16}>
        <div className="flex w-full flex-col items-center justify-center gap-4 sm:flex-row sm:gap-8">
          <SubmitTicketButton>
            <Image src="/images/ticket.svg" alt="" width={24} height={24} className="shrink-0" />
            {t.help.submitTicket}
          </SubmitTicketButton>
          <ContactSupportButton href="#contact-support" label={t.help.contactSupport} />
        </div>
        </FadeInSection>
      </div>
    </section>
  );
}
