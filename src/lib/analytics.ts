'use client';

type EventParams = Record<string, string | number | boolean | undefined | null>;

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

export const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() ?? '';

/** True when analytics is configured and browser APIs are available. */
export function isAnalyticsEnabled(): boolean {
  return typeof window !== 'undefined' && GA_MEASUREMENT_ID.length > 0;
}

function dispatchGtag(...args: unknown[]): void {
  if (typeof window.gtag === 'function') {
    window.gtag(...args);
    return;
  }

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(args);
}

function cleanEventParams(params: EventParams): Record<string, string | number | boolean> {
  return Object.fromEntries(
    Object.entries(params).filter(
      ([, value]) => value !== undefined && value !== null && value !== '',
    ),
  ) as Record<string, string | number | boolean>;
}

/** Sends a GA4 page-view event for the current route. */
export function trackPageView(url: string): void {
  if (!isAnalyticsEnabled()) return;

  dispatchGtag('event', 'page_view', {
    page_path: url,
    page_location: `${window.location.origin}${url}`,
    send_to: GA_MEASUREMENT_ID,
  });
}

/** Sends a GA4 custom event with optional structured properties. */
export function trackEvent(eventName: string, params: EventParams = {}): void {
  if (!isAnalyticsEnabled()) return;

  dispatchGtag('event', eventName, cleanEventParams(params));
}
