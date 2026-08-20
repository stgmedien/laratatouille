import React from 'react';

export function Wordmark({ size = 28, tone = 'default', subtitle = 'Cocina mediterránea', showSubtitle = true, style }) {
  const tones = {
    default: { name: 'var(--pine-800)', sub: 'var(--text-muted)', rule: 'var(--gilt-500)' },
    inverse: { name: 'var(--linen-100)', sub: 'var(--pine-200)', rule: 'var(--gilt-500)' },
    mono: { name: 'currentColor', sub: 'currentColor', rule: 'currentColor' }
  }[tone];
  return (
    <span style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: Math.round(size * 0.18), lineHeight: 1, ...style }}>
      <span style={{ fontFamily: 'var(--font-display)', fontSize: size, letterSpacing: '0.04em', color: tones.name, whiteSpace: 'nowrap' }}>
        La Ratatouille
      </span>
      {showSubtitle && (
        <span style={{ display: 'flex', alignItems: 'center', gap: Math.round(size * 0.32), width: '100%' }}>
          <span style={{ flex: 1, height: 1, background: tones.rule, opacity: 0.55 }} />
          <span style={{ fontFamily: 'var(--font-body)', fontSize: Math.max(8, Math.round(size * 0.3)), fontWeight: 'var(--fw-medium)', letterSpacing: 'var(--ls-eyebrow)', textTransform: 'uppercase', color: tones.sub, whiteSpace: 'nowrap' }}>
            {subtitle}
          </span>
          <span style={{ flex: 1, height: 1, background: tones.rule, opacity: 0.55 }} />
        </span>
      )}
    </span>
  );
}
