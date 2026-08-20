import type { CSSProperties } from 'react';

export interface LogoProps {
  size?: number;
  tone?: 'default' | 'inverse';
  style?: CSSProperties;
}

/** Monogram roundel: LR in Marcellus inside a double gilt ring. */
export function Logo({ size = 64, tone = 'default', style }: LogoProps) {
  const ink = tone === 'inverse' ? 'var(--linen-100)' : 'var(--pine-800)';
  return (
    <span aria-label="La Ratatouille" style={{
      width: size, height: size, flex: '0 0 auto', position: 'relative', display: 'inline-flex',
      alignItems: 'center', justifyContent: 'center', borderRadius: '50%',
      border: `${Math.max(1, Math.round(size * 0.012))}px solid var(--gilt-500)`, ...style,
    }}>
      <span style={{
        position: 'absolute', inset: Math.max(2, Math.round(size * 0.036)), borderRadius: '50%',
        border: '1px solid var(--gilt-500)', opacity: 0.6,
      }} />
      <span style={{
        fontFamily: 'var(--font-display)', fontSize: size * 0.34, letterSpacing: '0.06em',
        color: ink, transform: 'translate(0.03em,-0.06em)',
      }}>LR</span>
      <span style={{
        position: 'absolute', bottom: size * 0.16, left: '50%', width: size * 0.045, height: size * 0.045,
        transform: 'translateX(-50%) rotate(45deg)', background: 'var(--gilt-500)',
      }} />
    </span>
  );
}
