import Image from "next/image";
import { type Locale } from "@/lib/translations";
import FadeInSection from "@/components/motion/FadeInSection";
import enTranslations from "@/locales/about-us/en.json";
import frTranslations from "@/locales/about-us/fr.json";

interface MissionProps {
  locale: Locale;
}

interface AboutUsTranslations {
  mission: {
    title: string;
    description: string;
  };
}

export default function Mission({ locale }: MissionProps) {
  // Import translations based on locale
  const translations = locale === 'fr' ? frTranslations : enTranslations;
  
  const t = translations as AboutUsTranslations;

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-16 md:grid-cols-2">
          <FadeInSection className="relative h-96 overflow-hidden rounded-2xl" y={32}>
            <Image
              src="/mission.png"
              alt="Oneir Solutions Mission"
              fill
              className="object-cover"
            />
          </FadeInSection>
          <FadeInSection className="w-full" delay={0.12} y={32}>
            <div
              className="flex flex-col items-center justify-center space-y-6 rounded-2xl p-12"
              style={{
                background:
                  "linear-gradient(90deg, #1E2C31 0%, #3B4E4D 30.57%, #3A3052 100%)",
              }}
            >
              {t.mission.description.split("\n\n").map((paragraph, index) => (
                <p key={index} className="text-[16px] font-normal leading-relaxed text-white">
                  {paragraph}
                </p>
              ))}
            </div>
          </FadeInSection>
        </div>
      </div>
    </section>
  );
}
