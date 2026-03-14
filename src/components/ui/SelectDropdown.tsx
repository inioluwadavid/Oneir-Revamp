'use client';

import { useState, useRef, useEffect } from 'react';

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

  const selectedOption = options.find((o) => o.value === value);
  const displayText = selectedOption ? selectedOption.label : placeholder;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
        id={id}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
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

      {isOpen && (
        <div
          className="absolute top-full left-0 right-0 mt-1 z-50 bg-white border border-[#e0e3eb] rounded-2xl p-4 shadow-[0px_16px_40px_0px_rgba(0,0,0,0.1)] max-h-[240px] overflow-y-auto"
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
        </div>
      )}
    </div>
  );
}
