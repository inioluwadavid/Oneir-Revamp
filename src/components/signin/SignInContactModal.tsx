"use client";

import { useEffect, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { getTranslations, getNestedTranslation, type Locale } from "@/lib/translations";

interface SignInContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  locale: Locale;
}

function IconCircle({ children }: { children: ReactNode }) {
  return (
    <div >
      {children}
    </div>
  );
}

export default function SignInContactModal({ isOpen, onClose, locale }: SignInContactModalProps) {
  const t = getTranslations(locale);

  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [isOpen, onClose]);

  const handleBackdrop = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex touch-manipulation items-center justify-center bg-modal-backdrop p-4 backdrop-blur-sm sm:p-6"
          onClick={handleBackdrop}
          role="dialog"
          aria-modal="true"
          aria-labelledby="signin-contact-modal-title"
        >
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 420, damping: 32, mass: 0.75 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-[420px] rounded-[32px] bg-white p-6 shadow-[0px_16px_40px_0px_rgba(0,0,0,0.1)] sm:p-8"
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute right-4 top-4 z-10 rounded-full p-2 text-[#434349] transition-colors hover:bg-[#e0e3eb] hover:text-[#2d2d2d] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#65083A] focus-visible:ring-offset-2 sm:right-5 sm:top-5"
              aria-label={getNestedTranslation(t, "signIn.contactModal.close")}
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h2
              id="signin-contact-modal-title"
              className="mb-8 pr-10 text-left text-xl font-semibold leading-tight text-[#070714] sm:text-2xl"
              style={{ fontFamily: "var(--font-outfit)" }}
            >
              {getNestedTranslation(t, "signIn.contactModal.title")}
            </h2>

            <div className="flex flex-col gap-2" role="list">
              <div className="flex items-center gap-4" role="listitem">
                <IconCircle>
                  <div className="relative ">
                    <Image src="/images/contacts/c1.svg" alt=""  className="object-contain" height={48} width={48} sizes="48px" />
                  </div>
                </IconCircle>
                <Link
                  href="tel:4163223580"
                  className="min-w-0 text-base text-[#434349] transition-colors hover:text-[#942c56] hover:underline"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {getNestedTranslation(t, "signIn.contactModal.supportPhone")}
                </Link>
              </div>
              <div className="flex items-center gap-4" role="listitem">
                <IconCircle>
                  <div className="relative">
                    <Image src="/images/contacts/c2.svg" alt=""  className="object-contain" height={48} width={48} sizes="48px" />
                  </div>
                </IconCircle>
                <Link
                  href="mailto:support@oneirsolutions.com"
                  className="min-w-0 break-all text-base text-[#434349] transition-colors hover:text-[#942c56] hover:underline"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {getNestedTranslation(t, "signIn.contactModal.email")}
                </Link>
              </div>
              <div className="flex items-center gap-4" role="listitem">
                <IconCircle>
                  <div className="relative ">
                    <Image src="/images/contacts/c3.svg" alt=""  className="object-contain" height={48} width={48} sizes="48px" />
                  </div>
                </IconCircle>
                <span className="text-base text-[#434349]" style={{ fontFamily: "var(--font-inter)" }}>
                  {getNestedTranslation(t, "signIn.contactModal.hours")}
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
