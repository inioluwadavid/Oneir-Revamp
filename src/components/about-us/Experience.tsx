import { type Locale } from "@/lib/translations";
import enTranslations from "@/locales/about-us/en.json";
import frTranslations from "@/locales/about-us/fr.json";

interface ExperienceProps {
  locale: Locale;
}

interface AboutUsTranslations {
  experience: {
    years: string;
    yearsLabel: string;
    industries: string;
    industriesLabel: string;
  };
}

export default function Experience({ locale }: ExperienceProps) {
  // Import translations based on locale
  const translations = locale === 'fr' ? frTranslations : enTranslations;
  
  const t = translations as AboutUsTranslations;

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-indigo-700">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 text-center">
          <div>
            <div className="text-6xl sm:text-7xl lg:text-8xl font-bold text-white mb-4">
              {t.experience.years}
            </div>
            <div className="text-2xl text-blue-100 font-medium">
              {t.experience.yearsLabel}
            </div>
          </div>
          <div>
            <div className="text-6xl sm:text-7xl lg:text-8xl font-bold text-white mb-4">
              {t.experience.industries}
            </div>
            <div className="text-2xl text-blue-100 font-medium">
              {t.experience.industriesLabel}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
