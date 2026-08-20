import type { CSSProperties, ReactNode } from 'react';
import { Icon, type IconName } from './Icon';

export interface InfoRowProps {
  icon?: IconName;
  label?: string;
  children: ReactNode;
  tone?: 'default' | 'inverse';
  style?: CSSProperties;
}

export function InfoRow({ icon, label, children, tone = 'default', style }: InfoRowProps) {
  const inverse = tone === 'inverse';
  return (
    <div style={{ display: 'flex', gap: 'var(--space-16)', alignItems: 'flex-start', padding: 'var(--space-12) 0', ...style }}>
      {icon && (
        <Icon name={icon} size={17} color={inverse ? 'var(--sage-300)' : 'var(--pine-600)'} style={{ marginTop: 4 }} />
      )}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {label && (
          <span style={{
            font: 'var(--type-eyebrow)', letterSpacing: 'var(--ls-eyebrow)', textTransform: 'uppercase',
            color: inverse ? 'var(--pine-200)' : 'var(--text-faint)',
          }}>{label}</span>
        )}
        <span style={{ font: 'var(--type-body)', color: inverse ? 'var(--text-on-inverse)' : 'var(--text-body)' }}>
          {children}
        </span>
      </div>
    </div>
  );
}
