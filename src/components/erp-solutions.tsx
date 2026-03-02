'use client';

import { getTranslations, type Locale } from '@/lib/translations';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

const CARD_ICONS = [
  '/images/er/epp1.svg',
  '/images/er/epp2.svg',
  '/images/er/epp3.svg',
  '/images/er/epp4.svg',
] as const;

interface ErpCard {
  title: string;
  description: string;
}

export default function ErpSolutions({ locale }: { locale: Locale }) {
  const t = getTranslations(locale);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const erp = t.erpSolutions as {
    title: string;
    description: string;
    bulletItems: string[];
    closingSentence: string;
    cards: ErpCard[];
  };

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="py-12  bg-white rounded-[32px] max-w-7xl mx-auto sm:py-[80px] my-12 sm:my-[90px] px-4 sm:px-[96px] "
    >
      {/* Content with space on the right for desktop */}
      <div className="max-w-5xl lg:max-w-4xl mr-auto ml-0 pl-0 pr-8 lg:pr-16 xl:pr-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-10 sm:mb-12"
        >
          <h2
            className="text-2xl sm:text-[48px] font-[600] text-[#070714] mb-4 leading-tight"
            style={{ fontFamily: 'var(--font-outfit)' }}
          >
            {erp.title}
          </h2>
          <p className="text-base sm:text-[16px] font-[400] text-[#434349] leading-relaxed mb-5">
            {erp.description}
          </p>

          {/* Bulleted list */}
          <ul className="list-disc pl-5 space-y-2 mb-5 text-[#434349] text-sm sm:text-base marker:text-[#434349] [&_li]:pl-1">
            {erp.bulletItems.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>

          {/* Closing sentence */}
          <p className="text-sm sm:text-[16px] font-[400] text-[#434349]">
            {erp.closingSentence}
          </p>
        </motion.div>

        {/* Feature blocks - 2x2 grid, no borders */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 sm:gap-12 lg:gap-x-16 lg:gap-y-14">
          {erp.cards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              className=""
            >
              {/* Icon in subtle rounded white square with drop shadow */}
              <div className="inline-flex items-center justify-center ">
                <Image
                  src={CARD_ICONS[index]}
                  alt={card.title}
                  width={56}
                  height={56}
                  className="object-contain"
                />
              </div>
              <h3
                className="text-lg sm:text-[32px] font-[600] max-w-[300px] text-[#070714] mb-3 text-left"
                style={{ fontFamily: 'var(--font-outfit)' }}
              >
                {card.title}
              </h3>
              <p className="text-sm sm:text-[16px] font-[400] text-[#434349] leading-relaxed text-left">
                {card.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
