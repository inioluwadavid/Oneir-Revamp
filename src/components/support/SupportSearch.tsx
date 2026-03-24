"use client";

import { type Locale } from "@/lib/translations";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

interface SupportSearchProps {
  placeholder: string;
  locale: Locale;
}

export default function SupportSearch({ placeholder, locale }: SupportSearchProps) {
  const router = useRouter();
  const [value, setValue] = useState("");

  const goToSearch = () => {
    const q = value.trim();
    const path = q ? `/${locale}/search?q=${encodeURIComponent(q)}` : `/${locale}/search`;
    router.push(path);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    goToSearch();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="block w-full max-w-[688px]"
      role="search"
      aria-label={placeholder}
    >
      <div className="relative flex h-14 cursor-text items-center overflow-hidden rounded-[32px] bg-white px-4 shadow-[0px_16px_20px_0px_rgba(0,0,0,0.04)] transition-shadow focus-within:shadow-md sm:h-16 sm:px-6 lg:px-8">
        <input
          type="search"
          name="q"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          className="min-w-0 flex-1 bg-transparent text-sm text-[#434349] placeholder:text-[#717182] outline-none sm:text-base"
          aria-label={placeholder}
          autoComplete="off"
          enterKeyHint="search"
        />
        <button
          type="submit"
          className="ml-2 flex shrink-0 items-center justify-center rounded-full p-1 text-[#434349] transition-colors hover:bg-[#f5f5f7] hover:text-[#070714] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#65083A]/40"
          aria-label={placeholder}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
            <defs>
              <linearGradient id="support-search-icon-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#65083A" />
                <stop offset="100%" stopColor="#393965" />
              </linearGradient>
            </defs>
            <circle
              cx="11"
              cy="11"
              r="8"
              stroke="url(#support-search-icon-gradient)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="m21 21-4.35-4.35"
              stroke="url(#support-search-icon-gradient)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </form>
  );
}
