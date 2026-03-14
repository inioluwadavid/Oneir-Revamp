'use client';

import { DemoModalProvider } from '@/context/DemoModalContext';
import { type Locale } from '@/lib/translations';

export default function DemoModalProviderWrapper({
  children,
  locale,
}: {
  children: React.ReactNode;
  locale: Locale;
}) {
  return <DemoModalProvider locale={locale}>{children}</DemoModalProvider>;
}
