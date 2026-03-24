'use client';

import { getTranslations, type Locale } from '@/lib/translations';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import Button from './ui/Button';
import { useDemoModal } from '@/context/DemoModalContext';

interface JourneyStep {
  subheading: string;
  tagline: string;
  description: string;
}

export default function JourneySection({ locale }: { locale: Locale }) {
  const t = getTranslations(locale);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const { openDemoModal } = useDemoModal();

  const journey = t.journey as {
    title: string;
    description: string;
    videoOverlay: string;
    videoOverlayBold: string;
    steps: JourneyStep[];
    cta: string;
  };

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="py-12 sm:py-16 lg:py-20 px-4 sm:px-[96px] "
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
            {/* Top Section - Left/Right Split */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12 lg:mb-16">
              {/* Left - Title and description */}
              <div className="flex flex-col justify-center">
                <motion.h2
                  initial={{ opacity: 0, y: 24 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="text-2xl sm:text-[48px] font-[600] text-white mb-4"
                  style={{ fontFamily: 'var(--font-outfit)' }}
                >
                  {journey.title}
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 24 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-base sm:text-[16px] font-[400] text-white leading-relaxed"
                >
                  {journey.description}
                </motion.p>
              </div>

              {/* Right - Video/Image thumbnail with overlay */}
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative rounded-xl sm:rounded-2xl overflow-hidden aspect-video"
              >
                <Image
                  src="/images/journey.png"
                  alt="Team reviewing data and analytics"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                {/* <div className="absolute inset-0 bg-black/40 flex items-end p-4 sm:p-6">
                  <p className="text-base sm:text-lg text-white">
                    {journey.videoOverlay.split(journey.videoOverlayBold).map((part, i) => (
                      i === 0 ? (
                        <span key={i}>{part}</span>
                      ) : (
                        <span key={i}>
                          <span className="font-bold">{journey.videoOverlayBold}</span>
                          {part}
                        </span>
                      )
                    ))}
                  </p>
                </div> */}
              </motion.div>
            </div>

            {/* Bottom Section - Three columns */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 mb-10 sm:mb-12">
              {journey.steps.map((step, index) => (
                <motion.article
                  key={index}
                  initial={{ opacity: 0, y: 24 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className=""
                >
                  <h3
                    className="text-lg sm:text-[28px] font-[600] text-white mb-2"
                    style={{ fontFamily: 'var(--font-outfit)' }}
                  >
                    {step.subheading}
                  </h3>
                  <p className="text-sm sm:text-base font-[400] text-white mb-3">
                    {step.tagline}
                  </p>
                  <p className="text-sm sm:text-base text-white leading-relaxed">
                    {step.description}
                  </p>
                </motion.article>
              ))}
            </div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Button variant="primary" size="lg" animated onClick={openDemoModal}>
                {journey.cta}
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
