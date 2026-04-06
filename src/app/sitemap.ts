import { MetadataRoute } from "next";

const BASE_URL = "https://oneirsolutions.com";
const LOCALES = ["en", "fr"] as const;

const LOCALIZED_PUBLIC_PATHS = [
  "",
  "about-us",
  "support",
  "product-manuals",
  "media-and-articles",
  "common-questions",
  "success-stories",
  "success-stories/amity-insulation",
  "success-stories/apparel-retailer",
  "success-stories/decorators-choice",
  "success-stories/dwight-lumber",
  "success-stories/fuel-distribution-cardlock",
  "success-stories/multi-company",
  "success-stories/pet-supply-wholesaler",
  "success-stories/structural-lumber-building-systems",
] as const;

function buildUrl(locale: (typeof LOCALES)[number], path: string): string {
  return path ? `${BASE_URL}/${locale}/${path}` : `${BASE_URL}/${locale}`;
}

function getPriority(path: string): number {
  if (!path) return 0.9;
  if (path.startsWith("success-stories/")) return 0.7;
  return 0.8;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const localizedEntries = LOCALES.flatMap((locale) =>
    LOCALIZED_PUBLIC_PATHS.map((path) => ({
      url: buildUrl(locale, path),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: getPriority(path),
      alternates: {
        languages: {
          en: buildUrl("en", path),
          fr: buildUrl("fr", path),
        },
      },
    })),
  );

  return [
    {
      url: BASE_URL,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...localizedEntries,
  ];
}
