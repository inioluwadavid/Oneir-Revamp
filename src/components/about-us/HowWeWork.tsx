import { type Locale } from "@/lib/translations";
import enTranslations from "@/locales/about-us/en.json";
import frTranslations from "@/locales/about-us/fr.json";

interface HowWeWorkProps {
  locale: Locale;
}

interface AboutUsTranslations {
  howWeWork: {
    intro: string;
    mainTitle: string;
    description: string;
  };
}

export default function HowWeWork({ locale }: HowWeWorkProps) {
  // Import translations based on locale
  const translations = locale === 'fr' ? frTranslations : enTranslations;
  
  const t = translations as AboutUsTranslations;

  return (
    <section className="py-20 px-4 sm:px-[96px] ">
      <div className="max-w-6xl mx-auto">
        {/* White rounded card */}
        <div className="bg-white rounded-[32px] p-12 shadow-lg">
          <div className="">
            {/* Left side content */}
            <div className="sm:w-[65%] mb-[80px] ">
            <h3  style={{ fontFamily: 'var(--font-outfit)' }} className="text-2xl sm:text-[32px] font-[600] text-[#070714] leading-relaxed">
                {t.howWeWork.intro}
              </h3>
            </div>
             {/* Right side content */}
             <div className=" flex  justify-end mb-[80px]    ">
                <p className="text-[16px] font-[400] sm:w-[45%] text-end text-[#434349] leading-relaxed">
                    {t.howWeWork.description}
                </p>
            </div>
            
            <div className="">
              {/* Main title */}
              <div  style={{ fontFamily: 'var(--font-outfit)' }} className="text-4xl sm:text-[48px] font-bold text-gray-900 leading-tight">
                {t.howWeWork.mainTitle}
              </div>
            </div>
            
           
          </div>
        </div>
      </div>
    </section>
  );
}
