"use client";

import { motion, useInView } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { DURATION, EASE_OUT } from "@/lib/motion-variants";

interface FadeInSectionProps {
  children: ReactNode;
  className?: string;
  /** Extra delay (seconds) — useful for staggered siblings */
  delay?: number;
  /** Initial vertical offset in px */
  y?: number;
}

/**
 * Fades and slides content in once when it scrolls into view.
 */
export default function FadeInSection({
  children,
  className,
  delay = 0,
  y = 24,
}: FadeInSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-48px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration: DURATION.normal, delay, ease: EASE_OUT }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
