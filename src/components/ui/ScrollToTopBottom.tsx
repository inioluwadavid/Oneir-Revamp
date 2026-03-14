"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ScrollToTopBottomProps {
  /** Scroll threshold (px) from top - show "scroll to top" when below this */
  threshold?: number;
  /** Offset from bottom of viewport (e.g. for footer clearance) */
  bottomOffset?: number;
  /** Offset from right of viewport */
  rightOffset?: number;
  className?: string;
}

function ArrowUpIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="14"
      height="7"
      viewBox="0 0 14 7"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M13 6L7 1L1 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowDownIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="14"
      height="7"
      viewBox="0 0 14 7"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M1 1L7 6L13 1"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function ScrollToTopBottom({
  threshold = 400,
  bottomOffset = 24,
  rightOffset = 24,
  className = "",
}: ScrollToTopBottomProps) {
  const [visible, setVisible] = useState(false);
  const [atBottom, setAtBottom] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  const checkScroll = useCallback(() => {
    const y = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;

    setScrollY(y);
    setVisible(y > threshold || (docHeight > threshold && y < docHeight - threshold));
    setAtBottom(y >= docHeight - 50);
  }, [threshold]);

  useEffect(() => {
    checkScroll();
    window.addEventListener("scroll", checkScroll);
    window.addEventListener("resize", checkScroll);
    return () => {
      window.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [checkScroll]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  const handleClick = () => {
    if (atBottom || scrollY > (document.documentElement.scrollHeight - window.innerHeight) / 2) {
      scrollToTop();
    } else {
      scrollToBottom();
    }
  };

  const showScrollUp = atBottom || scrollY > (document.documentElement.scrollHeight - window.innerHeight) / 2;

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2 }}
          onClick={handleClick}
          aria-label={showScrollUp ? "Scroll to top" : "Scroll to bottom"}
          className={`fixed z-40 flex h-10 w-10 items-center justify-center rounded-full text-white shadow-[0px_4px_12px_rgba(0,0,0,0.1)] transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[#942c56] focus:ring-offset-2 ${className}`}
          style={{
            bottom: bottomOffset,
            right: rightOffset,
            background: "linear-gradient(to right, #65083A, #393965)",
          }}
        >
          {showScrollUp ? (
            <ArrowUpIcon className="h-3.5 w-3.5" />
          ) : (
            <ArrowDownIcon className="h-3.5 w-3.5" />
          )}
        </motion.button>
      )}
    </AnimatePresence>
  );
}
