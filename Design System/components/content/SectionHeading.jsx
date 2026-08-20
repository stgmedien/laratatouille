import React from 'react';

export function SectionHeading({ eyebrow, title, intro, align = 'left', tone = 'default', rule = true, style }) {
  const inverse = tone === 'inverse';
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-16)', alignItems: align === 'center' ? 'center' : 'flex-start', textAlign: align, ...style }}>
      {eyebrow && (
        <span style={{ font: 'var(--type-eyebrow)', letterSpacing: 'var(--ls-eyebrow)', textTransform: 'uppercase', color: inverse ? 'var(--sage-300)' : 'var(--text-accent)' }}>{eyebrow}</span>
      )}
      <h2 style={{ font: 'var(--type-section)', color: inverse ? 'var(--text-on-inverse)' : 'var(--text-heading)', margin: 0, maxWidth: '22ch' }}>{title}</h2>
      {rule && <span style={{ width: 56, height: 2, background: 'var(--gilt-500)' }} />}
      {intro && (
        <p style={{ font: 'var(--type-body-lg)', color: inverse ? 'var(--text-on-inverse-muted)' : 'var(--text-muted)', margin: 0, maxWidth: '52ch' }}>{intro}</p>
      )}
    </div>
  );
}
