import type { Locale } from "@/lib/translations";

export const SITE_URL = "https://oneirsolutions.com";

function normalizeRoute(route: string): string {
  if (!route) return "";
  return route.replace(/^\/+/, "");
}

export function localizedPath(locale: Locale, route: string): string {
  const normalized = normalizeRoute(route);
  return normalized ? `${SITE_URL}/${locale}/${normalized}` : `${SITE_URL}/${locale}`;
}

export function buildAlternates(locale: Locale, route: string) {
  const normalized = normalizeRoute(route);
  return {
    canonical: localizedPath(locale, normalized),
    languages: {
      en: localizedPath("en", normalized),
      fr: localizedPath("fr", normalized),
      "x-default": localizedPath("en", normalized),
    },
  };
}

export function buildWebPageSchema(params: {
  locale: Locale;
  route: string;
  title: string;
  description: string;
  type?: "WebPage" | "CollectionPage" | "AboutPage" | "FAQPage";
}) {
  return {
    "@context": "https://schema.org",
    "@type": params.type ?? "WebPage",
    inLanguage: params.locale,
    name: params.title,
    description: params.description,
    url: localizedPath(params.locale, params.route),
    isPartOf: {
      "@type": "WebSite",
      name: "Oneir Solutions",
      url: SITE_URL,
    },
  };
}

export function buildCaseStudySchema(params: {
  locale: Locale;
  slug: string;
  title: string;
  description: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    articleSection: "Success Stories",
    headline: params.title,
    description: params.description,
    inLanguage: params.locale,
    mainEntityOfPage: localizedPath(params.locale, `success-stories/${params.slug}`),
    publisher: {
      "@type": "Organization",
      name: "Oneir Solutions",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/oneir.svg`,
      },
    },
  };
}
