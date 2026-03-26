'use client';

import { getTranslations, type Locale } from '@/lib/translations';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

const INDUSTRY_IMAGES = [
  '/images/industries/ind1.png',
  '/images/industries/ind2.png',
  '/images/industries/ind3.png',
  '/images/industries/ind4.png',
  '/images/industries/ind5.png',
  '/images/industries/ind6.png',
  '/images/industries/ind7.png',
  '/images/industries/ind8.png',
] as const;

interface IndustryCard {
  title: string;
  subheading: string;
  description: string;
}

export default function IndustriesWeServe({ locale }: { locale: Locale }) {
  const t = getTranslations(locale);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const industries = (t.industriesWeServe as { title: string; cards: IndustryCard[] }).cards;

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-2xl sm:text-[48px] font-[600] text-[#070714] mb-8 sm:mb-10"
          style={{ fontFamily: 'var(--font-outfit)' }}
        >
          {(t.industriesWeServe as { title: string }).title}
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
          {industries.map((industry, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.5, delay: 0.15 + index * 0.05 }}
              className="group relative aspect-[4/3] sm:aspect-[3/2] rounded-2xl sm:rounded-3xl overflow-hidden"
            >
              <Image
                src={INDUSTRY_IMAGES[index]}
                alt={industry.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              {/* Gradient overlay: dark top for title, dark bottom for description */}
              <div
                className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/80"
                aria-hidden="true"
              />
              {/* Title at top */}
              <div className="absolute top-0 left-0 bg-black/50 right-0 p-2 sm:p-5 lg:p-6">
                <p
                  className="text-lg sm:text-[24px] font-[500] text-white"
                  style={{ fontFamily: 'var(--font-outfit)' }}
                >
                  {industry.title}
                </p>
              </div>
              {/* Subheading and description at bottom */}
              <div className="absolute bottom-0 left-0 bg-black/50 right-0 p-2 sm:p-5 lg:p-6">
                <p className="text-sm sm:text-[14px] font-[700] text-white">
                  {industry.subheading}
                </p>
                <p className="text-sm sm:text-[14px] font-[400] text-white leading-relaxed">
                  {industry.description}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
