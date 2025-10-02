'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

export type ButtonVariant = 
  | 'primary'           // Gradient background with white hover
  | 'secondary'         // Gray background with gradient hover
  | 'outline'           // Transparent with border
  | 'ghost'             // Transparent with hover effects
  | 'gradient-reverse'; // Gradient with reversed gradient hover

export type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';

export interface ButtonProps {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  onClick?: () => void;
  href?: string;
  disabled?: boolean;
  animated?: boolean;
  fullWidth?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

const sizeClasses = {
  sm: 'px-3 py-2 text-sm rounded-[23px] sm:rounded-[46px]',
  md: 'px-6 py-3 text-base rounded-[40px]',
  lg: 'px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg rounded-[40px]',
  xl: 'px-8 py-4 sm:px-10 sm:py-5 text-lg sm:text-xl rounded-[44px]'
};

const variantStyles = {
  primary: {
    base: {
      background: 'linear-gradient(to right, #65083A, #393965)',
      color: 'white',
      borderColor: 'transparent'
    },
    hover: {
      background: 'white',
      color: '#070714',
      borderColor: '#9B9BBD'
    }
  },
  secondary: {
    base: {
      background: '#9B9BBD',
      color: 'white',
      borderColor: '#FFFFFF'
    },
    hover: {
      background: 'linear-gradient(to right, #65083A, #393965)',
      color: 'white',
      borderColor: 'transparent'
    }
  },
  outline: {
    base: {
      background: 'transparent',
      color: '#65083A',
      borderColor: '#65083A'
    },
    hover: {
      background: '#65083A',
      color: 'white',
      borderColor: '#65083A'
    }
  },
  ghost: {
    base: {
      background: 'transparent',
      color: '#65083A',
      borderColor: 'transparent'
    },
    hover: {
      background: '#f3f4f6',
      color: '#65083A',
      borderColor: 'transparent'
    }
  },
  'gradient-reverse': {
    base: {
      background: 'linear-gradient(to right, #65083A, #393965)',
      color: 'white',
      borderColor: 'transparent'
    },
    hover: {
      background: 'linear-gradient(to right, #393965, #65083A)',
      color: 'white',
      borderColor: 'transparent'
    }
  }
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
  href,
  disabled = false,
  animated = true,
  fullWidth = false,
  type = 'button'
}: ButtonProps) {
  const baseClasses = `
    font-medium transition-all duration-200 border
    ${sizeClasses[size]}
    ${fullWidth ? 'w-full' : ''}
    ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
    ${className}
  `.trim();

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    if (disabled) return;
    const target = e.currentTarget;
    const hoverStyle = variantStyles[variant].hover;
    
    target.style.background = hoverStyle.background;
    target.style.color = hoverStyle.color;
    target.style.borderColor = hoverStyle.borderColor;
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    if (disabled) return;
    const target = e.currentTarget;
    const baseStyle = variantStyles[variant].base;
    
    target.style.background = baseStyle.background;
    target.style.color = baseStyle.color;
    target.style.borderColor = baseStyle.borderColor;
  };

  const buttonContent = (
    <>
      {children}
    </>
  );

  const buttonProps = {
    className: baseClasses,
    style: variantStyles[variant].base,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    onClick: disabled ? undefined : onClick,
    disabled,
    type: href ? undefined : type
  };

  if (href) {
    return (
      <a href={href} {...buttonProps}>
        {buttonContent}
      </a>
    );
  }

  if (animated) {
    return (
      <motion.button
        {...buttonProps}
        whileHover={{ scale: disabled ? 1 : 1.05 }}
        whileTap={{ scale: disabled ? 1 : 0.95 }}
      >
        {buttonContent}
      </motion.button>
    );
  }

  return (
    <button {...buttonProps}>
      {buttonContent}
    </button>
  );
}
