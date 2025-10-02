'use client';

import { useRouter, usePathname } from 'next/navigation';
import { locales, type Locale } from '@/lib/translations';
import { getTranslations, getNestedTranslation } from '@/lib/translations';
import Image from 'next/image';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from './ui/Button';

interface NavbarProps {
  currentLocale: Locale;
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
    { key: 'whoWeAre', href: `/${currentLocale}/#` },
    { key: 'industries', href: `/${currentLocale}/#` },
    { key: 'solutions', href: `/${currentLocale}/#` },
    { key: 'contact', href: `/${currentLocale}/#` },
  ];

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50  px-2 sm:px-4 py-2 sm:py-4"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-[28px] sm:rounded-[56px] shadow-sm border border-gray-200"
        >
          <div className="px-4 sm:px-[56px] py-3 sm:py-4">
            <div className="flex justify-between items-center">
              {/* Logo */}
              <motion.div 
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex items-center"
              >
                <Image 
                  src="/oneir.svg" 
                  alt="Oneir Logo" 
                  width={40} 
                  height={48} 
                  className="sm:w-[61px] sm:h-[72px]"
                />
              </motion.div>

              {/* Desktop Navigation Links */}
              <motion.div 
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="hidden lg:flex items-center space-x-6 xl:space-x-8"
              >
                {navigationItems.map((item, index) => (
                  <motion.a
                    key={item.key}
                    href={item.href}
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.8 + index * 0.1 }}
                    style={{ fontFamily: 'var(--font-outfit)' }}
                    className="text-gray-800 hover:text-gray-600 text-sm font-medium transition-colors"
                  >
                    {getNestedTranslation(t, `navigation.${item.key}`)}
                  </motion.a>
                ))}
              </motion.div>

              {/* Right side - Language selector, button, and mobile menu */}
              <div className="flex items-center space-x-2 sm:space-x-4">
                {/* Language Selector - Hidden on mobile */}
                <div className="hidden sm:flex items-center space-x-2">
                  <Image src="/tran.svg" alt="Arrow Down" width={20} height={10} />
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

                {/* Discover Button - Responsive sizing */}
                <Button
                  variant="primary"
                  size="lg"
                  animated={true}
                >
                  {getNestedTranslation(t, 'navigation.discover')}
                </Button>

                {/* Mobile Menu Button */}
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="lg:hidden p-2 rounded-md text-gray-800 hover:text-gray-600 focus:outline-none"
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

            {/* Mobile Navigation Menu */}
            <AnimatePresence>
              {isMenuOpen && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="lg:hidden mt-4 pt-4 border-t border-gray-200 overflow-hidden"
                >
                  <div className="flex flex-col space-y-3">
                    {navigationItems.map((item, index) => (
                      <motion.a
                        key={item.key}
                        href={item.href}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="text-gray-800 hover:text-gray-600 text-sm font-medium transition-colors py-2"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {getNestedTranslation(t, `navigation.${item.key}`)}
                      </motion.a>
                    ))}
                    
                    {/* Mobile Language Selector */}
                    <motion.div 
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.5 }}
                      className="flex items-center space-x-2 pt-2"
                    >
                      <Image src="/tran.svg" alt="Arrow Down" width={16} height={8} />
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
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
}
