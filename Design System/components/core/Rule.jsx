import React from 'react';

export function Rule({ variant = 'hairline', tone = 'default', style }) {
  const line = tone === 'inverse' ? 'var(--border-inverse)' : 'var(--border-hairline)';
  const gilt = 'var(--gilt-500)';
  if (variant === 'ornament') {
    return (
      <span style={{ display: 'flex', alignItems: 'center', gap: 12, ...style }}>
        <span style={{ flex: 1, height: 1, background: line }} />
        <span style={{ width: 5, height: 5, transform: 'rotate(45deg)', background: gilt, opacity: 0.8 }} />
        <span style={{ flex: 1, height: 1, background: line }} />
      </span>
    );
  }
  if (variant === 'short') {
    return <span style={{ display: 'block', width: 56, height: 2, background: gilt, ...style }} />;
  }
  return <span style={{ display: 'block', height: 1, width: '100%', background: line, ...style }} />;
}
