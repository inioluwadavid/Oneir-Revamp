'use client';

import { useEffect } from 'react';
import Script from 'next/script';
import { usePathname, useSearchParams } from 'next/navigation';
import { GA_MEASUREMENT_ID, trackEvent, trackPageView } from '@/lib/analytics';

function getElementLabel(element: Element): string {
  const datasetLabel = element.getAttribute('data-analytics-label');
  if (datasetLabel) return datasetLabel.trim().slice(0, 120);

  const ariaLabel = element.getAttribute('aria-label');
  if (ariaLabel) return ariaLabel.trim().slice(0, 120);

  const text = element.textContent?.replace(/\s+/g, ' ').trim() ?? '';
  return text.slice(0, 120);
}

export default function GoogleAnalytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!pathname) return;
    const query = searchParams?.toString();
    const url = query ? `${pathname}?${query}` : pathname;
    trackPageView(url);
  }, [pathname, searchParams]);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target) return;

      const actionable = target.closest(
        'button, a, [role="button"], input[type="button"], input[type="submit"]',
      );
      if (!actionable) return;

      const isLink = actionable.tagName.toLowerCase() === 'a';
      const href =
        actionable instanceof HTMLAnchorElement ? actionable.getAttribute('href') ?? '' : '';
      const label = getElementLabel(actionable);

      trackEvent(isLink ? 'link_click' : 'button_click', {
        page_path: window.location.pathname,
        page_locale: document.documentElement.lang || 'en',
        button_label: label || undefined,
        link_url: isLink ? href : undefined,
      });
    };

    const handleSubmit = (event: Event) => {
      const form = event.target as HTMLFormElement | null;
      if (!form) return;

      trackEvent('form_submit', {
        page_path: window.location.pathname,
        page_locale: document.documentElement.lang || 'en',
        form_id: form.id || undefined,
        form_name: form.getAttribute('name') || undefined,
        form_action: form.getAttribute('action') || undefined,
      });
    };

    document.addEventListener('click', handleClick, true);
    document.addEventListener('submit', handleSubmit, true);

    return () => {
      document.removeEventListener('click', handleClick, true);
      document.removeEventListener('submit', handleSubmit, true);
    };
  }, []);

  if (!GA_MEASUREMENT_ID) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', { send_page_view: false });
        `}
      </Script>
    </>
  );
}
