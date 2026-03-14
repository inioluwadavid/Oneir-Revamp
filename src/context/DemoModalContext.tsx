'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { type Locale } from '@/lib/translations';
import DemoModal from '@/components/DemoModal';

interface DemoModalContextType {
  isOpen: boolean;
  openDemoModal: () => void;
  closeDemoModal: () => void;
}

const DemoModalContext = createContext<DemoModalContextType | undefined>(undefined);

export function DemoModalProvider({ children, locale }: { children: ReactNode; locale: Locale }) {
  const [isOpen, setIsOpen] = useState(false);

  const openDemoModal = () => setIsOpen(true);
  const closeDemoModal = () => setIsOpen(false);

  return (
    <DemoModalContext.Provider value={{ isOpen, openDemoModal, closeDemoModal }}>
      {children}
      <DemoModal isOpen={isOpen} onClose={closeDemoModal} locale={locale} />
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
