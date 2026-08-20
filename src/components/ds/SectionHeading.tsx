import type { CSSProperties } from 'react';

export interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: 'left' | 'center';
  tone?: 'default' | 'inverse';
  rule?: boolean;
  /** Render as h1 on pages where this heading is the page title. */
  as?: 'h1' | 'h2';
  style?: CSSProperties;
}

export function SectionHeading({
  eyebrow, title, intro, align = 'left', tone = 'default', rule = true, as: Heading = 'h2', style,
}: SectionHeadingProps) {
  const inverse = tone === 'inverse';
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', gap: 'var(--space-16)',
      alignItems: align === 'center' ? 'center' : 'flex-start', textAlign: align, ...style,
    }}>
      {eyebrow && (
        <span style={{
          font: 'var(--type-eyebrow)', letterSpacing: 'var(--ls-eyebrow)', textTransform: 'uppercase',
          color: inverse ? 'var(--sage-300)' : 'var(--text-accent)',
        }}>{eyebrow}</span>
      )}
      <Heading style={{
        font: 'var(--type-section)', color: inverse ? 'var(--text-on-inverse)' : 'var(--text-heading)',
        margin: 0, maxWidth: '22ch',
      }}>{title}</Heading>
      {rule && <span style={{ width: 56, height: 2, background: 'var(--gilt-500)' }} />}
      {intro && (
        <p style={{
          font: 'var(--type-body-lg)', color: inverse ? 'var(--text-on-inverse-muted)' : 'var(--text-muted)',
          margin: 0, maxWidth: '52ch',
        }}>{intro}</p>
      )}
    </div>
  );
}
