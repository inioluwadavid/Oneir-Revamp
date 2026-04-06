'use client';

import { createContext, useContext, useState, ReactNode, useMemo, useCallback } from 'react';
import { getTranslations, getNestedTranslation, type Locale } from '@/lib/translations';
import { trackEvent } from '@/lib/analytics';
import DemoModal from '@/components/DemoModal';
import GoogleDriveVideoModal from '@/components/media-articles/GoogleDriveVideoModal';
import { getWatchDemoEmbedUrl } from '@/components/media-articles/googleDriveVideo';

interface DemoModalContextType {
  isOpen: boolean;
  openDemoModal: () => void;
  closeDemoModal: () => void;
  /** Closes the demo modal and opens the marketing “Watch demo” Drive video in a modal. */
  launchWatchDemoVideo: () => void;
}

const DemoModalContext = createContext<DemoModalContextType | undefined>(undefined);

export function DemoModalProvider({ children, locale }: { children: ReactNode; locale: Locale }) {
  const [isOpen, setIsOpen] = useState(false);
  const [watchDemoVideoOpen, setWatchDemoVideoOpen] = useState(false);

  const openDemoModal = () => setIsOpen(true);
  const closeDemoModal = () => setIsOpen(false);

  const watchDemoEmbedUrl = useMemo(() => getWatchDemoEmbedUrl(), []);
  const watchDemoVideoTitle = useMemo(() => {
    const t = getTranslations(locale);
    return getNestedTranslation(t, 'demoModal.watchDemo');
  }, [locale]);

  const launchWatchDemoVideo = useCallback(() => {
    setIsOpen(false);
    setWatchDemoVideoOpen(true);
  }, []);

  const closeWatchDemoVideo = useCallback(() => setWatchDemoVideoOpen(false), []);

  const emitSubmittedDetails = useCallback(
    (details: {
      locale: Locale;
      step1Data: {
        fullName: string;
        companyName: string;
        email: string;
        phone: string;
        jobTitle: string;
      };
      step2Data: {
        industry: string;
        employees: string;
        currentSystem: string;
        mainChallenge: string;
        timeline: string;
      };
      step3Data: {
        preferredContact: 'email' | 'phone';
        bestTime: string;
        hearAbout: string;
      };
      step4Data: {
        message: string;
        country: string;
        requestType: 'productDemo' | 'scheduleCall' | 'newsletterOptIn';
        fileName: string | null;
        fileUrl: string | null;
      };
    }) => {
      // GA-safe event payload (avoid sending PII such as email/phone/full name).
      trackEvent('demo_details_submitted', {
        locale: details.locale,
        industry: details.step2Data.industry,
        employees: details.step2Data.employees,
        current_system: details.step2Data.currentSystem,
        main_challenge: details.step2Data.mainChallenge,
        timeline: details.step2Data.timeline,
        preferred_contact: details.step3Data.preferredContact,
        hear_about: details.step3Data.hearAbout,
        country: details.step4Data.country,
        request_type: details.step4Data.requestType,
        has_phone: Boolean(details.step1Data.phone.trim()),
        has_attachment: Boolean(details.step4Data.fileName),
      });

      window.dispatchEvent(
        new CustomEvent('demo:details_submitted', {
          detail: details,
        }),
      );
    },
    [],
  );

  return (
    <DemoModalContext.Provider value={{ isOpen, openDemoModal, closeDemoModal, launchWatchDemoVideo }}>
      {children}
      <DemoModal
        isOpen={isOpen}
        onClose={closeDemoModal}
        locale={locale}
        onSubmitDetails={emitSubmittedDetails}
      />
      {watchDemoEmbedUrl ? (
        <GoogleDriveVideoModal
          isOpen={watchDemoVideoOpen}
          onClose={closeWatchDemoVideo}
          embedUrl={watchDemoEmbedUrl}
          title={watchDemoVideoTitle}
        />
      ) : null}
    </DemoModalContext.Provider>
  );
}

export function useDemoModal() {
  const context = useContext(DemoModalContext);
  if (context === undefined) {
    throw new Error('useDemoModal must be used within a DemoModalProvider');
  }
  return context;
}
