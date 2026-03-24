'use client';

import { useState, useRef, useEffect, type CSSProperties } from 'react';
import { createPortal } from 'react-dom';

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="8" height="4" viewBox="0 0 8 4" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 0.5L4 3.5L7 0.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export interface SelectDropdownOption {
  value: string;
  label: string;
}

interface SelectDropdownProps {
  id: string;
  label: string;
  placeholder: string;
  options: SelectDropdownOption[];
  value: string;
  onChange: (value: string) => void;
  optional?: boolean;
  className?: string;
}

export default function SelectDropdown({
  id,
  label,
  placeholder,
  options,
  value,
  onChange,
  optional,
  className = '',
}: SelectDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [openUpward, setOpenUpward] = useState(false);
  const [menuStyle, setMenuStyle] = useState<CSSProperties>({});

  const selectedOption = options.find((o) => o.value === value);
  const displayText = selectedOption ? selectedOption.label : placeholder;

  const updateMenuPosition = () => {
    if (!triggerRef.current || typeof window === 'undefined') return;

    const rect = triggerRef.current.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const gap = 8;
    const preferredMaxHeight = 240;
    const spaceBelow = viewportHeight - rect.bottom - 12;
    const spaceAbove = rect.top - 12;
    const shouldOpenUpward = spaceBelow < 200 && spaceAbove > spaceBelow;
    const availableHeight = shouldOpenUpward ? spaceAbove : spaceBelow;
    const maxHeight = Math.max(120, Math.min(preferredMaxHeight, availableHeight));
    const top = shouldOpenUpward ? rect.top - gap : rect.bottom + gap;

    setOpenUpward(shouldOpenUpward);
    setMenuStyle({
      left: rect.left,
      top,
      width: rect.width,
      maxHeight,
      zIndex: 160,
    });
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      const clickedInsideContainer = !!containerRef.current?.contains(target);
      const clickedInsideMenu = !!menuRef.current?.contains(target);
      if (!clickedInsideContainer && !clickedInsideMenu) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    updateMenuPosition();
    const handleReposition = () => updateMenuPosition();
    window.addEventListener('resize', handleReposition);
    window.addEventListener('scroll', handleReposition, true);

    return () => {
      window.removeEventListener('resize', handleReposition);
      window.removeEventListener('scroll', handleReposition, true);
    };
  }, [isOpen]);

  return (
    <div ref={containerRef} className={`flex flex-col gap-2 relative ${className}`}>
      <label
        htmlFor={id}
        className="text-sm font-medium text-[#2d2d2d] tracking-[-0.15px]"
        style={{ fontFamily: 'var(--font-inter)' }}
      >
        {label}
        {optional && <span className="font-normal"> ({optional})</span>}
      </label>
      <button
        ref={triggerRef}
        id={id}
        type="button"
        onClick={() => {
          setIsOpen((prev) => {
            const next = !prev;
            if (next) updateMenuPosition();
            return next;
          });
        }}
        className="w-full h-12 px-4 sm:px-[18px] py-1 flex items-center justify-between bg-white border border-[#e0e3eb] rounded-xl text-left text-sm focus:outline-none focus:ring-2 focus:ring-[#65083A]/30 focus:border-[#65083A] transition-colors"
        style={{ fontFamily: 'var(--font-inter)' }}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-labelledby={id}
      >
        <span className={value ? 'text-[#2d2d2d]' : 'text-[#717182]'}>{displayText}</span>
        <ChevronDownIcon
          className={`shrink-0 text-[#717182] transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen &&
        typeof document !== 'undefined' &&
        createPortal(
          <div
            ref={menuRef}
            className={`fixed bg-white border border-[#e0e3eb] rounded-2xl p-4 shadow-[0px_16px_40px_0px_rgba(0,0,0,0.1)] overflow-y-auto ${
              openUpward ? '-translate-y-full' : ''
            }`}
            style={menuStyle}
            role="listbox"
            aria-label={label}
          >
            <div className="flex flex-col gap-2">
              {options.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  role="option"
                  aria-selected={value === option.value}
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                  className={`w-full h-[33px] flex items-center px-4 py-[9px] rounded-lg text-sm font-medium text-[#2d2d2d] tracking-[-0.15px] text-left transition-colors ${
                    value === option.value ? 'bg-[#f8f8fb]' : 'hover:bg-[#f8f8fb]'
                  }`}
                  style={{ fontFamily: 'var(--font-inter)' }}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}
