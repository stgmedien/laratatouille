'use client';

import { useState, type AnchorHTMLAttributes, type ButtonHTMLAttributes, type CSSProperties, type ReactNode } from 'react';
import Link from 'next/link';

const base: CSSProperties = {
  display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
  fontFamily: 'var(--font-body)', fontWeight: 'var(--fw-semibold)',
  letterSpacing: 'var(--ls-caps)', textTransform: 'uppercase',
  border: '1px solid transparent', borderRadius: 'var(--radius-sm)',
  cursor: 'pointer', textDecoration: 'none', whiteSpace: 'nowrap',
  transition: 'var(--transition-control)',
};

const sizes = {
  sm: { height: 'var(--control-h-sm)', padding: '0 18px', fontSize: '11px' },
  md: { height: 'var(--control-h-md)', padding: '0 26px', fontSize: 'var(--fs-caption)' },
  lg: { height: 'var(--control-h-lg)', padding: '0 34px', fontSize: 'var(--fs-body-sm)' },
} satisfies Record<string, CSSProperties>;

const variants = {
  primary: { background: 'var(--surface-accent)', color: 'var(--text-on-accent)' },
  secondary: { background: 'transparent', color: 'var(--text-heading)', borderColor: 'var(--border-strong)' },
  ghost: { background: 'transparent', color: 'var(--text-heading)' },
  inverse: { background: 'var(--linen-050)', color: 'var(--pine-800)' },
  'inverse-outline': { background: 'transparent', color: 'var(--text-on-inverse)', borderColor: 'var(--border-inverse)' },
} satisfies Record<string, CSSProperties>;

const hovers: Record<keyof typeof variants, CSSProperties> = {
  primary: { background: 'var(--pine-800)' },
  secondary: { borderColor: 'var(--pine-600)', color: 'var(--pine-700)' },
  ghost: { color: 'var(--pine-700)' },
  inverse: { background: 'var(--linen-200)' },
  'inverse-outline': { borderColor: 'var(--linen-100)', background: 'color-mix(in oklab, var(--linen-100) 10%, transparent)' },
};

export interface ButtonProps {
  children: ReactNode;
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  href?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  style?: CSSProperties;
  'aria-label'?: string;
  name?: string;
  value?: string;
}

export function Button({
  children, variant = 'primary', size = 'md', href, disabled = false,
  fullWidth = false, iconLeft, iconRight, type = 'button', onClick, style, ...rest
}: ButtonProps) {
  const [hover, setHover] = useState(false);
  const [press, setPress] = useState(false);

  const css: CSSProperties = {
    ...base, ...sizes[size], ...variants[variant],
    ...(hover && !disabled ? hovers[variant] : null),
    width: fullWidth ? '100%' : undefined,
    transform: press && !disabled ? 'var(--motion-press)' : 'none',
    opacity: disabled ? 0.42 : 1,
    cursor: disabled ? 'not-allowed' : 'pointer',
    ...style,
  };

  const pointer = {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => { setHover(false); setPress(false); },
    onMouseDown: () => setPress(true),
    onMouseUp: () => setPress(false),
  };

  if (href && !disabled) {
    const anchorProps = rest as AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <Link href={href} style={css} onClick={onClick} {...pointer} {...anchorProps}>
        {iconLeft}{children}{iconRight}
      </Link>
    );
  }

  const buttonProps = rest as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button
      type={type} disabled={disabled} onClick={disabled ? undefined : onClick}
      style={css} {...pointer} {...buttonProps}
    >
      {iconLeft}{children}{iconRight}
    </button>
  );
}
