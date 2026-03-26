'use client';

import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { locales, type Locale } from '@/lib/translations';
import { getTranslations, getNestedTranslation } from '@/lib/translations';
import Image from 'next/image';
import { useState, useRef, useEffect, useId } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from './ui/Button';
import NavbarSecondaryButton from './ui/NavbarSecondaryButton';
import { useDemoModal } from '@/context/DemoModalContext';

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

function NavbarLocaleSelect({
  currentLocale,
  onSelect,
  triggerClassName = '',
  /** `stacked` keeps the list in normal flow (avoids clipping inside overflow-hidden mobile menus). */
  menuVariant = 'popover',
}: {
  currentLocale: Locale;
  onSelect: (locale: Locale) => void;
  triggerClassName?: string;
  menuVariant?: 'popover' | 'stacked';
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const listboxId = useId();

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div className="relative" ref={rootRef}>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listboxId}
        aria-label="Language"
        onClick={() => setOpen((o) => !o)}
        className={`flex items-center gap-2 rounded text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-[#9B9BBD]/40 ${triggerClassName}`.trim()}
        style={{ fontFamily: 'var(--font-outfit)' }}
      >
        <GlobeIcon className="h-5 w-5 shrink-0" />
        <span>{currentLocale.toUpperCase()}</span>
        <svg className="h-4 w-4 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <ul
          id={listboxId}
          role="listbox"
          aria-label="Language"
          className={
            menuVariant === 'popover'
              ? 'absolute right-0 top-full z-[60] mt-1 min-w-[5.5rem] rounded-md border border-[#C6C7CA] bg-white py-1 shadow-md'
              : 'mt-2 w-full min-w-[5.5rem] rounded-md border border-[#C6C7CA] bg-white py-1 shadow-md'
          }
        >
          {locales.map((locale) => {
            const selected = locale === currentLocale;
            return (
              <li key={locale} role="presentation">
                <button
                  type="button"
                  role="option"
                  aria-selected={selected}
                  className={`w-full px-3 py-2 text-left text-sm font-medium transition-colors ${
                    selected
                      ? 'bg-[#9B9BBD] text-white'
                      : 'text-[#434349] hover:bg-[#9B9BBD] hover:text-white'
                  }`}
                  style={{ fontFamily: 'var(--font-outfit)' }}
                  onClick={() => {
                    onSelect(locale);
                    setOpen(false);
                  }}
                >
                  {locale.toUpperCase()}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default function Navbar({ currentLocale }: NavbarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const t = getTranslations(currentLocale);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { openDemoModal } = useDemoModal();

  const switchLanguage = (locale: Locale) => {
    const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}/, '') || '/';
    router.push(`/${locale}${pathWithoutLocale}`);
  };

  const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}/, '') || '/';

  const navigationItems = [
    { key: 'home', href: `/${currentLocale}`, isActive: pathWithoutLocale === '/' },
    { key: 'about', href: `/${currentLocale}/about-us`, isActive: pathWithoutLocale.startsWith('/about-us') },
    {
      key: 'support',
      href: `/${currentLocale}/support`,
      isActive:
        pathWithoutLocale.startsWith('/support') ||
        pathWithoutLocale.startsWith('/common-questions') ||
        pathWithoutLocale.startsWith('/product-manuals') ||
        pathWithoutLocale.startsWith('/media-and-articles') ||
        pathWithoutLocale.startsWith('/search') ||
        pathWithoutLocale.startsWith('/signin'),
    },
  ];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-[10px] bg-white/92 shadow-[0px_16px_20px_0px_rgba(0,0,0,0.01)]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-[86px]">
          {/* Logo + vertical dashed divider (Figma Final Nav bar — 48px gap, ~64px line) */}
          <Link
            href={`/${currentLocale}`}
            className="flex items-center gap-10 sm:gap-12 lg:gap-12"
          >
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex-shrink-0"
            >
              <Image
                src="/images/oneir_logo.svg"
                alt="Oneir"
                width={158}
                height={44}
                className="h-9 w-auto sm:h-11"
                priority
              />
            </motion.div>
            {/* Vertical dashed rule — matches Figma node 1821:2132 (rotated line asset) */}
            <span
              aria-hidden
              className="block h-12 w-0 shrink-0 self-center border-l border-dashed border-[#C6C7CA] sm:h-14 lg:h-16"
            />
          </Link>

          {/* Desktop Navigation Links */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="hidden lg:flex items-center gap-[30px]"
          >
            {navigationItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                style={{ fontFamily: 'var(--font-outfit)' }}
                className={`text-base transition-colors hover:text-[#070714] ${
                  item.isActive
                    ? 'text-[#070714] font-semibold'
                    : 'text-[#434349] font-normal'
                }`}
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
              className="hidden sm:flex items-center text-[#9B9BBD]"
            >
              <NavbarLocaleSelect
                currentLocale={currentLocale}
                onSelect={switchLanguage}
                triggerClassName="text-[#9B9BBD]"
              />
            </motion.div>

            {/* Desktop / large tablet only — on smaller screens these live in the hamburger menu */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="hidden items-center gap-4 lg:flex"
            >
              <Button variant="primary" size="md" animated={true} onClick={openDemoModal}>
                {getNestedTranslation(t, 'navigation.requestDemo')}
              </Button>
              <NavbarSecondaryButton
                href={`/${currentLocale}/signin`}
                isActive={pathWithoutLocale.startsWith('/signin')}
                size="md"
                animated
              >
                {getNestedTranslation(t, 'navigation.signIn')}
              </NavbarSecondaryButton>
            </motion.div>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-md text-gray-800 hover:text-gray-600 focus:outline-none"
              aria-expanded={isMenuOpen}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
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
                  className={`text-base transition-colors py-2 hover:text-[#65083A] ${
                    item.isActive
                      ? 'text-[#070714] font-semibold'
                      : 'text-[#434349] font-normal'
                  }`}
                  style={{ fontFamily: 'var(--font-outfit)' }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {getNestedTranslation(t, `navigation.${item.key}`)}
                </Link>
              ))}
              <div className="flex flex-col gap-3 pt-2 border-t border-gray-100">
                <div className="flex gap-3">
                  <Button
                    variant="primary"
                    size="sm"
                    className="flex-1"
                    onClick={() => {
                      openDemoModal();
                      setIsMenuOpen(false);
                    }}
                  >
                    {getNestedTranslation(t, 'navigation.requestDemo')}
                  </Button>
                  <NavbarSecondaryButton
                    href={`/${currentLocale}/signin`}
                    isActive={pathWithoutLocale.startsWith('/signin')}
                    size="sm"
                    animated
                    className="flex-1"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {getNestedTranslation(t, 'navigation.signIn')}
                  </NavbarSecondaryButton>
                </div>
                <NavbarLocaleSelect
                  currentLocale={currentLocale}
                  onSelect={(locale) => {
                    switchLanguage(locale);
                    setIsMenuOpen(false);
                  }}
                  triggerClassName="text-[#9B9BBD]"
                  menuVariant="stacked"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
