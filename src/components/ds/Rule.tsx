import type { CSSProperties } from 'react';

export interface RuleProps {
  /** `ornament` closes a section — at most once per section. */
  variant?: 'hairline' | 'ornament' | 'short';
  tone?: 'default' | 'inverse';
  style?: CSSProperties;
}

export function Rule({ variant = 'hairline', tone = 'default', style }: RuleProps) {
  const line = tone === 'inverse' ? 'var(--border-inverse)' : 'var(--border-hairline)';

  if (variant === 'ornament') {
    return (
      <span style={{ display: 'flex', alignItems: 'center', gap: 12, ...style }}>
        <span style={{ flex: 1, height: 1, background: line }} />
        <span style={{ width: 5, height: 5, transform: 'rotate(45deg)', background: 'var(--gilt-500)', opacity: 0.8 }} />
        <span style={{ flex: 1, height: 1, background: line }} />
      </span>
    );
  }
  if (variant === 'short') {
    return <span style={{ display: 'block', width: 56, height: 2, background: 'var(--gilt-500)', ...style }} />;
  }
  return <span style={{ display: 'block', height: 1, width: '100%', background: line, ...style }} />;
}
