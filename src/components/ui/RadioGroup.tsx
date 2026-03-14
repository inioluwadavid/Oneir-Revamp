'use client';

import { ReactNode } from 'react';

export interface RadioOption<T extends string = string> {
  value: T;
  label: string;
  icon?: ReactNode;
}

export function EmailIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="18" height="15" viewBox="0 0 18 15" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 1L9 8L17 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="1" y="1" width="16" height="13" rx="1" stroke="currentColor" strokeWidth="1.5" fill="none" />
    </svg>
  );
}

export function PhoneIcon({ className }: { className?: string }) {
  return (
    <img
      src="/images/phone_call.svg"
      alt=""
      className={className}
      width={19}
      height={19}
    />
  );
}

interface RadioGroupProps<T extends string = string> {
  name: string;
  label?: string;
  options: RadioOption<T>[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
  variant?: 'circle' | 'square';
}

export default function RadioGroup<T extends string = string>({
  name,
  label,
  options,
  value,
  onChange,
  className = '',
  variant = 'circle',
}: RadioGroupProps<T>) {
  const isSquare = variant === 'square';

  return (
    <div className={`flex flex-col ${label ? 'gap-6' : 'gap-4'} ${className}`}>
      {label && (
        <label
          id={`${name}-label`}
          className="text-sm font-medium text-[#2d2d2d] tracking-[-0.15px]"
          style={{ fontFamily: 'var(--font-inter)' }}
        >
          {label}
        </label>
      )}
      <div className="flex flex-col gap-4" role="radiogroup" aria-labelledby={label ? `${name}-label` : undefined}>
        {options.map((option) => {
          const isSelected = value === option.value;
          return (
            <button
              key={option.value}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => onChange(option.value)}
              className={`flex items-center text-left cursor-pointer ${isSquare ? 'gap-3' : 'gap-4'}`}
            >
              {/* Radio circle or square */}
              <div
                className={`shrink-0 w-4 h-4 flex items-center justify-center transition-colors ${
                  isSquare ? 'rounded' : 'rounded-full'
                } ${
                  isSelected
                    ? 'border-[0.5px] border-[#9b9bbd]'
                    : isSquare
                      ? 'bg-[#f3f3f5] border border-[#e0e3eb] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]'
                      : 'bg-transparent border border-[#e0e3eb] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]'
                }`}
                style={
                  isSelected
                    ? {
                        background: 'linear-gradient(100.296deg, rgb(101, 8, 58) 25.868%, rgb(57, 57, 101) 119.14%)',
                      }
                    : undefined
                }
              >
                {isSelected && (
                  <div className={`bg-white ${isSquare ? 'w-1.5 h-1.5 rounded-sm' : 'w-1.5 h-1.5 rounded-full'}`} />
                )}
              </div>
              {/* Label with optional icon */}
              <div className="flex gap-2 items-center">
                {option.icon && <span className="shrink-0 text-[#2d2d2d]">{option.icon}</span>}
                <span
                  className="text-sm font-medium text-[#2d2d2d] tracking-[-0.15px] leading-[1.25]"
                  style={{ fontFamily: 'var(--font-inter)' }}
                >
                  {option.label}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
