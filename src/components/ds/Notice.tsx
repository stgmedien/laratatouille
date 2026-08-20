import type { CSSProperties, ReactNode } from 'react';
import { Icon, type IconName } from './Icon';

const tones = {
  info: { background: 'var(--surface-sunken)', border: 'var(--border-hairline)', accent: 'var(--ink-500)', glyph: 'info' },
  success: { background: 'var(--surface-sage-soft)', border: 'transparent', accent: 'var(--sage-600)', glyph: 'check' },
  notice: { background: 'color-mix(in oklab, var(--gilt-200) 55%, var(--linen-050))', border: 'transparent', accent: 'var(--gilt-500)', glyph: 'bell' },
  danger: { background: 'color-mix(in oklab, var(--state-danger) 8%, var(--linen-050))', border: 'transparent', accent: 'var(--state-danger)', glyph: 'triangle-alert' },
} satisfies Record<string, { background: string; border: string; accent: string; glyph: IconName }>;

export interface NoticeProps {
  children: ReactNode;
  title?: string;
  tone?: keyof typeof tones;
  icon?: IconName;
  style?: CSSProperties;
}

export function Notice({ children, title, tone = 'info', icon, style }: NoticeProps) {
  const t = tones[tone];
  return (
    <div
      role="status"
      style={{
        display: 'flex', gap: 'var(--space-12)', alignItems: 'flex-start',
        padding: 'var(--space-16) var(--space-20)', background: t.background,
        border: `1px solid ${t.border}`, borderRadius: 'var(--radius-md)', ...style,
      }}
    >
      <Icon name={icon ?? t.glyph} size={17} color={t.accent} style={{ marginTop: 3 }} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
        {title && (
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--fs-h4)', color: 'var(--text-heading)' }}>
            {title}
          </span>
        )}
        <span style={{
          fontFamily: 'var(--font-body)', fontSize: 'var(--fs-body-sm)',
          lineHeight: 'var(--lh-body)', color: 'var(--text-body)',
        }}>{children}</span>
      </div>
    </div>
  );
}
