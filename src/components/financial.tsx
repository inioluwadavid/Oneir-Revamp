
'use client';

import { getTranslations, getNestedTranslation, type Locale } from '@/lib/translations';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Button from './ui/Button';

interface FinancialProps {
  locale: Locale;
}

export default function Financial({ locale }: FinancialProps) {
  const t = getTranslations(locale);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.section 
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="py-12 sm:py-16 lg:py-20 bg-gray-100"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Financial Card */}
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="rounded-3xl p-8 sm:p-12 lg:p-16"
            style={{
              background: 'linear-gradient(90deg, #1E2C31 0%, #3B4E4D 30.57%, #3A3052 100%)'
            }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-12 items-center">
              {/* Left Content */}
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-white"
              >
                    <h2 className="text-3xl sm:text-[32px] font-[600] mb-6" style={{ fontFamily: 'var(--font-outfit)' }}>
                      {getNestedTranslation(t, 'financial.title')}
                    </h2>
                <p className="text-[14px] sm:text-[16px] text-gray-200 mb-8 leading-relaxed">
                  {getNestedTranslation(t, 'financial.description')}
                </p>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <Button
                    variant="secondary"
                    size="lg"
                    animated={false}
                  >
                    {getNestedTranslation(t, 'financial.discover')}
                  </Button>
                </motion.div>
              </motion.div>

              {/* Right Chart Visualization */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <Image src="finO.svg" alt="Financial" width={356} height={342} />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}