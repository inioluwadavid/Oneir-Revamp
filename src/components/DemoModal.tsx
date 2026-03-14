'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useMemo } from 'react';
import { getTranslations, getNestedTranslation, type Locale } from '@/lib/translations';
import Button from './ui/Button';
import SelectDropdown, { type SelectDropdownOption } from './ui/SelectDropdown';
import RadioGroup, { EmailIcon, PhoneIcon, type RadioOption } from './ui/RadioGroup';

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  locale: Locale;
}

const INDUSTRY_KEYS = ['manufacturing', 'retail', 'healthcare', 'financial', 'technology', 'logistics', 'construction', 'professional', 'other'] as const;
const EMPLOYEES_KEYS = ['1-10', '11-50', '51-200', '201-500', '500+'] as const;
const CURRENT_SYSTEM_KEYS = ['manual', 'sap', 'oracle', 'dynamics', 'netsuite', 'quickbooks', 'custom', 'other'] as const;
const CHALLENGE_KEYS = ['manual', 'dataSilos', 'poorVisibility', 'scalability', 'integration', 'compliance', 'reporting', 'costs'] as const;
const TIMELINE_KEYS = ['1month', '1-3months', '3-6months', 'exploring'] as const;
const BEST_TIME_KEYS = ['morning', 'afternoon', 'evening', 'anytime'] as const;
const HEAR_ABOUT_KEYS = ['google', 'linkedin', 'industryEvent', 'referral', 'socialMedia', 'newsArticle', 'other'] as const;
const COUNTRY_KEYS = ['us', 'canada', 'uk', 'australia', 'germany', 'france', 'india', 'singapore', 'other'] as const;

