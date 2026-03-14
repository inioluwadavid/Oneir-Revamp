import { type Locale } from "@/lib/translations";
import NeedAdditionalAssistance from "@/components/shared/NeedAdditionalAssistance";
import enTranslations from "@/locales/support/en.json";
import frTranslations from "@/locales/support/fr.json";

interface SupportAssistanceProps {
  locale: Locale;
}

export default function SupportAssistance({ locale }: SupportAssistanceProps) {
  const t = locale === "fr" ? frTranslations : enTranslations;

  return (
    <NeedAdditionalAssistance
      translations={t.assistance}
      sectionId="contact-support"
    />
  );
}
