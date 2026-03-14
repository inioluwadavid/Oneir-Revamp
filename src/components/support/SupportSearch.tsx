"use client";

import Link from "next/link";

interface SupportSearchProps {
  placeholder: string;
  locale: string;
}

export default function SupportSearch({ placeholder, locale }: SupportSearchProps) {
  return (
    <Link href={`/${locale}/search`} className="block w-full max-w-[688px]">
      <div className="relative flex h-14 sm:h-16 cursor-pointer items-center overflow-hidden rounded-[32px] bg-white px-4 shadow-[0px_16px_20px_0px_rgba(0,0,0,0.04)] sm:px-6 lg:px-8 transition-shadow hover:shadow-md">
        <span className="min-w-0 flex-1 bg-transparent text-sm text-[#717182] sm:text-base">
          {placeholder}
        </span>
        <div className="ml-2 flex-shrink-0" aria-hidden>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <defs>
              <linearGradient id="support-search-icon-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#65083A" />
                <stop offset="100%" stopColor="#393965" />
              </linearGradient>
            </defs>
            <circle cx="11" cy="11" r="8" stroke="url(#support-search-icon-gradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="m21 21-4.35-4.35" stroke="url(#support-search-icon-gradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </Link>
  );
}
