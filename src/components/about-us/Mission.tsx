import Image from "next/image";
import { type Locale } from "@/lib/translations";
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
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 ">
          <div className="relative h-96 rounded-2xl overflow-hidden ">
            <Image
              src="/mission.png"
              alt="Oneir Solutions Mission"
              fill
              className="object-cover"
            />
          </div>
          <div 
          style={{
            background: 'linear-gradient(90deg, #1E2C31 0%, #3B4E4D 30.57%, #3A3052 100%)'
          }}
            className=" p-12 space-y-6 rounded-2xl flex flex-col justify-center items-center ">
           
           
              {t.mission.description.split('\n\n').map((paragraph, index) => (
                <p key={index} className="text-[16px] font-normal text-white leading-relaxed">
                  {paragraph}
                </p>
              ))}
           
          </div>
        </div>
      </div>
    </section>
  );
}
