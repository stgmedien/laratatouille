'use client';

import type { CSSProperties, ReactNode } from 'react';

/** Delete buttons ask once before the server action runs. */
export function ConfirmSubmit({ children, message, style, name, value }: {
  children: ReactNode; message: string; style?: CSSProperties; name?: string; value?: string;
}) {
  return (
    <button
      type="submit" name={name} value={value}
      onClick={(event) => { if (!window.confirm(message)) event.preventDefault(); }}
      style={{
        appearance: 'none', background: 'transparent', cursor: 'pointer',
        border: '1px solid var(--border-hairline)', borderRadius: 'var(--radius-sm)',
        height: 'var(--control-h-sm)', padding: '0 14px',
        fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 'var(--fw-semibold)',
        letterSpacing: 'var(--ls-caps)', textTransform: 'uppercase',
        color: 'var(--state-danger)', ...style,
      }}
    >
      {children}
    </button>
  );
}
