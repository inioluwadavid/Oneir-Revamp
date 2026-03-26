'use client';

import { getTranslations, type Locale } from '@/lib/translations';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Button from './ui/Button';
import BackButton from './BackButton';

interface BusinessStory {
  companyName: string;
  description: string;
  image?: string;
  slug?: string;
}

interface HowBusinessesRunProps {
  locale: Locale;
  variant?: 'compact' | 'full';
}

export default function HowBusinessesRun({ locale, variant = 'compact' }: HowBusinessesRunProps) {
  const t = getTranslations(locale);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const section = t.howBusinessesRun as {
    title: string;
    successStoriesTitle: string;
    learnMore: string;
    viewMoreStories: string;
    stories: BusinessStory[];
  };

  const stories = variant === 'compact' ? section.stories.slice(0, 3) : section.stories;
  const title = variant === 'full' ? section.successStoriesTitle : section.title;
  const isCompact = variant === 'compact';

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="py-12 sm:py-[80px] lg:py-20 px-4 sm:px-[96px] "
    >
      <div className="max-w-7xl mx-auto">
        {variant === "full" && (
          <BackButton
            ariaLabel={locale === "en" ? "Go back" : "Retour"}
            className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-white/60 transition-colors mb-4"
          />
        )}
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-sm p-6 sm:p-8 lg:p-12">
          {/* Main title */}
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className={`text-2xl sm:text-[48px] font-[600] text-[#070714] mb-8 sm:mb-10 lg:mb-12 ${isCompact ? '' : 'text-start'}`}
            style={{ fontFamily: 'var(--font-outfit)' }}
          >
            {title}
          </motion.h2>

          {/* Story grid - 3 columns on large screens */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 mb-10 sm:mb-12">
            {stories.map((story, index) => (
              <motion.article
                key={index}
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                transition={{ duration: 0.5, delay: 0.15 + index * 0.1 }}
                className=""
              >
                {/* Logo - optional */}
                {story.image && (
                  <div className="mb-2 sm:mb-2">
                    <Image
                      src={story.image}
                      alt={story.companyName}
                      width={54}
                      height={54}
                      className=""
                    />
                  </div>
                )}
                {/* Company name */}
                <h3
                  className="text-lg sm:text-[32px] font-[600] text-[#070714] mb-2"
                  style={{ fontFamily: 'var(--font-outfit)' }}
                >
                  {story.companyName}
                </h3>
                {/* Description */}
                <p className="text-sm sm:text-[16px] text-[#434349] font-[400] leading-relaxed mb-4">
                  {story.description}
                </p>
                {/* Learn more link */}
                {story.slug ? (
                  <Link
                    href={`/${locale}/success-stories/${story.slug}`}
                    className="text-[14px] font-[400] text-[#942C56] underline underline-offset-2 hover:text-[#942C56] transition-colors"
                  >
                    {section.learnMore}
                  </Link>
                ) : (
                  <span className="text-[14px] font-[400] text-[#434349]">
                    {section.learnMore}
                  </span>
                )}
              </motion.article>
            ))}
          </div>

          {/* CTA Button - only in compact variant */}
          {isCompact && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex justify-start"
            >
              <Link href={`/${locale}/success-stories`}>
                <Button variant="secondary" size="lg" animated>
                  {section.viewMoreStories}
                </Button>
              </Link>
            </motion.div>
          )}
        </div>
      </div>
    </motion.section>
  );
}
