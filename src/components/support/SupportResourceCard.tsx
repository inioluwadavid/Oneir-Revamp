"use client";

import { type Locale } from "@/lib/translations";
import enTranslations from "@/locales/support/en.json";
import frTranslations from "@/locales/support/fr.json";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { DURATION, EASE_OUT } from "@/lib/motion-variants";

const MotionLink = motion(Link);

interface SupportResourceCardProps {
  locale: Locale;
  resourceKey: "commonQuestions" | "productManuals" | "driversSoftware" | "mediaArticles";
  href?: string;
}

const iconMap: Record<SupportResourceCardProps["resourceKey"], string> = {
  commonQuestions: "/images/browse_support/b1.svg",
  productManuals: "/images/browse_support/b2.svg",
  driversSoftware: "/images/browse_support/b3.svg",
  mediaArticles: "/images/browse_support/b4.svg",
};

export default function SupportResourceCard({
  locale,
  resourceKey,
  href,
}: SupportResourceCardProps) {
  const t = locale === "fr" ? frTranslations : enTranslations;
  const resource = t.resources[resourceKey];
  const content = (
    <div className="flex w-full flex-col gap-6 sm:flex-row sm:items-center sm:gap-6">
      <div className="relative h-16 w-16 flex-shrink-0 sm:h-[81px] sm:w-[85px]">
        <Image
          src={iconMap[resourceKey]}
          alt=""
          fill
          className="object-contain"
          sizes="85px"
        />
      </div>
      <div className="flex flex-1 flex-col gap-2">
        <h3
          className="text-xl font-semibold text-[#070714] sm:text-[32px]"
          style={{ fontFamily: "var(--font-outfit)" }}
        >
          {resource.title}
        </h3>
        <p className="text-base leading-6 text-[#434349]">{resource.description}</p>
      </div>
    </div>
  );

  const className =
    "flex w-full flex-col items-start rounded-[32px] bg-white p-6 shadow-[0px_16px_20px_0px_rgba(0,0,0,0.01)] transition-shadow hover:shadow-md sm:p-8 sm:px-10";

  const motionProps = {
    whileHover: { y: -4, transition: { duration: DURATION.fast, ease: EASE_OUT } },
    whileTap: { scale: 0.99 },
  } as const;

  if (href) {
    const isExternal = href.startsWith("http");
    if (isExternal) {
      return (
        <motion.a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={className}
          {...motionProps}
        >
          {content}
        </motion.a>
      );
    }
    return (
      <MotionLink href={href} className={className} {...motionProps}>
        {content}
      </MotionLink>
    );
  }

  return (
    <motion.div className={className} {...motionProps}>
      {content}
    </motion.div>
  );
}
