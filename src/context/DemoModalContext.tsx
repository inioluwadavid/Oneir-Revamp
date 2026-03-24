'use client';

import { createContext, useContext, useState, ReactNode, useMemo, useCallback } from 'react';
import { getTranslations, getNestedTranslation, type Locale } from '@/lib/translations';
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

  return (
    <DemoModalContext.Provider value={{ isOpen, openDemoModal, closeDemoModal, launchWatchDemoVideo }}>
      {children}
      <DemoModal isOpen={isOpen} onClose={closeDemoModal} locale={locale} />
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
