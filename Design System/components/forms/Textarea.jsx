import React from 'react';
import { Label, fieldShell } from './Input.jsx';

export function Textarea({ label, hint, id, rows = 4, style, ...rest }) {
  const [focus, setFocus] = React.useState(false);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)', ...style }}>
      {label && <Label htmlFor={id} hint={hint}>{label}</Label>}
      <textarea
        id={id} rows={rows}
        onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
        style={{
          ...fieldShell, padding: 'var(--space-12) var(--field-pad-x)', resize: 'vertical',
          lineHeight: 'var(--lh-body)', fontFamily: 'var(--font-body)',
          borderColor: focus ? 'var(--pine-600)' : 'var(--border-hairline)',
          boxShadow: focus ? 'var(--ring-focus)' : 'none'
        }}
        {...rest}
      />
    </div>
  );
}
