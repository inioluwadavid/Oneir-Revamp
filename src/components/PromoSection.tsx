'use client';

import { getTranslations, getNestedTranslation, type Locale } from '@/lib/translations';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Button from './ui/Button';

interface PromoSectionProps {
  locale: Locale;
}

export default function PromoSection({ locale }: PromoSectionProps) {
  const t = getTranslations(locale);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.section 
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className=""
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ scale: 0.95, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative rounded-xl sm:rounded-2xl overflow-hidden"
        >
          {/* Background Image */}
          <div 
            className="relative h-64 sm:h-80 lg:h-96 w-full"
            style={{
              backgroundImage: "url('/oBg.png')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          >
            {/* Content */}
            <div className="relative  mx-auto z-10 flex flex-col justify-center items-center h-full text-center px-4 sm:px-6 lg:px-8">
              {/* Main message */}
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-white text-[16px] font-normal mb-6 sm:mb-8  sm:w-[40%]"
              >
                {getNestedTranslation(t, 'promo.message')}
              </motion.p>
              
              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <Button
                  variant="secondary"
                  size="lg"
                  animated={false}
                >
                  {getNestedTranslation(t, 'promo.discover')}
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
