'use client';

import { getTranslations, getNestedTranslation, type Locale } from '@/lib/translations';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

interface ERPSolutionsProps {
  locale: Locale;
}

export default function ERPSolutions({ locale }: ERPSolutionsProps) {
  const t = getTranslations(locale);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const industries = [
    {
      id: 'wholesale',
      title: getNestedTranslation(t, 'erpSolutions.industries.wholesale.title'),
      icon: '/images/er/er1.svg',
      link: getNestedTranslation(t, 'erpSolutions.industries.wholesale.link')
    },
    {
      id: 'retail',
      title: getNestedTranslation(t, 'erpSolutions.industries.retail.title'),
      icon: '/images/er/er2.svg',
      link: getNestedTranslation(t, 'erpSolutions.industries.retail.link')
    },
    {
      id: 'manufacturing',
      title: getNestedTranslation(t, 'erpSolutions.industries.manufacturing.title'),
      icon: '/images/er/er3.svg',
      link: getNestedTranslation(t, 'erpSolutions.industries.manufacturing.link')
    },
    {
      id: 'service',
      title: getNestedTranslation(t, 'erpSolutions.industries.service.title'),
      icon: '/images/er/er4.svg',
      link: getNestedTranslation(t, 'erpSolutions.industries.service.link')
    },
    {
      id: 'construction',
      title: getNestedTranslation(t, 'erpSolutions.industries.construction.title'),
      icon: '/images/er/er5.svg',
      link: getNestedTranslation(t, 'erpSolutions.industries.construction.link')
    }
  ];

  return (
    <motion.section 
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="py-16 mb-[80px] sm:py-20 max-w-6xl mx-auto rounded-[32px] lg:py-24"
      style={{
        background: 'linear-gradient(90deg, #1E2C31 0%, #3B4E4D 30.57%, #3A3052 100%)'
      }}
    >
      <div className=" sm:px-[226px] px-4">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6" style={{ fontFamily: 'var(--font-outfit)' }}>
            {getNestedTranslation(t, 'erpSolutions.title')}
          </h2>
          <p className="text-lg sm:text-xl text-white max-w-3xl mx-auto leading-relaxed">
            {getNestedTranslation(t, 'erpSolutions.description')}
          </p>
        </motion.div>

        {/* First 3 Cards */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.2, delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto mb-8"
        >
          {industries.slice(0, 3).map((industry, index) => (
            <motion.div
              key={industry.id}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.95 }}
              transition={{ duration: 0.2, delay: 0.1 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              style={{
                background: 'linear-gradient(270deg, #E6E6F9 31.27%, #E4EFF1 101.61%)'
              }}
              className="rounded-[32px] p-8 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
            >
              {/* Industry Icon */}
              <motion.div 
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : { scale: 0 }}
                transition={{ duration: 0.2, delay: 0.1 + index * 0.1 }}
                className=" flex justify-center"
              >
                <div className=" flex items-center justify-center">
                  <Image 
                    src={industry.icon} 
                    alt={industry.title}
                    width={84}
                    height={83}
                    className=""
                  />
                </div>
              </motion.div>

              {/* Industry Title */}
                <motion.h3 
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.2, delay: 0.1 + index * 0.1 }}
                  className="text-[24px] font-[600] text-[#070714] text-center mb-6"
                  style={{ fontFamily: 'var(--font-outfit)' }}
                >
                  {industry.title}
                </motion.h3>

              {/* Discovery Link */}
              <motion.a
                href="#"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.2, delay: 0.1 + index * 0.1 }}
                whileHover={{ x: 5 }}
                className="flex items-center justify-center text-[#393965 font-medium hover:text-[#393965] transition-colors"
              >
                <span className="underline text-[12px] font-[500]">{industry.link}</span>
                <svg 
                  className="ml-2 h-4" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" 
                  />
                </svg>
              </motion.a>
            </motion.div>
          ))}
        </motion.div>

        {/* Last 2 Cards - Centered */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.2, delay: 0.1 }}
          className="sm:flex sm:justify-center"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 max-w-2xl">
            {industries.slice(3, 5).map((industry, index) => (
              <motion.div
                key={industry.id}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.95 }}
                transition={{ duration: 0.2, delay: 0.1 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                style={{
                  background: 'linear-gradient(270deg, #E6E6F9 31.27%, #E4EFF1 101.61%)'
                }}
                className="rounded-[32px] p-8 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                {/* Industry Icon */}
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : { scale: 0 }}
                  transition={{ duration: 0.2, delay: 0.1 + index * 0.1 }}
                  className=" flex justify-center"
                >
                  <div className=" flex items-center justify-center">
                    <Image 
                      src={industry.icon} 
                      alt={industry.title}
                      width={84}
                      height={83}
                      className=""
                    />
                  </div>
                </motion.div>

                {/* Industry Title */}
                <motion.h3 
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.2, delay: 0.1 + index * 0.1 }}
                  className="text-[24px] font-[600] text-[#070714] text-center mb-6"
                  style={{ fontFamily: 'var(--font-outfit)' }}
                >
                  {industry.title}
                </motion.h3>

                {/* Discovery Link */}
                <motion.a
                  href="#"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.2, delay: 0.1 + index * 0.1 }}
                  whileHover={{ x: 5 }}
                  className="flex items-center justify-center text-[#393965 font-medium hover:text-[#393965] transition-colors"
                >
                  <span className="underline text-[12px] font-[500]">{industry.link}</span>
                  <svg 
                    className="ml-2 h-4" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" 
                    />
                  </svg>
                </motion.a>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}