"use client";

import { motion } from "framer-motion";
import { type ReactNode } from "react";
import { DURATION, EASE_OUT } from "@/lib/motion-variants";

interface FadeInOnMountProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

/**
 * Animates children on first paint (no scroll trigger).
 */
export default function FadeInOnMount({
  children,
  className,
  delay = 0,
}: FadeInOnMountProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: DURATION.slow, delay, ease: EASE_OUT }}
    >
      {children}
    </motion.div>
  );
}
