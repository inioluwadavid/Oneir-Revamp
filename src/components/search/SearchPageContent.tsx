"use client";

import { type Locale } from "@/lib/translations";
import HeroHeaderRow from "@/components/shared/HeroHeaderRow";
import { buildSearchIndex } from "@/lib/search-index";
import enTranslations from "@/locales/search/en.json";
import frTranslations from "@/locales/search/fr.json";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useDeferredValue, useMemo, useState } from "react";

interface SearchPageContentProps {
  locale: Locale;
  initialQuery?: string;
}

function CloseIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 17 17" fill="none" aria-hidden>
      <path
        d="M1 1L16 16M16 1L1 16"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <defs>
        <linearGradient id="search-page-icon-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#65083A" />
          <stop offset="100%" stopColor="#393965" />
        </linearGradient>
      </defs>
      <circle cx="11" cy="11" r="8" stroke="url(#search-page-icon-gradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="m21 21-4.35-4.35" stroke="url(#search-page-icon-gradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function SearchPageContent({ locale, initialQuery = "" }: SearchPageContentProps) {
  const router = useRouter();
  const t = locale === "fr" ? frTranslations : enTranslations;
  const [query, setQuery] = useState(initialQuery);
  const deferredQuery = useDeferredValue(query);
  const searchIndex = useMemo(() => buildSearchIndex(locale), [locale]);

  const updateQuery = useCallback(
    (value: string) => {
      setQuery(value);
      const url = value ? `/${locale}/search?q=${encodeURIComponent(value)}` : `/${locale}/search`;
      router.replace(url, { scroll: false });
    },
    [locale, router]
  );

  const clearSearch = () => {
    updateQuery("");
  };

  const filteredResults = useMemo(() => {
    const normalized = deferredQuery.trim().toLowerCase();
    if (!normalized) return searchIndex;

    const terms = normalized.split(/\s+/).filter(Boolean);
    const matches = searchIndex.filter((entry) => {
      const haystack = [entry.title, entry.subtitle ?? "", ...entry.keywords]
        .join(" ")
        .toLowerCase();
      return terms.every((term) => haystack.includes(term));
    });

    // Rank stronger title starts/contains matches first for a smoother UX.
    return matches.sort((a, b) => {
      const aTitle = a.title.toLowerCase();
      const bTitle = b.title.toLowerCase();
      const aStarts = terms.some((term) => aTitle.startsWith(term));
      const bStarts = terms.some((term) => bTitle.startsWith(term));
      if (aStarts !== bStarts) return aStarts ? -1 : 1;
      const aContains = terms.some((term) => aTitle.includes(term));
      const bContains = terms.some((term) => bTitle.includes(term));
      if (aContains !== bContains) return aContains ? -1 : 1;
      return a.title.localeCompare(b.title);
    });
  }, [deferredQuery, searchIndex]);

  return (
    <div className="mx-auto max-w-[1210px] px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center gap-10 sm:gap-14">
        <div className="flex w-full max-w-[688px] flex-col items-center gap-10">
          <HeroHeaderRow
          title={t.title}
          backAriaLabel={t.backToSupport}
          variant="light"
        />
          <div className="flex w-full max-w-[689px] flex-col gap-10">
            <div className="relative flex h-14 w-full max-w-[689px] items-center overflow-hidden rounded-[32px] bg-white px-6 shadow-[0px_16px_20px_0px_rgba(0,0,0,0.04)] sm:h-16 sm:px-8">
              <input
                type="text"
                value={query}
                onChange={(e) => updateQuery(e.target.value)}
                placeholder={t.searchPlaceholder}
                className="min-w-0 flex-1 bg-transparent text-sm text-[#434349] placeholder:text-[#717182] outline-none sm:text-base"
                aria-label={t.searchPlaceholder}
                autoFocus
              />
              {query ? (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="flex shrink-0 items-center justify-center rounded-[16.5px] p-2.5 text-[#434349] transition-colors hover:bg-[#f5f5f7] hover:text-[#070714]"
                  aria-label="Clear search"
                >
                  <CloseIcon />
                </button>
              ) : (
                <div className="ml-2 flex shrink-0" aria-hidden>
                  <SearchIcon />
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex w-full max-w-[688px] flex-col items-center gap-6 text-center">
          <p
            className="text-2xl font-semibold text-[#070714] sm:text-[32px]"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            {t.resultsCount.replace("{count}", String(filteredResults.length))}
          </p>
          {filteredResults.length === 0 ? (
            <p className="text-base text-[#434349]" style={{ fontFamily: "var(--font-inter)" }}>
              {t.noResults}
            </p>
          ) : (
            <div className="flex flex-col items-center gap-4">
              {filteredResults.map((result) => (
                <Link
                  key={result.id}
                  href={result.href}
                  className="text-lg text-[#942c56] underline decoration-solid underline-offset-2 transition-colors hover:text-[#65083A]"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {result.title}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
