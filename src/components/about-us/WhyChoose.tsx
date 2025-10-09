import { type Locale } from "@/lib/translations";
import enTranslations from "@/locales/about-us/en.json";
import frTranslations from "@/locales/about-us/fr.json";

interface WhyChooseProps {
  locale: Locale;
}

interface AboutUsTranslations {
  why: {
    title: string;
    description: string;
  };
  cta: {
    title: string;
    description: string;
    button: string;
  };
}

export default function WhyChoose({ locale }: WhyChooseProps) {
  // Import translations based on locale
  const translations = locale === 'fr' ? frTranslations : enTranslations;
  
  const t = translations as AboutUsTranslations;

  return (
    <>
      {/* Why Choose Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-8">
            {t.why.title}
          </h2>
          <p className="text-xl sm:text-2xl text-gray-700 leading-relaxed">
            {t.why.description}
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-indigo-600 to-blue-700">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-8">
            {t.cta.title}
          </h2>
          <p className="text-2xl text-blue-100 mb-12 leading-relaxed">
            {t.cta.description}
          </p>
          <button className="bg-white text-blue-600 px-12 py-6 rounded-2xl font-bold text-xl hover:bg-blue-50 transition-all duration-300 shadow-2xl hover:shadow-3xl hover:-translate-y-1">
            {t.cta.button}
          </button>
        </div>
      </section>
    </>
  );
}
