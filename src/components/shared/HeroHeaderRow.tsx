"use client";

import { useRouter } from "next/navigation";

interface HeroHeaderRowProps {
  title: string;
  backAriaLabel: string;
  titleClassName?: string;
  /** "hero" = white text/arrow (dark bg), "light" = dark text/arrow (light bg) */
  variant?: "hero" | "light";
}

const BackArrowIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path
      d="M19 12H5M5 12L12 19M5 12L12 5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/**
 * Reusable header row: back arrow and title on the same line.
 * Use on hero sections for consistent layout.
 */
export default function HeroHeaderRow({
  title,
  backAriaLabel,
  titleClassName,
  variant = "hero",
}: HeroHeaderRowProps) {
  const router = useRouter();

  const isLight = variant === "light";
  const defaultTitleClass = isLight
    ? "text-2xl font-semibold text-[#070714] sm:text-4xl lg:text-[48px]"
    : "text-2xl font-semibold text-white sm:text-4xl lg:text-[48px]";

  return (
    <div className="flex w-full items-center">
      <button
        type="button"
        onClick={() => router.back()}
        className={`z-10 -ml-2 shrink-0 p-2 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
          isLight
            ? "text-[#434349] hover:text-[#070714] focus-visible:ring-[#942c56] focus-visible:ring-offset-transparent"
            : "text-white/90 hover:text-white focus-visible:ring-white focus-visible:ring-offset-transparent"
        }`}
        aria-label={backAriaLabel}
      >
        <BackArrowIcon />
      </button>
      <h1
        className={`flex-1 text-center ${titleClassName ?? defaultTitleClass}`}
        style={{ fontFamily: "var(--font-outfit)" }}
      >
        {title}
      </h1>
      {/* Spacer for visual balance with left arrow */}
      <div className="w-10 shrink-0" aria-hidden />
    </div>
  );
}
