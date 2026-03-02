'use client';

import { getTranslations, type Locale } from '@/lib/translations';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

const SELL_ICONS = [
  '/images/sell/sell1.svg',
  '/images/sell/sell2.svg',
  '/images/sell/sell3.svg',
  '/images/sell/sell4.svg',
  '/images/sell/sell5.svg',
  '/images/sell/sell6.svg',
  '/images/sell/sell7.svg',
  '/images/sell/sell8.svg',
  '/images/sell/sell9.svg',
] as const;

interface SellFeature {
  title: string;
  description: string;
}

export default function SellAnywhere({ locale }: { locale: Locale }) {
  const t = getTranslations(locale);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const sell = t.sellAnywhere as {
    title: string;
    description: string;
    learnMore: string;
    features: SellFeature[];
  };

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl">
          {/* Background */}
          <div className="absolute inset-0">
            <Image
              src="/images/sell/sell_bg.svg"
              alt=""
              fill
              className="object-cover"
              sizes="100vw"
            />
          </div>

          {/* Content */}
          <div className="relative z-10 p-6 sm:p-[96px]">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-start mb-10 sm:mb-12 lg:mb-16"
            >
              <h2
                className="text-2xl sm:text-[48px] font-[600] text-white mb-4"
                style={{ fontFamily: 'var(--font-outfit)' }}
              >
                {sell.title}
              </h2>
              <p className="text-base sm:text-[16px] font-[400] text-white   leading-relaxed">
                {sell.description}
              </p>
            </motion.div>

            {/* Feature grid - 3x3 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {sell.features.map((feature, index) => (
                <motion.article
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: 0.15 + index * 0.05 }}
                  className=""
                >
                  {/* Icon in circular background */}
                  <div className="flex justify-start ">
                    <div className=" flex items-center justify-center">
                      <Image
                        src={SELL_ICONS[index]}
                        alt={feature.title}
                        width={85}
                        height={81}
                        className="object-contain"
                      />
                    </div>
                  </div>
                  <h3
                    className="text-lg sm:text-[32px] max-w-[300px] font-[600] text-white mb-2"
                    style={{ fontFamily: 'var(--font-outfit)' }}
                  >
                    {feature.title}
                  </h3>
                  <p className="text-[16px] text-white font-[400] leading-relaxed mb-3">
                    {feature.description}
                  </p>
                  <a
                    href="#"
                    className="text-sm text-white underline underline-offset-2 hover:text-white/90 transition-colors"
                  >
                    {sell.learnMore}
                  </a>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
