'use client';

import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { locales, type Locale } from '@/lib/translations';
import { getTranslations, getNestedTranslation } from '@/lib/translations';
import Image from 'next/image';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from './ui/Button';

interface NavbarProps {
  currentLocale: Locale;
}

function GlobeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
    </svg>
  );
}

export default function Navbar({ currentLocale }: NavbarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const t = getTranslations(currentLocale);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const switchLanguage = (locale: Locale) => {
    const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}/, '') || '/';
    router.push(`/${locale}${pathWithoutLocale}`);
  };

  const navigationItems = [
    { key: 'home', href: `/${currentLocale}` },
    { key: 'about', href: `/${currentLocale}/about-us` },
    { key: 'support', href: `/${currentLocale}/support` },
  ];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 bg-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          {/* Logo - Graphic + ONEIR + SOLUTIONS */}
          <Link href={`/${currentLocale}`} className="flex items-center gap-3 sm:gap-4">
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex-shrink-0"
            >
              <Image
                src="/images/oneir_logo.svg"
                alt="Oneir"
                width={100}
                height={100}
                className=""
              />
            </motion.div>
          
          </Link>

          {/* Desktop Navigation Links */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="hidden lg:flex items-center gap-8 xl:gap-12"
          >
            {navigationItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                style={{ fontFamily: 'var(--font-outfit)' }}
                className="text-[#303033] hover:text-gray-600 text-[15px] font-normal transition-colors"
              >
                {getNestedTranslation(t, `navigation.${item.key}`)}
              </Link>
            ))}
          </motion.div>

          {/* Right side - Language selector, CTA, mobile menu */}
          <div className="flex items-center gap-4 sm:gap-6">
            {/* Language Selector - Globe icon + locale */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="hidden sm:flex items-center gap-2 text-gray-600"
            >
              <GlobeIcon className="w-5 h-5 flex-shrink-0" />
              <select
                value={currentLocale}
                onChange={(e) => switchLanguage(e.target.value as Locale)}
                className="text-sm border-none bg-transparent text-gray-800 focus:outline-none font-medium cursor-pointer appearance-none pr-1"
                style={{ fontFamily: 'var(--font-outfit)' }}
              >
                {locales.map((locale) => (
                  <option key={locale} value={locale}>
                    {locale.toUpperCase()}
                  </option>
                ))}
              </select>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Button variant="primary" size="lg" animated={true}>
                {getNestedTranslation(t, 'navigation.requestDemo')}
              </Button>
            </motion.div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-md text-gray-800 hover:text-gray-600 focus:outline-none"
              aria-expanded={isMenuOpen}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden overflow-hidden border-t border-gray-200 bg-white"
          >
            <div className="px-4 py-4 flex flex-col gap-3">
              {navigationItems.map((item) => (
                <Link
                  key={item.key}
                  href={item.href}
                  className="text-gray-800 hover:text-[#65083A] text-base font-medium transition-colors py-2"
                  style={{ fontFamily: 'var(--font-outfit)' }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {getNestedTranslation(t, `navigation.${item.key}`)}
                </Link>
              ))}
              <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
                <GlobeIcon className="w-5 h-5 text-gray-500" />
                <select
                  value={currentLocale}
                  onChange={(e) => switchLanguage(e.target.value as Locale)}
                  className="text-sm border-none bg-transparent text-gray-800 focus:outline-none font-medium"
                >
                  {locales.map((locale) => (
                    <option key={locale} value={locale}>
                      {locale.toUpperCase()}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
