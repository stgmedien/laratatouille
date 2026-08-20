import React from 'react';

export const fieldShell = {
  width: '100%', font: 'var(--type-body)', color: 'var(--text-body)',
  background: 'var(--surface-raised)', border: '1px solid var(--border-hairline)',
  borderRadius: 'var(--radius-sm)', padding: '0 var(--field-pad-x)',
  transition: 'var(--transition-control)', outline: 'none'
};

export function Label({ htmlFor, children, hint }) {
  return (
    <span style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12 }}>
      <label htmlFor={htmlFor} style={{ font: 'var(--type-eyebrow)', letterSpacing: 'var(--ls-eyebrow)', textTransform: 'uppercase', color: 'var(--text-muted)' }}>{children}</label>
      {hint && <span style={{ font: 'var(--type-caption)', color: 'var(--text-faint)' }}>{hint}</span>}
    </span>
  );
}

export function Input({ label, hint, error, id, type = 'text', size = 'md', style, ...rest }) {
  const [focus, setFocus] = React.useState(false);
  const h = size === 'lg' ? 'var(--control-h-lg)' : size === 'sm' ? 'var(--control-h-sm)' : 'var(--control-h-md)';
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)', ...style }}>
      {label && <Label htmlFor={id} hint={hint}>{label}</Label>}
      <input
        id={id} type={type}
        onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
        style={{
          ...fieldShell, height: h,
          borderColor: error ? 'var(--state-danger)' : focus ? 'var(--pine-600)' : 'var(--border-hairline)',
          boxShadow: focus ? 'var(--ring-focus)' : 'none'
        }}
        {...rest}
      />
      {error && <span style={{ font: 'var(--type-caption)', color: 'var(--state-danger)' }}>{error}</span>}
    </div>
  );
}
