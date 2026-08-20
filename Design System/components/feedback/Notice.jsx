import React from 'react';
import { Icon } from '../core/Icon.jsx';

export function Notice({ children, title, tone = 'info', icon, onDismiss, style }) {
  const tones = {
    info: { background: 'var(--surface-sunken)', border: 'var(--border-hairline)', accent: 'var(--ink-500)', glyph: icon || 'info' },
    success: { background: 'var(--surface-sage-soft)', border: 'transparent', accent: 'var(--sage-600)', glyph: icon || 'check' },
    notice: { background: 'color-mix(in oklab, var(--gilt-200) 55%, var(--linen-050))', border: 'transparent', accent: 'var(--gilt-500)', glyph: icon || 'bell' },
    danger: { background: 'color-mix(in oklab, var(--state-danger) 8%, var(--linen-050))', border: 'transparent', accent: 'var(--state-danger)', glyph: icon || 'triangle-alert' }
  }[tone];
  return (
    <div role="status" style={{ display: 'flex', gap: 'var(--space-12)', alignItems: 'flex-start', padding: 'var(--space-16) var(--space-20)', background: tones.background, border: `1px solid ${tones.border}`, borderRadius: 'var(--radius-md)', ...style }}>
      <Icon name={tones.glyph} size={17} style={{ marginTop: 3, background: tones.accent }} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
        {title && <span style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--fs-h4)', color: 'var(--text-heading)' }}>{title}</span>}
        <span style={{ font: 'var(--type-body-sm, var(--type-body))', fontFamily: 'var(--font-body)', fontSize: 'var(--fs-body-sm)', lineHeight: 'var(--lh-body)', color: 'var(--text-body)' }}>{children}</span>
      </div>
      {onDismiss && (
        <button type="button" onClick={onDismiss} aria-label="Schließen" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, lineHeight: 0 }}>
          <Icon name="x" size={15} style={{ background: 'var(--text-faint)' }} />
        </button>
      )}
    </div>
  );
}
