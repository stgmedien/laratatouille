import React from 'react';
import { Label } from './Input.jsx';

export function RadioGroup({ label, name, options = [], value, onChange, layout = 'row', style }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-12)', ...style }}>
      {label && <Label>{label}</Label>}
      <div style={{ display: 'flex', flexDirection: layout === 'row' ? 'row' : 'column', gap: layout === 'row' ? 'var(--space-8)' : 'var(--space-4)', flexWrap: 'wrap' }}>
        {options.map((o) => {
          const v = typeof o === 'string' ? o : o.value;
          const text = typeof o === 'string' ? o : o.label;
          const active = value === v;
          return (
            <button
              key={v} type="button" role="radio" aria-checked={active} name={name}
              onClick={() => onChange && onChange(v)}
              style={{
                minHeight: 'var(--control-h-md)', padding: '0 20px', cursor: 'pointer',
                font: 'var(--type-body-sm, var(--type-body))', fontFamily: 'var(--font-body)', fontSize: 'var(--fs-body-sm)',
                border: '1px solid', borderRadius: 'var(--radius-sm)', transition: 'var(--transition-control)',
                borderColor: active ? 'var(--pine-600)' : 'var(--border-hairline)',
                background: active ? 'var(--surface-accent-soft)' : 'var(--surface-raised)',
                color: active ? 'var(--pine-800)' : 'var(--text-body)'
              }}
            >
              {text}
            </button>
          );
        })}
      </div>
    </div>
  );
}
