import React from 'react';

export function Tabs({ items = [], value, onChange, align = 'left', tone = 'default', style }) {
  const inverse = tone === 'inverse';
  return (
    <div role="tablist" style={{ display: 'flex', gap: 'var(--space-32)', justifyContent: align === 'center' ? 'center' : 'flex-start', borderBottom: `1px solid ${inverse ? 'var(--border-inverse)' : 'var(--border-hairline)'}`, ...style }}>
      {items.map((it) => {
        const v = typeof it === 'string' ? it : it.value;
        const text = typeof it === 'string' ? it : it.label;
        const active = value === v;
        return (
          <button
            key={v} role="tab" aria-selected={active} type="button"
            onClick={() => onChange && onChange(v)}
            style={{
              appearance: 'none', background: 'none', border: 'none', cursor: 'pointer',
              padding: '0 0 var(--space-12)', marginBottom: -1,
              fontFamily: 'var(--font-body)', fontSize: 'var(--fs-caption)', fontWeight: 'var(--fw-semibold)',
              letterSpacing: 'var(--ls-caps)', textTransform: 'uppercase',
              color: active ? (inverse ? 'var(--text-on-inverse)' : 'var(--text-heading)') : (inverse ? 'var(--pine-200)' : 'var(--text-faint)'),
              borderBottom: `2px solid ${active ? 'var(--pine-600)' : 'transparent'}`,
              transition: 'var(--transition-control)'
            }}
          >
            {text}
          </button>
        );
      })}
    </div>
  );
}
