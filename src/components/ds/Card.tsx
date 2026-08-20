import type { CSSProperties, ReactNode } from 'react';

const skins = {
  outline: { background: 'var(--surface-card)', border: '1px solid var(--border-hairline)', boxShadow: 'none' },
  raised: { background: 'var(--surface-card)', border: '1px solid transparent', boxShadow: 'var(--shadow-md)' },
  plain: { background: 'transparent', border: '1px solid transparent', boxShadow: 'none' },
} satisfies Record<string, CSSProperties>;

export interface CardProps {
  children?: ReactNode;
  eyebrow?: string;
  title?: string;
  footer?: ReactNode;
  variant?: keyof typeof skins;
  style?: CSSProperties;
}

export function Card({ children, eyebrow, title, footer, variant = 'outline', style }: CardProps) {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', borderRadius: 'var(--radius-md)', overflow: 'hidden',
      ...skins[variant], ...style,
    }}>
      <div style={{
        display: 'flex', flexDirection: 'column', gap: 'var(--space-12)',
        padding: variant === 'plain' ? 0 : 'var(--space-24)',
      }}>
        {eyebrow && (
          <span style={{
            font: 'var(--type-eyebrow)', letterSpacing: 'var(--ls-eyebrow)', textTransform: 'uppercase',
            color: 'var(--text-accent)',
          }}>{eyebrow}</span>
        )}
        {title && <h3 style={{ font: 'var(--type-subhead)', color: 'var(--text-heading)', margin: 0 }}>{title}</h3>}
        {children && <div style={{ font: 'var(--type-body)', color: 'var(--text-muted)' }}>{children}</div>}
        {footer && <div style={{ marginTop: 'var(--space-8)' }}>{footer}</div>}
      </div>
    </div>
  );
}
