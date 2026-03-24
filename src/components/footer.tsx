'use client';

import { getTranslations, getNestedTranslation, type Locale } from '@/lib/translations';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface FooterProps {
  locale: Locale;
}

const separatorClass = 'w-full border-t border-dotted border-[#C6C7CA]';

export default function Footer({ locale }: FooterProps) {
  const t = getTranslations(locale);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const socials = [
    {
      src: '/images/social/yoinactive.svg',
      hoverSrc: '/images/social/youtubeActive.svg',
      alt: 'YouTube',
    },
    {
      src: '/images/social/twinactive.svg',
      hoverSrc: '/images/social/twitterActive.svg',
      alt: 'Twitter',
    },
    {
      src: '/images/social/iginactive.svg',
      hoverSrc: '/images/social/igActive.svg',
      alt: 'Instagram',
    },
    {
      src: '/images/social/fainactive.svg',
      hoverSrc: '/images/social/facebookActive.svg',
      alt: 'Facebook',
    },
  ] as const;

  const siteLinks = [
    { href: `/${locale}`, key: 'home' as const },
    { href: `/${locale}/about-us`, key: 'about' as const },
    { href: `/${locale}/support`, key: 'support' as const },
  ];

  return (
    <motion.footer
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="bg-[#EFEFF3] py-12 sm:py-16"
      role="contentinfo"
      aria-label="Site footer"
    >
      <div className="mx-auto flex max-w-[1210px] flex-col gap-20 px-4 sm:px-6 lg:px-8">
        {/* Top separator — Figma: dotted rule above main block */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className={`origin-left ${separatorClass}`}
          aria-hidden
        />

        {/* Main row: 1 col → 2 cols (md) → 3 cols (lg). On md, contact spans full width below. */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-x-10 lg:grid-cols-3 lg:gap-x-12 xl:gap-x-16 2xl:gap-x-24">
          {/* Left — brand */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -24 }}
            transition={{ duration: 0.55, delay: 0.15 }}
            className="flex max-w-[295px] flex-col gap-6"
          >
            <div className="flex flex-col gap-8">
              <div className="h-[44px] w-[158px] shrink-0">
                <Image
                  src="/images/oneir_logo.svg"
                  alt="Oneir"
                  width={158}
                  height={44}
                  className="h-[44px] w-auto"
                />
              </div>
              <p className="max-w-[295px] font-sans text-[14px] font-normal leading-6 text-[#434349]">
                {getNestedTranslation(t, 'footer.companyDescription')}
              </p>
            </div>

            <div className="flex w-full max-w-[178px] items-center gap-6">
              {socials.map((social, index) => (
                <motion.a
                  key={social.alt}
                  href="#"
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : { scale: 0 }}
                  transition={{ duration: 0.25, delay: 0.35 + index * 0.06 }}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative flex size-[26px] shrink-0 items-center justify-center"
                  onMouseEnter={(e) => {
                    const img = e.currentTarget.querySelector('img');
                    if (img) (img as HTMLImageElement).src = social.hoverSrc;
                  }}
                  onMouseLeave={(e) => {
                    const img = e.currentTarget.querySelector('img');
                    if (img) (img as HTMLImageElement).src = social.src;
                  }}
                >
                  <Image
                    src={social.src}
                    alt={social.alt}
                    width={26}
                    height={26}
                    className="size-[26px]"
                  />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Site links */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex min-w-0 flex-col gap-6 md:justify-self-start lg:max-w-[160px]"
          >
            <h2
              className="text-[18px] font-semibold text-[#070714]"
              style={{ fontFamily: 'var(--font-outfit)' }}
            >
              {getNestedTranslation(t, 'footer.siteLinks')}
            </h2>
            <nav className="flex flex-col gap-4" aria-label="Footer">
              {siteLinks.map((link, index) => (
                <motion.div
                  key={link.key}
                  initial={{ opacity: 0, x: -12 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -12 }}
                  transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
                >
                  <Link
                    href={link.href}
                    className="text-[16px] font-normal text-[#434349] transition-colors hover:text-[#070714]"
                    style={{ fontFamily: 'var(--font-outfit)' }}
                  >
                    {getNestedTranslation(t, `navigation.${link.key}`)}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 24 }}
            transition={{ duration: 0.55, delay: 0.22 }}
            className="flex flex-col gap-6 md:col-span-2 lg:col-span-1 lg:min-w-0"
          >
            <h2
              className="text-[18px] font-semibold text-[#070714]"
              style={{ fontFamily: 'var(--font-outfit)' }}
            >
              {getNestedTranslation(t, 'footer.contactUs')}
            </h2>
            <div className="flex flex-col gap-4 font-sans text-[16px] text-[#434349]">
              <p className="leading-normal">
                <span className="font-normal">{getNestedTranslation(t, 'footer.sales')}:</span>{' '}
                <a
                  href="tel:18773223580"
                  className="font-medium text-[#434349] transition-colors hover:text-[#070714]"
                >
                  1.877.322.3580
                </a>
              </p>
              <p className="leading-normal">
                <span className="font-normal">{getNestedTranslation(t, 'footer.customerSupport')}:</span>{' '}
                <a
                  href="tel:4163223580"
                  className="font-medium text-[#303033] transition-colors hover:text-[#070714]"
                >
                  416.322.3580
                </a>
              </p>
              <p className="font-normal leading-normal">
                {getNestedTranslation(t, 'footer.fax')}: 416.322.0809
              </p>
              <a
                href="mailto:info@oneirsolutions.com"
                className="w-fit font-normal leading-normal text-[#434349] transition-colors hover:text-[#070714]"
              >
                info@oneirsolutions.com
              </a>
            </div>
          </motion.div>
        </div>

        {/* Bottom: separator + copyright — Figma gap 16px */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="flex flex-col gap-4"
        >
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.55, delay: 0.35 }}
            className={`origin-left ${separatorClass}`}
            aria-hidden
          />
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
            transition={{ duration: 0.45, delay: 0.5 }}
            className="w-full text-center font-sans text-[14px] font-normal leading-6 text-[#525252]"
          >
            {getNestedTranslation(t, 'footer.copyright').replace('{year}', String(new Date().getFullYear()))}
          </motion.p>
        </motion.div>
      </div>
    </motion.footer>
  );
}
