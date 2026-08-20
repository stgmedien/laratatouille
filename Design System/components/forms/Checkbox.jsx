import React from 'react';
import { Icon } from '../core/Icon.jsx';

export function Checkbox({ label, description, checked, onChange, id, disabled = false, style }) {
  return (
    <label htmlFor={id} style={{ display: 'flex', gap: 'var(--space-12)', alignItems: 'flex-start', cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.5 : 1, minHeight: 'var(--hit-min)', padding: 'var(--space-6) 0', ...style }}>
      <input id={id} type="checkbox" checked={checked} disabled={disabled} onChange={(e) => onChange && onChange(e.target.checked, e)} style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }} />
      <span style={{
        width: 20, height: 20, flex: '0 0 auto', marginTop: 2, display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        border: '1px solid', borderColor: checked ? 'var(--pine-700)' : 'var(--border-strong)',
        background: checked ? 'var(--pine-700)' : 'var(--surface-raised)',
        borderRadius: 'var(--radius-sm)', transition: 'var(--transition-control)'
      }}>
        {checked && <Icon name="check" size={13} strokeColor="var(--text-on-accent)" />}
      </span>
      <span style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <span style={{ font: 'var(--type-body)', color: 'var(--text-body)' }}>{label}</span>
        {description && <span style={{ font: 'var(--type-caption)', color: 'var(--text-faint)' }}>{description}</span>}
      </span>
    </label>
  );
}
