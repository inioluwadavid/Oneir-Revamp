
import { type Locale } from "@/lib/translations";
import enTranslations from "@/locales/about-us/en.json";
import frTranslations from "@/locales/about-us/fr.json";

interface WhoWeAreProps {
  locale: Locale;
}

interface AboutUsTranslations {
  whoWeAre: {
    title: string;
    subtitle: string;
  };
}

export default function WhoWeAre({ locale }: WhoWeAreProps) {
  // Import translations based on locale
  const translations = locale === 'fr' ? frTranslations : enTranslations;
  
  const t = translations as AboutUsTranslations;

  return (
    <section className=" mt-10  relative">
     
      {/* Content */}
      <div className="max-w-4xl mx-auto px-8 py-24">
        <div className="text-center">
          {/* Main Title */}
          <h1  style={{ fontFamily: 'var(--font-outfit)' }} className="text-5xl sm:text-6xl lg:text-7xl font-[600] text-[#070714] mb-8 leading-tight">
            {t.whoWeAre.title}
          </h1>
          
          {/* Subtitle */}
          <div className="text-[16px] text-normal text-[#434349] max-w-xl mx-auto leading-relaxed">
            {t.whoWeAre.subtitle.split('(').map((part, index) => {
              if (index === 0) {
                return <span key={index}>{part}</span>;
              }
              const [boldPart, rest] = part.split(')');
              return (
                <span key={index}>
                  <span className="font-[600] text-[16px]">({boldPart})</span>
                  {rest}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}