export default function DemoModal({ isOpen, onClose, locale }: DemoModalProps) {
  const t = getTranslations(locale);
  const [currentStep, setCurrentStep] = useState(1);

  const [step2Data, setStep2Data] = useState({
    industry: '',
    employees: '',
    currentSystem: '',
    mainChallenge: '',
    timeline: '',
  });

  const [step3Data, setStep3Data] = useState({
    preferredContact: 'email' as 'email' | 'phone',
    bestTime: '',
    hearAbout: '',
  });

  const [step4Data, setStep4Data] = useState({
    message: '',
    country: '',
    requestType: 'productDemo' as 'productDemo' | 'scheduleCall' | 'newsletterOptIn',
    file: null as File | null,
  });

  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setCurrentStep(1);
      setShowSuccess(false);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  const stepLabels = useMemo(
    () => ({
      step: getNestedTranslation(t, 'demoModal.step'),
      of: getNestedTranslation(t, 'demoModal.of'),
      heading: getNestedTranslation(t, 'demoModal.heading'),
      headingStep2: getNestedTranslation(t, 'demoModal.headingStep2'),
      subheadingStep2: getNestedTranslation(t, 'demoModal.subheadingStep2'),
      fullName: getNestedTranslation(t, 'demoModal.fullName'),
      fullNamePlaceholder: getNestedTranslation(t, 'demoModal.fullNamePlaceholder'),
      companyName: getNestedTranslation(t, 'demoModal.companyName'),
      companyNamePlaceholder: getNestedTranslation(t, 'demoModal.companyNamePlaceholder'),
      emailAddress: getNestedTranslation(t, 'demoModal.emailAddress'),
      emailPlaceholder: getNestedTranslation(t, 'demoModal.emailPlaceholder'),
      phone: getNestedTranslation(t, 'demoModal.phone'),
      phonePlaceholder: getNestedTranslation(t, 'demoModal.phonePlaceholder'),
      jobTitle: getNestedTranslation(t, 'demoModal.jobTitle'),
      jobTitlePlaceholder: getNestedTranslation(t, 'demoModal.jobTitlePlaceholder'),
      optional: getNestedTranslation(t, 'demoModal.optional'),
      nextButton: getNestedTranslation(t, 'demoModal.nextButton'),
      backButton: getNestedTranslation(t, 'demoModal.backButton'),
      nextButtonStep2: getNestedTranslation(t, 'demoModal.nextButtonStep2'),
      industry: getNestedTranslation(t, 'demoModal.industry'),
      industryPlaceholder: getNestedTranslation(t, 'demoModal.industryPlaceholder'),
      employees: getNestedTranslation(t, 'demoModal.employees'),
      employeesPlaceholder: getNestedTranslation(t, 'demoModal.employeesPlaceholder'),
      currentSystem: getNestedTranslation(t, 'demoModal.currentSystem'),
      currentSystemPlaceholder: getNestedTranslation(t, 'demoModal.currentSystemPlaceholder'),
      mainChallenge: getNestedTranslation(t, 'demoModal.mainChallenge'),
      mainChallengePlaceholder: getNestedTranslation(t, 'demoModal.mainChallengePlaceholder'),
      timeline: getNestedTranslation(t, 'demoModal.timeline'),
      timelinePlaceholder: getNestedTranslation(t, 'demoModal.timelinePlaceholder'),
      headingStep3: getNestedTranslation(t, 'demoModal.headingStep3'),
      preferredContact: getNestedTranslation(t, 'demoModal.preferredContact'),
      email: getNestedTranslation(t, 'demoModal.email'),
      phoneCall: getNestedTranslation(t, 'demoModal.phoneCall'),
      bestTime: getNestedTranslation(t, 'demoModal.bestTime'),
      bestTimePlaceholder: getNestedTranslation(t, 'demoModal.bestTimePlaceholder'),
      hearAbout: getNestedTranslation(t, 'demoModal.hearAbout'),
      hearAboutPlaceholder: getNestedTranslation(t, 'demoModal.hearAboutPlaceholder'),
      nextButtonStep3: getNestedTranslation(t, 'demoModal.nextButtonStep3'),
      headingStep4: getNestedTranslation(t, 'demoModal.headingStep4'),
      message: getNestedTranslation(t, 'demoModal.message'),
      messagePlaceholder: getNestedTranslation(t, 'demoModal.messagePlaceholder'),
      fileUpload: getNestedTranslation(t, 'demoModal.fileUpload'),
      fileUploadHint: getNestedTranslation(t, 'demoModal.fileUploadHint'),
      countryRegion: getNestedTranslation(t, 'demoModal.countryRegion'),
      countryRegionPlaceholder: getNestedTranslation(t, 'demoModal.countryRegionPlaceholder'),
      productDemo: getNestedTranslation(t, 'demoModal.productDemo'),
      scheduleCall: getNestedTranslation(t, 'demoModal.scheduleCall'),
      newsletterOptIn: getNestedTranslation(t, 'demoModal.newsletterOptIn'),
      sendButton: getNestedTranslation(t, 'demoModal.sendButton'),
      successTitle: getNestedTranslation(t, 'demoModal.successTitle'),
      successMessage: getNestedTranslation(t, 'demoModal.successMessage'),
      watchDemo: getNestedTranslation(t, 'demoModal.watchDemo'),
    }),
    [t]
  );

  const industryOptions: SelectDropdownOption[] = useMemo(
    () =>
      INDUSTRY_KEYS.map((key) => ({
        value: key,
        label: getNestedTranslation(t, `demoModal.industries.${key}`),
      })),
    [t]
  );

  const employeesOptions: SelectDropdownOption[] = useMemo(
    () =>
      EMPLOYEES_KEYS.map((key) => ({
        value: key,
        label: getNestedTranslation(t, `demoModal.employeesOptions.${key}`),
      })),
    [t]
  );

  const currentSystemOptions: SelectDropdownOption[] = useMemo(
    () =>
      CURRENT_SYSTEM_KEYS.map((key) => ({
        value: key,
        label: getNestedTranslation(t, `demoModal.currentSystemOptions.${key}`),
      })),
    [t]
  );

  const challengeOptions: SelectDropdownOption[] = useMemo(
    () =>
      CHALLENGE_KEYS.map((key) => ({
        value: key,
        label: getNestedTranslation(t, `demoModal.challengeOptions.${key}`),
      })),
    [t]
  );

  const timelineOptions: SelectDropdownOption[] = useMemo(
    () =>
      TIMELINE_KEYS.map((key) => ({
        value: key,
        label: getNestedTranslation(t, `demoModal.timelineOptions.${key}`),
      })),
    [t]
  );

  const bestTimeOptions: SelectDropdownOption[] = useMemo(
    () =>
      BEST_TIME_KEYS.map((key) => ({
        value: key,
        label: getNestedTranslation(t, `demoModal.bestTimeOptions.${key}`),
      })),
    [t]
  );

  const hearAboutOptions: SelectDropdownOption[] = useMemo(
    () =>
      HEAR_ABOUT_KEYS.map((key) => ({
        value: key,
        label: getNestedTranslation(t, `demoModal.hearAboutOptions.${key}`),
      })),
    [t]
  );

  const preferredContactOptions: RadioOption<'email' | 'phone'>[] = useMemo(
    () => [
      { value: 'email', label: getNestedTranslation(t, 'demoModal.email'), icon: <EmailIcon className="w-[18px] h-[15px]" /> },
      { value: 'phone', label: getNestedTranslation(t, 'demoModal.phoneCall'), icon: <PhoneIcon className="w-[18px] h-[18px]" /> },
    ],
    [t]
  );

  const countryOptions: SelectDropdownOption[] = useMemo(
    () =>
      COUNTRY_KEYS.map((key) => ({
        value: key,
        label: getNestedTranslation(t, `demoModal.countryOptions.${key}`),
      })),
    [t]
  );

  const requestTypeOptions: RadioOption<'productDemo' | 'scheduleCall' | 'newsletterOptIn'>[] = useMemo(
    () => [
      { value: 'productDemo', label: getNestedTranslation(t, 'demoModal.productDemo') },
      { value: 'scheduleCall', label: getNestedTranslation(t, 'demoModal.scheduleCall') },
      { value: 'newsletterOptIn', label: getNestedTranslation(t, 'demoModal.newsletterOptIn') },
    ],
    [t]
  );

  const totalSteps = 4;
  const progressPercent = (currentStep / totalSteps) * 100;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/40 backdrop-blur-sm"
          onClick={handleBackdropClick}
          aria-modal="true"
          role="dialog"
          aria-labelledby="demo-modal-heading"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 8 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-[672px] max-h-[90vh] overflow-hidden flex flex-col bg-white rounded-2xl shadow-[0px_16px_40px_0px_rgba(0,0,0,0.1)]"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10 p-1 rounded-full text-[#434349] hover:bg-[#e0e3eb] hover:text-[#2d2d2d] transition-colors focus:outline-none focus:ring-2 focus:ring-[#65083A] focus:ring-offset-2"
              aria-label={getNestedTranslation(t, 'demoModal.close')}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {showSuccess ? (
              /* Success content */
              <div className="flex flex-col items-center justify-center px-10 sm:px-14 py-12 sm:py-16">
                <div className="flex flex-col gap-12 sm:gap-[72px] items-center">
                  <div className="flex flex-col gap-4 items-center">
                    {/* Success icon with glow */}
                    <div className="relative w-20 h-20">
                      <div
                        className="absolute inset-0 rounded-full blur-[40px]"
                        style={{ background: 'rgba(108,99,255,0.1)' }}
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <svg
                          className="w-20 h-20 text-[#6C63FF]"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                    </div>
                    <h2
                      className="text-2xl sm:text-[32px] font-semibold text-[#070714] text-center leading-normal max-w-[310px]"
                      style={{ fontFamily: 'var(--font-outfit)' }}
                    >
                      {stepLabels.successTitle}
                    </h2>
                    <p
                      className="text-base text-[#0a0a0a] font-normal leading-6 tracking-[-0.31px] text-center"
                      style={{ fontFamily: 'var(--font-inter)' }}
                    >
                      {stepLabels.successMessage}
                    </p>
                  </div>
                  <Button
                    variant="primary"
                    size="lg"
                    animated
                    className="flex items-center justify-center gap-2 min-w-[218px]"
                    onClick={onClose}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    {stepLabels.watchDemo}
                  </Button>
                </div>
              </div>
            ) : (
              <>
            {/* Main content */}
            <div className="flex flex-col gap-8 sm:gap-10 px-6 sm:px-10 pt-8 sm:pt-10 pb-6 overflow-y-auto flex-1 min-h-0">
              {/* Progress bar */}
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <span
                    className="text-sm text-[#0a0a0a] font-normal tracking-[-0.15px]"
                    style={{ fontFamily: 'var(--font-inter)' }}
                  >
                    {stepLabels.step} {currentStep} {stepLabels.of} {totalSteps}
                  </span>
                </div>
                <div className="h-2 w-full bg-[#e0e3eb] rounded-full overflow-hidden">
                  <motion.div
                    initial={false}
                    animate={{ width: `${progressPercent}%` }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                    className="h-full rounded-full"
                    style={{
                      background: 'linear-gradient(163.43deg, rgb(101, 8, 58) 25.868%, rgb(57, 57, 101) 119.14%)',
                      border: '0.5px solid #9b9bbd',
                    }}
                  />
                </div>
              </div>

              {/* Step 1 content */}
              {currentStep === 1 && (
                <div className="flex flex-col gap-6">
                  <h2
                    id="demo-modal-heading"
                    className="text-xl sm:text-2xl font-medium text-[#2d2d2d] tracking-[-0.45px]"
                    style={{ fontFamily: 'var(--font-outfit)' }}
                  >
                    {stepLabels.heading}
                  </h2>

                  <div className="flex flex-col gap-6 sm:gap-8">
                    <div className="flex flex-col gap-2">
                      <label
                        htmlFor="demo-full-name"
                        className="text-sm font-medium text-[#2d2d2d] tracking-[-0.15px]"
                        style={{ fontFamily: 'var(--font-inter)' }}
                      >
                        {stepLabels.fullName}
                      </label>
                      <input
                        id="demo-full-name"
                        type="text"
                        placeholder={stepLabels.fullNamePlaceholder}
                        className="w-full h-12 px-4 sm:px-[18px] py-1 bg-white border border-[#e0e3eb] rounded-xl text-sm text-[#2d2d2d] placeholder:text-[#717182] focus:outline-none focus:ring-2 focus:ring-[#65083A]/30 focus:border-[#65083A] transition-colors"
                        style={{ fontFamily: 'var(--font-inter)' }}
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label
                        htmlFor="demo-company"
                        className="text-sm font-medium text-[#2d2d2d] tracking-[-0.15px]"
                        style={{ fontFamily: 'var(--font-inter)' }}
                      >
                        {stepLabels.companyName}
                      </label>
                      <input
                        id="demo-company"
                        type="text"
                        placeholder={stepLabels.companyNamePlaceholder}
                        className="w-full h-12 px-4 sm:px-[18px] py-1 bg-white border border-[#e0e3eb] rounded-xl text-sm text-[#2d2d2d] placeholder:text-[#717182] focus:outline-none focus:ring-2 focus:ring-[#65083A]/30 focus:border-[#65083A] transition-colors"
                        style={{ fontFamily: 'var(--font-inter)' }}
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label
                        htmlFor="demo-email"
                        className="text-sm font-medium text-[#2d2d2d] tracking-[-0.15px]"
                        style={{ fontFamily: 'var(--font-inter)' }}
                      >
                        {stepLabels.emailAddress}
                      </label>
                      <input
                        id="demo-email"
                        type="email"
                        placeholder={stepLabels.emailPlaceholder}
                        className="w-full h-12 px-4 sm:px-[18px] py-1 bg-white border border-[#e0e3eb] rounded-xl text-sm text-[#2d2d2d] placeholder:text-[#717182] focus:outline-none focus:ring-2 focus:ring-[#65083A]/30 focus:border-[#65083A] transition-colors"
                        style={{ fontFamily: 'var(--font-inter)' }}
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label
                        htmlFor="demo-phone"
                        className="text-sm font-medium text-[#2d2d2d] tracking-[-0.15px]"
                        style={{ fontFamily: 'var(--font-inter)' }}
                      >
                        {stepLabels.phone} ({stepLabels.optional})
                      </label>
                      <input
                        id="demo-phone"
                        type="tel"
                        placeholder={stepLabels.phonePlaceholder}
                        className="w-full h-12 px-4 sm:px-[18px] py-1 bg-white border border-[#e0e3eb] rounded-xl text-sm text-[#2d2d2d] placeholder:text-[#717182] focus:outline-none focus:ring-2 focus:ring-[#65083A]/30 focus:border-[#65083A] transition-colors"
                        style={{ fontFamily: 'var(--font-inter)' }}
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label
                        htmlFor="demo-job-title"
                        className="text-sm font-medium text-[#2d2d2d] tracking-[-0.15px]"
                        style={{ fontFamily: 'var(--font-inter)' }}
                      >
                        {stepLabels.jobTitle}
                      </label>
                      <input
                        id="demo-job-title"
                        type="text"
                        placeholder={stepLabels.jobTitlePlaceholder}
                        className="w-full h-12 px-4 sm:px-[18px] py-1 bg-white border border-[#e0e3eb] rounded-xl text-sm text-[#2d2d2d] placeholder:text-[#717182] focus:outline-none focus:ring-2 focus:ring-[#65083A]/30 focus:border-[#65083A] transition-colors"
                        style={{ fontFamily: 'var(--font-inter)' }}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2 content */}
              {currentStep === 2 && (
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-2">
                    <h2
                      id="demo-modal-heading"
                      className="text-xl sm:text-2xl font-medium text-[#2d2d2d] tracking-[-0.45px]"
                      style={{ fontFamily: 'var(--font-outfit)' }}
                    >
                      {stepLabels.headingStep2}
                    </h2>
                    <p
                      className="text-sm text-[#0a0a0a] font-normal leading-6 tracking-[-0.31px]"
                      style={{ fontFamily: 'var(--font-inter)' }}
                    >
                      {stepLabels.subheadingStep2}
                    </p>
                  </div>

                  <div className="flex flex-col gap-6 sm:gap-8">
                    <SelectDropdown
                      id="demo-industry"
                      label={stepLabels.industry}
                      placeholder={stepLabels.industryPlaceholder}
                      options={industryOptions}
                      value={step2Data.industry}
                      onChange={(value) => setStep2Data((prev) => ({ ...prev, industry: value }))}
                    />
                    <SelectDropdown
                      id="demo-employees"
                      label={stepLabels.employees}
                      placeholder={stepLabels.employeesPlaceholder}
                      options={employeesOptions}
                      value={step2Data.employees}
                      onChange={(value) => setStep2Data((prev) => ({ ...prev, employees: value }))}
                    />
                    <SelectDropdown
                      id="demo-current-system"
                      label={stepLabels.currentSystem}
                      placeholder={stepLabels.currentSystemPlaceholder}
                      options={currentSystemOptions}
                      value={step2Data.currentSystem}
                      onChange={(value) => setStep2Data((prev) => ({ ...prev, currentSystem: value }))}
                    />
                    <SelectDropdown
                      id="demo-main-challenge"
                      label={stepLabels.mainChallenge}
                      placeholder={stepLabels.mainChallengePlaceholder}
                      options={challengeOptions}
                      value={step2Data.mainChallenge}
                      onChange={(value) => setStep2Data((prev) => ({ ...prev, mainChallenge: value }))}
                    />
                    <SelectDropdown
                      id="demo-timeline"
                      label={stepLabels.timeline}
                      placeholder={stepLabels.timelinePlaceholder}
                      options={timelineOptions}
                      value={step2Data.timeline}
                      onChange={(value) => setStep2Data((prev) => ({ ...prev, timeline: value }))}
                    />
                  </div>
                </div>
              )}

              {/* Step 3 content */}
              {currentStep === 3 && (
                <div className="flex flex-col gap-6">
                  <h2
                    id="demo-modal-heading"
                    className="text-xl sm:text-2xl font-medium text-[#2d2d2d] tracking-[-0.45px]"
                    style={{ fontFamily: 'var(--font-outfit)' }}
                  >
                    {stepLabels.headingStep3}
                  </h2>

                  <div className="flex flex-col gap-8 sm:gap-10">
                    <RadioGroup
                      name="preferred-contact"
                      label={stepLabels.preferredContact}
                      options={preferredContactOptions}
                      value={step3Data.preferredContact}
                      onChange={(value) =>
                        setStep3Data((prev) => ({ ...prev, preferredContact: value }))
                      }
                    />
                    <SelectDropdown
                      id="demo-best-time"
                      label={stepLabels.bestTime}
                      placeholder={stepLabels.bestTimePlaceholder}
                      options={bestTimeOptions}
                      value={step3Data.bestTime}
                      onChange={(value) => setStep3Data((prev) => ({ ...prev, bestTime: value }))}
                    />
                    <SelectDropdown
                      id="demo-hear-about"
                      label={stepLabels.hearAbout}
                      placeholder={stepLabels.hearAboutPlaceholder}
                      options={hearAboutOptions}
                      value={step3Data.hearAbout}
                      onChange={(value) => setStep3Data((prev) => ({ ...prev, hearAbout: value }))}
                    />
                  </div>
                </div>
              )}

              {/* Step 4 content */}
              {currentStep === 4 && (
                <div className="flex flex-col gap-6">
                  <h2
                    id="demo-modal-heading"
                    className="text-xl sm:text-2xl font-medium text-[#2d2d2d] tracking-[-0.45px]"
                    style={{ fontFamily: 'var(--font-outfit)' }}
                  >
                    {stepLabels.headingStep4}
                  </h2>

                  <div className="flex flex-col gap-8">
                    {/* Message textarea */}
                    <div className="flex flex-col gap-2">
                      <label
                        htmlFor="demo-message"
                        className="text-sm font-medium text-[#2d2d2d] tracking-[-0.15px]"
                        style={{ fontFamily: 'var(--font-inter)' }}
                      >
                        {stepLabels.message}
                      </label>
                      <textarea
                        id="demo-message"
                        rows={5}
                        placeholder={stepLabels.messagePlaceholder}
                        value={step4Data.message}
                        onChange={(e) => setStep4Data((prev) => ({ ...prev, message: e.target.value }))}
                        className="w-full min-h-[120px] px-4 py-3.5 bg-white border border-[#e0e3eb] rounded-xl text-sm text-[#2d2d2d] placeholder:text-[#717182] focus:outline-none focus:ring-2 focus:ring-[#65083A]/30 focus:border-[#65083A] transition-colors resize-none"
                        style={{ fontFamily: 'var(--font-inter)' }}
                      />
                    </div>

                    {/* File upload */}
                    <div className="flex flex-col gap-2">
                      <label
                        className="text-sm font-medium text-[#2d2d2d] tracking-[-0.15px] flex gap-2 items-center"
                        style={{ fontFamily: 'var(--font-inter)' }}
                      >
                        {stepLabels.fileUpload}{' '}
                        <span className="font-normal text-[#2d2d2d]">({stepLabels.optional})</span>
                      </label>
                      <label
                        htmlFor="demo-file-upload"
                        className="flex gap-3 items-center justify-center h-[60px] border-2 border-dashed border-[#e0e3eb] rounded-[10px] px-2 py-2 cursor-pointer hover:border-[#9b9bbd] hover:bg-[#f8f8fb] transition-colors"
                      >
                        <svg className="w-5 h-5 text-[#0a0a0a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                        <span
                          className="text-base text-[#0a0a0a] tracking-[-0.31px]"
                          style={{ fontFamily: 'var(--font-inter)' }}
                        >
                          {step4Data.file ? step4Data.file.name : stepLabels.fileUploadHint}
                        </span>
                        <input
                          id="demo-file-upload"
                          type="file"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) setStep4Data((prev) => ({ ...prev, file }));
                          }}
                        />
                      </label>
                    </div>

                    {/* Country dropdown */}
                    <SelectDropdown
                      id="demo-country"
                      label={stepLabels.countryRegion}
                      placeholder={stepLabels.countryRegionPlaceholder}
                      options={countryOptions}
                      value={step4Data.country}
                      onChange={(value) => setStep4Data((prev) => ({ ...prev, country: value }))}
                    />

                    {/* Request type radio */}
                    <div className="pt-2">
                      <RadioGroup
                        name="request-type"
                        options={requestTypeOptions}
                        value={step4Data.requestType}
                        onChange={(value) =>
                          setStep4Data((prev) => ({ ...prev, requestType: value }))
                        }
                        variant="square"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="shrink-0 px-6 sm:px-10 py-6 sm:py-8 bg-[rgba(248,248,251,0.5)] border-t border-[#e0e3eb]">
              {currentStep === 1 ? (
                <Button variant="primary" size="lg" animated className="w-full" onClick={() => setCurrentStep(2)}>
                  {stepLabels.nextButton}
                </Button>
              ) : currentStep === 2 ? (
                <div className="flex gap-4 sm:gap-6 items-center">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="flex items-center gap-2 h-[59px] px-5 py-[18px] bg-white border border-[#e0e3eb] rounded-[40px] text-[#2d2d2d] font-medium text-lg hover:bg-[#f8f8fb] transition-colors focus:outline-none focus:ring-2 focus:ring-[#65083A]/30"
                    style={{ fontFamily: 'var(--font-inter)' }}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    {stepLabels.backButton}
                  </button>
                  <Button
                    variant="primary"
                    size="lg"
                    animated
                    className="flex-1"
                    onClick={() => setCurrentStep(3)}
                  >
                    {stepLabels.nextButtonStep2}
                  </Button>
                </div>
              ) : currentStep === 3 ? (
                <div className="flex gap-4 sm:gap-6 items-center">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="flex items-center gap-2 h-[59px] px-5 py-[18px] bg-white border border-[#e0e3eb] rounded-[40px] text-[#2d2d2d] font-medium text-lg hover:bg-[#f8f8fb] transition-colors focus:outline-none focus:ring-2 focus:ring-[#65083A]/30"
                    style={{ fontFamily: 'var(--font-inter)' }}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    {stepLabels.backButton}
                  </button>
                  <Button
                    variant="primary"
                    size="lg"
                    animated
                    className="flex-1"
                    onClick={() => setCurrentStep(4)}
                  >
                    {stepLabels.nextButtonStep3}
                  </Button>
                </div>
              ) : (
                <div className="flex gap-4 sm:gap-6 items-center">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(3)}
                    className="flex items-center gap-2 h-[59px] px-5 py-[18px] bg-white border border-[#e0e3eb] rounded-[40px] text-[#2d2d2d] font-medium text-lg hover:bg-[#f8f8fb] transition-colors focus:outline-none focus:ring-2 focus:ring-[#65083A]/30"
                    style={{ fontFamily: 'var(--font-inter)' }}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    {stepLabels.backButton}
                  </button>
                  <Button
                    variant="primary"
                    size="lg"
                    animated
                    className="flex-1"
                    onClick={() => setShowSuccess(true)}
                  >
                    {stepLabels.sendButton}
                  </Button>
                </div>
              )}
            </div>
            </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
