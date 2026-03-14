"use client";

import { useState } from "react";

export interface AccordionItemProps {
  /** Unique id for the item */
  id: string;
  /** Question/trigger text */
  question: string;
  /** Answer/content shown when expanded */
  answer: string;
  /** Optional - for single-open mode, whether this is the active item */
  isOpen?: boolean;
  /** Optional - called when the item is toggled */
  onToggle?: () => void;
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
      className={`shrink-0 transition-all duration-200 ${open ? "rotate-180 text-[#942c56]" : "text-[#942c56]"}`}
    >
      <path
        d="M4 6L8 10L12 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Single accordion item - reusable for FAQ Q&A cells.
 */
export function AccordionItem({
  id,
  question,
  answer,
  isOpen = false,
  onToggle,
}: AccordionItemProps) {
  const buttonId = `accordion-trigger-${id}`;
  const panelId = `accordion-panel-${id}`;

  return (
    <div className="border-b border-[#E5E5E7] last:border-b-0">
      <button
        type="button"
        id={buttonId}
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 py-4 text-left text-base font-medium text-[#070714] transition-colors hover:text-[#942c56] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#942c56] focus-visible:ring-offset-2"
      >
        <span className="flex-1">{question}</span>
        <ChevronIcon open={isOpen} />
      </button>
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        hidden={!isOpen}
        className="overflow-hidden"
      >
        {isOpen && (
          <div className="pb-4 pt-0">
            <p className="text-base leading-relaxed text-[#434349]">{answer}</p>
          </div>
        )}
      </div>
    </div>
  );
}

interface AccordionGroupProps {
  items: { question: string; answer: string }[];
  /** Optional: allow multiple open (default: single) */
  allowMultiple?: boolean;
  /** Optional: prefix for item ids */
  idPrefix?: string;
}

/**
 * Group of accordion items. By default, only one item is open at a time.
 */
export function AccordionGroup({
  items,
  allowMultiple = false,
  idPrefix = "faq",
}: AccordionGroupProps) {
  const [openIds, setOpenIds] = useState<Set<number>>(new Set());

  const toggle = (index: number) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (allowMultiple) {
        if (next.has(index)) next.delete(index);
        else next.add(index);
      } else {
        next.clear();
        if (!prev.has(index)) next.add(index);
      }
      return next;
    });
  };

  return (
    <div className="flex flex-col">
      {items.map((item, i) => (
        <AccordionItem
          key={i}
          id={`${idPrefix}-${i}`}
          question={item.question}
          answer={item.answer}
          isOpen={openIds.has(i)}
          onToggle={() => toggle(i)}
        />
      ))}
    </div>
  );
}
