
'use client';

import { getTranslations, type Locale } from '@/lib/translations';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface FeaturesProps {
  locale: Locale;
}

export default function Features({ locale }: FeaturesProps) {
  const t = getTranslations(locale);
  const features = t.features.items;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.section 
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="max-w-6xl rounded-[32px] mx-auto mt-[80px] py-[80px] sm:py-[120px] px-4 sm:px-6 lg:px-8 bg-white"
      aria-labelledby="features-heading"
    >
      <div className="max-w-7xl mx-auto px-6  sm:px-[181px]">
        {/* Section Title */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center sm:w-[70%] mx-auto mb-12 sm:mb-16"
        >
          <h2 id="features-heading" className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900" style={{ fontFamily: 'var(--font-outfit)' }}>
            {t.features.title}
          </h2>
        </motion.div>

        {/* Features List - Alternating layout */}
        <div className=" space-y-16 sm:space-y-20">
          {features.map((feature, index) => {
            
            const isOdd = (index + 1) % 2 === 1;
            
            return (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                className="grid grid-cols-1 gap-8 sm:gap-12 sm:grid-cols-2 items-center"
              >
                {/* Content - Left for odd, Right for even */}
                <motion.div 
                  initial={{ opacity: 0, x: isOdd ? -30 : 30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isOdd ? -30 : 30 }}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                  className={`${isOdd ? 'order-1' : 'order-1 sm:order-2'}`}
                >
                  <div className="max-w-lg">
                    {/* Number Circle */}
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={isInView ? { scale: 1 } : { scale: 0 }}
                      transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                      className="mb-6"
                    >
                      <div className="w-10 h-10 bg-[#20204D] rounded-lg flex items-center justify-center">
                        <span className="text-white text-lg font-bold">
                          {index + 1}
                        </span>
                      </div>
                    </motion.div>
                    <h3 className="text-2xl sm:text-[32px] font-[600] text-[#070714] mb-4" style={{ fontFamily: 'var(--font-outfit)' }}>
                      {feature.title}
                    </h3>
                    <p className="text-[#303033] text-[16px] font-[400] leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>

                {/* Feature Icon - Right for odd, Left for even */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                  className={`flex  ${isOdd ? 'order-2' : 'order-2 sm:order-1'}`}
                >
                  <div>
                    <Image
                      src={`/images/features/o${index + 1}.svg`}
                      alt={feature.title}
                      width={310}
                      height={272}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}
