
'use client';

import { getTranslations, getNestedTranslation, type Locale } from '@/lib/translations';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface FooterProps {
  locale: Locale;
}

export default function Footer({ locale }: FooterProps) {
  const t = getTranslations(locale);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.footer 
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className=" py-12 sm:py-16"
      role="contentinfo"
      aria-label="Site footer"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Dotted separator line */}
        <motion.div 
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="border-t border-dotted border-gray-400 mb-8"
        ></motion.div>
        
        {/* Main footer content */}
        <div className="grid grid-cols-1 sm:py-[50px] py-[30px] md:grid-cols-3 gap-8 lg:gap-12">
          {/* Left Column - Company Info & Social */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            {/* Logo */}
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex items-center space-x-3"
            >
                <Image src="oneir.svg" alt="Logo" width={63} height={72} />
            </motion.div>
            
            {/* Description */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="text-[#303033] text-[16px] font-[400] leading-relaxed max-w-sm"
            >
              {getNestedTranslation(t, 'footer.companyDescription')}
            </motion.p>
            
            {/* Social Media Icons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 1.0 }}
              className="flex space-x-4"
            >
              {[
                { 
                  src: "/images/social/yoinactive.svg", 
                  hoverSrc: "/images/social/youo.svg", 
                  alt: "YouTube" 
                },
                { 
                  src: "/images/social/twinactive.svg", 
                  hoverSrc: "/images/social/twio.svg", 
                  alt: "Twitter" 
                },
                { 
                  src: "/images/social/iginactive.svg", 
                  hoverSrc: "/images/social/igo.svg", 
                  alt: "Instagram" 
                },
                { 
                  src: "/images/social/fainactive.svg", 
                  hoverSrc: "/images/social/faceo.svg", 
                  alt: "Facebook" 
                }
              ].map((social, index) => (
                <motion.a
                  key={social.alt}
                  href="#"
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : { scale: 0 }}
                  transition={{ duration: 0.3, delay: 1.2 + index * 0.1 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className=" rounded-full flex items-center  justify-center transition-all duration-200"
                  onMouseEnter={(e) => {
                    const img = e.currentTarget.querySelector('img');
                    if (img) img.src = social.hoverSrc;
                  }}
                  onMouseLeave={(e) => {
                    const img = e.currentTarget.querySelector('img');
                    if (img) img.src = social.src;
                  }}
                >
                  <Image 
                    src={social.src} 
                    alt={social.alt} 
                    width={24} 
                    height={24}
                    className="transition-all duration-200"
                  />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Middle Column - Site Links */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="space-y-4"
          >
                <h4 className="text-lg font-bold text-gray-900" style={{ fontFamily: 'var(--font-outfit)' }}>{getNestedTranslation(t, 'footer.siteLinks')}</h4>
            <nav className="space-y-2">
              {[
                { href: `/${locale}`, text: 'Home' },
                { href: `/${locale}/#`, text: 'Who We Are' },
                { href: `/${locale}/#`, text: 'Industries' },
                { href: `/${locale}/#`, text: 'Solutions' },
                { href: `/${locale}/#`, text: 'Contact' }
              ].map((link, index) => (
                <motion.a
                  key={link.text}
                  href={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
                  whileHover={{ x: 5 }}
                  className="block text-gray-700 hover:text-[#65083A] transition-colors"
                  style={{ fontFamily: 'var(--font-outfit)' }}
                >
                  {link.text}
                </motion.a>
              ))}
            </nav>
          </motion.div>

          {/* Right Column - Contact Us */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="space-y-4"
          >
                <h4 className="text-lg font-bold text-gray-900" style={{ fontFamily: 'var(--font-outfit)' }}>{getNestedTranslation(t, 'footer.contactUs')}</h4>
            <div className="space-y-2 text-sm text-gray-700">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ duration: 0.3, delay: 0.8 }}
              >
                {getNestedTranslation(t, 'footer.sales')}: <a href="tel:18773223580" className="text-[#303033]  font-[500] text-[16px]" style={{ fontFamily: 'var(--font-outfit)' }}>1.877.322.3580</a>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ duration: 0.3, delay: 0.9 }}
              >
                {getNestedTranslation(t, 'footer.customerSupport')}: <a href="tel:4163223580" className="text-[#303033]  font-[500] text-[16px]" style={{ fontFamily: 'var(--font-outfit)' }}>416.322.3580</a>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ duration: 0.3, delay: 1.0 }}
              >
                {getNestedTranslation(t, 'footer.fax')}: 416.322.0809
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ duration: 0.3, delay: 1.1 }}
              >
                <a href="mailto:info@oneirsolutions.com" className="text-[#303033]  font-[500] underline text-[16px]" style={{ fontFamily: 'var(--font-outfit)' }}>info@oneirsolutions.com</a>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Bottom separator */}
        <motion.div 
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="border-t border-dotted border-gray-400 mt-8 pt-6"
        >
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.5, delay: 1.4 }}
            className="text-center text-sm text-gray-700"
          >
            {getNestedTranslation(t, 'footer.copyright')}
          </motion.p>
        </motion.div>
      </div>
    </motion.footer>
  );
}