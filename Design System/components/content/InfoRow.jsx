import React from 'react';
import { Icon } from '../core/Icon.jsx';

export function InfoRow({ icon, label, children, tone = 'default', style }) {
  const inverse = tone === 'inverse';
  return (
    <div style={{ display: 'flex', gap: 'var(--space-16)', alignItems: 'flex-start', padding: 'var(--space-12) 0', ...style }}>
      {icon && <Icon name={icon} size={17} style={{ marginTop: 4, background: inverse ? 'var(--sage-300)' : 'var(--pine-600)' }} />}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {label && <span style={{ font: 'var(--type-eyebrow)', letterSpacing: 'var(--ls-eyebrow)', textTransform: 'uppercase', color: inverse ? 'var(--pine-200)' : 'var(--text-faint)' }}>{label}</span>}
        <span style={{ font: 'var(--type-body)', color: inverse ? 'var(--text-on-inverse)' : 'var(--text-body)' }}>{children}</span>
      </div>
    </div>
  );
}
