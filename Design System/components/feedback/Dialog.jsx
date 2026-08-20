import React from 'react';
import { Icon } from '../core/Icon.jsx';
import { Rule } from '../core/Rule.jsx';

export function Dialog({ open = false, title, eyebrow, children, footer, onClose, width = 520 }) {
  if (!open) return null;
  return (
    <div
      role="dialog" aria-modal="true"
      style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'var(--space-24)', background: 'var(--veil-dark)', backdropFilter: 'blur(3px)', animation: `fade var(--dur-base) var(--ease-standard)` }}
      onClick={(e) => { if (e.target === e.currentTarget && onClose) onClose(); }}
    >
      <div style={{ width: '100%', maxWidth: width, background: 'var(--surface-raised)', border: '1px solid var(--border-hairline)', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-lg)', padding: 'var(--space-32)', display: 'flex', flexDirection: 'column', gap: 'var(--space-20)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 'var(--space-16)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
            {eyebrow && <span style={{ font: 'var(--type-eyebrow)', letterSpacing: 'var(--ls-eyebrow)', textTransform: 'uppercase', color: 'var(--text-accent)' }}>{eyebrow}</span>}
            {title && <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--fs-h2)', lineHeight: 'var(--lh-heading)', color: 'var(--text-heading)', margin: 0 }}>{title}</h3>}
          </div>
          {onClose && (
            <button type="button" onClick={onClose} aria-label="Schließen" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 6, lineHeight: 0 }}>
              <Icon name="x" size={18} style={{ background: 'var(--text-muted)' }} />
            </button>
          )}
        </div>
        <Rule />
        <div style={{ font: 'var(--type-body)', color: 'var(--text-body)' }}>{children}</div>
        {footer && <div style={{ display: 'flex', gap: 'var(--space-12)', justifyContent: 'flex-end' }}>{footer}</div>}
      </div>
    </div>
  );
}
