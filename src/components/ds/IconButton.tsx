'use client';

import { useState, type CSSProperties } from 'react';
import { Icon, type IconName } from './Icon';

const skins = {
  ghost: { background: 'transparent', color: 'var(--text-heading)', borderColor: 'transparent' },
  outline: { background: 'var(--surface-raised)', color: 'var(--text-heading)', borderColor: 'var(--border-hairline)' },
  filled: { background: 'var(--surface-accent)', color: 'var(--text-on-accent)', borderColor: 'transparent' },
  inverse: { background: 'transparent', color: 'var(--text-on-inverse)', borderColor: 'transparent' },
} satisfies Record<string, CSSProperties>;

const hoverSkins: Record<keyof typeof skins, CSSProperties> = {
  ghost: { color: 'var(--pine-700)' },
  outline: { borderColor: 'var(--pine-600)', color: 'var(--pine-700)' },
  filled: { background: 'var(--pine-800)' },
  inverse: { color: 'var(--sage-300)' },
};

export interface IconButtonProps {
  name: IconName;
  label: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: keyof typeof skins;
  onClick?: () => void;
  href?: string;
  external?: boolean;
  style?: CSSProperties;
  'aria-expanded'?: boolean;
  'aria-controls'?: string;
}

export function IconButton({
  name, label, size = 'md', variant = 'ghost', onClick, href, external, style, ...rest
}: IconButtonProps) {
  const [hover, setHover] = useState(false);
  const box = { sm: 36, md: 44, lg: 52 }[size];
  const glyph = { sm: 16, md: 18, lg: 22 }[size];

  const css: CSSProperties = {
    width: box, height: box, display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    border: '1px solid', borderRadius: 'var(--radius-sm)', cursor: 'pointer', padding: 0,
    transition: 'var(--transition-control)',
    ...skins[variant], ...(hover ? hoverSkins[variant] : null), ...style,
  };

  const pointer = { onMouseEnter: () => setHover(true), onMouseLeave: () => setHover(false) };
  const content = <Icon name={name} size={glyph} />;

  if (href) {
    return (
      <a
        href={href} aria-label={label} title={label} style={css} {...pointer}
        {...(external ? { target: '_blank', rel: 'noreferrer noopener' } : null)}
      >
        {content}
      </a>
    );
  }
  return (
    <button type="button" aria-label={label} title={label} onClick={onClick} style={css} {...pointer} {...rest}>
      {content}
    </button>
  );
}
