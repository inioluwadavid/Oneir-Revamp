'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

const MotionLink = motion(Link);

export interface NavbarSecondaryButtonProps {
  href: string;
  children: ReactNode;
  /** When true, the current route matches this link (e.g. Sign in page). */
  isActive?: boolean;
  size?: 'sm' | 'md'|'lg'|'xl';
  className?: string;
  onClick?: () => void;
  /** Matches `Button` — subtle scale on hover/tap. */
  animated?: boolean;
}

const sizeClasses: Record<NonNullable<NavbarSecondaryButtonProps['size']>, string> = {
  sm: 'px-3 py-2 text-sm rounded-[23px] sm:rounded-[46px]',
  md: 'px-6 py-3 text-base rounded-[40px]',
  lg: 'px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg rounded-[40px]',
  xl: 'px-8 py-4 sm:px-10 sm:py-5 text-lg sm:text-xl rounded-[44px]'
};

/** Default: lavender fill; hover: Figma gradient + lavender border (pill) */
const idleStateClasses =
  'bg-[#9B9BBD] text-white border border-white ' +
  'active:brightness-95 ' +
  'hover:bg-gradient-to-r hover:from-[#600030] hover:to-[#402060] hover:border-[#B0B0FF] ' +
  'hover:active:brightness-95';

/** Current route — same gradient + border as hover spec; hover brightens slightly */
const activeRouteClasses =
  'bg-gradient-to-r from-[#600030] to-[#402060] text-white border border-[#B0B0FF] ' +
  'hover:from-[#701040] hover:to-[#502878] hover:border-[#B0B0FF] ' +
  'active:from-[#500028] active:to-[#351850] active:border-[#9a9ae6]';

const baseClasses =
  'inline-flex items-center justify-center border font-medium text-center transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#65083A]/40 focus-visible:ring-offset-2';

export default function NavbarSecondaryButton({
  href,
  children,
  isActive = false,
  size = 'md',
  className = '',
  onClick,
  animated = true,
}: NavbarSecondaryButtonProps) {
  const linkClassName = [baseClasses, sizeClasses[size], isActive ? activeRouteClasses : idleStateClasses, className]
    .filter(Boolean)
    .join(' ');

  const style = { fontFamily: 'var(--font-outfit)' } as const;

  if (animated) {
    return (
      <MotionLink
        href={href}
        className={linkClassName}
        style={style}
        onClick={onClick}
        aria-current={isActive ? 'page' : undefined}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {children}
      </MotionLink>
    );
  }

  return (
    <Link href={href} className={linkClassName} style={style} onClick={onClick} aria-current={isActive ? 'page' : undefined}>
      {children}
    </Link>
  );
}
