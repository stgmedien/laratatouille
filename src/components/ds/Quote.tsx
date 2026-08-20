import type { CSSProperties, ReactNode } from 'react';

export interface QuoteProps {
  children: ReactNode;
  attribution?: string;
  source?: string;
  tone?: 'default' | 'inverse';
  align?: 'left' | 'center';
  style?: CSSProperties;
}

export function Quote({ children, attribution, source, tone = 'default', align = 'left', style }: QuoteProps) {
  const inverse = tone === 'inverse';
  return (
    <figure style={{
      margin: 0, display: 'flex', flexDirection: 'column', gap: 'var(--space-16)',
      alignItems: align === 'center' ? 'center' : 'flex-start', textAlign: align, ...style,
    }}>
      <blockquote style={{
        margin: 0, font: 'var(--fw-regular) clamp(1.5rem,3vw,2.125rem)/1.32 var(--font-display)',
        color: inverse ? 'var(--text-on-inverse)' : 'var(--text-heading)',
        maxWidth: '30ch', textWrap: 'balance',
      }}>
        {children}
      </blockquote>
      {(attribution || source) && (
        <figcaption style={{
          display: 'flex', alignItems: 'center', gap: 'var(--space-8)', font: 'var(--type-caption)',
          letterSpacing: 'var(--ls-caps)', textTransform: 'uppercase',
          color: inverse ? 'var(--pine-200)' : 'var(--text-faint)',
        }}>
          {attribution}
          {source && <><span style={{ width: 16, height: 1, background: 'currentColor', opacity: 0.5 }} />{source}</>}
        </figcaption>
      )}
    </figure>
  );
}
