'use client';

import { getTranslations, getNestedTranslation, type Locale } from '@/lib/translations';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import Button from './ui/Button';
import { useDemoModal } from '@/context/DemoModalContext';

interface HeroProps {
  locale: Locale;
}

export default function Hero({ locale }: HeroProps) {
  const t = getTranslations(locale);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const { openDemoModal } = useDemoModal();

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="relative min-h-[600px] sm:min-h-[650px] lg:min-h-[700px] overflow-hidden"
      aria-labelledby="hero-heading"
    >
      {/* Background - hero_bg.svg gradient with abstract shapes */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero/hero_bg.svg"
          alt=""
          fill
          className="object-cover object-top"
          priority
          sizes="100vw"
        />
      </div>
      {/* Soft blend gradient at bottom - transitions hero into next section */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 z-[5] h-24 sm:h-28 lg:h-32"
        style={{
          background:
            "linear-gradient(to top, #EFEFF3 0%, rgba(239, 239, 243, 0.6) 30%, rgba(217, 136, 167, 0.15) 90%, transparent 100%)",
        }}
        aria-hidden
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-[calc(var(--navbar-height)+3.5rem)] sm:py-[calc(6rem+4rem)] lg:py-[calc(6rem+6rem)]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 xl:gap-16 items-center">
          {/* Left - Text content */}
          <div className="flex flex-col justify-center order-1 text-center lg:text-left">
            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="text-[16px] sm:text-base text-white font-[400] mb-3 sm:mb-4"
            >
              {getNestedTranslation(t, 'hero.tagline')}
            </motion.p>

            {/* Main Headline */}
            <motion.h1
              id="hero-heading"
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="text-2xl sm:text-[48px] font-[600] text-white mb-[24px] leading-tight"
              style={{ fontFamily: 'var(--font-outfit)' }}
            >
              {getNestedTranslation(t, 'hero.headline')}
            </motion.h1>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="text-base sm:text-[16px] text-white font-[700] mb-1"
              style={{ fontFamily: 'var(--font-outfit)' }}
            >
              {getNestedTranslation(t, 'hero.subheading')}
            </motion.p>

            {/* Description paragraph */}
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.5, delay: 0.45 }}
              className="text-sm sm:text-[16px] text-white font-[400] leading-relaxed mb-6 sm:mb-8 max-w-xl mx-auto lg:mx-0"
            >
              {getNestedTranslation(t, 'hero.description')}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.55 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start"
            >
              <Button variant="primary" size="lg" animated onClick={openDemoModal}>
                {getNestedTranslation(t, 'hero.requestDemo')}
              </Button>
              <Button variant="primary" size="lg" animated onClick={openDemoModal}>
                {getNestedTranslation(t, 'hero.bookDiscovery')}
              </Button>
            </motion.div>
          </div>

          {/* Right - Data visualization dashboards (land_page.svg) */}
          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.98 }}
            animate={isInView ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0, x: 40, scale: 0.98 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="relative order-2 flex items-center justify-center"
          >
            <div className="relative w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl aspect-[4/3] lg:aspect-[16/12]">
              <Image
                src="/images/hero/land_page.svg"
                alt="ERP dashboards and data visualizations"
                fill
                className="object-contain drop-shadow-2xl"
                sizes="(max-width: 640px) 360px, (max-width: 768px) 432px, (max-width: 1024px) 512px, (max-width: 1280px) 576px, 672px"
                priority
              />
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
