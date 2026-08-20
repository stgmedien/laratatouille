import React from 'react';
import { Label, fieldShell } from './Input.jsx';
import { Icon } from '../core/Icon.jsx';

export function Select({ label, hint, id, options = [], size = 'md', style, ...rest }) {
  const [focus, setFocus] = React.useState(false);
  const h = size === 'lg' ? 'var(--control-h-lg)' : size === 'sm' ? 'var(--control-h-sm)' : 'var(--control-h-md)';
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)', ...style }}>
      {label && <Label htmlFor={id} hint={hint}>{label}</Label>}
      <span style={{ position: 'relative', display: 'block' }}>
        <select
          id={id}
          onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
          style={{
            ...fieldShell, height: h, appearance: 'none', paddingRight: 40, cursor: 'pointer',
            borderColor: focus ? 'var(--pine-600)' : 'var(--border-hairline)',
            boxShadow: focus ? 'var(--ring-focus)' : 'none'
          }}
          {...rest}
        >
          {options.map((o) => {
            const value = typeof o === 'string' ? o : o.value;
            const text = typeof o === 'string' ? o : o.label;
            return <option key={value} value={value}>{text}</option>;
          })}
        </select>
        <Icon name="chevron-down" size={16} style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'var(--text-muted)', pointerEvents: 'none' }} />
      </span>
    </div>
  );
}
