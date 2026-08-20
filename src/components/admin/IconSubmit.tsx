import type { ReactNode } from 'react';

/** Small square submit button used for the ▲▼ ordering controls. */
export function IconSubmit({ children, label, disabled }: {
  children: ReactNode; label: string; disabled?: boolean;
}) {
  return (
    <button
      type="submit" aria-label={label} title={label} disabled={disabled}
      style={{
        width: 36, height: 36, display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        background: 'var(--surface-raised)', border: '1px solid var(--border-hairline)',
        borderRadius: 'var(--radius-sm)', cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.42 : 1, color: 'var(--text-heading)', padding: 0,
      }}
    >
      {children}
    </button>
  );
}
