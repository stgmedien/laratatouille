import type { CSSProperties, ReactNode } from 'react';

const tones = {
  neutral: { background: 'transparent', color: 'var(--text-muted)', borderColor: 'var(--border-hairline)' },
  gold: { background: 'var(--gilt-200)', color: 'var(--pine-800)', borderColor: 'transparent' },
  sage: { background: 'var(--surface-sage-soft)', color: 'var(--sage-800)', borderColor: 'transparent' },
  pine: { background: 'var(--pine-100)', color: 'var(--pine-700)', borderColor: 'transparent' },
  inverse: {
    background: 'color-mix(in oklab, var(--linen-100) 14%, transparent)',
    color: 'var(--text-on-inverse)', borderColor: 'var(--border-inverse)',
  },
} satisfies Record<string, CSSProperties>;

export interface TagProps {
  children: ReactNode;
  tone?: keyof typeof tones;
  style?: CSSProperties;
}

export function Tag({ children, tone = 'neutral', style }: TagProps) {
  return (
    <span
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 6, height: 24, padding: '0 10px',
        border: '1px solid', borderRadius: 'var(--radius-pill)',
        font: 'var(--type-eyebrow)', letterSpacing: 'var(--ls-caps)', textTransform: 'uppercase',
        ...tones[tone], ...style,
      }}
    >
      {children}
    </span>
  );
}
