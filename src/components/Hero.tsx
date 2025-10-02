'use client';

import { getTranslations, getNestedTranslation, type Locale } from '@/lib/translations';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Button from './ui/Button';

interface HeroProps {
  locale: Locale;
}

export default function Hero({ locale }: HeroProps) {
  const t = getTranslations(locale);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.section 
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="py-12 sm:py-16 lg:py-[88px]"
      aria-labelledby="hero-heading"
    >
      <div className=" sm:w-[45%] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Main Headline */}
          <motion.h1 
            id="hero-heading"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-2xl sm:text-3xl md:text-[64px] font-[600] text-gray-900 mb-4 sm:mb-6"
            style={{ fontFamily: 'var(--font-outfit)' }}
          >
            {getNestedTranslation(t, 'hero.headline')}
          </motion.h1>
          
          {/* Description */}
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-base sm:text-lg md:text-xl text-gray-700 mb-6 sm:mb-8 max-w-2xl sm:max-w-3xl mx-auto px-4"
          >
            {getNestedTranslation(t, 'hero.description')}
          </motion.p>
          
          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Button
              variant="primary"
              size="lg"
              animated={false}
            >
              {getNestedTranslation(t, 'hero.getStarted')}
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
