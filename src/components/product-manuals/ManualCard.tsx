"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { DURATION, EASE_OUT } from "@/lib/motion-variants";

interface ManualCardProps {
  id?: string;
  title: string;
  description: string;
  linkText: string;
  href: string;
}

const linkClassName =
  "mt-auto inline-flex items-center text-sm font-medium text-[#942c56] underline decoration-[#942c56] underline-offset-2 transition-colors hover:text-[#7a2446] sm:text-[14px]";

export default function ManualCard({
  id,
  title,
  description,
  linkText,
  href,
}: ManualCardProps) {
  const isExternal = href.startsWith("http://") || href.startsWith("https://");

  return (
    <motion.article
      id={id}
      className="scroll-mt-28 flex flex-col gap-4 rounded-[24px] p-6 sm:p-8"
      whileHover={{
        y: -4,
        boxShadow: "0px 12px 28px 0px rgba(57, 57, 101, 0.12)",
        transition: { duration: DURATION.fast, ease: EASE_OUT },
      }}
    >
      <h3
        className="text-lg font-semibold text-[#070714] sm:text-xl lg:text-[32px]"
        style={{ fontFamily: "var(--font-outfit)" }}
      >
        {title}
      </h3>
      <p className="flex-1 text-sm leading-relaxed text-[#434349] sm:text-base">
        {description}
      </p>
      {isExternal ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={linkClassName}
        >
          {linkText}
        </a>
      ) : (
        <Link href={href} className={linkClassName}>
          {linkText}
        </Link>
      )}
    </motion.article>
  );
}
