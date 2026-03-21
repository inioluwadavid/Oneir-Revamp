"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { type Locale } from "@/lib/translations";
import { DURATION, EASE_OUT } from "@/lib/motion-variants";
import SignInForm from "./SignInForm";

const BackArrowIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden>
    <path
      d="M19 12H5M5 12L12 19M5 12L12 5"
      stroke="#942C56"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

interface SignInPageContentProps {
  locale: Locale;
}

export default function SignInPageContent({ locale }: SignInPageContentProps) {
  return (
    <div className="relative mx-auto max-w-[1210px] px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, x: -16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: DURATION.fast, ease: EASE_OUT }}
        className="absolute left-4 top-0 sm:left-6"
      >
        <Link
          href={`/${locale}/support`}
          className="flex size-10 items-center justify-center rounded-full text-[#434349] transition-colors hover:bg-white/60 hover:text-[#070714] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#942c56] focus-visible:ring-offset-2"
          aria-label={locale === "en" ? "Go back to Support" : "Retour au Support"}
        >
          <BackArrowIcon />
        </Link>
      </motion.div>
      <div className="flex flex-col items-center pt-4 sm:pt-8">
        <SignInForm locale={locale} />
      </div>
    </div>
  );
}
